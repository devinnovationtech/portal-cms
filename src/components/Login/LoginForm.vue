<template>
  <section
    data-cy="login__form-container"
    class="p-8 bg-white rounded-xl"
  >
    <h2
      data-cy="login__form-title"
      class="text-green-700 text-2xl font-medium mb-3"
    >
      Log In
    </h2>
    <p
      data-cy="login__form-subtitle"
      class="text-xs text-gray-700 leading-5 mb-5"
    >
      Selamat Datang! Silakan masukkan e-mail dan kata sandi untuk masuk ke Portal Jabar Content Management System.
    </p>
    <div v-if="isError">
      <JdsSectionMessage
        :show="isError"
        variant="error"
        dismissible
        :message="error.message"
        class="mb-5"
        data-cy="login__error-message"
        @click:close="clearErrorMessage"
      />
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1 mb-5">
        <label
          for="email"
          data-cy="login__email-label"
          class="text-gray-800 text-[15px]"
        >
          E-mail
        </label>
        <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
          <div class="bg-gray-100 p-2 border-r border-gray-200 flex justify-center items-center">
            <MailIcon
              width="16"
              height="16"
              class="fill-gray-700"
            />
          </div>
          <input
            id="email"
            ref="email-input"
            v-model.trim="email"
            data-cy="login__email-input"
            type="email"
            placeholder="Contoh: agus.permadi@gmail.com"
            :disabled="isError"
            class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
            :class="{'cursor-not-allowed': isError}"
          >
        </div>
      </div>
      <div class="flex flex-col gap-1 mb-4">
        <label
          for="password"
          data-cy="login__password-label"
          class="text-gray-800 text-[15px]"
        >
          Kata Sandi
        </label>
        <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
          <div class="bg-gray-100 p-2 border-r border-gray-200 flex justify-center items-center">
            <KeyIcon
              width="16"
              height="16"
              class="fill-gray-700"
            />
          </div>
          <input
            id="password"
            ref="password-input"
            v-model="password"
            data-cy="login__password-input"
            :type="passwordInputType"
            placeholder="Masukkan kata sandi"
            :disabled="isError"
            class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
            :class="{'cursor-not-allowed': isError}"
          >
          <div
            v-show="isPasswordIconVisible"
            class="p-2 flex justify-center items-center cursor-pointer"
            data-cy="login__password-visibility"
            @click="togglePasswordInputVisibility"
          >
            <JdsIcon
              :name="passwordIconName"
              size="16px"
            />
          </div>
        </div>
      </div>
      <div class="w-full text-right mb-6">
      <!-- NOTE: Temporarily hide this feature -->
        <!-- <div
          ref="forgot-password-link"
          class="text-[#1E88E5] inline-block text-sm cursor-pointer"
          @click="toggleForgotPasswordModal"
        >
          Lupa kata sandi?
        </div> -->
      </div>
      <button
        v-if="!isLoading"
        ref="login-button"
        data-cy="login__login-button"
        type="submit"
        :disabled="!isValidInput || isError"
        class="rounded-lg text-sm py-[9px] w-full font-bold leading-6 uppercase focus:outline-none"
        :class="[ isValidInput && !isError ? 'text-white bg-green-700 hover:bg-green-800' : 'text-gray-500 bg-gray-200 cursor-not-allowed']"
      >
        Masuk
      </button>
      <button
        v-else
        ref="login-button"
        data-cy="login__login-button--loading"
        type="submit"
        :disabled="!isValidInput"
        class="flex justify-between items-center text-gray-500 bg-gray-200 rounded-lg text-sm px-4 py-[9px] w-full font-bold leading-6 focus:outline-none"
      >
        Mengecek Akun
        <JdsSpinner
          v-show="isLoading"
          size="16px"
        />
      </button>
    </form>
    <ForgotPassword
      ref="forgot-password-modal"
      data-cy="login__forgot-password-modal"
      :open="isForgotPasswordModalOpen"
      @close="toggleForgotPasswordModal"
    />
  </section>
</template>

<script>
import ForgotPassword from '@/components/Login/ForgotPassword';
import { isValidEmail } from '@/common/helpers/validation';
import MailIcon from '@/assets/icons/mail.svg?inline';
import KeyIcon from '@/assets/icons/key.svg?inline';

export default {
  name: 'LoginForm',
  components: {
    ForgotPassword,
    MailIcon,
    KeyIcon,
  },
  data() {
    return {
      email: '',
      password: '',
      isPasswordIconVisible: false,
      isPasswordInputVisible: false,
      loading: false,
      error: null,
      loginAttempts: 0,
      isForgotPasswordModalOpen: false,
    };
  },
  computed: {
    passwordInputType() {
      return this.isPasswordInputVisible ? 'text' : 'password';
    },
    passwordIconName() {
      return this.isPasswordInputVisible ? 'eye-off' : 'eye';
    },
    isError() {
      return !!this.error;
    },
    isLoading() {
      return this.loading;
    },
    isValidInput() {
      return this.email !== '' && isValidEmail(this.email) && this.password !== '';
    },
  },
  watch: {
    password() {
      this.setPasswordIconVisibility(this.password !== '');
    },
    loginAttempts() {
      if (this.loginAttempts >= 3) {
        this.setForgotPasswordModal(true);
      }
    },
    isForgotPasswordModalOpen() {
      if (this.isForgotPasswordModalOpen) {
        this.resetLoginAttempts();
      }
    },
  },
  methods: {
    setPasswordIconVisibility(value) {
      this.isPasswordIconVisible = value;
    },
    togglePasswordInputVisibility() {
      this.setPasswordInputVisibility(!this.isPasswordInputVisible);
    },
    setPasswordInputVisibility(value) {
      this.isPasswordInputVisible = value;
    },
    clearErrorMessage() {
      this.error = null;
    },
    resetLoginAttempts() {
      this.loginAttempts = 0;
    },
    toggleForgotPasswordModal() {
      this.setForgotPasswordModal(!this.isForgotPasswordModalOpen);
    },
    setForgotPasswordModal(value) {
      this.isForgotPasswordModalOpen = value;
    },
    async onSubmit() {
      try {
        this.loading = true;
        await this.$store.dispatch('auth/login', { email: this.email, password: this.password });
        this.$router.push({ path: '/' });
      } catch (error) {
        if (error.status === 401) {
          const errorMessage = error.data?.message || '';
          if (errorMessage.includes('credentials')) {
            this.error = { message: 'Email atau kata sandi tidak sesuai' };
            this.loginAttempts += 1;
          } else if (errorMessage.includes('account')) {
            this.error = { message: 'Akun Anda tidak aktif' };
          }
        } else {
          this.error = { message: 'Terjadi kesalahan pada sistem kami' };
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
