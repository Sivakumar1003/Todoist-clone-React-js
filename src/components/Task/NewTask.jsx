import { Button, DatePicker, Input, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'
import useMessage from 'antd/es/message/useMessage';
import addTask from '../../service/task/addTask';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { addTask as addTaskStore } from '../../slices/taskSlices';


function NewTask({ selectedProject, setNewTask }) {

    const [messageApi, contextHolder] = useMessage();
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [priority, setPriority] = useState("1");
    const projectId = selectedProject["id"];
    const addTaskBuuton = useRef();
    const dateInput = useRef();
    const datePriority = useRef();

    useEffect(() => {
        addTaskBuuton.current.disabled = false;
    }, [selectedProject])

    function handelDate(_, dateString) {
        dateInput.current.textContent = dateString;
        setDate(dateString);
    }

    function handelPriority(value) {
        datePriority.current.textContent = "p" + value;
        setPriority(value)
    }

    function handleCancel() {
        setTask("");
        setDescription("");
        setDate(null);
        setPriority("1");
        setNewTask(false);
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
            dispatch(addTaskStore(taskAdded));
            messageApi.open({ type: "success", content: "task added successfully." });
        }
        catch {
            messageApi.open({ type: "error", content: "task not able to add." })
        }
        handleCancel();
    }


    return (
        <div className='flex flex-col gap-2 border border-red-500 p-2 rounded-md max-w-[500px]'>

            {contextHolder}
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
                <div className='text-sm font-black p-1 shadow-md'>{selectedProject["name"]}</div>

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
    )
}

export default NewTask