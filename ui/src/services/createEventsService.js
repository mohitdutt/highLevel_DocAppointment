import axios from 'axios';
import Config from '../config/dev.app.config';

export default {
    CreateEvents(params) {
        return axios.post(`${Config.apiUrl}events?slot=${params.slot}&duration=${params.duration}`);
    }
};