const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { WebcastPushConnection } = require('tiktok-live-connector');

const PORT = process.env.PORT || 3000;

// صفحة بسيطة للتأكد إن السيرفر شغال
app.get('/', (req, res) => {
  res.send('TikTok Parkour Server is Running!');
});

// صفحة اللعبة تسأل منها عن الأوامر
let latestAction = "none";
app.get('/get-action', (req, res) => {
    res.send(latestAction);
    latestAction = "none"; // تصفير الأمر بعد قراءته
});

// هنا تحط اسم حسابك في تيك توك
const tiktokUsername = "m_5_b_n_l"; 

let tiktokConnection = new WebcastPushConnection(tiktokUsername);

// استقبال الهدايا
tiktokConnection.on('gift', data => {
  console.log(`Gift received: ${data.giftName}`);
  
  // الوردة ترفع
  if (data.giftName === "Rose" || data.giftName === "الوردة") {
    latestAction = "up";
  } 
  // التيك توك ينزل
  else if (data.giftName === "TikTok" || data.giftName === "TikTok Logo") {
    latestAction = "down";
  }
});

// تشغيل الاتصال
tiktokConnection.connect().then(state => {
  console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
  console.error('Failed to connect', err);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
