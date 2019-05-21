const express = require('express');
const app = express();
const server = require('http').Server(app);

//------------------------------------------------------------------------------

app.use(express.static(`${__dirname}/public`));

server.listen(5555, () => {
    console.log('Listening on port 5555...');
});