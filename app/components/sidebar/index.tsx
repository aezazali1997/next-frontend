'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import {useRouter} from 'next/navigation'

export default function Sidebar({drawer,setDrawer,role}) {
  const router = useRouter()
  const toggleDrawer = (newOpen: boolean) => () => {

    setDrawer(newOpen);
  };
  let list=['users'];
  if(role==='admin'){
    list=['users','organizations']
  }
  

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {list.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=> router.push(`/${text}`)}>
              <ListItemIcon>
                {index % 2 === 0 ? <PeopleIcon /> :<CorporateFareIcon/> }
              </ListItemIcon>
              <ListItemText primary={ text.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    
    </Box>
  );

  return (
    <div>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}