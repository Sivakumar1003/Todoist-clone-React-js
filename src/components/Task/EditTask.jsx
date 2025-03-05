import { Button, DatePicker, Input, Modal, Select } from 'antd'
import useMessage from 'antd/es/message/useMessage';
import { useEffect, useRef, useState } from 'react'
import updateTask from '../../service/task/updateTask';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask as updateTaskStore } from '../../slices/taskSlices';

function EditTask({ editTask, setEditTask }) {


  const [messageApi, contextHolder] = useMessage();
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("1");
  const dateInput = useRef();
  const datePriority = useRef();
  const editButton = useRef();

  useEffect(() => {
    if (editTask) {
      setTask(editTask["content"]);
      setDescription(editTask["description"]);
      setDate(editTask?.due?.date || null);
      setPriority(`${editTask["priority"]}`);
      editButton.current.disabled = false;
    }
  }, [editTask]);

  const allProject = [];
  if (projects && Array.isArray(projects["results"])) {
    projects["results"].forEach(project => {
      allProject.push(project);
    });
  }

  function handelDate(_, dateString) {
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

  async function handleEditTask() {
    const newTask = {
      content: task,
      description: description,
      due_date: date,
      priority: priority
    }
    editButton.current.disabled = true;
    try {
      let updatedTask = await updateTask(newTask, editTask["id"]);
      dispatch(updateTaskStore(updatedTask));
      messageApi.open({ type: "success", content: "Successfully changed." })
    }
    catch {
      messageApi.open({ type: "error", content: "Not able to change." })
    }
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
        >
        </TextArea>

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
          <Button
            style={{ background: "red", color: "white", fontWeight: "900" }}
            onClick={handleEditTask}
            ref={editButton}
            disabled={task.trim() == ""}
          >Edit Task</Button>

        </div>

      </div>

    </Modal>
  )
}

export default EditTask