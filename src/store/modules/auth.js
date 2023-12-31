/* eslint-disable camelcase */
import jwtDecode from 'jwt-decode';
import { getAllCookies, removeAllCookies, setCookies } from '@/common/helpers/cookies';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';

const authRepository = RepositoryFactory.get('auth');
const userRepository = RepositoryFactory.get('user');

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    permissions: [],
  },
  getters: {
    isAuthenticated(state) {
      return !!(state.token && state.user);
    },
    user(state) {
      return state.user;
    },
    permissions(state) {
      return state.permissions;
    },
    unitName(state) {
      return state.user?.unit?.name ?? '';
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_PERMISSIONS(state, payload) {
      state.permissions = payload;
    },
  },
  actions: {
    async getUser({ dispatch }) {
      const { access_token, refresh_token } = getAllCookies();
      if (!access_token && !refresh_token) return;

      try {
        const response = await userRepository.getUser();
        dispatch('setToken', { access_token, refresh_token });
        dispatch('setUser', response.data.data);
      } catch (error) {
        dispatch('setToken', null);
        dispatch('setUser', null);
      }
    },
    getPermissions({ dispatch }) {
      const { access_token, refresh_token } = getAllCookies();
      if (!access_token && !refresh_token) return;

      const decodedToken = jwtDecode(access_token);
      const { permissions } = decodedToken;
      dispatch('setPermissions', permissions);
    },
    /**
     * Logging user in
     * @param {Object} payload - The object contains email and password
     * @returns {Promise}
     */
    async login({ dispatch }, payload) {
      try {
        const response = await authRepository.login(payload);
        await Promise.all([
          setCookies(response.data),
          dispatch('setToken', response.data),
          dispatch('getUser', response.data),
          dispatch('getPermissions'),
        ]);
      } catch (error) {
        removeAllCookies();
        dispatch('setToken', null);
        dispatch('setUser', null);
        dispatch('setPermissions', []);

        if (error.response) {
          throw error.response;
        }
        throw error;
      }
    },
    /**
     * Clear all cookies
     * reset user and token
     */
    logout({ dispatch }) {
      removeAllCookies();
      dispatch('setToken', null);
      dispatch('setUser', null);
      dispatch('setPermissions', []);
    },
    /**
     * Get new token
     * @param {Object} payload
     */
    async refreshToken({ dispatch }, payload) {
      try {
        const response = await authRepository.refreshToken(payload);
        setCookies(response.data);
        return response;
      } catch (error) {
        removeAllCookies();
        dispatch('setToken', null);
        dispatch('setUser', null);
        dispatch('setPermissions', []);
        throw new Error(error);
      }
    },
    /**
     * Set user data
     * @param {Object} payload - The object contains user data obtained from the api's response
     */
    setUser({ commit }, payload) {
      commit('SET_USER', payload);
    },
    /**
     * Set token
     * @param {Object} payload - The object contains access token, refresh token and expiration
     */
    setToken({ commit }, payload) {
      commit('SET_TOKEN', payload);
    },
    /**
     * Set permissions
     * @param {Array} payload - The Array contains user permissions
     */
    setPermissions({ commit }, payload) {
      commit('SET_PERMISSIONS', payload);
    },
  },
};
