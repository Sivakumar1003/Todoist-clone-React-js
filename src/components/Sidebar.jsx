import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BorderOuterOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DownOutlined,
  EllipsisOutlined,
  FilterFilled,
  InboxOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Popover } from 'antd';
import AddTaskModel from './Task/AddTaskModel';
import useMessage from 'antd/es/message/useMessage';
import DeletProject from './Project/DeletProject';
import AddProject from './Project/AddProject';
import EditProject from './Project/EditProject';
import updateProject from '../service/project/updateProject';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedProject, removeSelectedProject } from '../slices/selectedProject';
import { updateProject as updateProjectStore } from '../slices/projectSlices';

const { Sider } = Layout;

export default function Sidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = useMessage();
  const [collapsed, setCollapsed] = useState(false)
  const [showProjects, setShowProjects] = useState(false);
  const [showFavorites, setShowFavorites] = useState(true);
  const [addTaskModel, setAddTaskModel] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [SelectedDeleteProject, setDeleteProject] = useState(null);
  const [editProject, setEditProjecct] = useState("");
  const projects = useSelector(state => state.projects);

  const item = [
    { key: "add-task", onClick: () => { setAddTaskModel(true) }, icon: <PlusCircleOutlined />, label: "Add Task", style: { color: "red", fontWeight: 900 } },
    { key: "inbox", onClick: () => { navigate("/inbox") }, icon: <InboxOutlined />, label: "Inbox" },
    { key: "search", icon: <SearchOutlined />, label: "Search" },
    { key: "today", icon: <CalendarOutlined />, label: "Today" },
    { key: "upcoming", icon: <BorderOuterOutlined />, label: "Upcoming" },
    { key: "filters-labels", icon: <FilterFilled />, label: "Filters & Labels" },
    { key: "completed", icon: <CheckCircleOutlined />, label: "Completed" },
  ]

  const inboxProject = [];
  if (projects) {
    projects.forEach(project => {
      if (project["name"] !== "Inbox") {
        inboxProject.push(project);
      }
    });
  }

  const popoverButton = (project) => (
    <div className='flex  flex-col gap-1'>
      {
        project["is_favorite"] ?
          <Button onClick={() => { removeFavorites(project) }}>Remove Favorite</Button>
          :
          <Button onClick={() => { addFavrites(project) }}>Add to Favorite</Button>
      }
      <Button onClick={() => { setEditProjecct(project) }}>Edit</Button>
      <Button onClick={() => { setDeleteProject(project) }}>Delete</Button>
    </div>
  )

  const projectItems = inboxProject.map(project => {
    return {
      key: `${project["id"]}`,
      onClick: () => {
        navigate("/project");
        dispatch(addSelectedProject(project))
      },
      label: (
        <span
          className='flex justify-between'
        >
          # {project["name"]}
          <Popover
            content={popoverButton(project)}
            trigger="click"
            placement="right"
          >
            <EllipsisOutlined />
          </Popover>
        </span>
      )
    }
  })

  async function addFavrites(project) {
    try {
      let updatedproject = await updateProject({ ...project, is_favorite: true });
      dispatch(updateProjectStore(updatedproject));
      messageApi.open({ type: "success", content: "Added to favorites." });
    }
    catch {
      messageApi.open({ type: "error", content: "Failed to add to favorites." });
    }
  }

  async function removeFavorites(project) {
    try {
      let updatedproject = await updateProject({ ...project, is_favorite: false });
      dispatch(updateProjectStore(updatedproject));
      messageApi.open({ type: "success", content: "Removed from favorites." })
    }
    catch {
      messageApi.open({ type: "error", content: "Failed to remove from favorites." })
    }
  }


  const favoritesProject = [];
  if (inboxProject.length > 0) {
    inboxProject.forEach(project => {
      if (project["is_favorite"]) {
        favoritesProject.push(project);
      }
    })
  }

  const favoritesItems = favoritesProject.map(project => {
    return {
      key: `${project["id"]}`,
      onClick: () => {
        navigate("/project"),
          dispatch(addSelectedProject(project))
      },
      label: (
        <span
          className='flex justify-between'
        >
          # {project["name"]}
          <Popover
            content={popoverButton(project)}
            trigger="click" placement="right"
          >
            <EllipsisOutlined />
          </Popover>
        </span>
      )
    }
  })


  return (
    <Sider
      width={250}
      collapsible
      trigger={null}
      collapsedWidth={0}
      breakpoint='md'
      onBreakpoint={(broken) => { setCollapsed(broken) }}
      collapsed={collapsed}
      style={{ minHeight: "100vh", backgroundColor: "rgb(248,219,158,0.1)", paddingLeft: collapsed ? "0px" : "20px" }}
    >
      {contextHolder}
      <Button
        type='text'
        onClick={() => setCollapsed(pre => !pre)}
        icon={<MenuOutlined />}
        style={{
          position: "absolute",
          transition: "left 0.3s ease",
          left: collapsed ? 10 : 210,
          zIndex: 1000,
          fontSize: "18px",
          width: 40,
          height: 40,
          background: "transparent",

        }}
      />
      {!collapsed &&
        <>
          <div className='flex gap-2 py-3'>
            <div className='rounded-full border bg-green-800 border-white px-1.5 w-5 h-5'>
              <p className='text-white font-bold'>s</p>
            </div>
            <p>shivask94423 <DownOutlined style={{ padding: "2px", opacity: "60%" }} /></p>
          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            style={{
              backgroundColor: "transparent",
              fontSize: "16px"
            }}
            items={item}
          >
          </Menu>
          {
            favoritesProject.length > 0 &&
            <div>
              <div className='flex  justify-between items-center mt-4'>
                <p className='opacity-75 text-sm p-2'>Favorites</p>
                <Button
                  type='text'
                  onClick={() => setShowFavorites(pre => !pre)}
                >
                  {showFavorites ? <DownOutlined /> : <RightOutlined />}
                </Button>
              </div>
              {favoritesProject.length > 0 && showFavorites && <Menu items={favoritesItems} style={{ backgroundColor: "transparent", }}></Menu>}

            </div>
          }

          <div className='flex items-center mt-4'>
            <div className='flex justify-between w-full'>
              <div
                className='font-bold text-sm p-2 cursor-pointer'
                onClick={() => { navigate("/project"); dispatch(removeSelectedProject(null)) }}
              >
                My Projects
              </div>
              <PlusOutlined onClick={() => { setNewProject(true) }} />
            </div>
            <Button
              type='text'
              onClick={() => setShowProjects(pre => !pre)}
            >
              {showProjects ? <DownOutlined /> : <RightOutlined />}
            </Button>
          </div>
          {inboxProject.length > 0 && showProjects && <Menu items={projectItems} style={{ backgroundColor: "transparent", }} > </Menu>}
        </>
      }
      <AddTaskModel addTaskModel={addTaskModel} setAddTaskModel={setAddTaskModel} />
      <DeletProject SelectedDeleteProject={SelectedDeleteProject} setDeleteProject={setDeleteProject} />
      <AddProject newProject={newProject} setNewProject={setNewProject} />
      <EditProject editProject={editProject} setEditProjecct={setEditProjecct} />
    </Sider>
  )
}
