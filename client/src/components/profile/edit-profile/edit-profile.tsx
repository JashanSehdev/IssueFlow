'use client'
import { Paper } from "@mui/material";
import styles from './edit-profile.module.css'
import EditProfileForm from "./edit-profile-form/edit-profile-form";
import { ProfileOutput } from "./edit-profile-form/edit-profile.type";

export default function EditProfileCard() {

    return(
        <Paper className={styles.container}>
            <EditProfileForm
                onSuccess={(data : ProfileOutput) => console.log(data, typeof data.age)}
            />
        </Paper>
    )
}