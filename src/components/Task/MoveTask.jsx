import { Button, Modal, Select } from 'antd'
import useMessage from 'antd/es/message/useMessage';
import React, { useEffect, useState } from 'react'

function MoveTask({ changeProject, setChangeProject, projects, api, setAllTask }) {

    const [changeId, setChangeId] = useState(null);
    const [messageApi, contextHolder] = useMessage();

    useEffect(() => {
        if (changeProject) {
            setChangeId(changeProject["projectId"]);
        }
    }, [changeProject])

    const allProject = [];
    if (projects && Array.isArray(projects["results"])) {
        projects["results"].forEach(project => {
            allProject.push(project);
        });
    }

    function handelCancel() {
        setChangeProject("")
    }

    function handelChange() {

        const details = {
            content: changeProject["content"],
            description: changeProject["description"],
            due_date:changeProject?.due?.date,
            priority: changeProject["priority"],
            project_id: changeId,
        }

        api.deleteTask(changeProject["id"])
        .then(() => {
            api.addTask(details)
            .then(response => {
                setAllTask(pre => {
                    return pre.map(task => {
                        if(changeProject["id"] == task["id"]) {
                            return response 
                        } else {
                            return task
                        }
                    })
                })
                messageApi.open({type:"success", content:"successfull moved to another project."})
            })
            .catch(() => {
                messageApi.open({type:"error", content:"removed here, Not able add in new project."})
            })
        })
        .catch(() => {
            messageApi.open({type:"error", content:"Not able to remove from this project."})
        })

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
                    onClick={handelChange}
                >
                    change
                </Button>
            </div>
        </Modal>
    )
}

export default MoveTask