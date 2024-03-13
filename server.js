// let express = require('express');
// let app = express();
// app.use(express.static(__dirname + '/dist/login-app'));

// app.get('/*', (req, res) => {
//     res.sendFile(__dirname + '/dist/login-app/index.html' );
// });

// app.listen(process.env.PORT || 8080);



const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve Angular app
app.use(express.static(path.join(__dirname, '/dist/login-app')));

// Serve API data from db.json
app.get('/api/users', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData.user);
    });
});

// Catch all other routes and serve Angular app
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/login-app/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
