
import fetchSlotsService from '@/services/fetchSlotsService';

export default {
    getFreeSlots({ commit }, params) { // action for getting the available slots
        return new Promise(resolve => {
            fetchSlotsService.getFreeSlots(params).then(response => {
                commit('SET_AVAILABLE_SLOTS', response.data.result);
                resolve(response.data.result);
            }).catch(() => {
                resolve();
            });
        });
    }
};