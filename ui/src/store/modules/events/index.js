import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import defaultStates from './initialStates';

export default {
  namespaced: true,
  state() {
    return {
      events: defaultStates.eventsDefaultState(),
    };
  },
  getters,
  mutations,
  actions,
};
