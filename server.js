const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const config = require('./config.json');
const calendar = require('./modules/calendar');

//------------------------------------------------------------------------------

app.use(express.static(`${__dirname}/public`));

server.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`);
});

//------------------------------------------------------------------------------

io.on('connection', (socket) => {
    console.log('User connected');

    emitEvents(socket);
});

//------------------------------------------------------------------------------

function emitEvents(socket) {
    calendar.getEvents(config.calendars)
    .then((events) => {
        socket.emit('events', events);
    })
    .catch((err) => console.log(err));
}