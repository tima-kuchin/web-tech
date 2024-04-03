import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';

import { Link } from 'react-router-dom';


function SideMenu() {
  return (
    <>
        <Drawer
            sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
                {['StateAndEffect', 'ReduxCounter', 'Лабараторная 3'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to={ '/' + text}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Drawer>
    </>
  );
}

export default SideMenu;