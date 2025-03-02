import { Button, DatePicker, Input, Modal, Select } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { dataContext } from '../../App';
import useMessage from 'antd/es/message/useMessage';
import addTask from '../../service/task/addTask';
import TextArea from 'antd/es/input/TextArea';

function AddTask({ addTaskModel, setAddTaskModel }) {

  const { projects, setAllTask } = useContext(dataContext)
  const [messageApi, contextHolder] = useMessage();
  const addTaskBuuton = useRef();

  useEffect(() => {
    if(addTaskModel) {
      addTaskBuuton.current.disabled = false;
    }
  }, [addTaskModel])

  const allProject = [];
  if (projects && Array.isArray(projects)) {
    projects.forEach(project => {
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


  function handelDate(_, dateString) {
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

  async function handleAddTask() {

    let deefaultDate = new Date;
    let currentDay = Number(deefaultDate.getDate());
    let month = Number(deefaultDate.getMonth());
    let year = deefaultDate.getFullYear();

    const newTask = {
      "content": task,
      "description": description,
      "due_date": date || `${year}-${month < 10 ? "0" + month : month}-${currentDay < 10 ? "0" + currentDay : currentDay}`,
      "priority": priority,
      "project_id": projectId,
    }
    
    addTaskBuuton.current.disabled = true;
    
    try {
      let taskAdded = await addTask(newTask);
      messageApi.open({ type: "success", content: "task added successfully." });
      setAllTask(pre => {
        return [...pre, taskAdded]
      });
    }
    catch {
      messageApi.open({ type: "error", content: "task not able to add." })
    }

    handleCancel();

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
          <Input
            type="text"
            value={task}
            placeholder='Add new Task'
            onChange={(e) => setTask(e.target.value)}
            maxLength="30"
          />
          <span ref={dateInput} className=' w-fit p-1 font-bold text-md'></span>
          <span ref={datePriority} className=' w-fit p-1 font-bold text-md'></span>
        </div>

        <TextArea
          value={description}
          placeholder='Task description'
          onChange={(e) => setDescription(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
          maxLength="300"
        ></TextArea>

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
            <Button
              style={{ background: "red", color: "white", fontWeight: "900" }}
              onClick={handleAddTask} disabled={task.trim() === ""}
              ref={addTaskBuuton}
            >
              Add Task</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddTask