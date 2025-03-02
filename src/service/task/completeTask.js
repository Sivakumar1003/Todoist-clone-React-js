import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;


async function completeTask(id) {
    try {
        await axios.post(
            `${apiURL}/tasks/${id}/close`,
            {},
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

export default completeTask;