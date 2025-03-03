import { createContext, useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { message } from 'antd';
import getProject from './service/project/getProject';
import getTask from './service/task/getTask';

export const dataContext = createContext();

function App() {


  const [messageApi, contextHolder] = message.useMessage();
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [allTask, setAllTask] = useState(null);

  useEffect(() => {

    getProject()
      .then(response => {
        setProjects(response);
      })
      .catch(() => {
        messageApi.open({ type: 'error', content: 'Not able fetch the projects.' })
      });

    getTask()
      .then(response => {
        setAllTask(response)
      })
      .catch(() => {
        messageApi.open({ type: 'error', content: 'Not able fetch the task.' })
      })
  }, []);

  const Details = {
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
