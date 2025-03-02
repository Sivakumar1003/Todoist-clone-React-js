import { Button, Modal } from 'antd'
import useMessage from 'antd/es/message/useMessage'
import { useEffect, useRef } from 'react'
import deleteProject from '../../service/project/deleteProject';

function DeletProject({ SelectedDeleteProject, setDeleteProject, setProjects }) {

  const [messageApi, contextHolder] = useMessage();
  const deleteButton = useRef();

  useEffect(() => {
    if (SelectedDeleteProject) {
      deleteButton.current.disabled = false;

    }
  }, [SelectedDeleteProject])

  function cancelDelete() {
    setDeleteProject(null)
  }

  async function confirmDelete() {
    deleteButton.current.disabled = true;
    try {
      await deleteProject((SelectedDeleteProject["id"]));
      setProjects(previousProjeccts => previousProjeccts.filter(project => project["id"] !== SelectedDeleteProject["id"]));
      messageApi.open({ type: "success", content: "Project deleted successfully." })
    }
    catch {
      messageApi.open({ type: "error", content: "Failed to delete project." })
    }
    cancelDelete();
  }
  return (
    <Modal
      open={SelectedDeleteProject}
      title="Delete Projet"
      footer={null}
    >
      {contextHolder}
      {SelectedDeleteProject && <p>{`Are you sure you want to delete ${SelectedDeleteProject["name"]} project.`}</p>}
      <div className='m-5 flex justify-end gap-5'>
        <Button onClick={cancelDelete}>Cancel</Button>
        <Button
          style={{ color: "white", background: "red" }}
          onClick={confirmDelete}
          ref={deleteButton}
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}

export default DeletProject