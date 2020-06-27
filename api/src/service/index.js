const config = require('../config');
const moment = require('moment');

// method/logic to create intervals
intervals = (startDate, endDate) =>{
    const start = moment(startDate);
    const end = moment(endDate);
    start.minutes(Math.ceil(start.minutes() / 15) * 15);
    const result = [];
    const current = moment(start);
    while (current <= end) {
        result.push(current.toISOString());
        current.add(config.duration, 'minutes');
    }
    return result;
}

// method/logic to create time converter
timeConverter = (time24)=>{
    let ts = time24;
    const H = +ts.substr(0, 2);
    let h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;
    const ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};

// method/logic to get time difference
getTimeDifference = (startTime_a, endTime_a)=>{
    const startTime = moment(startTime_a, "HH:mm:ss a");
    const endTime = moment(endTime_a, "HH:mm:ss a");
    const duration = (moment.duration(endTime.diff(startTime)).asMinutes())/config.duration;
    return duration;
};

// method/logic to convert doctor time
convertDocTime = (date)=>{
    const m = moment(date);
    const n = moment(date);
    const startDate = m.set({hour:15,minute:30,second:0,millisecond:0});
    const endDate = n.set({hour:22,minute:30,second:0,millisecond:0});
    const Date = {startDate: startDate.toISOString(),endDate: endDate.toISOString()}
    return Date; 
};

// method/logic for time conversion as per time zone
timeConversionAsPerTimeZone = (allSlots, timeZone)=>{
    filteredDate = []
    for(i=0; i<allSlots.length; i++){
        data = new Date(allSlots[i]).toLocaleString("en-US", {timeZone: timeZone});
        filteredDate.push(data);
    }
    return filteredDate
};

module.exports = {intervals, timeConverter, getTimeDifference, convertDocTime, timeConversionAsPerTimeZone}