const express = require('express');
const app = express();
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');
const getOSDetails = require('./routes/getOSDetails');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/OSDetails', getOSDetails);
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
