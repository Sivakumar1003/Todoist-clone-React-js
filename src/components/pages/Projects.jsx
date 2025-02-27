import React, { useContext, useEffect, useState } from 'react'
import { dataContext } from '../../App'
import { Button, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import NewTask from '../Task/NewTask';
import useMessage from 'antd/es/message/useMessage';
import EditTask from '../Task/EditTask';
import MoveTask from '../Task/MoveTask';

function Projects() {

  const { selectedProject, projects, setSelectedProject, allTask, api, setAllTask } = useContext(dataContext);
  const [newTask, setNewTask] = useState(false);
  const [messageApi, contextHolder] = useMessage();
  const [editTask, setEditTask] = useState("");
  const [changeProject, setChangeProject] = useState("");


  const allProject = [];
  if (projects && Array.isArray(projects["results"])) {
    projects["results"].forEach(project => {
      if (project["name"] !== "Inbox") {
        allProject.push(project);
      }
    });
  }

  const filteredAllTask = [];

  if (selectedProject && allTask) {
    let id = selectedProject["id"];
    allTask.forEach(task => {
      if (task["projectId"] == id && !task["isCompleted"]) {
        filteredAllTask.push(task);
      }
    });
  }

  function deleteTask(id) {
    api.deleteTask(id)
    .then(() => {
      setAllTask(previousTask => {
        const newTask = (previousTask || []).filter(task => {
          return task["id"] !== id
        }) 
        return newTask;
      });
      messageApi.open({type:"success", content:"task deleted sucessfully..."})
    })
    .catch(() => {
      messageApi.open({type:"error", content:"not able to delete task..."})
    })
  }

  function completeTask(id) {
    api.closeTask(id)
    .then(response => {
      setAllTask(previousTask => {
        return (previousTask || []).map(task => {
          if(task["id"] == id) {
            task = {...task, isCompleted: true}
          }
          return task;
        })
      })
      messageApi.open({type:"success", content:"Completed sucessfully..."})
    })
    .catch(error => {
      messageApi.open({type:"error", content:"Could not mark task as complete..."})
    })
  }

  return (
    <div className='mx-[10%]'>

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
                      return <div className='flex gap-3 p-1 m-2 justify-between max-w-[600px]' key={task["id"]}>
                        <div className='flex gap-5'>
                          <Checkbox onChange={() => {completeTask(task["id"])}}/>
                          <div>
                            <p className='text-xs'>{task["content"]}</p>
                            <p className='text-xs'>{task["description"]}</p>
                            <p className='text-xs'>{task?.due?.date}</p>
                          </div>
                        </div>
                        <div className='flex gap-5 items-center'>
                          <Button onClick={() => {setChangeProject(task)}}>move</Button>
                          <EditOutlined onClick={() => {setEditTask(task)}} />
                          <DeleteOutlined onClick={() => {deleteTask(task["id"])}} />
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
                return <div key={project["id"]} className='p-2 w-fit cursor-pointer' onClick={() => { setSelectedProject(project) }}>
                  {project["name"]}
                </div>
              })
            }
          </div>
        </div>
      }
      <EditTask editTask={editTask} setEditTask={setEditTask}/>
      <MoveTask changeProject={changeProject} setChangeProject={setChangeProject} projects={projects} api={api} setAllTask={setAllTask} />
    </div>
  )
}

export default Projects