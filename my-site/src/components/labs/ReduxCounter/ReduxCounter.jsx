import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function ReduxCounter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

 return (
  <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Toolbar />
      <Typography variant="h5" sx={{ ml: 2 }}>Счетчик: {count}</Typography>
      <Button variant="contained" sx={{ m: 2 }} onClick={handleIncrement}>+</Button>
      <Button variant="contained" sx={{ m: 2 }} onClick={handleDecrement}>-</Button>
      <Divider sx={{ my: 2 }} />
  </Box>
);
}

export default ReduxCounter;