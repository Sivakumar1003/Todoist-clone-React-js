import  { useState } from 'react'
import { Button, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import NewTask from '../Task/NewTask';
import useMessage from 'antd/es/message/useMessage';
import EditTask from '../Task/EditTask';
import MoveTask from '../Task/MoveTask';
import deleteTask from '../../service/task/deleteTask';
import completeTask from '../../service/task/completeTask';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedProject } from '../../slices/selectedProject';
import { deleteTask as deleteTaskStore, completeTask as completeTaskStore } from "../../slices/taskSlices";

function Projects() {

  const [newTask, setNewTask] = useState(false);
  const [messageApi, contextHolder] = useMessage();
  const [editTask, setEditTask] = useState("");
  const [changeProject, setChangeProject] = useState("");
  const dispatch = useDispatch();
  const selectedProject = useSelector(state => state.selectedProject)
  const projects = useSelector(state => state.projects)
  const allTask = useSelector(state => state.task)
  
  const allProject = [];
  if (projects && Array.isArray(projects)) {
    projects.forEach(project => {
      if (project["name"] !== "Inbox") {
        allProject.push(project);
      }
    });
  }

  const filteredAllTask = [];
  if (selectedProject && allTask) {
    let id = selectedProject["id"];
    allTask.forEach(task => {
      if (task["project_id"] == id && !task["is_completed"]) {
        filteredAllTask.push(task);
      }
    });
  }

  async function handelDeleteTask(id) {
    try {
      await deleteTask(id);
      dispatch(deleteTaskStore(id));
      messageApi.open({ type: "success", content: "task deleted sucessfully..." })
    }
    catch {
      messageApi.open({ type: "error", content: "not able to delete task..." })
    }
  }

  async function handelCompleteTask(id) {
    try {
      await completeTask(id);
      dispatch(completeTaskStore(id));
      messageApi.open({ type: "success", content: "Completed sucessfully..." })
    }
    catch {
      messageApi.open({ type: "error", content: "Could not mark task as complete..." })
    }
  }

  return (
    <div className="mx-auto min-w-[350px]">

      {contextHolder}
      {selectedProject ?
        <div>
          <p className='mx-10 font-black text-xl'>{selectedProject["name"]}</p>

          <div className='m-5'>
            {
              filteredAllTask.length > 0 ?
                <div>
                  {
                    filteredAllTask.map(task => {
                      return <div className='flex gap-3 m-2 justify-between max-w-[650px] border min-w-[300px] border-gray-300 rounded-2xl p-3 px-5' key={task["id"]}>
                        <div className='flex gap-5'>
                          <Checkbox onChange={() => {handelCompleteTask(task["id"])}}/>
                          <div className="flex flex-col gap-1">
                            <p className='text-xs p-1 font-bold'>{task["content"]}</p>
                            <p className='text-[15px]'>{task["description"]}</p>
                            <p className='text-[10px]  opacity-60'>{task?.due?.date}</p>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2 md:flex-row md:gap-5 items-center'>
                          <Button onClick={() => {setChangeProject(task)}}>move</Button>
                          <EditOutlined onClick={() => {setEditTask(task)}} />
                          <DeleteOutlined onClick={() => {handelDeleteTask(task["id"])}} />
                        </div>
                      </div>
                    })
                  }
                </div> : <p>No Task</p>
            }
          </div>
          <div className='mx-8 '>
            {
              newTask ?
                <div>
                  <NewTask selectedProject={selectedProject} setNewTask={setNewTask} />
                </div>
                :
                <div className='flex hover:text-red-600 text-sm gap-2' onClick={() => { setNewTask(true) }}>
                  <PlusCircleFilled />
                  <p>Add task</p>
                </div>

            }
          </div>

        </div>
        :
        <div>
          <p className='text-center font-black text-lg'>All projects</p>
          <div className='m-4 flex flex-col gap-3'>
            {
              allProject.length > 0 &&
              allProject.map(project => {
                return <div key={project["id"]} className='p-2 w-fit cursor-pointer' onClick={() => { dispatch(addSelectedProject(project)) }}>
                  {project["name"]}
                </div>
              })
            }
          </div>
        </div>
      }
      <EditTask editTask={editTask} setEditTask={setEditTask}/>
      <MoveTask changeProject={changeProject} setChangeProject={setChangeProject} />
    </div>
  )
}

export default Projects