import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;


async function updateProject(project) {
    try {
        let updatedproject = await axios.post(
            `${apiURL}/projects/${project["id"]}`,
            project,
            {
                headers: { Authorization: `Bearer ${apiKey}` }
            }
        )
        return updatedproject["data"];
    }
    catch {
        return;
    }
}

export default updateProject;