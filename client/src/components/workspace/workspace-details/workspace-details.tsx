"use client";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import WorkspaceDetailsHeader from "./workspace-details-header/workspace-details-header";
import { fetchWorkspaceAsync } from "@/features/workspace/manage-workspace/workspace.action";
import LabelNavigation from "./navigations/navigation";

export default function WorkspaceDetails({
  workspaceId,
}: {
  workspaceId: number;
}) {
  const dispatch = useAppDispatch();
  const { workspace } = useAppSelector((state) => state.workspace);
   const [value, setValue] = useState('recents');
  
  useEffect(() => {
    dispatch(fetchWorkspaceAsync(workspaceId));
  }, []);

  if (!workspace) {
    return (
      <Box>
        <Typography>ERROR 404</Typography>
        <Typography> Workspace not found</Typography>
      </Box>
    );
  }
  return (
    <Container>
      <WorkspaceDetailsHeader
        title={workspace.title}
        description={workspace.description}
        issueCount={workspace.total_issues}
        membersCount={workspace.total_members}
      />
      <LabelNavigation value={value} setValue={setValue}/>
    </Container>
  );
}
