import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { useGetFirstFiveQuery } from '../../api/postsApi';

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

Popup.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  ).isRequired
};

export default function Req() {
  const { data: popupData, isError, error, isLoading, isFetching, isSuccess } = useGetFirstFiveQuery();
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Toolbar />
      {isLoading && <CircularProgress />}
      {isError && <Typography variant="body1">Ошибка загрузки данных: {error.message}</Typography>}
      {isSuccess && <Popup data={popupData} />}
      {isFetching && <div>Fetching more data...</div>}
    </Box>
  );
}