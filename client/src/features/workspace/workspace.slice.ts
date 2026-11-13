import { Workspace } from "@/type/workspace.type";
import { createSlice } from "@reduxjs/toolkit";
import { createWorkspaceAsync, fetchWorkspaceAsync, fetchWorkspacesAsync } from "./manage-workspace/workspace.action";

type InitialState = {
  workspaces: Workspace[];
  workspace: Workspace | null
};

const initialState: InitialState = {
  workspaces: [],
  workspace : null
};

const workspaceSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkspacesAsync.fulfilled, (state, action) => {
      state.workspaces = action.payload.data;
    })
    .addCase(createWorkspaceAsync.fulfilled, (state, action) => {
      state.workspaces.push(action.payload.data)
    })

    .addCase(fetchWorkspaceAsync.fulfilled, (state, action) => {
      state.workspace = action.payload.data
    })
  },
});

export default workspaceSlice.reducer;
