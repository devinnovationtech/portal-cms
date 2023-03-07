import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const masterDataServiceRepository = RepositoryFactory.get('masterDataService');

// define the default state for reset purposes
const getDefaultState = () => ({
  currentFormStep: 1,
  stepOne: {
    services: {
      information: {
        opd_name: '',
        government_affair: '',
        sub_government_affair: '',
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
      features: [
        {
          name: '',
          description: '',
        },
      ],
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
  governmentAffairOptions: [],
  spbeRALOptions: [],
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
    governmentAffairOptions(state) {
      const originalList = state.governmentAffairOptions.map((item) => item.main_affair);

      // remove duplicate values from list
      const uniqueList = [...new Set(originalList)];

      const options = uniqueList.map((item) => ({
        value: item,
        label: item,
      }));

      return options;
    },
    subGovernmentAffairOptions(state) {
      if (state.stepOne.services.information.government_affair !== '') {
        const filteredList = state.governmentAffairOptions.filter((item) => item.main_affair === state.stepOne.services.information.government_affair);

        const options = filteredList.map((item) => ({
          value: item.sub_main_affair,
          label: item.sub_main_affair,
        }));

        return options;
      }

      return [];
    },
    spbeRALOptions(state) {
      const options = state.spbeRALOptions.map((item) => ({
        value: item.ral_code_2,
        label: item.ral_code_2,
      }));

      return options;
    },
  },
  mutations: {
    SET_CURRENT_FORM_STEP(state, payload) {
      state.currentFormStep = payload;
    },
    RESET_FORM_DATA(state) {
      Object.assign(state, getDefaultState());
    },
    SET_GOVERNMENT_AFFAIR_OPTIONS(state, payload) {
      state.governmentAffairOptions = payload;
    },
    SET_SPBE_RAL_OPTIONS(state, payload) {
      state.spbeRALOptions = payload;
    },
    SET_STEP_ONE_OPD_NAME(state, payload) {
      state.stepOne.services.information.opd_name = payload;
    },
    SET_STEP_ONE_GOVERNMENT_AFFAIR(state, payload) {
      state.stepOne.services.information.government_affair = payload;
    },
    SET_STEP_ONE_SUB_GOVERNMENT_AFFAIR(state, payload) {
      state.stepOne.services.information.sub_government_affair = payload;
    },
    RESET_STEP_ONE_SUB_GOVERNMENT_AFFAIR(state) {
      state.stepOne.services.information.sub_government_affair = '';
    },
    SET_STEP_ONE_SERVICE_FORM(state, payload) {
      state.stepOne.services.information.form = payload;
    },
    SET_STEP_ONE_SERVICE_TYPE(state, payload) {
      state.stepOne.services.information.type = payload;
    },
    SET_STEP_ONE_SUB_SERVICE_TYPE(state, payload) {
      state.stepOne.services.information.sub_service_type = payload;
    },
    SET_STEP_ONE_SERVICE_NAME(state, payload) {
      state.stepOne.services.information.name = payload;
    },
    SET_STEP_ONE_PROGRAM_NAME(state, payload) {
      state.stepOne.services.information.program_name = payload;
    },
    SET_STEP_ONE_PROGRAM_DESCRIPTION(state, payload) {
      state.stepOne.services.information.description = payload;
    },
    SET_STEP_ONE_USER(state, payload) {
      state.stepOne.services.information.user = payload;
    },
    SET_STEP_ONE_SUB_SERVICE_SPBE(state, payload) {
      state.stepOne.services.information.sub_service_spbe = payload;
    },
    SET_STEP_ONE_OPERATIONAL_STATUS(state, payload) {
      state.stepOne.services.information.operational_status = payload;
    },
    SET_STEP_ONE_TECHNICAL(state, payload) {
      state.stepOne.services.information.technical = payload;
    },
    SET_STEP_TWO_APPLICATION_STATUS(state, payload) {
      state.stepTwo.application.status = payload;
    },
    SET_STEP_TWO_APPLICATION_NAME(state, payload) {
      state.stepTwo.application.name = payload;
    },
    SET_STEP_TWO_APPLICATION_FEATURES_NAME(state, payload) {
      const { index, value } = payload;
      state.stepTwo.application.features[index].name = value;
    },
    SET_STEP_TWO_APPLICATION_FEATURES_DESCRIPTION(state, payload) {
      const { index, value } = payload;
      state.stepTwo.application.features[index].description = value;
    },
    ADD_STEP_TWO_APPLICATION_FEATURES(state) {
      state.stepTwo.application.features.push({ name: '', description: '' });
    },
    REMOVE_STEP_TWO_APPLICATION_FEATURES(state, index) {
      state.stepTwo.application.features.splice(index, 1);
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
    async getGovernmentAffairOptions({ commit }) {
      try {
        const response = await masterDataServiceRepository.getGovernmentAffairs();
        commit('SET_GOVERNMENT_AFFAIR_OPTIONS', response.data);
      } catch (error) {
        commit('SET_GOVERNMENT_AFFAIR_OPTIONS', []);
      }
    },
    // SPBE RAL Options
    async getRALOptions({ commit }) {
      try {
        const response = await masterDataServiceRepository.getSPBERALs();
        commit('SET_SPBE_RAL_OPTIONS', response.data);
      } catch (error) {
        commit('SET_SPBE_RAL_OPTIONS', []);
      }
    },
  },
};
