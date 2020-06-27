const mongoose = require('mongoose');
// const validator = require('validator');

const SlotSchema = new mongoose.Schema({
    slot_startTime: Date,
    slot_endTime: Date,
    createdAt: Date
});


const Slots = mongoose.model('SlotSchema', SlotSchema);
module.exports = Slots