import React, { createContext, useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { TodoistApi } from '@doist/todoist-api-typescript';
import { message } from 'antd';

export const dataContext = createContext();



function App() {

  const api = new TodoistApi("ea9c4561b70368439c492e22689f80d8eda7b1a1");

  const [messageApi, contextHolder] = message.useMessage();
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [allTask, setAllTask] = useState(null);

  useEffect(() => {

    api.getProjects()
      .then((response) => {
        setProjects(response);
      })
      .catch(() => {
        messageApi.open({ type: 'error', content: 'Not able fetch the projects.' })
      });

    api.getTasks()
      .then(response => {
        setAllTask(response["results"])
      })
      .catch(error => {
        messageApi.open({ type: 'error', content: 'Not able fetch the task.' })
      })


  }, []);

  const Details = {
    api,
    projects,
    allTask,
    selectedProject,
    setSelectedProject,
    setAllTask,
    setProjects,
  }

  if (projects == null) {
    return <div className='m-10 text-center font-black text-2xl'>Loading...</div>
  }

  return (
    <dataContext.Provider value={Details}>
      {contextHolder}
      <div className='flex'>
        <Sidebar />
        <Content />
      </div>
    </dataContext.Provider>
  )
}

export default App
