const express = require('express');
require('./db/mongoose');
const router = require('./routers');
var bodyParser = require('body-parser')
const app = express();
const port = process.env.port || 3000
const cors = require('cors');
app.use(express.json());
app.use(router);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log('server is up on port' + port);
})