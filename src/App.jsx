import { useEffect } from 'react'

import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { message } from 'antd';
import getProject from './service/project/getProject';
import getTask from './service/task/getTask';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialProject } from './slices/projectSlices';
import { setInitialTask } from './slices/taskSlices';

function App() {

  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects);

  useEffect(() => {

    getProject()
      .then(response => {
        dispatch(setInitialProject(response));
      })
      .catch(() => {
        messageApi.open({ type: 'error', content: 'Not able fetch the projects.' })
      });

    getTask()
      .then(response => {
        dispatch(setInitialTask(response));
      })
      .catch(() => {
        messageApi.open({ type: 'error', content: 'Not able fetch the task.' })
      })
  }, []);

  if (projects == null) {
    return <div className='m-10 text-center font-black text-2xl'>Loading...</div>
  }

  return (
    < div className='flex' >
      {contextHolder}
      <Sidebar />
      <Content />
    </div >
  )
}

export default App
