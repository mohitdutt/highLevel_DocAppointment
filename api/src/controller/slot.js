const Appointment = require('../models/appointment');
const config = require('../config');
const express = require('express');
const helpers = require('../service');
var moment = require('moment');
const appointmentDb = require('../models/appointment');

// method/logic to retrieve the available slots
const slotControllerApi = {
    async createFreeSlot(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const DocTime = await helpers.convertDocTime(req.query.date);
            const startDate = DocTime.startDate;
            const endDate = DocTime.endDate;
            const timeZone = req.query.timeZone;
            const allSlots = await helpers.intervals(startDate, endDate);
            var filteredSlots = [];
            //fetch from db
            console.log(3, allSlots)
            appointmentDb.find(async(err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            const duration = await helpers.getTimeDifference(helpers.timeConverter(("0" + data[i].slot_startTime.getUTCHours()).slice(-2) + ':' + ("0" + data[i].slot_startTime.getUTCMinutes()).slice(-2) + ':' + ("0" + data[i].slot_startTime.getUTCSeconds()).slice(-2)), helpers.timeConverter(("0" + data[i].slot_endTime.getUTCHours()).slice(-2) + ':' + ("0" + data[i].slot_endTime.getUTCMinutes()).slice(-2) + ':' + ("0" + data[i].slot_endTime.getUTCSeconds()).slice(-2)));
                            const d = (Number(("0" + data[i].slot_startTime.getUTCMonth()).slice(-2))) + 1
                            let checkIndex = data[i].slot_startTime.getUTCFullYear() + '-' + ("0" + d).slice(-2) + '-' + ("0" + data[i].slot_startTime.getUTCDate()).slice(-2) + 'T' + ("0" + data[i].slot_startTime.getUTCHours()).slice(-2) + ':' + ("0" + data[i].slot_startTime.getUTCMinutes()).slice(-2) + ':' + ("0" + data[i].slot_startTime.getUTCSeconds()).slice(-2) + '.000Z'
                            index = allSlots.indexOf(checkIndex)
                            if (index > -1) {
                                allSlots.splice(index, duration);
                            }
                            console.log(5, checkIndex)
                        }
                        filteredSlots = helpers.timeConversionAsPerTimeZone([...allSlots], timeZone);

                        res.status(200).send({ 'result': filteredSlots });
                    } else {
                        filteredSlots = helpers.timeConversionAsPerTimeZone(allSlots, timeZone);
                        res.status(200).send({ 'result': filteredSlots });
                    }
                }
            })
        } catch (e) {
            res.status(400).send(e);
        }
    },

    // method/logic to create the events
    async createEvents(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const dateTime = new Date(req.query.slot);
        const startTime = dateTime.toISOString();
        const duration = req.query.duration;

        const numberOfSlots = Math.ceil(duration / config.duration);

        const endTime = dateTime.setMinutes(dateTime.getMinutes() + numberOfSlots * config.duration);
        const et = new Date(endTime);
        const f = et.toISOString();

        const allSlots = await helpers.intervals(startTime, f);
        let appointment = [];
        for (i = 0; i < allSlots.length - 1; i++) {
            let obj = {};
            obj = { slot_startTime: allSlots[i], slot_endTime: allSlots[i + 1], createdAt: new Date().toISOString() };
            appointment.push(obj);
        }
        console.log(1, appointment)
        appointmentDb.find(async(err, data) => {
            if (err) {
                console.log(err)
            } else {
                if (data.length > 0) {
                    console.log(2, data)
                }
            }
        })
        try {
            // save to db
            const createEvent = await appointmentDb.insertMany(appointment, (err, ap) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send({ 'result': ap });
                }
            });

        } catch (e) {
            res.status(400).send(e);
        }
    },

    // method/logic for retrieve the events
    async getEvents(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const timeZone = req.query.timeZone;
            const app = await appointmentDb.find({ $and: [{ slot_startTime: { $lte: endDate } }, { slot_endTime: { $gte: startDate } }] })
            const x = [];
            for (i = 0; i < app.length - 1; i++) {
                x.push(app[i].slot_startTime)
                x.push(app[i].slot_endTime)
            }
            let filteredSlots = await helpers.timeConversionAsPerTimeZone(x, timeZone);
            uniqueArray = filteredSlots.filter((item, pos) => filteredSlots.indexOf(item) == pos)
            res.status(200).send({ 'result': uniqueArray });
        } catch (e) {
            res.status(400).send(e);
        }
    }
}
module.exports = slotControllerApi