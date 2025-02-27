import { Modal } from 'antd'
import useMessage from 'antd/es/message/useMessage'
import React from 'react'

function DeletProject({ deleteProject, setDeleteProject, api, setProjects }) {

  const [messageApi, contextHolder] = useMessage();

  function cancelDelete() {
    setDeleteProject(null)
  }

  function confirmDelete() {
    api.deleteProject(deleteProject["id"])
      .then(() => {
        setProjects(previousData => {
          return {
            ...previousData,
            results: previousData["results"].filter(preProject => {
              return preProject["id"] !== deleteProject["id"];
            })
          }
        })
        messageApi.open({ type: "success", content: "Project deleted successfully." })
        setDeleteProject(null);
      })
      .catch(() => {
        messageApi.open({ type: "error", content: "Failed to delete project." })
      })
  }
  return (
    <Modal
      open={deleteProject}
      title="Delete Projet"
      onCancel={cancelDelete}
      onOk={confirmDelete}
    >
      {contextHolder}
      {deleteProject && <p>{`Are you sure you want to delete ${deleteProject["name"]} project.`}</p>}
    </Modal>
  )
}

export default DeletProject