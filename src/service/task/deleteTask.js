import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;


async  function deleteTask( id ) {
    try{
        await axios.delete(`${apiURL}/tasks/${id}`, {
            headers: { Authorization: `Bearer ${apiKey}` }
        })
        return ;
    }
    catch {
       return ;
    }
}

export default deleteTask;