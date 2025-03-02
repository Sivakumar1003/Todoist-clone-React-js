import { Button, Modal, Select } from 'antd'
import useMessage from 'antd/es/message/useMessage';
import { useEffect, useRef, useState } from 'react'
import deleteTask from '../../service/task/deleteTask';
import addTask from '../../service/task/addTask';

function MoveTask({ changeProject, setChangeProject, projects, setAllTask }) {

    const [changeId, setChangeId] = useState(null);
    const moveButton = useRef();
    const [messageApi, contextHolder] = useMessage();

    useEffect(() => {
        if (changeProject) {
            setChangeId(changeProject["project_id"]);
            moveButton.current.disabled = false;
        }
    }, [changeProject])

    const allProject = [];
    if (projects && Array.isArray(projects)) {
        projects.forEach(project => {
            allProject.push(project);
        });
    }

    function handelCancel() {
        setChangeProject("")
    }

    async function handelTaskMove() {

        const task = { ...changeProject, project_id: changeId };
        moveButton.current.disabled = true;

        try {
            await deleteTask(changeProject["id"]);
            let movedTask = await addTask(task);
            setAllTask(previousTask => previousTask.map(task => task["id"] == changeProject["id"] ? movedTask : task))

            messageApi.open({ type: "success", content: "removed here, Not able add in new project." })
        }
        catch {

            messageApi.open({ type: "error", content: "Not able to remove from this project." })
        }


        handelCancel();
    }

    return (
        <Modal
            open={changeProject}
            footer={null}
        >
            {contextHolder}
            <div className='flex gap-4 p-5 px-15'>
                <Select
                    value={changeId}
                    onChange={(value) => { setChangeId(value) }}
                    options={allProject.map(project => {
                        return { value: `${project["id"]}`, label: `${project["name"]}` }
                    })}
                />

                <Button onClick={handelCancel}>Cancel</Button>
                <Button
                    disabled={changeProject?.projectId == changeId}
                    style={{ background: "red", color: "white", fontWeight: "bold" }}
                    onClick={handelTaskMove}
                    ref={moveButton}
                >
                    Move
                </Button>
            </div>
        </Modal>
    )
}

export default MoveTask