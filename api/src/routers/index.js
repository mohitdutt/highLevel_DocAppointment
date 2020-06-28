const express = require('express');
const router = express.Router();
const slotController = require('../controller/slot');

var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
var jsonParser = app.use(bodyParser.json())

// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// const serviceAcc = require('../keyFile.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAcc)
// })
// const db = admin.firestore();
// const userCollection = db.collection('users');

// routers for slots and events

router.get('/api/freeSlots', slotController.createFreeSlot);
router.post('/api/events', slotController.createEvents);
router.get('/api/events', slotController.getEvents);

module.exports = router;