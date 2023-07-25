// store.js
// import { createStore } from "vuex";
import { createStore } from 'vuex';

export default createStore({
  state: {
    activeTag: null, // Tag yang aktif
    itemSelected: 'Singapore',
    detailHeader: '',
  },
  mutations: {
    setActiveTag(state, tag) {
      state.activeTag = tag; // Memperbarui tag yang aktif
    },
    setItemSelected(state, item) {
      state.itemSelected = item; // Memperbarui tag yang aktif
    },
    setDetailHeader(state, data) {
      state.detailHeader = data;
    },
  },
});
