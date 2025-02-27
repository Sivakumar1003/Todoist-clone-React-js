import React, { useContext, useState } from 'react';
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
import { Button, Layout, Menu, Modal, Popover } from 'antd';
import { dataContext } from '../App';
import AddTask from './Task/AddTask';
import useMessage from 'antd/es/message/useMessage';
import DeletProject from './Project/DeletProject';
import AddProject from './Project/AddProject';
import EditProject from './Project/EditProject';
const { Sider } = Layout;


export default function Sidebar() {

  const { projects, setSelectedProject, api, setProjects } = useContext(dataContext);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = useMessage();
  const [collapsed, setCollapsed] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showFavorites, setShowFavorites] = useState(true);
  const [addTaskModel, setAddTaskModel] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [deleteProject, setDeleteProject] = useState(null);
  const [editProject, setEditProjecct] = useState("");


  const item = [
    { key: "add-task", onClick: () => { setAddTaskModel(true) }, icon: <PlusCircleOutlined />, label: "Add Task", style: { color: "red", fontWeight: 900 } },
    { key: "search", onClick: () => { navigate("/search") }, icon: <SearchOutlined />, label: "Search" },
    { key: "inbox", onClick: () => { navigate("/inbox") }, icon: <InboxOutlined />, label: "Inbox" },
    { key: "today", onClick: () => { navigate("/today") }, icon: <CalendarOutlined />, label: "Today" },
    { key: "upcoming", onClick: () => { navigate("/upcoming") }, icon: <BorderOuterOutlined />, label: "Upcoming" },
    { key: "filters-labels", onClick: () => { navigate("/filters-labels") }, icon: <FilterFilled />, label: "Filters & Labels" },
    { key: "completed", onClick: () => { navigate("/completed") }, icon: <CheckCircleOutlined />, label: "Completed" },

  ]

  const AllProject = [];
  if (projects) {

    projects["results"].forEach(project => {
      if (project["name"] !== "Inbox") {
        AllProject.push(project);
      }
    });
  }

  const popoverButton = (project) => (
    <div className='flex  flex-col gap-1'>
      {
        project["isFavorite"] ?
          <Button onClick={() => { removeFavorites(project) }}>Remove Favorite</Button>
          :
          <Button onClick={() => { addFavrites(project) }}>Add to Favorite</Button>
      }

      <Button onClick={() => { setEditProjecct(project) }}>Edit</Button>
      <Button onClick={() => { setDeleteProject(project) }}>Delete</Button>
    </div>
  )

  const projectItems = AllProject.map(project => {
    return {
      key: `${project["id"]}`,
      onClick: () => {
        navigate("/project"),
          setSelectedProject(project)
      },
      label: (<span className='flex justify-between'># {project["name"]} <Popover content={popoverButton(project)} trigger="click" placement="right" ><EllipsisOutlined /></Popover></span>)
    }
  })

  function addFavrites(project) {

    api.updateProject(project["id"], { is_favorite: true })
      .then(response => {
        setProjects(previousData => {
          return {...previousData, results: previousData["results"].map(preProject => {
              if(project["id"] == preProject["id"]) {
                return response
              } else {
                return preProject
              }
          })}
        })
        
        messageApi.open({ type: "success", content: "Added to favorites." })
      })
      .catch(error => {
        messageApi.open({ type: "error", content: "Failed to add to favorites." })
      })
  }

  function removeFavorites(project) {
    api.updateProject(project["id"], { name: `${project["name"]}`, is_favorite: false })
      .then(response => {
        
        setProjects(previousData => {
          return {...previousData, results: previousData["results"].map(preProject => {
              if(project["id"] == preProject["id"]) {
                return response
              } else {
                return preProject
              }
          })}
        })

        messageApi.open({ type: "success", content: "Removed from favorites." })
      })
      .catch(error => {
        messageApi.open({ type: "error", content: "Failed to remove from favorites." })
      })
  }


  const favoritesProject = [];
  if (AllProject.length > 0) {
    AllProject.forEach(project => {
      if (project["isFavorite"]) {
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
      label: (<span className='flex justify-between'># {project["name"]} <Popover content={popoverButton(project)} trigger="click" placement="right" ><EllipsisOutlined /></Popover></span>)
    }
  })


  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      width={280}
      style={{ minHeight: "100vh", position: "relative", backgroundColor: "rgb(248,219,158,0.1)", paddingLeft: "20px" }}
    >

      {contextHolder}
      <Button
        type="text"
        onClick={() => setCollapsed(!collapsed)}
        icon={<MenuOutlined />}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          transition: "left 0.3s ease",
          left: collapsed ? 10 : "auto",
          zIndex: 1000,
          fontSize: "18px",
          width: 40,
          height: 40,
          background: "transparent",
        }}
      />

      {!collapsed && (
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
      )}

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
          <div className='font-bold text-sm p-2 cursor-pointer' onClick={() => { navigate("/project"); setSelectedProject(null) }}>My Projects</div>
          <PlusOutlined onClick={() => {setNewProject(true)}}/>
        </div>
        <Button
          type='text'
          onClick={() => setShowProjects(pre => !pre)}
        >
          {showProjects ? <DownOutlined /> : <RightOutlined />}
        </Button>

      </div>

      {AllProject.length > 0 && showProjects && <Menu items={projectItems} style={{ backgroundColor: "transparent", }} > </Menu>}

      <AddTask addTaskModel={addTaskModel} setAddTaskModel={setAddTaskModel} />
      <DeletProject deleteProject={deleteProject} setDeleteProject={setDeleteProject} api={api} setProjects={setProjects}/>
      <AddProject newProject={newProject} setNewProject={setNewProject}/>
      <EditProject editProject={editProject} setEditProjecct={setEditProjecct} api={api} setProjects={setProjects} />
    </Sider>
  )
}
