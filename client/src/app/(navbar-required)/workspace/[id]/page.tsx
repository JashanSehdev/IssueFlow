import { Container } from "@mui/material";
import styles from "./workspace.module.css";
import WorkspaceDetails from "@/components/workspace/workspace-details/workspace-details";

export default async function WorkspaceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <WorkspaceDetails workspaceId={Number(id)} />;
}
