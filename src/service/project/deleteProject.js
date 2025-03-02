import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;


async function deleteProject(id) {
    try {
        await axios.delete(
            `${apiURL}/projects/${id}`,
            {
                headers: { Authorization: `Bearer ${apiKey}` }
            }
        )
        return;
    }
    catch {
        return;
    }
}

export default deleteProject;