import { Button, DatePicker, Modal, Select } from 'antd'
import useMessage from 'antd/es/message/useMessage';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { dataContext } from '../../App';

function EditTask({ editTask, setEditTask }) {


  const { projects, setAllTask, api } = useContext(dataContext)
  const [messageApi, contextHolder] = useMessage();

  const dateInput = useRef();
  const datePriority = useRef();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("1");

  useEffect(() => {
    if (editTask) {
      setTask(editTask["content"]);
      setDescription(editTask["description"]);
      setDate(editTask?.due?.date || null);
      setPriority(`${editTask["priority"]}`);
    }
  },[editTask]);

  const allProject = [];

  if (projects && Array.isArray(projects["results"])) {

    projects["results"].forEach(project => {
      allProject.push(project);
    });
  }

  function handelDate(dateObj, dateString) {
    dateInput.current.textContent = dateString;
    setDate(dateString);
  }

  function handelPriority(value) {
    datePriority.current.textContent = "p" + value;
    setPriority(value)
  }

  function handelCancel() {
    setEditTask("")
  }

  function handleEditTask() {
    const newTask = {
      content: task,
      description: description,
      due_date: date,
      priority: priority
    }

    api.updateTask(`${editTask["id"]}`, newTask)
    .then((response) => {
      setAllTask(preTask => {
        return preTask.map(task => {
          if(task["id"] === editTask["id"]) {
            return response;
          } else {
            return task;
          }
        })
      })
      messageApi.open({type:"success", content:"Successfully changed."})
    })
    .catch(() => {
      messageApi.open({type:"error", content:"Not able to change."})
    })
    handelCancel();
  }


  return (
    <Modal
      open={editTask}
      footer={null}
    >

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

        <div className='flex gap-4 justify-end'>
          <Button onClick={handelCancel}>Cancel</Button>
          <Button style={{ background: "red", color: "white", fontWeight: "900" }} onClick={handleEditTask} >Edit Task</Button>
        </div>

      </div>

    </Modal>
  )
}

export default EditTask