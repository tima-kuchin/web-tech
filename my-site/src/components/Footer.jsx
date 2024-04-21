import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4 }}>
      <Copyright />
    </Box>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'@Copyright by '}
      <Link color="inherit" component={RouterLink} to="/About">
        Timur Kuchin
      </Link>{' '}
      {new Date().getFullYear()}
      {' '}|{' '} 
      <Link component={RouterLink} color="inherit" to="/Formik">
          Связаться со мной
      </Link>
    </Typography>
  );
}

export default Footer;