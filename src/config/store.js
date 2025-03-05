import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../slices/projectSlices"
import taskReducer from "../slices/taskSlices"
import selectedProjectReducer from "../slices/selectedProject"

export const store = configureStore({
    devTools: true,
    reducer: {
        projects: projectReducer,
        task: taskReducer,
        selectedProject: selectedProjectReducer,
    }
})