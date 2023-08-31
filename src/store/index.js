import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import auth from './modules/auth';
import alert from './modules/alert';
import news from './modules/news';
import masterDataForm from './modules/public-service/masterDataForm';
import publicationForm from './modules/public-service/publicationForm';

Vue.use(Vuex);

const newsPreviewLocalStorage = new VuexPersist({
  key: 'news-preview',
  storage: window.localStorage,
  reducer: (state) => ({
    news: {
      newsPreview: state.news.newsPreview,
    },
  }),
});

const publicationFormPreviewLocalStorage = new VuexPersist({
  key: 'publication-form-preview',
  storage: window.localStorage,
  reducer: (state) => ({
    publicationForm: {
      stepOne: state.publicationForm.stepOne,
      stepTwo: state.publicationForm.stepTwo,
      stepThree: state.publicationForm.stepThree,
    },
  }),
});

export default new Vuex.Store({
  modules: {
    auth,
    alert,
    news,
    masterDataForm,
    publicationForm,
  },
  plugins: [newsPreviewLocalStorage.plugin, publicationFormPreviewLocalStorage.plugin],
});
