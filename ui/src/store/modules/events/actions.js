import createEventsService from '@/services/createEventsService';
import getEventsService from '@/services/getEventsService';

export default {
    createEvents({commit}, params) { // action for creating the events
        return new Promise(resolve => {
            createEventsService.CreateEvents(params).then(response => {
                commit('CREATE_EVENTS', response.data.result);
                resolve(response.data.result);
            }).catch(() => {
                resolve();
            });
        });
    },
    getEvents({ commit }, params) { // action for getting the events
        return new Promise(resolve => {
            getEventsService.GetEvents(params).then(response => {
                commit('GET_EVENTS', response.data.result);
                resolve(response.data.result);
            }).catch(() => {
                resolve();
            });
        });
    }
};