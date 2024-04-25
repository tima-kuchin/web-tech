import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table'; 
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, TextField } from '@mui/material';


const TableComponent = () => {

  function isMobileDevice() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    return mediaQuery.matches;
  } 

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', 
        header: '#',
        enablePinning: false,
        enableColumnOrdering: false,
        size: 100,
      }, 
      {
        accessorKey: 'name', 
        header: 'Имя',
        enablePinning: false,
        enableColumnOrdering: false,
        size: 100,
      }, 
      {
        accessorKey: 'email',
        header: 'Email',
        enablePinning: false,
        size: 100,
      },
      {
        accessorKey: 'message',
        header: 'Сообщение',
        enablePinning: false,
        size: 400,
      },
    ],
    [],
  );

  const [reloadData, setReloadData] = useState(true);

  const rowVirtualizerInstanceRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/tableData.json');
        const jsonData = await response.json();

         const dataWithIds = jsonData.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
        setData(dataWithIds);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
  
    if (reloadData) {
      fetchData();
      setReloadData(false); 
    }
  }, [reloadData]); 

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableSorting: true,
    enableStickyHeader: true,
    enableColumnPinning: true,
    initialState: isMobileDevice() ? { columnPinning: { left: ['name'] } } : {},
    enableColumnOrdering: true,
    isMultiSortEvent: () => true,
    maxMultiSortColCount: 3, 
    renderTopToolbarCustomActions: ({ table }) => (
      <Button onClick={() => table.resetSorting(true)}>
        Очистить сортировку
      </Button >
    ),
    enableBottomToolbar: false,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: '400px' } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef, 
    rowVirtualizerOptions: { overscan: 5 },
  });

  const [tableKey, setTableKey] = useState(0);

  const [deleteFormTrue, setDeleteFormTrue] = useState(false);
  const [editFormTrue, setEditFormTrue] = useState(false);

  const [recordIndexToDelete, setRecordIndexToDelete] = useState('');
  const [editRecordIndex, setEditRecordIndex] = useState('');

  const [editFormData, setEditFormData] = useState({});

  const handleDeleteButtonClick = () => {
    setEditFormTrue(false);
    setDeleteFormTrue(true);
  };

  const handleEditButtonClick = () => {
    setDeleteFormTrue(false);
    setEditFormTrue(true);
  };
  
  const handleUpdateRecord = (index, newData, setIndex, setEdit, prevKey, setKey, reload) => {
    return fetch(`http://localhost:5000/api/updateRecord/${index - 1}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка обновления записи');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Запись успешно обновлена:', data);
        setEdit({});
        setIndex('');
        setKey(prevKey + 1);
        reload(true);
        alert('Обновление успешно');
        return data;
      })
      .catch((error) => {
        console.error('Ошибка обновления записи:', error);
        throw error;
      });
  };

  const handleDeleteRecord = (recordIndexToDelete, setRecordIndexToDelete, prevKey, setKey, reload) => {
    fetch(`http://localhost:5000/api/deleteRecord/${recordIndexToDelete - 1}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка удаления записи');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Запись успешно удалена:', data);
      setRecordIndexToDelete('');
      setKey(prevKey + 1);
      reload(true);
      alert('Удаление успешно');
      return data;
    })
    .catch((error) => {
      console.error('Ошибка удаления записи:', error);
    });
  };


  return(
    <Box>
      <Toolbar />
      <MaterialReactTable key={tableKey} table={table} />
      <Button variant="contained" sx={{ m: 2 }} onClick={handleEditButtonClick}>
        Редактировать запись по номеру
      </Button> 
      <Button variant="contained" sx={{ m: 2 }} onClick={handleDeleteButtonClick}>
        Удалить запись по номеру
      </Button>

      { deleteFormTrue && (
        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2, maxWidth: 200}}>
          <TextField
            label="Номер записи"
            type="number"
            value={recordIndexToDelete}
            onChange={(e) => setRecordIndexToDelete(parseInt(e.target.value))}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={() => handleDeleteRecord(recordIndexToDelete, setRecordIndexToDelete, tableKey, setTableKey, setReloadData)}
          >
            Удалить
          </Button>
        </Box>
      )}

      { editFormTrue && (
        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2, maxWidth: 1200 }}>
            <TextField
              label="Номер записи для редактирования"
              type="number"
              value={editRecordIndex}
              onChange={(e) => setEditRecordIndex(parseInt(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Имя"
              name="name"
              value={editFormData.name || ''}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={editFormData.email || ''}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Сообщение"
              name="message"
              value={editFormData.message || ''}
              onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={() => handleUpdateRecord(editRecordIndex, editFormData, setEditRecordIndex, setEditFormData, tableKey, setTableKey, setReloadData)}>
              Обновить
            </Button>
          </Box>
      )}
    </Box>
  );
};

export default TableComponent;
