import api from "@/api";
import { IError, IProject, IResponse, ITask, ITaskPayload } from "@/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IProjectSlice {
  projects: IProject[];
}

interface IProjectPayload {
  title: string;
  status: string;
  members: string[];
}

const initialState: IProjectSlice = {
  projects: [],
};

const createProject = createAsyncThunk(
  "project/createProject",
  async (query: IProjectPayload, { rejectWithValue }) => {
    try {
      const res = await api.createProject<IResponse<IProject>>(query);
      return res;
    } catch (e) {
      return e;
    }
  }
);

const createProjectTask = createAsyncThunk(
  "project/createProjectTask",
  async (query: ITaskPayload, { rejectWithValue }) => {
    try {
      const res = await api.createProjectTask<IResponse<ITask>>(query);
      return res;
    } catch (e) {
      return e;
    }
  }
);

const getProjectTasks = createAsyncThunk(
  "project/getProjectTasks",
  async (query: { project_id: string }, { rejectWithValue }) => {
    try {
      const res = await api.getProjectTasks<IResponse<ITask>>(query);
      return res;
    } catch (e) {
      return e;
    }
  }
);

const getTaskDetails = createAsyncThunk(
  "project/getTaskDetails",
  async (
    query: { task_id: string; project_id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.getTaskDetails<IResponse<ITask>>(query);
      return res;
    } catch (e) {
      return e;
    }
  }
);

const updateTask = createAsyncThunk(
  "project/updateTask",
  async (
    query: { task_id: string; project_id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.updateTask<IResponse<ITask>>(query);
      return res;
    } catch (e) {
      return e;
    }
  }
);

const deleteTask = createAsyncThunk(
  "project/deleteTask",
  async (
    query: { task_id: string; project_id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.deleteTask<IResponse<ITask>>(query);
      return res;
    } catch (e) {
      return e;
    }
  }
);

const updateProject = createAsyncThunk(
  "project/updateProject",
  async (query: ITaskPayload, { rejectWithValue }) => {
    try {
      const res = await api.updateProject<IResponse<IProject>>(query);
      return res;
    } catch (e) {
      return e;
    }
  }
);

const getProjects = createAsyncThunk("project/getProjects", async () => {
  const res = await api.getProjects<IResponse<IProject[]>>();
  return res;
});

const getProjectDetails = createAsyncThunk(
  "project/getProjectDetails",
  async (id: string) => {
    const res = await api.getProjectDetails<IResponse<IProject>>({
      project_id: id,
    });
    return res;
  }
);

const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (query: { id: string }) => {
    const res = await api.deleteProject<IResponse<any>>(query);
    return res;
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
});

export const projectActions = {
  ...projectSlice.actions,
  createProject,
  getProjects,
  getProjectDetails,
  updateProject,
  deleteProject,

  createProjectTask,
  getProjectTasks,
  getTaskDetails,
  updateTask,
  deleteTask,
};
export default projectSlice.reducer;
