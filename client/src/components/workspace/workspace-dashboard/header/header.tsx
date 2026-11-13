import { Button, Stack, Typography } from "@mui/material";
import styles from './header.module.css'
import CreatedWorkSpace from "../../create-workspace/create-workspace";

export default function WorkspaceHeader  () {

    return (
        <Stack direction={'row'} className={styles.container}>
            <Typography className={styles.title}>
                MY WORKSPACE
            </Typography>
            <CreatedWorkSpace/>

        </Stack>
    )
}