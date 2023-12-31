<template>
  <BaseModal :open="open">
    <div
      data-cy="forgot-password-modal__container"
      class="w-full h-full px-2 pb-4"
    >
      <h1
        data-cy="forgot-password-modal__title"
        class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6"
      >
        Lupa Kata Sandi
      </h1>
      <div class="flex gap-8">
        <div class="w-[68px] h-[55px]">
          <img
            src="@/assets/icons/mailbox.svg"
            alt="Mailbox"
            width="68"
            height="55"
          >
        </div>
        <div
          v-if="!success"
          class="max-w-sm"
        >
          <p class="text-sm leading-6 to-blue-gray-800 mb-4">
            Masukkan alamat email Anda agar dapat kami kirimkan tautan untuk dapat merubah kata sandi.
          </p>
          <div v-if="isError">
            <JdsSectionMessage
              :show="isError"
              variant="error"
              dismissible
              :message="error.message"
              class="mb-5"
              @click:close="clearErrorMessage"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label
              for="email"
              data-cy="forgot-password-modal__email-label"
              class="text-gray-800 text-[15px]"
            >
              Email
            </label>
            <div class="border rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700 border-gray-500">
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
                data-cy="forgot-password-modal__email-input"
                type="email"
                placeholder="Contoh: agus.permadi@gmail.com"
                class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
                :class="{'cursor-not-allowed': isError}"
                :disabled="isError"
              >
            </div>
          </div>
        </div>
        <div
          v-else
          data-cy="forgot-password-modal__submit-message"
          class="max-w-sm"
        >
          <p class="text-sm leading-6 to-blue-gray-800 mb-4">
            Terima kasih telah memasukkan alamat email Anda. Kami telah mengirimkan tautan verifikasi ke <span class="text-[#1E88E5]">{{ email }}</span>
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div
        v-if="!success"
        class="flex w-full h-full items-center justify-end gap-4 p-2"
      >
        <BaseButton
          data-cy="forgot-password-modal__cancel-button"
          class="border-green-700 hover:bg-green-50 text-sm text-green-700"
          @click="onClose"
        >
          Batal
        </BaseButton>
        <BaseButton
          data-cy="forgot-password-modal__submit-button"
          class="bg-green-700 hover:bg-green-600 text-sm text-white"
          @click="onSubmit"
        >
          Kirim
        </BaseButton>
      </div>
      <div
        v-else
        class="flex w-full h-full items-center justify-center gap-4 p-2"
      >
        <BaseButton
          data-cy="forgot-password-modal__accept-button"
          class="bg-green-700 hover:bg-green-600 text-sm text-white"
          @click="onClose"
        >
          Saya Mengerti
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';
import MailIcon from '@/assets/icons/mail.svg?inline';
import { isValidEmail } from '@/common/helpers/validation';

export default {
  name: 'ForgotPassword',
  components: {
    BaseModal,
    BaseButton,
    MailIcon,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      error: {},
      success: false,
    };
  },
  computed: {
    isError() {
      return !!this.error.message;
    },
  },
  methods: {
    validateEmail() {
      if (this.email === '') {
        this.error = { message: 'Email belum dimasukkan' };
      } else if (!isValidEmail(this.email)) {
        this.error = { message: 'Email tidak valid' };
      }
    },
    clearErrorMessage() {
      this.error = {};
    },
    onClose() {
      this.success = false;
      this.email = '';
      this.clearErrorMessage();
      this.$emit('close');
    },
    onSubmit() {
      this.clearErrorMessage();
      this.validateEmail();

      if (!this.isError) {
        this.requestChangePassword();
      }
    },
    requestChangePassword() {
      try {
        // TODO: send a request to change password
        this.success = true;
      } catch (error) {
        this.error = { message: error.message };
      }
    },
  },
};
</script>
