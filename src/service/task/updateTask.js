import axios from "axios";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY;
const apiURL = import.meta.env.VITE_TODOIST_API_URL;

async function updateTask ( task, id ) {
    try{
        let newTask = await axios.post(
            `${apiURL}/tasks/${id}`,
            task,
            {
                headers: { Authorization: `Bearer ${apiKey}`}
            }
        )

        return newTask["data"];
    }
    catch(err) {
        console.log(err);
        return;
    }
}

export default updateTask;