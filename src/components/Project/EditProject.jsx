import { Button, Modal, Switch } from 'antd'
import useMessage from 'antd/es/message/useMessage';
import React, { useEffect, useState } from 'react'

function EditProject({ editProject, setEditProjecct, api, setProjects }) {
    const [projectName, setProjectName] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [messageApi, contextHolder] = useMessage();

    useEffect(() => {
        if (editProject) {
            setProjectName(editProject["name"]);
            setIsFavorite(editProject["isFavorite"]);
        }
    }, [editProject]);


    function handelOK() {
        api.updateProject(editProject["id"], { name: `${projectName}`, is_favorite: isFavorite })
            .then((response) => {
                setProjects((prevData) => {
                    return {
                        ...prevData,
                        results: prevData["results"].map(project => {
                            if(project["id"] == editProject["id"]) {
                                return response;
                            }else {
                                return project;
                            }
                        })
                    }
                })

                setEditProjecct("")

                messageApi.open({type:"success", content:"Successfull changed name."})
            })
            .catch(() => {
                messageApi.open({ type: "error", content: "Not able to edit name." })
            })
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
                >
                    Edit Name
                </Button>
            </div>
        </Modal>
    )
}

export default EditProject