import axios from 'axios';
import Config from '../config/dev.app.config';

export default {
    GetEvents(params) {
        return axios.get(`${Config.apiUrl}events?startDate=${params.startDate}&endDate=${params.endDate}&timeZone=${params.timeZone}`);
    }
};