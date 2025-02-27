import { Button, Modal, Switch } from 'antd'
import React, { useContext, useState } from 'react'
import { dataContext } from '../../App';
import useMessage from 'antd/es/message/useMessage';

function AddProject({ newProject, setNewProject }) {

    const { api, setProjects } = useContext(dataContext);
    const [messageApi, contextHolder] = useMessage();
    const [isFavorite, setIsFavorite] = useState(false);
    const [projectName, setProjectName] = useState("");

    function handelCancel() {
        setProjectName("");
        setIsFavorite(false);
        setNewProject(false);
    }

    function handelOK() {
        api.addProject({ name:`${projectName}`, is_favorite:isFavorite})
            .then((response) => {
                setProjects(previousProject  => {
                    return {
                        ...previousProject, 
                        results: [...previousProject["results"], response]
                    };
                })
                handelCancel();
                messageApi.open({type:"success", content:"Project added successfully."})
            })
            .catch(() => {
                messageApi.open({type:"error", content:"Not able to add project."})
            })
    }

    return (
        <Modal
            open={newProject}
            title="Add projecct."
            footer={null}
        >
            {contextHolder}
            <label className='text-base font-bold'>Name</label>
            <input
                className='border border-gray-400 text-base p-2 w-full mt-1 h-[35px] focus:outline-none'
                placeholder='Project name'
                value={projectName}
                onChange={(e) => { setProjectName(e.target.value) }}
            ></input>

            <div className='flex my-5 gap-3'>
                <Switch value={isFavorite} onChange={() => { setIsFavorite(pre => !pre) }} />
                <p>{isFavorite ? "remove from favorite" : "Add to Favorite"}</p>
            </div>
            <div className='flex gap-3 justify-end'>
                <Button onClick={handelCancel}>Cancel</Button>
                <Button onClick={handelOK} style={projectName.trim() !== "" && { background: "red", color: "white" }} disabled={projectName.trim() === ""}>Add Project</Button>
            </div>
        </Modal>
    )
}

export default AddProject