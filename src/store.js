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
    countryRecognised: 'Singapore',
    idCountryRecognised: 1,
    skillRecognised: '---Select Skills---',
    idSkillRecognised: null,
    skillSlug: {
      skills_id: '',
      name: '',
      image: '',
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
    setCountryRecognised(state, item) {
      state.countryRecognised = item;
    },
    setIdCountryRecognised(state, item) {
      state.idCountryRecognised = item;
    },
    setSkillRecognised(state, item) {
      state.skillRecognised = item;
    },
    setIdSkillRecognised(state, item) {
      state.idSkillRecognised = item;
    },
    setSkillSlug(state, item) {
      state.skillSlug = {
        ...item,
        name: item.name,
        image: item.image,
        skills_id: item.skills_id,
      };
    },
  },
});
