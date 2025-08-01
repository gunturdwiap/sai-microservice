const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Event Bus is running');
});

app.post('/events', (req, res) => {
    const event = req.body;
    console.log('Event received:', event);

    // axios.post(`${process.env.TRANSACTION_SERVICE_BASE_URL}/api/events`, event);
    axios.post(`${process.env.USER_SERVICE_BASE_URL}/api/events`, event);
    // axios.post(`${process.env.PRODUCT_SERVICE_BASE_URL}/api/events`, event);

    res.send({ status: 'Event Submitted' });
});

app.listen(4003, () => {
  console.log(process.env.USER_SERVICE_BASE_URL)
  console.log('Event Bus listening on port 4003');
});
