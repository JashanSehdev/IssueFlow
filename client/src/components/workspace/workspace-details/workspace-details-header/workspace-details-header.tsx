import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import styles from "./workspace-details-header.module.css";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";


interface WorkspaceDetailsHeaderProp {
  title: string;
  description ?: string,
  membersCount ?: number,
  issueCount ?: number
}

export default function WorkspaceDetailsHeader({
  title,
  description,
  membersCount,
  issueCount
}: WorkspaceDetailsHeaderProp) {
  return (
    <Stack className={styles.container} spacing={3}>
      <Typography className={styles.title}>{title}</Typography>
      <Typography>
            {description}
      </Typography>

      <Stack direction={'row'} >
        <ListItem disablePadding>
            <ListItemAvatar>
                <Avatar><PeopleAltOutlinedIcon/></Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary = {membersCount ?? -1}
                secondary={"Total Members"}
            />
        </ListItem>
        <ListItem disablePadding>
            <ListItemAvatar>
                <Avatar><BugReportOutlinedIcon/></Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary = {issueCount ?? -1}
                secondary={"Total Issue"}
            />
        </ListItem>
      </Stack>


    </Stack>
  );
}
        