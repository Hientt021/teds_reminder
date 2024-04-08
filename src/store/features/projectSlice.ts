import api from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IProjectSlice {
  projects: IProject[];
}

interface IProject {
  title: string;
  _id: string;
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
    const res = await api.createProject<IProject>(query);
    return res;
  }
);

const getProjects = createAsyncThunk("project/getProjects", async () => {
  const res = await api.getProjects<IProject[]>();
  return res;
});

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
});

export const projectActions = {
  ...projectSlice.actions,
  createProject,
  getProjects,
};
export default projectSlice.reducer;
