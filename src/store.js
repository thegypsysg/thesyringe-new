// store.js
// import { createStore } from "vuex";
import { createStore } from 'vuex';

export default createStore({
  state: {
    activeTag: null, // Tag yang aktif
    itemSelected: 'Singapore',
    itemSelectedComplete: {
      id: 1,
      oneCity: true,
    },
    itemSelected2: '---Select City---',
    itemSelected2Complete: null,
    detailHeader: {
      title: '',
      logo: '',
      partner: '',
      website: '',
    },
  },
  mutations: {
    setActiveTag(state, tag) {
      state.activeTag = tag; // Memperbarui tag yang aktif
    },
    setItemSelected(state, item) {
      state.itemSelected = item; // Memperbarui tag yang aktif
    },
    setItemSelectedComplete(state, item) {
      state.itemSelectedComplete = item; // Memperbarui tag yang aktif
    },
    setItemSelected2(state, item) {
      state.itemSelected2 = item; // Memperbarui tag yang aktif
    },
    setItemSelected2Complete(state, item) {
      state.itemSelected2Complete = item; // Memperbarui tag yang aktif
    },
    setDetailHeader(state, data) {
      state.detailHeader = { ...data };
    },
  },
});
