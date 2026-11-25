const express = require('express');
const app = express();
const TEST_PORT = 8000;

app.get('/', (req, res) => {
    res.send('Success: Express is working on port 3000!');
});

app.listen(TEST_PORT, () => {
    console.log(`Test server running on http://localhost:${TEST_PORT}`);
});