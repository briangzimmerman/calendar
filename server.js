const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//------------------------------------------------------------------------------

app.use(express.static(`${__dirname}/public`));

server.listen(5555, () => {
    console.log('Listening on port 5555...');
});

//------------------------------------------------------------------------------

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('events', getEvents());
});

//------------------------------------------------------------------------------

function getEvents() {
    
}