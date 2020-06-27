 /* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

import Slots from '../components/slots.vue';
import DisplayEvents from '../components/displayEvents.vue';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            component: Slots
        }
    ],
});