import { Button, DatePicker, Modal, Select } from 'antd'
import React, { useContext, useRef, useState } from 'react'
import { dataContext } from '../../App';
import useMessage from 'antd/es/message/useMessage';

function AddTask({ addTaskModel, setAddTaskModel }) {

  const { projects, setAllTask, api } = useContext(dataContext)
  const [messageApi, contextHolder] = useMessage();

  const allProject = [];

  if (projects && Array.isArray(projects["results"])) {

    projects["results"].forEach(project => {
      allProject.push(project);
    });
  }

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("1");
  const [projectId, setProjecctId] = useState(allProject.length > 0 ? allProject[0]["id"] : "")

  const dateInput = useRef();
  const datePriority = useRef();


  function handelDate(dateObj, dateString) {
    dateInput.current.textContent = dateString;
    setDate(dateString);
  }

  function handelPriority(value) {
    datePriority.current.textContent = "p" + value;
    setPriority(value)
  }

  function handelProjecctId(value) {
    setProjecctId(value)
  }

  function handleAddTask() {

    const newTask = {
      "content": task,
      "description": description,
      "due_date": date,
      "priority": priority,
      "project_id": projectId,
    }

    api.addTask(newTask)
      .then(response => {
        messageApi.open({ type: "success", content: "New task added..." });
         
        setAllTask(previousData => previousData ? [...previousData, response] : [response]);
        
        setTask("");
        setDescription("");
        setDate(null);
        setPriority("1");
        setProjecctId(allProject.length > 0 ? allProject[0]["id"] : "");
        setAddTaskModel(false);
      })
      .catch(error => {
        messageApi.open({ type: "error", content: "Not able to add task..." })
      })


  }


  function handleCancel() {
    setTask("");
    setDescription("");
    setDate(null);
    setPriority("Priority 4");
    setProjecctId(allProject.length > 0 ? allProject[0]["id"] : "");
    setAddTaskModel(false);
  }

  return (
    <Modal open={addTaskModel} footer={null} >
      {contextHolder}
      <div className='flex flex-col gap-2'>
        <div className='shadow-xs'>
          <input
            type="text"
            value={task}
            placeholder='Add new Task'
            onChange={(e) => setTask(e.target.value)}
            className=' font-black text-lg p-1 focus:outline-none'
          />
          <span ref={dateInput} className=' w-fit p-1 font-bold text-md'></span>
          <span ref={datePriority} className=' w-fit p-1 font-bold text-md'></span>
        </div>

        <textarea
          value={description}
          placeholder='Task description'
          onChange={(e) => setDescription(e.target.value)}
          className='font-normal text-sm shadow-xs focus:outline-none h-5'
        ></textarea>

        <div className='flex gap-2'>
          <DatePicker onChange={handelDate} format="YYYY-MM-DD" />
          <Select
            value={priority}
            onChange={value => { handelPriority(value) }}
            options={[
              { value: "1", label: "Priority 1" },
              { value: "2", label: "Priority 2" },
              { value: "3", label: "Priority 3" },
              { value: "4", label: "Priority 4" }
            ]}
          />
        </div>

        <div className='flex justify-between '>
          <div>
            <Select
              value={projectId}
              onChange={value => { handelProjecctId(value) }}
              options={allProject.map(project => {
                return { value: `${project["id"]}`, label: `${project["name"]}` }
              })}
            />
          </div>

          <div className='flex gap-2'>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button style={{ background: "red", color: "white", fontWeight: "900" }} onClick={handleAddTask} disabled={task.trim() === ""}>Add Task</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddTask