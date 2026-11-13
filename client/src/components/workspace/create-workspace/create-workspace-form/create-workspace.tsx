"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { WorkspaceInput, workspaceSchema } from "./create-workspace-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import ControlField from "@/components/form/controller-field/control-field";
import styles from "./create-workspace.module.css";
import { useAppDispatch } from "@/features/store";
import { createWorkspaceAsync } from "@/features/workspace/manage-workspace/workspace.action";

export default function CreateWorkSpaceForm({
  handleClose,
}: {
  handleClose: () => void;
}) {

  const dispatch = useAppDispatch()
  const { control, handleSubmit } = useForm<WorkspaceInput>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
        title:""
    }
  });

  const onSubmit: SubmitHandler<WorkspaceInput> = (data) => {
    console.log(data);
    dispatch(createWorkspaceAsync(data))
    handleClose();
  };
  return (
    <Card>
      <CardHeader title="Create Workspace" className={styles.title} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box>
              <ControlField
                name="title"
                control={control}
                placeholder="New Project"
                label="Workspace Name"
              />
            </Box>

            <Box>
              <ControlField
                name="description"
                control={control}
                placeholder="New Project"
                label="Description"
                multiline
                rows={4}
              />
            </Box>
          </Stack>

          <Stack direction={"row"} spacing={2} className={styles.buttons}>
            <Button variant="contained" type="submit" size="large" className={styles.button}>
              Create Workspace
            </Button>
            <Button
              variant="outlined"
              size="large"
              className={styles.button}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
