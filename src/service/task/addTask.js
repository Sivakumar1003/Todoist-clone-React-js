import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;

async function addTask(addTask) {
    try {
        let newTask = await axios.post(
            `${apiURL}/tasks`,
            addTask,
            {
                headers: { Authorization: `Bearer ${apiKey}` }
            }
        )

        return newTask["data"];
    }
    catch {
        return;
    }

}

export default addTask;