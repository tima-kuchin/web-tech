// server.js
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const PORT = 3001;

const dataFilePath = 'data.csv';

app.use(express.json());

app.get('/api/data', (req, res) => {
  const data = [];
  fs.createReadStream(dataFilePath)
    .pipe(csv())
    .on('data', row => {
      data.push(row);
    })
    .on('end', () => {
      res.json(data);
    });
});

app.post('/api/data', (req, res) => {
  const newData = req.body;
  const csvWriter = createObjectCsvWriter({
    path: dataFilePath,
    header: newData.length === 1 ? Object.keys(newData[0]) : undefined,
    append: true,
  });
  csvWriter.writeRecords(newData).then(() => {
    res.sendStatus(201);
  });
});

app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  // Implement updating data with id
  res.sendStatus(200);
});

app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  // Implement deleting data with id
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});