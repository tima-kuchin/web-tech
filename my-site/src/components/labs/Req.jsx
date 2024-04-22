import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { List, ListItem, ListItemText } from '@mui/material';



const Popup = ({ data }) => {
    return (
      <>
        <Typography variant="h5" component="h2" gutterBottom>
          Первые 5 записей
        </Typography>
        <List>
          {data.map((item, index) => (
            <ListItem key={index}>
            <ListItemText
                primary={`${item.name} - ${item.email}`}
                secondary={item.message}
            />
          </ListItem>
          ))}
        </List>
        </>
    );
};


export default function Req() {
  const [popupData, setPopupData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:5000/api/getFirstFive')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка получения данных');
        }
        return response.json();
      })
      .then(data => {
        setPopupData(data);
      })
      .catch(error => {
        console.error('Ошибка получения данных:', error);
      });
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Toolbar />
      <Button variant="contained" sx={{ my: 2 }} onClick={fetchData}>Нажми меня</Button>
      {popupData.length > 0 && <Popup data={popupData} />}
    </Box>
  );
}