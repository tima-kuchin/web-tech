import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const ButtonComponent = () => {
  const [clicks, setClicks] = React.useState(0);
  const handleClick = () => setClicks(clicks + 1);

  return (
    <>
      <Typography variant="h5">Вы нажали кнопку: {clicks} раз</Typography>
      <Button variant="contained" sx={{ my: 2 }} onClick={handleClick}>Нажми меня</Button>
    </>
  );
};

const Counter = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Typography variant="h5">Таймер: {count} сек</Typography>;
};

export default function StateAndEffect() {
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Toolbar />
      <Typography variant="h4" sx={{ mb: 2 }}>Простые примеры useState и useEffect: </Typography>
      <Divider sx={{ my: 2 }} />
      <Counter />
      <Divider sx={{ my: 2 }} />
      <ButtonComponent />
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}