const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 80;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
    try {
        const response = await fetch('http://backend-service:3000/');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.post('/api/add-person', async (req, res) => {
    try {
        const response = await fetch('http://backend-service:3000/add-person', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error sending data:', error);
        res.status(500).send('Error sending data');
    }
});

app.delete('/api/delete-people', async (req, res) => {
    try {
        const response = await fetch('http://backend-service:3000/delete-people', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data');
    }
});

app.listen(port, () => {
    console.log(`Frontend server running on port ${port}`);
});
