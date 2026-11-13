'use client'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import styles from "./workspace-card.module.css";
import { Workspace } from "@/type/workspace.type";
import { useRouter } from "next/navigation";

interface WorkspaceCardProp {
  workspace : Workspace,
}
export default function WorkspaceCard({
  workspace
}: WorkspaceCardProp) {

  const router = useRouter()
  return (
    <Card className={styles.card}>
      <CardActionArea onClick={()=>router.push("/workspace/"+workspace.id)}>
      <CardHeader
        title={workspace.title}
        subheader={workspace.description}
        sx={{
          width: "100%",
          "& .MuiCardHeader-content": {
            minWidth: 0,
            overflow: "hidden",
          },
          "& .MuiCardHeader-subheader": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      />
      <CardContent>
        <CardActions>
          <Chip clickable avatar={<PeopleAltOutlinedIcon />} label={workspace.total_members} />

          <Chip clickable avatar={<BugReportOutlinedIcon />} label={workspace.total_issues} />
        </CardActions>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
