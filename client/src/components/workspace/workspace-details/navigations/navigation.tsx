import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";


export default function LabelNavigation({
    value, setValue
} : {
    value : string,
    setValue :  React.Dispatch<React.SetStateAction<string>>
 }) {;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} sx={{marginTop: '2rem'}}>
      
      <BottomNavigationAction
        label="Issues"
        value="issues"
        icon={<BugReportOutlinedIcon />}
      />
      
      <BottomNavigationAction
        label="Members"
        value="members"
        icon={<PeopleAltOutlinedIcon />}
      />
      
    </BottomNavigation>
  );
}