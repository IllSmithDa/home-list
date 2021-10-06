const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const server = express();
const routes = require('./routes/routes');

var corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  };
server.use(express.json());
server.use(cors(corsOptions));


server.listen(process.env.PORT || port, () => {
    console.log(`server listening on port ${port}`);
});
routes(server);