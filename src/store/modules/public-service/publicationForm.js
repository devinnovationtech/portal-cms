/* eslint-disable camelcase */

import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const mediaRepository = RepositoryFactory.get('media');
const masterDataServiceRepository = RepositoryFactory.get('masterDataService');

const IMAGE_UPLOAD_STATUS = Object.freeze({
  NONE: 'NONE',
  UPLOADING: 'UPLOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  HASDEFAULT: 'HASDEFAULT',
});

// define the default state for reset purposes
const getDefaultState = () => ({
  currentFormStep: 1,
  masterDataId: null,
  stepOne: {
    default_information: {
      opd_name: '',
      form: '',
      name: '',
      description: '',
      user: '',
      program_name: '',
      portal_category: '',
      operational_status: '',
      technical: '',
      benefits: {
        title: '',
        is_active: 1,
        items: [
          {
            name: '',
            image: {
              file_name: '',
              file_download_uri: '',
              size: 0,
              file: null,
              upload_progress: 0,
              upload_status: IMAGE_UPLOAD_STATUS.NONE,
            },
          },
        ],
      },
      facilities: {
        title: '',
        is_active: 1,
        items: [
          {
            name: '',
            image: {
              file_name: '',
              file_download_uri: '',
              size: 0,
              file: null,
              upload_progress: 0,
              upload_status: IMAGE_UPLOAD_STATUS.NONE,
            },
          },
        ],
      },
      slug: '',
      website: '',
      logo: {
        file_name: '',
        file_download_uri: '',
        size: 0,
      },
    },
  },
  stepTwo: {
    service_description: {
      cover: {
        video: '',
        image: {
          file_name: '',
          file_download_uri: '',
          size: 0,
          image_file: null,
          image_upload_progress: 0,
          image_upload_status: IMAGE_UPLOAD_STATUS.NONE,
        },
      },
      images: [
        {
          file_name: '',
          file_download_uri: '',
          size: 0,
          image_file: null,
          image_upload_progress: 0,
          image_upload_status: IMAGE_UPLOAD_STATUS.NONE,
        },
      ],
      terms_and_conditions: {
        title: '',
        is_active: 1,
        items: [
          {
            name: '',
            link: '',
          },
        ],
        cover: {
          file_name: '',
          file_download_uri: '',
          size: 0,
          image_file: null,
          image_upload_progress: 0,
          image_upload_status: IMAGE_UPLOAD_STATUS.NONE,
        },
      },
      service_procedures: {
        title: '',
        is_active: 1,
        items: [
          {
            name: '',
            link: '',
          },
        ],
        cover: {
          file_name: '',
          file_download_uri: '',
          size: 0,
          image_file: null,
          image_upload_progress: 0,
          image_upload_status: IMAGE_UPLOAD_STATUS.NONE,
        },
      },
      service_fee: {
        has_range: 0,
        minimum_fee: '',
        maximum_fee: '',
        has_description: 0,
        description: '',
      },
      operational_times: [
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
      infographics: {
        is_active: 1,
        images: [
          {
            file_name: '',
            file_download_uri: '',
            size: 0,
            image_file: null,
            image_upload_progress: 0,
            image_upload_status: IMAGE_UPLOAD_STATUS.NONE,
          },
        ],
      },
      application: {
        title: '',
        name: '',
        status: '',
        features: [
          {
            name: '',
            description: '',
          },
        ],
      },
      locations: [
        {
          type: '',
          organization: '',
          name: '',
          address: '',
          phone_number: '',
        },
      ],
      links: [
        {
          tautan: '',
          type: 'GOOGLE_FORM',
          label: '',
        },
      ],
      social_media: [
        {
          name: '',
          type: 'FACEBOOK',
          link: '',
        },
      ],
    },
  },
  stepThree: {
    additional_information: {
      keywords: [],
      faq: {
        is_active: 1,
        items: [
          {
            question: '',
            answer: '',
          },
        ],
      },
    },
  },
  masterDataList: [],
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
    applicationStatus(state) {
      switch (state.stepTwo.service_description.application.status) {
        case 'AVAILABLE':
          return 'Tersedia';
        case 'NOT-AVAILABLE':
          return 'Tidak Tersedia';
        default:
          return '';
      }
    },
    masterDataId(state) {
      return state.masterDataId;
    },
    isMasterDataSelected(state) {
      return !!state.masterDataId;
    },
    masterDataOptions(state) {
      const options = state.masterDataList.map((item) => ({
        value: item.id,
        label: item.service_name,
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
    SET_INITIAL_FORM_DATA(state, payload) {
      // STEP ONE STATE
      state.stepOne.default_information.opd_name = payload.services.opd_name;
      state.stepOne.default_information.form = payload.services.form;
      state.stepOne.default_information.name = payload.services.name;
      state.stepOne.default_information.description = payload.services.description;
      state.stepOne.default_information.user = payload.services.user;
      state.stepOne.default_information.program_name = payload.services.program_name;
      state.stepOne.default_information.operational_status = payload.services.operational_status;
      state.stepOne.default_information.technical = payload.services.technical;
      state.stepOne.default_information.benefits.items = payload.services.benefits.items.map((item) => ({
        ...item,
        image: {
          ...item.image,
          // set initial metadata for each image because API doesn't provide these property by default
          file: null,
          upload_progress: 0,
          upload_status: IMAGE_UPLOAD_STATUS.NONE,
        },
      }));
      state.stepOne.default_information.facilities.items = payload.services.facilities.items.map((item) => ({
        ...item,
        image: {
          ...item.image,
          // set initial metadata for each image because API doesn't provide these property by default
          file: null,
          upload_progress: 0,
          upload_status: IMAGE_UPLOAD_STATUS.NONE,
        },
      }));
      state.stepOne.default_information.website = payload.services.website;

      // STEP TWO STATE

      state.stepTwo.service_description.terms_and_conditions.title = payload.services.terms_and_conditions.title;
      state.stepTwo.service_description.terms_and_conditions.is_active = payload.services.terms_and_conditions.is_active;
      state.stepTwo.service_description.terms_and_conditions.items = payload.services.terms_and_conditions.items.map((item) => ({
        ...item,
      }));
      state.stepTwo.service_description.service_procedures.title = payload.services.service_procedures.title;
      state.stepTwo.service_description.service_procedures.is_active = payload.services.service_procedures.is_active;
      state.stepTwo.service_description.service_procedures.items = payload.services.service_procedures.items.map((item) => ({
        ...item,
      }));

      state.stepTwo.service_description.service_fee.minimum_fee = payload.services.service_fee.minimum_fee ? payload.services.service_fee.minimum_fee.toString() : '';
      state.stepTwo.service_description.service_fee.maximum_fee = payload.services.service_fee.maximum_fee ? payload.services.service_fee.maximum_fee.toString() : '';
      state.stepTwo.service_description.service_fee.has_description = payload.services.service_fee.has_description;
      state.stepTwo.service_description.service_fee.description = payload.services.service_fee.description;

      // Set Active Operational Time
      const defaultOperationalTime = state.stepTwo.service_description.operational_times;
      const payloadOperationalTime = payload.services.operational_times;

      payloadOperationalTime.forEach((item) => {
        const index = defaultOperationalTime.map((obj) => obj.day).indexOf(item.day);

        state.stepTwo.service_description.operational_times[index].selected = true;
        state.stepTwo.service_description.operational_times[index].start = item.start;
        state.stepTwo.service_description.operational_times[index].end = item.end;
      });
      state.stepTwo.service_description.hotline_number = payload.services.hotline_number;
      state.stepTwo.service_description.hotline_mail = payload.services.hotline_mail;
      state.stepTwo.service_description.locations = payload.services.locations.map((item) => ({
        ...item,
      }));
      state.stepTwo.service_description.application.title = payload.application.title;
      state.stepTwo.service_description.application.name = payload.application.name;
      state.stepTwo.service_description.application.status = payload.application.status;
      state.stepTwo.service_description.application.features = payload.application.features.map((item) => ({
        ...item,
      }));
      state.stepTwo.service_description.links = payload.services.links.map((item) => ({
        ...item,
      }));
      state.stepTwo.service_description.social_media = payload.additional_information.social_media.map((item) => ({
        ...item,
      }));
    },

    // STEP ONE FORM MUTATIONS

    SET_MASTER_DATA_OPTIONS(state, payload) {
      state.masterDataList = payload;
    },
    SET_STEP_ONE_MASTER_DATA_ID(state, payload) {
      state.masterDataId = payload;
    },
    SET_STEP_ONE_PORTAL_CATEGORY(state, payload) {
      state.stepOne.default_information.portal_category = payload;
    },
    SET_STEP_ONE_SERVICE_LOGO(state, payload) {
      state.stepOne.default_information.logo.file_name = payload.file_name;
      state.stepOne.default_information.logo.file_download_uri = payload.file_download_uri;
      state.stepOne.default_information.logo.size = payload.size;
    },
    RESET_STEP_ONE_SERVICE_LOGO(state) {
      state.stepOne.default_information.logo = {
        file_name: '',
        file_download_uri: '',
        size: 0,
      };
    },
    SET_STEP_ONE_BENEFIT_SECTION_IS_ACTIVE(state, payload) {
      state.stepOne.default_information.benefits.is_active = payload ? 1 : 0;
    },
    SET_STEP_ONE_BENEFIT_SECTION_TITLE(state, payload) {
      state.stepOne.default_information.benefits.title = payload;
    },
    SET_STEP_ONE_BENEFIT_IMAGE_FILE(state, { file, index }) {
      state.stepOne.default_information.benefits.items[index].image.file = file;
    },
    SET_STEP_ONE_BENEFIT_IMAGE_PROGRESS(state, { imageUploadProgress, index }) {
      state.stepOne.default_information.benefits.items[index].image.upload_progress = imageUploadProgress;
    },
    SET_STEP_ONE_BENEFIT_IMAGE_STATUS(state, { imageUploadStatus, index }) {
      state.stepOne.default_information.benefits.items[index].image.upload_status = imageUploadStatus;
    },
    SET_STEP_ONE_BENEFIT_IMAGE_FILE_NAME(state, { fileName, index }) {
      state.stepOne.default_information.benefits.items[index].image.file_name = fileName;
    },
    SET_STEP_ONE_BENEFIT_IMAGE_FILE_URI(state, { uri, index }) {
      state.stepOne.default_information.benefits.items[index].image.file_download_uri = uri;
    },
    SET_STEP_ONE_BENEFIT_IMAGE_FILE_SIZE(state, { size, index }) {
      state.stepOne.default_information.benefits.items[index].image.size = size;
    },
    RESET_STEP_ONE_BENEFIT_IMAGE(state, index) {
      state.stepOne.default_information.benefits.items[index].image = {
        file_name: '',
        file_download_uri: '',
        size: 0,
        file: null,
        upload_progress: 0,
        upload_status: IMAGE_UPLOAD_STATUS.NONE,
      };
    },
    SET_STEP_ONE_FACILITY_SECTION_IS_ACTIVE(state, payload) {
      state.stepOne.default_information.facilities.is_active = payload ? 1 : 0;
    },
    SET_STEP_ONE_FACILITY_SECTION_TITLE(state, payload) {
      state.stepOne.default_information.facilities.title = payload;
    },
    SET_STEP_ONE_FACILITY_IMAGE_FILE(state, { file, index }) {
      state.stepOne.default_information.facilities.items[index].image.file = file;
    },
    SET_STEP_ONE_FACILITY_IMAGE_PROGRESS(state, { imageUploadProgress, index }) {
      state.stepOne.default_information.facilities.items[index].image.upload_progress = imageUploadProgress;
    },
    SET_STEP_ONE_FACILITY_IMAGE_STATUS(state, { imageUploadStatus, index }) {
      state.stepOne.default_information.facilities.items[index].image.upload_status = imageUploadStatus;
    },
    SET_STEP_ONE_FACILITY_IMAGE_FILE_NAME(state, { fileName, index }) {
      state.stepOne.default_information.facilities.items[index].image.file_name = fileName;
    },
    SET_STEP_ONE_FACILITY_IMAGE_FILE_URI(state, { uri, index }) {
      state.stepOne.default_information.facilities.items[index].image.file_download_uri = uri;
    },
    SET_STEP_ONE_FACILITY_IMAGE_FILE_SIZE(state, { size, index }) {
      state.stepOne.default_information.facilities.items[index].image.size = size;
    },
    RESET_STEP_ONE_FACILITY_IMAGE(state, index) {
      state.stepOne.default_information.facilities.items[index].image = {
        file_name: '',
        file_download_uri: '',
        size: 0,
        file: null,
        upload_progress: 0,
        upload_status: IMAGE_UPLOAD_STATUS.NONE,
      };
    },
    SET_STEP_ONE_URL_CUSTOMIZATION(state, payload) {
      state.stepOne.default_information.slug = payload;
    },

    // END OF STEP ONE FORM MUTATIONS

    RESET_FORM_IMAGE_STATE(state, index) {
      state.stepTwo.service_description.images[index].image_file = null;
      state.stepTwo.service_description.images[index].image_upload_progress = 0;
      state.stepTwo.service_description.images[index].image_upload_status = IMAGE_UPLOAD_STATUS.NONE;
      state.stepTwo.service_description.images[index].file_name = '';
      state.stepTwo.service_description.images[index].file_download_uri = '';
      state.stepTwo.service_description.images[index].size = 0;
    },
    RESET_FORM_COVER_IMAGE_STATE(state) {
      state.stepTwo.service_description.cover.image.image_file = null;
      state.stepTwo.service_description.cover.image.image_upload_progress = 0;
      state.stepTwo.service_description.cover.image.image_upload_status = IMAGE_UPLOAD_STATUS.NONE;
      state.stepTwo.service_description.cover.image.file_name = '';
      state.stepTwo.service_description.cover.image.file_download_uri = '';
      state.stepTwo.service_description.cover.image.size = 0;
    },
    RESET_FORM_TERM_AND_CONDITION_COVER_IMAGE_STATE(state) {
      state.stepTwo.service_description.terms_and_conditions.cover.image_file = null;
      state.stepTwo.service_description.terms_and_conditions.cover.image_upload_progress = 0;
      state.stepTwo.service_description.terms_and_conditions.cover.image_upload_status = IMAGE_UPLOAD_STATUS.NONE;
      state.stepTwo.service_description.terms_and_conditions.cover.file_name = '';
      state.stepTwo.service_description.terms_and_conditions.cover.file_download_uri = '';
      state.stepTwo.service_description.terms_and_conditions.cover.size = 0;
    },
    RESET_FORM_PROCEDURES_COVER_IMAGE_STATE(state) {
      state.stepTwo.service_description.service_procedures.cover.image_file = null;
      state.stepTwo.service_description.service_procedures.cover.image_upload_progress = 0;
      state.stepTwo.service_description.service_procedures.cover.image_upload_status = IMAGE_UPLOAD_STATUS.NONE;
      state.stepTwo.service_description.service_procedures.cover.file_name = '';
      state.stepTwo.service_description.service_procedures.cover.file_download_uri = '';
      state.stepTwo.service_description.service_procedures.cover.size = 0;
    },
    RESET_FORM_INFOGRAPHIC_IMAGE_STATE(state, index) {
      state.stepTwo.service_description.infographics.images[index].image_file = null;
      state.stepTwo.service_description.infographics.images[index].image_upload_progress = 0;
      state.stepTwo.service_description.infographics.images[index].image_upload_status = IMAGE_UPLOAD_STATUS.NONE;
      state.stepTwo.service_description.infographics.images[index].file_name = '';
      state.stepTwo.service_description.infographics.images[index].file_download_uri = '';
      state.stepTwo.service_description.infographics.images[index].size = 0;
    },
    RESET_FORM_COVER_IMAGE(state) {
      state.stepTwo.service_description.cover.video = '';
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_VIDEO_LINK(state, payload) {
      state.stepTwo.service_description.cover.video = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE_NAME(state, payload) {
      state.stepTwo.service_description.cover.image.file_name = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE_DOWNLOAD_URI(state, payload) {
      state.stepTwo.service_description.cover.image.file_download_uri = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_SIZE(state, payload) {
      state.stepTwo.service_description.cover.image.size = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE(state, payload) {
      state.stepTwo.service_description.cover.image.image_file = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_UPLOAD_PROGRESS(state, payload) {
      state.stepTwo.service_description.cover.image.image_upload_progress = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_UPLOAD_STATUS(state, payload) {
      state.stepTwo.service_description.cover.image.image_upload_status = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_FILE(state, payload) {
      const { file, index } = payload;
      state.stepTwo.service_description.images[index].image_file = file;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_PROGRESS(state, payload) {
      const { imageUploadProgress, index } = payload;
      state.stepTwo.service_description.images[index].image_upload_progress = imageUploadProgress;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_STATUS(state, payload) {
      const { imageUploadStatus, index } = payload;
      state.stepTwo.service_description.images[index].image_upload_status = imageUploadStatus;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_FILE_NAME(state, payload) {
      const { file, index } = payload;
      state.stepTwo.service_description.images[index].file_name = file;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_URI(state, payload) {
      const { uri, index } = payload;
      state.stepTwo.service_description.images[index].file_download_uri = uri;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_SIZE(state, payload) {
      const { size, index } = payload;
      state.stepTwo.service_description.images[index].size = size;
    },
    ADD_STEP_TWO_SERVICE_DESCRIPTION_IMAGES(state) {
      state.stepTwo.service_description.images.push({
        file_name: '',
        file_download_uri: '',
        size: 0,
        image_file: null,
        image_upload_progress: 0,
        image_upload_status: IMAGE_UPLOAD_STATUS.NONE,
      });
    },
    REMOVE_STEP_TWO_SERVICE_DESCRIPTION_IMAGES(state, index) {
      state.stepTwo.service_description.images.splice(index, 1);
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_TITLE(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.title = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_IS_ACTIVE(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.is_active = payload ? 1 : 0;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_ITEM_NAME(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.terms_and_conditions.items[index].name = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_ITEM_LINK(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.terms_and_conditions.items[index].link = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE_NAME(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.cover.file_name = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE_DOWNLOAD_URI(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.cover.file_download_uri = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_SIZE(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.cover.size = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.cover.image_file = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_UPLOAD_PROGRESS(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.cover.image_upload_progress = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_UPLOAD_STATUS(state, payload) {
      state.stepTwo.service_description.terms_and_conditions.cover.image_upload_status = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_IS_ACTIVE(state, payload) {
      state.stepTwo.service_description.service_procedures.is_active = payload ? 1 : 0;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_TITLE(state, payload) {
      state.stepTwo.service_description.service_procedures.title = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_ITEM_NAME(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.service_procedures.items[index].name = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_ITEM_LINK(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.service_procedures.items[index].link = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE_NAME(state, payload) {
      state.stepTwo.service_description.service_procedures.cover.file_name = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE_DOWNLOAD_URI(state, payload) {
      state.stepTwo.service_description.service_procedures.cover.file_download_uri = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_SIZE(state, payload) {
      state.stepTwo.service_description.service_procedures.cover.size = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE(state, payload) {
      state.stepTwo.service_description.service_procedures.cover.image_file = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_UPLOAD_PROGRESS(state, payload) {
      state.stepTwo.service_description.service_procedures.cover.image_upload_progress = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_UPLOAD_STATUS(state, payload) {
      state.stepTwo.service_description.service_procedures.cover.image_upload_status = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_FEE(state, payload) {
      state.stepTwo.service_description.service_fee = payload;
    },

    SET_STEP_TWO_OPERATIONAL_TIME_START(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.operational_times[index].start = value;
    },
    SET_STEP_TWO_OPERATIONAL_TIME_END(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.operational_times[index].end = value;
    },
    SET_STEP_TWO_HOTLINE_NUMBER(state, payload) {
      state.stepTwo.service_description.hotline_number = payload;
    },
    SET_STEP_TWO_HOTLINE_MAIL(state, payload) {
      state.stepTwo.service_description.hotline_mail = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IS_ACTIVE(state, payload) {
      state.stepTwo.service_description.infographics.is_active = payload ? 1 : 0;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_FILE_NAME(state, payload) {
      const { file, index } = payload;
      state.stepTwo.service_description.infographics.images[index].file_name = file;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_URI(state, payload) {
      const { uri, index } = payload;
      state.stepTwo.service_description.infographics.images[index].file_download_uri = uri;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_SIZE(state, payload) {
      const { size, index } = payload;
      state.stepTwo.service_description.infographics.images[index].size = size;
    },
    ADD_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES(state) {
      state.stepTwo.service_description.infographics.images.push({
        file_name: '',
        file_download_uri: '',
        size: 0,
        image_file: null,
        image_upload_progress: 0,
        image_upload_status: IMAGE_UPLOAD_STATUS.NONE,
      });
    },
    REMOVE_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES(state, index) {
      state.stepTwo.service_description.infographics.images.splice(index, 1);
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_FILE(state, payload) {
      const { file, index } = payload;
      state.stepTwo.service_description.infographics.images[index].image_file = file;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_PROGRESS(state, payload) {
      const { imageUploadProgress, index } = payload;
      state.stepTwo.service_description.infographics.images[index].image_upload_progress = imageUploadProgress;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_STATUS(state, payload) {
      const { imageUploadStatus, index } = payload;
      state.stepTwo.service_description.infographics.images[index].image_upload_status = imageUploadStatus;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_TYPE(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.locations[index].type = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_ORGANIZATION(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.locations[index].organization = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_NAME(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.locations[index].name = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_ADDRESS(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.locations[index].address = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_PHONE_NUMBER(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.locations[index].phone_number = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_TITLE(state, payload) {
      state.stepTwo.service_description.application.title = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_STATUS(state, payload) {
      state.stepTwo.service_description.application.status = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_NAME(state, payload) {
      state.stepTwo.service_description.application.name = payload;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_FEATURES_NAME(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.application.features[index].name = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_FEATURES_DESCRIPTION(state, payload) {
      const { index, value } = payload;
      state.stepTwo.service_description.features[index].description = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LINK(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.links[index].tautan = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LINK_TYPE(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.links[index].type = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_LINK_LABEL(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.links[index].label = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SOCIAL_MEDIA_NAME(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.social_media[index].name = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SOCIAL_MEDIA_TYPE(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.social_media[index].type = value;
    },
    SET_STEP_TWO_SERVICE_DESCRIPTION_SOCIAL_MEDIA_LINK(state, payload) {
      const { value, index } = payload;
      state.stepTwo.service_description.social_media[index].link = value;
    },
    ADD_STEP_THREE_ADDITIONAL_INFORMATION_KEYWORDS(state, payload) {
      state.stepThree.additional_information.keywords.push(payload);
    },
    REMOVE_STEP_THREE_ADDITIONAL_INFORMATION_KEYWORDS(state, index) {
      state.stepThree.additional_information.keywords.splice(index, 1);
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_IS_ACTIVE(state, payload) {
      state.stepThree.additional_information.faq.is_active = payload ? 1 : 0;
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEM_QUESTION(state, payload) {
      const { value, index } = payload;
      state.stepThree.additional_information.faq.items[index].question = value;
    },
    SET_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEM_ANSWER(state, payload) {
      const { value, index } = payload;
      state.stepThree.additional_information.faq.items[index].answer = value;
    },
    ADD_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEMS(state) {
      state.stepThree.additional_information.faq.items.push({
        question: '',
        answer: '',
      });
    },
    REMOVE_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEMS(state, index) {
      state.stepThree.additional_information.faq.items.splice(index, 1);
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

    // STEP ONE ACTIONS

    async getMasterDataOptions({ commit }) {
      try {
        const response = await masterDataServiceRepository.getArchivedMasterData();
        commit('SET_MASTER_DATA_OPTIONS', response.data?.data);
      } catch (error) {
        commit('SET_MASTER_DATA_OPTIONS', []);
      }
    },
    async handleUploadServiceLogo({ commit }, file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      try {
        const response = await mediaRepository.uploadMedia(formData, { domain: 'publication' });

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_ONE_SERVICE_LOGO', data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteServiceLogo({ commit, state, dispatch }) {
      try {
        const fileName = state.stepOne.default_information.logo.file_name;
        await dispatch('deleteUploadedImage', fileName);

        commit('RESET_STEP_ONE_SERVICE_LOGO');
      } catch (error) {
        console.log(error);
      }
    },
    async handleUploadBenefitImage({ commit }, { file, index }) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      commit('SET_STEP_ONE_BENEFIT_IMAGE_FILE', { file, index });
      commit('SET_STEP_ONE_BENEFIT_IMAGE_PROGRESS', { imageUploadProgress: 0, index });
      commit('SET_STEP_ONE_BENEFIT_IMAGE_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.UPLOADING, index });
      try {
        const response = await mediaRepository.uploadMediaWithProgress(formData, (imageUploadProgress) => {
          commit('SET_STEP_ONE_BENEFIT_IMAGE_PROGRESS', { imageUploadProgress, index });
        }, { domain: 'publication' });

        commit('SET_STEP_ONE_BENEFIT_IMAGE_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.SUCCESS, index });

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_ONE_BENEFIT_IMAGE_FILE_NAME', { fileName: data.file_name, index });
          commit('SET_STEP_ONE_BENEFIT_IMAGE_FILE_URI', { uri: data.file_download_uri, index });
          commit('SET_STEP_ONE_BENEFIT_IMAGE_FILE_SIZE', { size: data.size, index });
        }
      } catch {
        commit('SET_STEP_ONE_BENEFIT_IMAGE_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.ERROR, index });
        commit('SET_STEP_ONE_BENEFIT_IMAGE_FILE_NAME', { fileName: '', index });
        commit('SET_STEP_ONE_BENEFIT_IMAGE_FILE_URI', { uri: '', index });
        commit('SET_STEP_ONE_BENEFIT_IMAGE_FILE_SIZE', { size: 0, index });
      }
    },
    async handleDeleteBenefitImage({ commit, dispatch }, { fileName, index }) {
      try {
        await dispatch('deleteUploadedImage', fileName);
        commit('RESET_STEP_ONE_BENEFIT_IMAGE', index);
      } catch (error) {
        console.log(error);
      }
    },
    async handleUploadFacilityImage({ commit }, { file, index }) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      commit('SET_STEP_ONE_FACILITY_IMAGE_FILE', { file, index });
      commit('SET_STEP_ONE_FACILITY_IMAGE_PROGRESS', { imageUploadProgress: 0, index });
      commit('SET_STEP_ONE_FACILITY_IMAGE_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.UPLOADING, index });
      try {
        const response = await mediaRepository.uploadMediaWithProgress(formData, (imageUploadProgress) => {
          commit('SET_STEP_ONE_FACILITY_IMAGE_PROGRESS', { imageUploadProgress, index });
        }, { domain: 'publication' });

        commit('SET_STEP_ONE_FACILITY_IMAGE_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.SUCCESS, index });

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_ONE_FACILITY_IMAGE_FILE_NAME', { fileName: data.file_name, index });
          commit('SET_STEP_ONE_FACILITY_IMAGE_FILE_URI', { uri: data.file_download_uri, index });
          commit('SET_STEP_ONE_FACILITY_IMAGE_FILE_SIZE', { size: data.size, index });
        }
      } catch {
        commit('SET_STEP_ONE_FACILITY_IMAGE_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.ERROR, index });
        commit('SET_STEP_ONE_FACILITY_IMAGE_FILE_NAME', { fileName: '', index });
        commit('SET_STEP_ONE_FACILITY_IMAGE_FILE_URI', { uri: '', index });
        commit('SET_STEP_ONE_FACILITY_IMAGE_FILE_SIZE', { size: 0, index });
      }
    },
    async handleDeleteFacilityImage({ commit, dispatch }, { fileName, index }) {
      try {
        await dispatch('deleteUploadedImage', fileName);
        commit('RESET_STEP_ONE_FACILITY_IMAGE', index);
      } catch (error) {
        console.log(error);
      }
    },

    // END OF STEP ONE ACTIONS

    async handleUploadImage({ commit }, { file, index }) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_FILE', { file, index });
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_PROGRESS', { imageUploadProgress: 0, index });
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.UPLOADING, index });
      try {
        const response = await mediaRepository.uploadMediaWithProgress(formData, (imageUploadProgress) => {
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_PROGRESS', { imageUploadProgress, index });
        }, { domain: 'publication' });

        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.SUCCESS, index });

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_FILE_NAME', { file: data.file_name, index });
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_URI', { uri: data.file_download_uri, index });
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_SIZE', { size: data.size, index });
        }
      } catch {
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.ERROR, index });
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_FILE_NAME', { file: '', index });
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_URI', { uri: '', index });
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_IMAGES_SIZE', { size: 0, index });
      }
    },
    async handleUploadCoverImage({ commit }, file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE', file);
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_UPLOAD_PROGRESS', 0);
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.UPLOADING);
      try {
        const response = await mediaRepository.uploadMediaWithProgress(formData, (imageUploadProgress) => {
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_UPLOAD_PROGRESS', imageUploadProgress);
        }, { domain: 'publication' });

        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.SUCCESS);

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE_NAME', data.file_name);
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE_DOWNLOAD_URI', data.file_download_uri);
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_SIZE', data.size);
        }
      } catch {
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.ERROR);
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE_NAME', '');
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_FILE_DOWNLOAD_URI', '');
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_IMAGE_SIZE', 0);
      }
    },
    async handleUploadTermAndConditionImage({ commit }, file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE', file);
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_UPLOAD_PROGRESS', 0);
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.UPLOADING);
      try {
        const response = await mediaRepository.uploadMediaWithProgress(formData, (imageUploadProgress) => {
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_UPLOAD_PROGRESS', imageUploadProgress);
        }, { domain: 'publication' });

        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.SUCCESS);

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE_NAME', data.file_name);
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE_DOWNLOAD_URI', data.file_download_uri);
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_SIZE', data.size);
        }
      } catch {
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.ERROR);
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE_NAME', '');
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_FILE_DOWNLOAD_URI', '');
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_COVER_IMAGE_SIZE', 0);
      }
    },
    async handleUploadProcedureImage({ commit }, file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE', file);
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_UPLOAD_PROGRESS', 0);
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.UPLOADING);
      try {
        const response = await mediaRepository.uploadMediaWithProgress(formData, (imageUploadProgress) => {
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_UPLOAD_PROGRESS', imageUploadProgress);
        }, { domain: 'publication' });

        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.SUCCESS);

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE_NAME', data.file_name);
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE_DOWNLOAD_URI', data.file_download_uri);
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_SIZE', data.size);
        }
      } catch {
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_UPLOAD_STATUS', IMAGE_UPLOAD_STATUS.ERROR);
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE_NAME', '');
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_FILE_DOWNLOAD_URI', '');
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_COVER_IMAGE_SIZE', 0);
      }
    },
    async handleUploadInfographicImage({ commit }, { file, index }) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_FILE', { file, index });
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_PROGRESS', { imageUploadProgress: 0, index });
      commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.UPLOADING, index });
      try {
        const response = await mediaRepository.uploadMediaWithProgress(formData, (imageUploadProgress) => {
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_PROGRESS', { imageUploadProgress, index });
        }, { domain: 'publication' });

        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.SUCCESS, index });

        if (response.status === 201) {
          const { data } = response;
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_FILE_NAME', { file: data.file_name, index });
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_URI', { uri: data.file_download_uri, index });
          commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_SIZE', { size: data.size, index });
        }
      } catch {
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES_STATUS', { imageUploadStatus: IMAGE_UPLOAD_STATUS.ERROR, index });
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_FILE_NAME', { file: '', index });
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_URI', { uri: '', index });
        commit('SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGE_SIZE', { size: 0, index });
      }
    },
    async deleteUploadedImage({ fileName }) {
      try {
        const response = await mediaRepository.deleteMedia({
          key: fileName,
          domain: 'publication',
        });

        return new Promise((resolve) => {
          resolve(response);
        });
      } catch (error) {
        return new Promise(() => {
          throw new Error(error);
        });
      }
    },
    async handleDeleteUpload({ commit, dispatch }, { fileName, index }) {
      try {
        await dispatch('deleteUploadedImage', { fileName, index });
        commit('RESET_FORM_IMAGE_STATE', index);
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteCoverImage({ commit, dispatch }, fileName) {
      try {
        await dispatch('deleteUploadedImage', fileName);
        commit('RESET_FORM_COVER_IMAGE_STATE');
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteTermAndConditionImage({ commit, dispatch }, fileName) {
      try {
        await dispatch('deleteUploadedImage', fileName);
        commit('RESET_FORM_TERM_AND_CONDITION_COVER_IMAGE_STATE');
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteProcedureImage({ commit, dispatch }, fileName) {
      try {
        await dispatch('deleteUploadedImage', fileName);
        commit('RESET_FORM_PROCEDURES_COVER_IMAGE_STATE');
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteInfographicImage({ commit, dispatch }, { fileName, index }) {
      try {
        await dispatch('deleteUploadedImage', fileName);
        commit('RESET_FORM_INFOGRAPHIC_IMAGE_STATE', index);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
