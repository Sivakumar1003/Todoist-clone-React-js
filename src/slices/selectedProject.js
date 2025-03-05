import { createSlice } from "@reduxjs/toolkit";

const selectedProject = createSlice({
    name: "selectedProject",
    initialState: null,
    reducers: {
        addSelectedProject(_, action) {
            return action.payload;
        },
        removeSelectedProject(_, action) {
            return action.payload;
        }
    }
})

export const { addSelectedProject, removeSelectedProject} = selectedProject.actions
export default selectedProject.reducer