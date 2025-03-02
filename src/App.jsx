import { createContext, useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { message, Splitter } from 'antd';
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
  },[]);

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
      <Splitter style={{ height: '100vh' }}>
      <Splitter.Panel defaultSize="30%" min="10%" max="50%">
          <Sidebar />
        </Splitter.Panel>

        <Splitter.Panel defaultSize="70%" min="50%" max="90%">
          <Content />
        </Splitter.Panel>

      </Splitter>
    </dataContext.Provider>
  )
}

export default App
