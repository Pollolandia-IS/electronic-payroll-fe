import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Styles from '/styles/EmployeeDrawer.module.css';
import { Avatar } from "@mui/material";

const EmployeeDrawer = (props) => {

  const list = () => (
    <Box
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
      sx={{ width: "20vw",}}
    >
      <List>
        {props.projectNoContracted.map(project => (
          <ListItem key={project.name} disablePadding onClick={(e) => props.setProjectNewContract({...props.projectNewContract, id: project.cedula, name: project.name})}>
            <ListItemButton>
              <ListItemIcon>
                <Avatar variant="circular" > {(project.name).charAt(0)} </Avatar>
              </ListItemIcon>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
          <Drawer
            anchor='right'
            open={props.open}
            onClose={props.toggleDrawer(false)}
            sx={{ zIndex: 500,}}
          >
            <div>
                <h1 className={Styles.main__noContracts}>Seleccione un empleado</h1>
                {list()}
            </div>
          </Drawer>
    </div>
  );
}

export default EmployeeDrawer;