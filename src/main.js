import Vue from 'vue';
import { DesignSystem } from '@jabardigitalservice/jds-design-system';
import PortalVue from 'portal-vue';
import toast from '@/plugins/toast';
import permission from '@/plugins/permission';
import VueMeta from 'vue-meta';
import { axiosInterceptors } from './repositories/Repository';
import router from './router';
import store from './store';
import App from './App';
import './assets/styles/main.css';

Vue.use(DesignSystem);
Vue.use(PortalVue);
Vue.use(toast);
Vue.use(permission);
Vue.use(VueMeta);
axiosInterceptors(store);

Vue.config.productionTip = false;

if (process.env.VUE_APP_ENV === 'local') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

store.dispatch('auth/getUser')
  .then(() => store.dispatch('auth/getPermissions'))
  .then(() => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  });
