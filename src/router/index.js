import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  /**
   * TODO: handle maintenance logic using Feature Flags!
   * this `isMaintenance` checking should be refactored and changed
   * dynamically using Feature Flag/Toggle
   */
  const isMaintenance = parseInt(process.env.VUE_APP_IS_MAINTENANCE, 10) || false;

  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const privateRoute = to.matched.some((record) => !record.meta.public);
  const publicRoute = to.matched.some((record) => record.meta.public);

  if (isMaintenance && to.path !== '/maintenance') next('/maintenance');
  else if (!isMaintenance && privateRoute && !isAuthenticated) next('/login');
  else if (!isMaintenance && publicRoute && isAuthenticated) next('/');
  else next();
});

export default router;
