// define the default state for reset purposes
const getDefaultState = () => ({
  currentFormStep: 1,
  stepOne: {
    services: {
      information: {
        opd_name: '',
        goverment_affair: '',
        sub_goverment_affair: '',
        form: '',
        type: '',
        sub_service_type: '',
        name: '',
        program_name: '',
        description: '',
        user: '',
        sub_service_spbe: '',
        operational_status: '',
        technical: '',
        benefits: [],
        facilities: [],
        website: '',
        links: [],
      },
      service_detail: {
        terms_and_conditions: [],
        service_procedures: [],
        service_fee: '',
        operational_time: [],
        hotline_number: '',
        hotline_mail: '',
      },
      location: [
        {
          type: '',
          organization: '',
          name: '',
          address: '',
          phone_number: '',
        },
      ],
    },
  },
  stepTwo: {
    application: {
      status: '',
      name: '',
      features: [],
    },
  },
  stepThree: {
    additional_information: {
      responsible_name: '',
      phone_number: '',
      email: '',
      social_media: [],
    },
  },
});

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    currentFormStep(state) {
      return state.currentFormStep;
    },
    isFirstStep(state) {
      return state.currentFormStep === 1;
    },
    isLastStep(state) {
      return state.currentFormStep === 3;
    },
  },
  mutations: {
    SET_CURRENT_FORM_STEP(state, payload) {
      state.currentFormStep = payload;
    },
    RESET_FORM_DATA(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    previousStep({ commit, state }) {
      const { currentFormStep } = state;

      if (currentFormStep === 1) {
        return;
      }

      commit('SET_CURRENT_FORM_STEP', currentFormStep - 1);
    },
    nextStep({ commit, state }) {
      const { currentFormStep } = state;

      if (currentFormStep >= 3) {
        return;
      }

      commit('SET_CURRENT_FORM_STEP', currentFormStep + 1);
    },
    resetFormData({ commit }) {
      commit('RESET_FORM_DATA');
    },
  },
};
