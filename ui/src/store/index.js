/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import slots from './modules/slots';
import events from './modules/events';

Vue.use(Vuex);
const state = {};
// mutations
const mutations = {};

// getters
const getters = {};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    modules: {
        slots,
        events
    },
});
