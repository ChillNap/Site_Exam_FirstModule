//required imports
const express = require('express');
const fs = require('fs');

const app = express();

const path = require('path');
const cors = require('cors');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));


const IP = 'localhost'; // you have to change this to your static IP adress or just leave it as localhost
const PORT = '8080'; //3000 or 8080 by default, chose one of your opened ports

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// section 1
app.get('/section1', (req, res) => {
    res.render('section1');
});

// section 2
app.get('/section2', (req, res) => {
    res.render('section2');
});

//section 3
app.get('/section3', (req, res) => {
    res.render('section3');
});

//section 4
app.get('/section4', (req, res) => {
    res.render('section4');
});

//BlockedSites
app.get('/BlockedSites', (req, res) => {
    res.render('BlockedSites');
});

//BlockedSites
app.get('/section5', (req, res) => {
    res.render('section5');
});

// task
app.post('/section4', (req, res) => {
    const { X, Y, Z: userZ } = req.body;

    // Check if X and Y are provided
    if (X === undefined || Y === undefined || userZ === undefined) {
        return res.status(400).json({ error: 'X, Y, and Z values are required' });
    }

    let calculatedZ;

    // Calculate Z
    if (X > Y) {
        calculatedZ = X * Y;
    } else {
        calculatedZ = Math.log(X + Y);
    }

    // Check The if the answer is correct
    if (calculatedZ === userZ) {
        res.json({ message: 'Правильный ответ!', Z: calculatedZ });
    } else {
        res.json({ message: 'Неправильный ответ.', Z: calculatedZ });
    }
});



// blocked sites
//file proccesing
let blockedSites = [];
fs.readFile('./views/BlockedSites.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error loading blocked sites file:", err);
    } else {
        blockedSites = JSON.parse(data);
    }
});

//blocked sites proccesing
app.post('/BlockedSites', (req, res) => {
    const { site } = req.body;


    if (blockedSites.includes(site)) {
        res.json({ message: 'Данный сайт заблокирован в РФ.' });
    } else {
        res.json({ message: 'Данный сайт не заблокирован в РФ.' });
    }
});




// Start Server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${IP}:${PORT}`);
});
