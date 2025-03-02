import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BorderOuterOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DownOutlined,
  EllipsisOutlined,
  FilterFilled,
  InboxOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Popover } from 'antd';
import { dataContext } from '../App';
import AddTaskModel from './Task/AddTaskModel';
import useMessage from 'antd/es/message/useMessage';
import DeletProject from './Project/DeletProject';
import AddProject from './Project/AddProject';
import EditProject from './Project/EditProject';
import updateProject from '../service/project/updateProject';
const { Sider } = Layout;


export default function Sidebar() {

  const { projects, setSelectedProject, setProjects } = useContext(dataContext);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = useMessage();
  const [showProjects, setShowProjects] = useState(false);
  const [showFavorites, setShowFavorites] = useState(true);
  const [addTaskModel, setAddTaskModel] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [SelectedDeleteProject, setDeleteProject] = useState(null);
  const [editProject, setEditProjecct] = useState("");


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
        setSelectedProject(project)
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
      setProjects(previousProject => previousProject.map(eachProject => eachProject["id"] == project["id"] ? updatedproject : eachProject));
      messageApi.open({ type: "success", content: "Added to favorites." });
    }
    catch {
      messageApi.open({ type: "error", content: "Failed to add to favorites." });
    }
  }

  async function removeFavorites(project) {
    try {
      let updatedproject = await updateProject({ ...project, is_favorite: false });
      setProjects(previousProject => previousProject.map(eachProject => eachProject["id"] == project["id"] ? updatedproject : eachProject));
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
          setSelectedProject(project)
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
      width="100%"
      style={{ minHeight: "100vh", position: "relative", backgroundColor: "rgb(248,219,158,0.1)", paddingLeft: "20px" }}
    >

      {contextHolder}
      <Menu
        defaultSelectedKeys={["1"]}
        style={{
          marginTop: 50,
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
            onClick={() => { navigate("/project"); setSelectedProject(null) }}
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

      <AddTaskModel addTaskModel={addTaskModel} setAddTaskModel={setAddTaskModel} />
      <DeletProject SelectedDeleteProject={SelectedDeleteProject} setDeleteProject={setDeleteProject} setProjects={setProjects} />
      <AddProject newProject={newProject} setNewProject={setNewProject} />
      <EditProject editProject={editProject} setEditProjecct={setEditProjecct} setProjects={setProjects} />
    </Sider>
  )
}
