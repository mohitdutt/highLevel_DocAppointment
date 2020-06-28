const express = require('express');
const router = require('./routers');
var bodyParser = require('body-parser')
const app = express();
const port = process.env.port || 3000
const cors = require('cors');
require('./db/mongoose');
app.use(express.json());
app.use(router);
const route = express.Router();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(bodyParser.json());

// const functions = require('firebase-functions');
//  const admin = require('firebase-admin');
//  admin.initializeApp();
// console.log(1, functions.config());
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send(1, "Hello world from firebase");
// })
app.listen(port, () => {
    console.log('server is up on port' + port);
})