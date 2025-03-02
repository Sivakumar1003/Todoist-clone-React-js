import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;


async  function getProject() {
    try{
        let project = await axios.get(`${apiURL}/projects`, {
            headers: { Authorization: `Bearer ${apiKey}` }
        })
        return project["data"];
    }
    catch {
       return ;
    }
}

export default getProject;