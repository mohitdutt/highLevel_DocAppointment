/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import slots from './modules/slots';
import events from './modules/events';
// import VueCroppie from 'vue-croppie';
// import VueBus from 'vue-bus';
// import userAuth from './modules/userAuth';
// import branding from './modules/branding';
// import company from './modules/company';
// import webTitan from './modules/webTitan';
// import router from './modules/router';
// import user from './modules/user';
// import product from './modules/product';
// import office365 from './modules/office365';
// import catalog from './modules/catalog';
// import dashboard from './modules/dashboard';
// import chart from './modules/chart';
// import cscpURL from './modules/cscpURL';
// import support from './modules/support';
// import webroot from './modules/webroot';
// import multiFactorAuthentication from './modules/multiFactorAuthentication'
// import customProduct from './modules/customProduct'

Vue.use(Vuex);
// Vue.use(VueCroppie);
// Vue.use(VueBus);

// initial state, whole reseller portal
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