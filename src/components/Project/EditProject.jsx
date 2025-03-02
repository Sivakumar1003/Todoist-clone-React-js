import { Button, Modal, Switch } from 'antd'
import useMessage from 'antd/es/message/useMessage';
import { useEffect, useRef, useState } from 'react'
import updateProject from '../../service/project/updateProject';

function EditProject({ editProject, setEditProjecct, setProjects }) {
    const [projectName, setProjectName] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [messageApi, contextHolder] = useMessage();
    const editButton = useRef();

    useEffect(() => {
        if (editProject) {
            setProjectName(editProject["name"]);
            setIsFavorite(editProject["is_favorite"]);
            editButton.current.disabled = false;
        }
    }, [editProject]);


    async function handelOK() {

        try {
            editButton.current.disabled = true;
            let updatedProject = await updateProject({ ...editProject, name: `${projectName}`, is_favorite: isFavorite });
            setProjects(previousProjects => previousProjects.map(project => project["id"] == editProject["id"] ? updatedProject : project ))
            messageApi.open({ type: "success", content: "Successfull changed name." })
        }
        catch {
            messageApi.open({ type: "error", content: "Not able to edit name." })
        }
        setEditProjecct("");
        setProjectName("");
    }
    return (
        <Modal
            open={editProject}
            footer={null}
        >

            {contextHolder}
            <input
                value={projectName}
                className='border border-gray-400 text-base p-2 w-full mt-5 h-[35px] focus:outline-none'
                onChange={(e) => { setProjectName(e.target.value) }}
            />

            <div className='flex my-5 gap-3'>
                <Switch value={isFavorite} onChange={() => { setIsFavorite(pre => !pre) }} />
                <p>{isFavorite ? "remove from favorite" : "Add to Favorite"}</p>
            </div>
            <div className='flex gap-3 justify-end'>
                <Button onClick={() => { setEditProjecct("") }}>Cancel</Button>
                <Button
                    onClick={handelOK}
                    style={{ background: "red", color: "white" }}
                    disabled={projectName.trim() === "" || (editProject?.name == projectName && editProject?.isFavorite == isFavorite)}
                    ref={editButton}
                >
                    Edit Name
                </Button>
            </div>
        </Modal>
    )
}

export default EditProject