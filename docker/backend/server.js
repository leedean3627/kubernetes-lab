const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'mysql-service',
    user: 'root',
    password: 'password123$',
    database: 'mydatabase'
});

connection.connect();

app.get('/', (req, res) => {
    connection.query('SELECT * FROM people', (err, results) => {
        if (err) {
            console.error('Error occurred:', err);
            return res.status(500).json({ error: 'Error fetching data' });
        }
        res.json(results);
    });
});

app.post('/add-person', (req, res) => {
    const { name, age } = req.body;
    
    if (!name || !age) {
        return res.status(400).json({ error: 'Missing name or age' });
    }

    const query = 'INSERT INTO people (name, age) VALUES (?, ?)';
    connection.query(query, [name, age], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error adding person' });
        }
        res.status(201).json({ message: 'Person added successfully' });
    });
});

app.delete('/delete-people', (req, res) => {
    const ids = req.body.ids;

    const query = 'DELETE FROM people WHERE id IN (?)';
    connection.query(query, [ids], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting people' });
        }
        res.status(200).json({ message: 'People deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
