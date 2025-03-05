import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: null,
    reducers: {
        setInitialTask(_, action) {
            return action.payload
        },
        addTask(state, action) {
            state.push(action.payload);
        },
        updateTask(state, action) {
            const newTask = action.payload;
            return state.map(task => task["id"] === newTask["id"] ? newTask : task);
        },
        deleteTask(state, action) {
            const id = action.payload;
            return state.filter(task => task["id"] !== id);
        },
        completeTask(state, action) {
            const id = action.payload;
            return state.map(task => task["id"] == id ? {...task, is_completed: true} : task)
        }
    }
})

export const { setInitialTask, addTask, updateTask, deleteTask, completeTask } = taskSlice.actions;
export default taskSlice.reducer;