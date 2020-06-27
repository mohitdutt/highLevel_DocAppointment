import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import defaultStates from './initialStates';

export default {
  namespaced: true,
  state() {
    return {
      slots: defaultStates.slotsDefaultState(),
      timeSlot: '30'
    };
  },
  getters,
  mutations,
  actions,
};
