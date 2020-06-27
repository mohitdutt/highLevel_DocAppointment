const express = require('express');
const router = express.Router();
const slotController = require('../controller/slot');

var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
var jsonParser = app.use(bodyParser.json())

// routers for slots and events
router.get('/api/freeSlots', slotController.createFreeSlot);
router.post('/api/events', slotController.createEvents);
router.get('/api/events', slotController.getEvents);

module.exports = router;