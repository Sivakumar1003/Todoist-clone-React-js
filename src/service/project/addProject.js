import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;


async function addProject(project) {
    try {
        let newProject = await axios.post(
            `${apiURL}/projects`,
            project,
            {
                headers: { Authorization: `Bearer ${apiKey}` }
            })

        return newProject["data"];
    }
    catch {
        return;
    }
}

export default addProject;