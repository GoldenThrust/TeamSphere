const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // Handle WebSocket connections here
  ws.on('message', (message) => {
    // Handle incoming messages from clients
    console.log(`Received: ${message}`);
  });
});

server.listen(8080, () => {
  console.log('WebSocket server listening on port 8080');
});
