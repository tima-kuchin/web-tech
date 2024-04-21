import React from 'react';
import { AppBar, Toolbar, Button, Box, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

import AppIcon from './AppIcon';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';

import { ThemeContext } from '../context/ThemeContext';

import SideMenu from './SideMenu';
import MenuIcon from '@mui/icons-material/Menu';

function Menu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ ...(open)}}
          >
            <MenuIcon />
          </IconButton>
          <AppIcon />
          <Button component={Link} to='/' color="inherit" sx={{mr: 2}}>Главная</Button>
          <Button component={Link} to='/about' color="inherit" sx={{mr: 2}}>О себе</Button>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeContext.Consumer> 
            {({ changeThemeOnClick }) => (
              <IconButton onClick={changeThemeOnClick}>
                <DarkModeIcon />
              </IconButton>
            )}
          </ThemeContext.Consumer>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <SideMenu onClose={toggleDrawer(false)} />
      </Drawer>
    </Box>
  );
}

export default Menu;