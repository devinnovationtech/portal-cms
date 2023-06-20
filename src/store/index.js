import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import auth from './modules/auth';
import alert from './modules/alert';
import news from './modules/news';
import masterDataForm from './modules/public-service/masterDataForm';
import publicationForm from './modules/public-service/publicationForm';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'news-preview',
  storage: window.localStorage,
  reducer: (state) => ({
    news: {
      newsPreview: state.news.newsPreview,
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
  plugins: [vuexLocalStorage.plugin],
});
