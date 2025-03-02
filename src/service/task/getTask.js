import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;


async  function getTask() {
    try{
        let task = await axios.get(`${apiURL}/tasks`, {
            headers: { Authorization: `Bearer ${apiKey}` }
        })
        return task["data"];
    }
    catch {
       return ;
    }
}

export default getTask;