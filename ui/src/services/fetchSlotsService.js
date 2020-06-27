import axios from 'axios';
import Config from '../config/dev.app.config';
export default {
    getFreeSlots(params) {
        return axios.get(`${Config.apiUrl}freeSlots?date=${params.date}&timeZone=${params.timeZone}`);
    }
};