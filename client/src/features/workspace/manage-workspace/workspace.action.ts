import { api, getErrorMessage } from "@/api/api"
import { WorkspaceInput } from "@/components/workspace/create-workspace/create-workspace-form/create-workspace-form"
import { SuccessResponse } from "@/type/meta.type"
import { Workspace } from "@/type/workspace.type"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { enqueueSnackbar } from "notistack"


export const createWorkspaceAsync = createAsyncThunk <SuccessResponse<Workspace> , WorkspaceInput>(
    'workspace/create',
    async(data, thunkApi) => {
        try {
            const response = await api.post(`workspaces`, data)
            enqueueSnackbar("Workspace created Successfully", {variant :'success'})
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error), {variant: 'error'})
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchWorkspacesAsync = createAsyncThunk <SuccessResponse<Workspace[]>>(
    'workspace/fetchwss',
    async(_, thunkApi) => {
        try {
            const response = await api.get(`workspaces`)
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error), {variant: 'error'})
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchWorkspaceAsync = createAsyncThunk <SuccessResponse<Workspace>, number>(
    'workspace/fetchWs',
    async(workspaceId, thunkApi) => {
        try {
            const response = await api.get("workspaces/" + workspaceId)
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error), {variant: 'error'})
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)