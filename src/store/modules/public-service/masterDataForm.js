/* eslint-disable camelcase */
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const masterDataServiceRepository = RepositoryFactory.get('masterDataService');

const FORM_SUBMIT_STATUS = Object.freeze({
  NONE: 'NONE',
  SAVE_AS_DRAFT_CONFIRMATION: 'SAVE_AS_DRAFT_CONFIRMATION',
  SUBMIT_CONFIRMATION: 'SUBMIT_CONFIRMATION',
  UPDATE_CONFIRMATION: 'UPDATE_CONFIRMATION',
  CANCEL_CONFIRMATION: 'CANCEL_CONFIRMATION',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});

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
        benefits: [''],
        facilities: [''],
        website: '',
        links: [
          {
            tautan: '',
            type: 'GOOGLE_FORM',
            label: '',
          },
        ],
      },
      service_detail: {
        terms_and_conditions: [''],
        service_procedures: [''],
        service_fee: '',
        operational_time: [
          {
            selected: false,
            day: 'MONDAY',
            start: '',
            end: '',
          },
          {
            selected: false,
            day: 'TUESDAY',
            start: '',
            end: '',
          },
          {
            selected: false,
            day: 'WEDNESDAY',
            start: '',
            end: '',
          },
          {
            selected: false,
            day: 'THURSDAY',
            start: '',
            end: '',
          },
          {
            selected: false,
            day: 'FRIDAY',
            start: '',
            end: '',
          },
          {
            selected: false,
            day: 'SATURDAY',
            start: '',
            end: '',
          },
          {
            selected: false,
            day: 'SUNDAY',
            start: '',
            end: '',
          },
        ],
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
      title: '',
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
      social_media: [
        {
          name: '',
          type: 'FACEBOOK',
          link: '',
        },
      ],
    },
  },
  status: '',
  governmentAffairOptions: [],
  spbeRALOptions: [],
  organizationLists: [],
  submitStatus: FORM_SUBMIT_STATUS.NONE,
  submitProgress: 0,
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
    isDraft(state) {
      return state.status === 'DRAFT';
    },
    submitStatus(state) {
      return state.submitStatus;
    },
    submitProgress(state) {
      return state.submitProgress;
    },
    submitMessage(state) {
      if (state.submitStatus === FORM_SUBMIT_STATUS.SUCCESS) {
        return {
          title: 'Berhasil!',
          message: 'Layanan yang Anda buat berhasil ditambahkan.',
          iconName: 'check-mark-circle',
          iconClass: 'text-green-600',
        };
      }

      if (state.submitStatus === FORM_SUBMIT_STATUS.ERROR) {
        return {
          title: 'Tambah Layanan Gagal!',
          message: 'Layanan yang Anda buat gagal ditambahkan.',
          iconName: 'warning',
          iconClass: 'text-red-600',
        };
      }

      return {
        title: '',
        message: '',
        iconName: '',
        iconClass: '',
      };
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
        label: item.item,
      }));

      return options;
    },
    organizationOptions(state) {
      const options = state.organizationLists.map((item) => ({
        value: item.cbg_name,
        label: item.cbg_name,
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
    SET_ORGANIZATION_OPTIONS(state, payload) {
      state.organizationLists = payload;
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
    ADD_STEP_ONE_BENEFIT(state) {
      state.stepOne.services.information.benefits.push('');
    },
    REMOVE_STEP_ONE_BENEFIT(state, index) {
      state.stepOne.services.information.benefits.splice(index, 1);
    },
    SET_STEP_ONE_BENEFIT(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.information.benefits[index] = value;
    },
    ADD_STEP_ONE_FACILITIES(state) {
      state.stepOne.services.information.facilities.push('');
    },
    REMOVE_STEP_ONE_FACILITIES(state, index) {
      state.stepOne.services.information.facilities.splice(index, 1);
    },
    SET_STEP_ONE_FACILITIES(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.information.facilities[index] = value;
    },
    SET_STEP_ONE_WEBSITE(state, payload) {
      state.stepOne.services.information.website = payload;
    },
    ADD_STEP_ONE_LINKS(state) {
      state.stepOne.services.information.links.push({
        link: '',
        type: 'GOOGLE_FORM',
        label: '',
      });
    },
    REMOVE_STEP_ONE_LINKS(state, index) {
      state.stepOne.services.information.links.splice(index, 1);
    },
    SET_STEP_ONE_LINK_TYPE(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.information.links[index].type = value;
    },
    SET_STEP_ONE_LINK_LABEL(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.information.links[index].label = value;
    },
    SET_STEP_ONE_LINK(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.information.links[index].tautan = value;
    },
    ADD_STEP_ONE_TERM_AND_CONDITION(state) {
      state.stepOne.services.service_detail.terms_and_conditions.push('');
    },
    REMOVE_STEP_ONE_TERM_AND_CONDITION(state, index) {
      state.stepOne.services.service_detail.terms_and_conditions.splice(index, 1);
    },
    SET_STEP_ONE_TERM_AND_CONDITION(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.service_detail.terms_and_conditions[index] = value;
    },
    ADD_STEP_ONE_SERVICE_PROCEDURE(state) {
      state.stepOne.services.service_detail.service_procedures.push('');
    },
    REMOVE_STEP_ONE_SERVICE_PROCEDURE(state, index) {
      state.stepOne.services.service_detail.service_procedures.splice(index, 1);
    },
    SET_STEP_ONE_SERVICE_PROCEDURE(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.service_detail.service_procedures[index] = value;
    },
    SET_STEP_ONE_SERVICE_FEE(state, payload) {
      state.stepOne.services.service_detail.service_fee = payload;
    },
    SET_STEP_ONE_OPERATIONAL_TIME_DAY(state, payload) {
      const { index } = payload;
      state.stepOne.services.service_detail.operational_time[index].selected = !state.stepOne.services.service_detail.operational_time[index].selected;

      // Reset start and end time if day unselected
      if (state.stepOne.services.service_detail.operational_time[index].selected === false) {
        state.stepOne.services.service_detail.operational_time[index].start = 'HH:mm';
        state.stepOne.services.service_detail.operational_time[index].end = 'HH:mm';
      }
    },
    SET_STEP_ONE_OPERATIONAL_TIME_START(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.service_detail.operational_time[index].start = value;
    },
    SET_STEP_ONE_OPERATIONAL_TIME_END(state, payload) {
      const { value, index } = payload;
      state.stepOne.services.service_detail.operational_time[index].end = value;
    },
    SET_STEP_ONE_HOTLINE_NUMBER(state, payload) {
      state.stepOne.services.service_detail.hotline_number = payload;
    },
    SET_STEP_ONE_HOTLINE_MAIL(state, payload) {
      state.stepOne.services.service_detail.hotline_mail = payload;
    },
    ADD_STEP_ONE_LOCATION(state) {
      state.stepOne.services.location.push({
        type: '',
        organization: '',
        name: '',
        address: '',
        phone_number: '',
      });
    },
    REMOVE_STEP_ONE_LOCATION(state, index) {
      state.stepOne.services.location.splice(index, 1);
    },
    SET_STEP_ONE_LOCATION_TYPE(state, payload) {
      const { index, value } = payload;
      state.stepOne.services.location[index].type = value;
      state.stepOne.services.location[index].name = '';
      state.stepOne.services.location[index].address = '';
      state.stepOne.services.location[index].organization = '';
      state.stepOne.services.location[index].phone_number = '';
    },
    SET_STEP_ONE_LOCATION_NAME(state, payload) {
      const { index, value } = payload;
      state.stepOne.services.location[index].name = value;
    },
    SET_STEP_ONE_LOCATION_ORGANIZATION(state, payload) {
      const { index, value } = payload;
      state.stepOne.services.location[index].organization = value;
      if (state.stepOne.services.location[index].type === 'UNIT') {
        state.stepOne.services.location[index].name = value;
        state.stepOne.services.location[index].address = state.organizationLists.find((item) => item.cbg_name === value)?.cbg_alamat ?? '';
      }
    },
    SET_STEP_ONE_LOCATION_ADDRESS(state, payload) {
      const { index, value } = payload;
      state.stepOne.services.location[index].address = value;
    },
    SET_STEP_ONE_LOCATION_PHONE_NUMBER(state, payload) {
      const { index, value } = payload;
      state.stepOne.services.location[index].phone_number = value;
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
    SET_STEP_THREE_ADDITIONAL_INFORMATION_RESPONSIBLE_NAME(state, payload) {
      state.stepThree.additional_information.responsible_name = payload;
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_PHONE_NUMBER(state, payload) {
      state.stepThree.additional_information.phone_number = payload;
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_EMAIL(state, payload) {
      state.stepThree.additional_information.email = payload;
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA_NAME(state, payload) {
      const { index, value } = payload;
      state.stepThree.additional_information.social_media[index].name = value;
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA_TYPE(state, payload) {
      const { index, value } = payload;
      state.stepThree.additional_information.social_media[index].type = value;
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA_LINK(state, payload) {
      const { index, value } = payload;
      state.stepThree.additional_information.social_media[index].link = value;
    },
    ADD_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA(state) {
      state.stepThree.additional_information.social_media.push({ name: '', type: 'FACEBOOK', link: '' });
    },
    REMOVE_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA(state, index) {
      state.stepThree.additional_information.social_media.splice(index, 1);
    },
    SET_SUBMIT_STATUS(state, payload) {
      state.submitStatus = payload;
    },
    SET_SUBMIT_PROGRESS(state, payload) {
      state.submitProgress = payload;
    },
    SET_INITIAL_FORM_DATA(state, payload) {
      state.stepOne.services.information.government_affair = payload.services.government_affair;
      state.stepOne.services.information.sub_government_affair = payload.services.sub_government_affair;
      state.stepOne.services.information.form = payload.services.form;
      state.stepOne.services.information.type = payload.services.type;
      state.stepOne.services.information.sub_service_type = payload.services.sub_service_type;
      state.stepOne.services.information.name = payload.services.name;
      state.stepOne.services.information.program_name = payload.services.program_name;
      state.stepOne.services.information.description = payload.services.description;
      state.stepOne.services.information.user = payload.services.user;
      state.stepOne.services.information.sub_service_spbe = payload.services.sub_service_spbe;
      state.stepOne.services.information.operational_status = payload.services.operational_status;
      state.stepOne.services.information.technical = payload.services.technical;
      state.stepOne.services.information.benefits = payload.services.benefits;
      state.stepOne.services.information.facilities = payload.services.facilities;
      state.stepOne.services.information.website = payload.services.website;
      state.stepOne.services.information.links = payload.services.links;

      state.stepOne.services.service_detail.terms_and_conditions = payload.services.terms_and_conditions;
      state.stepOne.services.service_detail.service_procedures = payload.services.service_procedures;
      state.stepOne.services.service_detail.service_fee = payload.services.service_fee;
      state.stepOne.services.service_detail.hotline_number = payload.services.hotline_number;
      state.stepOne.services.service_detail.hotline_mail = payload.services.hotline_mail;

      // Set Active Operational Time
      const defaultOperationalTime = state.stepOne.services.service_detail.operational_time;
      const payloadOperationalTime = payload.services.operational_times;

      payloadOperationalTime.forEach((item) => {
        const index = defaultOperationalTime.map((obj) => obj.day).indexOf(item.day);

        state.stepOne.services.service_detail.operational_time[index].selected = true;
        state.stepOne.services.service_detail.operational_time[index].start = item.start;
        state.stepOne.services.service_detail.operational_time[index].end = item.end;
      });

      state.stepOne.services.location = payload.services.locations;

      state.stepTwo.application.status = payload.application.status;
      state.stepTwo.application.name = payload.application.name;
      state.stepTwo.application.features = payload.application.features;

      state.stepThree.additional_information.responsible_name = payload.additional_information.responsible_name;
      state.stepThree.additional_information.phone_number = payload.additional_information.phone_number;
      state.stepThree.additional_information.email = payload.additional_information.email;
      state.stepThree.additional_information.social_media = payload.additional_information.social_media;

      state.status = payload.status;
    },
  },
  actions: {
    setInitialOPDName({ commit, rootState }) {
      const initialOPDName = rootState.auth?.user?.unit?.id ?? null;
      commit('SET_STEP_ONE_OPD_NAME', initialOPDName);
    },
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
    // Organization Options
    async getOrganizationOptions({ commit }) {
      try {
        const response = await masterDataServiceRepository.getOrganizations();
        commit('SET_ORGANIZATION_OPTIONS', response.data);
      } catch {
        commit('SET_ORGANIZATION_OPTIONS', []);
      }
    },
    generateFormData({ state }, status) {
      let stepOnefacilities;
      let stepTwoState;
      const { technical } = state.stepOne.services.information;
      const applicationStatus = state.stepTwo.application.status;

      // generate different state based on step one state (technical)
      if (technical === 'ONLINE') {
        stepOnefacilities = getDefaultState().stepOne.services.information.facilities;
        stepTwoState = {
          ...state.stepTwo.application,
        };
      } else {
        stepOnefacilities = state.stepOne.services.information.facilities;
        stepTwoState = {
          ...getDefaultState().stepTwo.application,
        };
      }

      // generate different state based on step two state (status)
      if (applicationStatus === 'NOT-AVAILABLE') {
        stepTwoState = {
          ...getDefaultState().stepTwo.application,
          status: 'NOT-AVAILABLE',
        };
      } else {
        stepTwoState = { ...state.stepTwo.application };
      }

      const formData = {
        services: {
          service_detail: {
            ...state.stepOne.services.service_detail,
            // Get only selected operational time
            operational_time: state.stepOne.services.service_detail.operational_time.filter((item) => item.selected),
          },
          information: {
            ...state.stepOne.services.information,
            facilities: [...stepOnefacilities],
          },
          location: [...state.stepOne.services.location],
        },
        application: { ...stepTwoState },
        additional_information: { ...state.stepThree.additional_information },
        status,
      };

      return formData;
    },
    closeConfirmation({ commit }) {
      commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.NONE);
    },
    openSaveConfirmation({ commit }) {
      commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.SAVE_AS_DRAFT_CONFIRMATION);
    },
    submitConfirmation({ commit }) {
      commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.SUBMIT_CONFIRMATION);
    },
    updateConfirmation({ commit }) {
      commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.UPDATE_CONFIRMATION);
    },
    cancelConfirmation({ commit }) {
      commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.CANCEL_CONFIRMATION);
    },
    async saveAsDraft({ dispatch, commit }) {
      try {
        const formData = await dispatch('generateFormData', 'DRAFT');
        await masterDataServiceRepository.createMasterData(formData);
        commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.SUCCESS);
      } catch (error) {
        commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.ERROR);
      }
    },
    async submitForm({ dispatch, commit }) {
      try {
        commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.LOADING);
        commit('SET_SUBMIT_PROGRESS', 25);

        const formData = await dispatch('generateFormData', 'ARCHIVE');
        const response = await masterDataServiceRepository.createMasterData(formData);

        if (response.status === 201) {
          // Add timeout to prevent progress bar too fast
          setTimeout(() => {
            commit('SET_SUBMIT_PROGRESS', 75);

            setTimeout(() => {
              commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.SUCCESS);
            }, 150);
          }, 150);
        }
      } catch (error) {
        commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.ERROR);
      }
    },
    async setInitialFormData({ commit }, id) {
      try {
        const response = await masterDataServiceRepository.getMasterDataById(id);
        const { data } = response.data;

        if (response.status === 200) {
          commit('SET_INITIAL_FORM_DATA', data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateForm({ dispatch, commit }, { id, status }) {
      try {
        commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.LOADING);
        commit('SET_SUBMIT_PROGRESS', 25);

        const formData = await dispatch('generateFormData', status);
        const response = await masterDataServiceRepository.updateMasterData(formData, id);

        if (response.status === 200) {
          // Add timeout to prevent progress bar too fast
          setTimeout(() => {
            commit('SET_SUBMIT_PROGRESS', 75);

            setTimeout(() => {
              commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.SUCCESS);
            }, 150);
          }, 150);
        }
      } catch (error) {
        commit('SET_SUBMIT_STATUS', FORM_SUBMIT_STATUS.ERROR);
      }
    },

  },
};
