const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('✅ TikTok Webhook Server is Running!');
});

app.get('/get-action', (req, res) => {
    // هذا الجزء نرجعله بعدين عشان الهدايا
    res.send('none');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
