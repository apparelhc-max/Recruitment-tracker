const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Get Data endpoint
app.get('/api/data', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        // Initial default structure
        const initialData = { managers: [], candidates: [] };
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.send(data);
});

// Save Data endpoint
app.post('/api/data', (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.send({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});