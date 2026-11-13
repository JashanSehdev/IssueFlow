'use client'
import AlertBox from "@/components/admin/alert/alertBox";
import { useState } from "react";
import CreateWorkSpaceForm from "./create-workspace-form/create-workspace";
import styles from './create-workspace.module.css'
import { Button } from "@mui/material";

export default function CreatedWorkSpace() {
    const [open, setOpen] = useState<boolean>(false)


    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <Button variant='contained' className={styles.button} onClick={handleOpen}>Create WorkSpace</Button>
            <AlertBox open={open} handleClose={handleClose}>
                <CreateWorkSpaceForm handleClose={handleClose}/>
            </AlertBox>
        </>
    )
}