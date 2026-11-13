import { Container } from "@mui/material";
import styles from './workspace.module.css'
import WorkspaceHeader from "@/components/workspace/workspace-dashboard/header/header";
import CreatedWorkSpaces from "@/components/workspace/workspace-dashboard/created-workspace/created-workspace";

export default function Workspace () {

    return (
        <Container className={styles.container}>
            <WorkspaceHeader/>
            <CreatedWorkSpaces/>
        </Container>
    )
}