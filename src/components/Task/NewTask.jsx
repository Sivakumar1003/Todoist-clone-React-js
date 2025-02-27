import { Button, DatePicker, Select } from 'antd'
import React, { useContext, useRef, useState } from 'react'
import useMessage from 'antd/es/message/useMessage';
import { dataContext } from '../../App';


function NewTask({ selectedProject, setNewTask }) {

    const { setAllTask, api } = useContext(dataContext)
    const [messageApi, contextHolder] = useMessage();

    const dateInput = useRef();
    const datePriority = useRef();

    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [priority, setPriority] = useState("1");
    const projectId = selectedProject["id"];

    function handelDate(dateObj, dateString) {
        dateInput.current.textContent = dateString;
        setDate(dateString);
    }

    function handelDate(dateObj, dateString) {
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



    function handleAddTask() {

        let deefaultDate =  new Date;
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

        api.addTask(newTask)
            .then(response => {
                messageApi.open({ type: "success", content: "New task added..." });
                
                setAllTask(previousData => previousData ? [...previousData, response] : [response]);

                messageApi.open({type: "success", content: "New task added."})

                setTask("");
                setDescription("");
                setDate(null);
                setPriority("Priority 4");
                setNewTask(false);
            })
            .catch(error => {
                messageApi.open({ type: "error", content: "Not able to add task..." })
            })

    }


    return (
        <div className='flex flex-col gap-2 border border-red-500 p-2 rounded-md max-w-[500px]'>

            {contextHolder}
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
                <div className='text-sm font-black p-1 shadow-md'>{selectedProject["name"]}</div>

                <div className='flex gap-2'>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button style={{ background: "red", color: "white", fontWeight: "900" }} onClick={handleAddTask} disabled={task.trim() === ""}>Add Task</Button>
                </div>
            </div>

        </div>
    )
}

export default NewTask