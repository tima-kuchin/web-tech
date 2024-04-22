const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());


const dataFilePath = path.join(__dirname, '../../public/tableData.json');

app.post('/api/saveFeedback', (req, res) => {
  try {
    const existingData = JSON.parse(fs.readFileSync(dataFilePath));

    existingData.push(req.body);

    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка сохранения данных:', error);
    res.status(500).json({ error: 'Ошибка сохранения данных' });
  }
});

app.get('/api/getFirstFive', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath));

    res.status(200).json(data.slice(0, 5));
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    res.status(500).json({ error: 'Ошибка получения данных' });
  }
});


app.delete('/api/deleteRecord/:index', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath));

    const indexToDelete = parseInt(req.params.index);

    if (isNaN(indexToDelete)) {
      res.status(400).json({ error: 'Неверный номер записи' });
      return;
    }

    if (indexToDelete < 0 || indexToDelete >= data.length) {
      res.status(404).json({ error: 'Запись не найдена' });
      return;
    }

    data.splice(indexToDelete, 1);

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления записи:', error);
    res.status(500).json({ error: 'Ошибка удаления записи' });
  }
});

app.put('/api/updateRecord/:index', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath));

    const indexToUpdate = parseInt(req.params.index);

    if (isNaN(indexToUpdate)) {
      res.status(400).json({ error: 'Неверный номер записи' });
      return;
    }

    if (indexToUpdate < 0 || indexToUpdate >= data.length) {
      res.status(404).json({ error: 'Запись не найдена' });
      return;
    }

    const newData = req.body;

    data[indexToUpdate] = newData;

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка обновления записи:', error);
    res.status(500).json({ error: 'Ошибка обновления записи' });
  }
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});