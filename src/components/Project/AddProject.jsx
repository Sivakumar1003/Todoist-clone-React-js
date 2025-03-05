import { Button, Input, Modal, Switch } from 'antd'
import { useEffect, useRef, useState } from 'react'
import useMessage from 'antd/es/message/useMessage';
import addProject from '../../service/project/addProject';
import { useDispatch } from 'react-redux';
import { addProject as addProjectStore } from '../../slices/projectSlices';

function AddProject({ newProject, setNewProject }) {

    const [messageApi, contextHolder] = useMessage();
    const okButton = useRef();
    const [projectName, setProjectName] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (newProject) {
            okButton.current.disabled = false;
        }
    }, [newProject])

    function handelCancel() {
        setProjectName("");
        setIsFavorite(false);
        setNewProject(false);
    }

    async function handelOK() {

        okButton.current.disabled = true;
        const project = {
            name: projectName,
            is_favorite: isFavorite
        }
        try {
            let newProject = await addProject(project);
            dispatch(addProjectStore(newProject))
            messageApi.open({ type: "success", content: "Project added successfully." })
        }
        catch {
            messageApi.open({ type: "error", content: "Not able to add project." })
        }
        handelCancel()
    }

    return (
        <Modal
            open={newProject}
            title="Add projecct."
            footer={null}
        >
            {contextHolder}
            <label className='text-base font-bold'>Name</label>
            <Input
                placeholder='Project name'
                value={projectName}
                maxLength="30"
                onChange={(e) => { setProjectName(e.target.value) }}
            >
            </Input>

            <div className='flex my-5 gap-3'>
                <Switch value={isFavorite} onChange={() => setIsFavorite(pre => !pre)} />
                <p>{isFavorite ? "remove from favorite" : "Add to Favorite"}</p>
            </div>
            <div className='flex gap-3 justify-end'>
                <Button onClick={handelCancel}>Cancel</Button>
                <Button
                    onClick={handelOK} style={projectName.trim() !== "" && { background: "red", color: "white" }}
                    disabled={projectName.trim() === ""}
                    ref={okButton}
                >
                    Add Project</Button>
            </div>
        </Modal>
    )
}

export default AddProject