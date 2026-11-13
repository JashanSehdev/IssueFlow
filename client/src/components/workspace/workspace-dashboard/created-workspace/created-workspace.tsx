'use client'
import { Stack, Typography } from "@mui/material";
import WorkspaceCard from "../workspace-card/workspace-card";
import styles from './created-workspace.module.css'
import { useAppDispatch, useAppSelector } from "@/features/store";
import { useEffect } from "react";
import { fetchWorkspacesAsync } from "@/features/workspace/manage-workspace/workspace.action";

export default function CreatedWorkSpaces() {
  const {workspaces} = useAppSelector((state) => state.workspace)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchWorkspacesAsync())
  },[dispatch])
  return (
    <Stack spacing={2}>
        <Typography className={styles.title}>
            CREATED BY YOU
        </Typography>
      <Stack direction={"row"} spacing={'1rem'}>
        {
          workspaces.map((ws) => (
            <WorkspaceCard key={ws.id} workspace={ws} />
          ))
        }
        
      </Stack>
    </Stack>
  );
}
