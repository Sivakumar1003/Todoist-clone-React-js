import { createSlice } from "@reduxjs/toolkit";

const projectSclice = createSlice({
    name: "project",
    initialState: null,
    reducers: {
        setInitialProject(_, action) {
            return action.payload;
        },
        addProject(state, action) {
            state.push(action.payload);
        },
        deleteProject(state, action) {
            const id = action.payload
            return state.filter(project => project["id"] !== id);
        },
        updateProject(state, action) {
            const newProject = action.payload
            return state.map(project => project["id"] === newProject["id"] ? newProject : project);
        }
    }
})

export const { setInitialProject, addProject, deleteProject, updateProject } = projectSclice.actions
export default projectSclice.reducer