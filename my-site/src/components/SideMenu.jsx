import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


function SideMenu({ toggleDrawer }) {
    const handleCloseDrawer = () => {
      toggleDrawer(false);
    };
  
    return (
      <Box sx={{ width: 250,  marginTop: '64px'}} role="presentation">
        <List>
          {['StateAndEffect', 'ReduxCounter', 'Formik', 'ReactTable', 'Req'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={'/' + text} onClick={handleCloseDrawer}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  SideMenu.propTypes = {
    toggleDrawer: PropTypes.func.isRequired
  };
  
export default SideMenu;