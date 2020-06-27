const Appointment = require('../models/appointment');
const config = require('../config');
const express = require('express');
const helpers = require('../service');
var moment = require('moment');

// method/logic to retrieve the available slots
const slotControllerApi = {
    async createFreeSlot(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try{
            const DocTime = await helpers.convertDocTime(req.query.date);
            const startDate = DocTime.startDate;
            const endDate = DocTime.endDate;
            const timeZone = req.query.timeZone;
            const allSlots = await helpers.intervals(startDate, endDate);
            let filteredSlots = [];
            //fetch from db
            let slot = [
                // {
                //   slot_startTime: '2020-06-27T10:00:00.000Z',
                //   slot_endTime: '2020-06-27T10:30:00.000Z',
                //   createdAt: '2020-06-27T14:12:35.662Z'
                // },
                // {
                //   slot_startTime: '2020-06-27T11:00:00.000Z',
                //   slot_endTime: '2020-06-27T12:00:00.000Z',
                //   createdAt: '2020-06-27T14:12:35.662Z'
                // }
              ]
            if(slot.length>0){
                for(i=0;i<slot.length; i++){
                    const duration =  await helpers.getTimeDifference(helpers.timeConverter(slot[i].slot_startTime.split("T")[1].split(".")[0]), helpers.timeConverter(slot[i].slot_endTime.split("T")[1].split(".")[0]));
                     index = allSlots.indexOf(slot[i].slot_startTime)
                     if(index>-1){
                         allSlots.splice(index,duration);
                     }
                 }
                 filteredSlots = [...allSlots];
            }
            filteredSlots = helpers.timeConversionAsPerTimeZone(allSlots, timeZone);
            res.status(200).send({'result': filteredSlots});
        }catch(e){
            res.status(400).send(e);
        }
    },

    // method/logic to create the events
    async createEvents(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const dateTime = new Date(req.query.slot);
        const startTime = dateTime.toISOString();
        const duration = req.query.duration;

        const numberOfSlots = Math.ceil(duration/config.duration);
        
        const endTime = dateTime.setMinutes(dateTime.getMinutes() + numberOfSlots*config.duration);
        const et = new Date(endTime);
        const f = et.toISOString();

        const allSlots = await helpers.intervals(startTime, f);
        let appointment = [];
        for(i=0; i< allSlots.length-1; i++){
            let obj = {};
            obj = {slot_startTime: allSlots[i] , slot_endTime: allSlots[i+1], createdAt: new Date().toISOString()};
            appointment.push(obj);
        }
        try{
            // save to db
            // await appointment.save();
            res.status(200).send({'result': appointment});
        }catch(e){
            res.status(400).send(e);
        }
    },

    // method/logic for retrieve the events
    async getEvents(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try{
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const timeZone = req.query.timeZone;
            // appointment.find({
            //     createdAt: {
            //         $gte: startDate, 
            //         $lt: endDate
            //     }
            // })
            //get from db
            const app = [
                {
                  slot_startTime: '2020-06-28T10:30:00.000Z',
                  slot_endTime: '2020-06-28T11:00:00.000Z',
                  createdAt: '2020-06-27T19:20:07.487Z'
                },
                {
                  slot_startTime: '2020-06-28T11:00:00.000Z',
                  slot_endTime: '2020-06-28T11:30:00.000Z',
                  createdAt: '2020-06-27T19:20:07.487Z'
                },
                {
                  slot_startTime: '2020-06-28T11:30:00.000Z',
                  slot_endTime: '2020-06-28T12:00:00.000Z',
                  createdAt: '2020-06-27T19:20:07.487Z'
                },
                {
                  slot_startTime: '2020-06-28T12:00:00.000Z',
                  slot_endTime: '2020-06-28T12:30:00.000Z',
                  createdAt: '2020-06-27T19:20:07.487Z'
                }
              ]
              const x = [];
              for(i=0; i<app.length; i++){
                x.push(app[i].slot_startTime)
                x.push(app[i].slot_endTime)
              }
             let filteredSlots = await helpers.timeConversionAsPerTimeZone(x, timeZone);
             uniqueArray = filteredSlots.filter((item, pos)=> filteredSlots.indexOf(item) == pos )
             res.status(200).send({'result': uniqueArray});
        }catch(e){
            res.status(400).send(e);
        }
    }
}
module.exports = slotControllerApi
