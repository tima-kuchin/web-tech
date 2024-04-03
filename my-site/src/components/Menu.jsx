import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import AppIcon from './AppIcon';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';

import { ThemeContext } from '../context/ThemeContext';

function Menu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <AppIcon />
          <Box sx={{ flexGrow: 1 }} />
          <Button component={Link} to='/' color="inherit">Главная</Button>
          <Button component={Link} to='/about' color="inherit">О себе</Button>
          <ThemeContext.Consumer> 
            { ({ changeThemeOnClick }) => (
              <IconButton onClick={changeThemeOnClick}>
                <DarkModeIcon />
              </IconButton>
            ) }
          </ThemeContext.Consumer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Menu;