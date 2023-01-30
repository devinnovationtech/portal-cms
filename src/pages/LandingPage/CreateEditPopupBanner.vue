<template>
  <main class="pb-14">
    <ValidationObserver ref="form">
      <form
        class="popup-banner__form"
        @submit.prevent="onSubmit"
      >
        <!-- Submit -->
        <HeaderMenu>
          <div class="flex gap-4">
            <BaseButton
              type="submit"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
            >
              <p>
                Simpan Data
              </p>
            </BaseButton>
          </div>
        </HeaderMenu>

        <div class="w-full h-full py-8 px-5 rounded-xl bg-white">
          <!-- Banner Upload -->
          <section class="grid grid-cols-2 gap-x-8 gap-y-3 mb-8">
            <div class="col-span-2 flex justify-between">
              <h2 class="font-lato font-bold text-base leading-6 text-blue-gray-800">
                Upload Banner Pop-up
              </h2>
            </div>
            <div>
              <div class="flex items-center justify-center mb-6">
                <span class="text-blue-gray-800 text-[15px] whitespace-nowrap">
                  Banner Dekstop
                </span>
                <span class="w-full h-[2px] ml-4 bg-gray-300" />
              </div>
              <ValidationProvider
                ref="desktopImageUploader"
                v-slot="{ errors }"
                rules="required|image|size:5000"
              >
                <Dropzone
                  :is-error="errors.length > 0"
                  :disabled="false"
                  @change="handleUploadImage($event, 'DESKTOP')"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 5 Mb dengan resolusi 2837 x 1667. <br>
                      (.jpg dan.png )
                    </span>
                  </template>
                </Dropzone>
                <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div>
              <div class="flex items-center justify-center mb-6">
                <span class="text-blue-gray-800 text-[15px] whitespace-nowrap">
                  Banner Tablet/Mobile
                </span>
                <span class="w-full h-[2px] ml-4 bg-gray-300" />
              </div>
              <ValidationProvider
                ref="mobileImageUploader"
                v-slot="{ errors }"
                rules="required|image|size:2000"
              >
                <Dropzone
                  :is-error="errors.length > 0"
                  :disabled="false"
                  @change="handleUploadImage($event, 'MOBILE')"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 2 Mb dengan resulosi 1503 x 2419. <br>
                      (.jpg dan.png )
                    </span>
                  </template>
                </Dropzone>
                <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </section>
          <!-- Title -->
          <section>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <div class="flex flex-col">
                <label
                  class="font-lato text-blue-gray-800 mb-3 text-[15px]"
                >
                  Judul Pop-up
                </label>

                <JdsInputText
                  v-model.trim="form.title"
                  placeholder="Masukkan judul pop-up"
                  :error-message="errors[0]"
                />
              </div>
            </ValidationProvider>
          </section>
          <!-- Customize button -->
          <section>
            <div class="flex items-center py-6">
              <h2 class="font-lato font-medium text-sm leading-6 text-green-800 whitespace-nowrap">
                Kostumisasi Tombol <span class="text-gray-500">(Opsional)</span>
              </h2>
              <div class="w-full h-[2px] bg-gray-300 mx-4" />
              <div class="flex items-center">
                <JdsToggle v-model="isCustomizeButton" />
              </div>
            </div>
            <div class="mb-8">
              <JdsSectionMessage
                show
                variant="info"
                message="Jika tidak diaktifkan maka default teks pada tombol adalah “Tutup”"
                responsiveness="full-width"
              />
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              :rules="{
                'required': isCustomizeButton
              }"
            >
              <div class="flex flex-col mb-4">
                <label
                  class="font-lato text-blue-gray-800 mb-3 text-[15px]"
                >
                  Judul Tombol
                </label>
                <JdsInputText
                  v-model.trim="form.customButton.label"
                  placeholder="Masukkan judul tombol"
                  :disabled="!isCustomizeButton"
                  :error-message="errors[0]"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              :rules="{
                'required': isCustomizeButton,
                'url': isCustomizeButton
              }"
            >
              <div class="flex flex-col">
                <label
                  class="font-lato text-blue-gray-800 mb-3 text-[15px]"
                >
                  Link Redirect
                </label>
                <JdsInputText
                  v-model="form.customButton.link"
                  placeholder="Masukkan judul pop-up"
                  :disabled="!isCustomizeButton"
                  :error-message="errors[0]"
                />
              </div>
            </ValidationProvider>
          </section>
          <!-- Schedule -->
          <section class="grid grid-cols-2 gap-x-8">
            <div class="flex items-center py-6 col-span-2">
              <h2 class="font-lato font-medium text-sm leading-6 text-green-800 whitespace-nowrap">
                Penjadwalan <span class="text-gray-500">(Opsional)</span>
              </h2>
              <div class="w-full h-[2px] bg-gray-300 mx-4" />
              <div class="flex items-center">
                <JdsToggle v-model="isScheduled" />
              </div>
            </div>
            <div class="col-span-2 mb-8">
              <JdsSectionMessage
                show
                variant="info"
                message="Jika tidak diaktifkan maka default penayangan adalah tanpa batas waktu"
                responsiveness="full-width"
              />
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              :rules="{
                'required': isScheduled
              }"
            >
              <div class="duration flex flex-col">
                <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                  Durasi Penayangan
                </label>
                <JdsSelect
                  v-model="form.scheduler.duration"
                  :options="scheduleOptions"
                  :error-message="errors[0]"
                  :disabled="!isScheduled"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              :rules="{
                'required': isScheduled
              }"
            >
              <div class="flex flex-col">
                <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                  Waktu Penayangan
                </label>
                <div class="date-input flex items-center">
                  <JdsDateInput
                    v-model="form.scheduler.startDate"
                    :error-message="errors[0]"
                    :disabled="!isScheduled"
                  />
                  <p class="min-w-[150px] ml-4 whitespace-nowrap text-gray-500 text-[15px]">
                    hingga <span class="text-gray-800">99/99/99</span>
                  </p>
                </div>
              </div>
            </ValidationProvider>
          </section>
        </div>
      </form>
    </ValidationObserver>
  </main>
</template>

<script>
import Dropzone from '@/common/components/Dropzone';
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, image, size } from 'vee-validate/dist/rules';
import { POPUP_BANNER_SCHEDULE_OPTIONS } from '@/common/constants';

extend('required', {
  ...required,
  message: 'Field ini wajib diisi!',
});

extend('image', {
  ...image,
  message: 'File yang anda pilih bukan gambar!',
});

extend('size', {
  ...size,
  message: 'File yang anda masukan melebihi size batas maksimal!',
});

extend('url', {
  validate(value) {
    // eslint-disable-next-line no-useless-escape
    const urlPattern = new RegExp(/^(https?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g);
    return urlPattern.test(value);
  },
  message: 'Link yang anda masukkan salah!',
});

export default {
  name: 'CreateEditPopupBanner',
  components: {
    Dropzone,
    HeaderMenu,
    BaseButton,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        imageDesktop: '',
        imageMobile: '',
        title: '',
        customButton: {
          label: '',
          link: '',
        },
        scheduler: {
          duration: 5,
          startDate: '',
        },
      },
      isCustomizeButton: true,
      isScheduled: true,
      scheduleOptions: POPUP_BANNER_SCHEDULE_OPTIONS,
    };
  },
  mounted() {
    /**
     * Add disabled attribute manually because currently JdsDateInput
     * component doesn't have disabled state/functionality
     */
    const dateInput = document.querySelector('.date-input input');
    const dateInputWrapperEl = document.querySelector('.date-input .jds-date-input__input');

    this.$watch('isScheduled', (value) => {
      if (value === false) {
        dateInput.setAttribute('disabled', true);
        dateInputWrapperEl.setAttribute('disabled', true);
      } else {
        dateInput.removeAttribute('disabled');
        dateInputWrapperEl.removeAttribute('disabled');
      }
    });
  },
  methods: {
    async validateSelectedImage(file, type) {
      if (type === 'DESKTOP') {
        const { valid } = await this.$refs.desktopImageUploader.validate(file);
        return valid;
      }

      if (type === 'MOBILE') {
        const { valid } = await this.$refs.mobileImageUploader.validate(file);
        return valid;
      }

      return false;
    },
    async handleUploadImage(file, type) {
      const isValid = await this.validateSelectedImage(file, type);

      // @todo: add upload functionality
      console.log({ isValid });
    },
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }

        // @todo: add submit form functionality
        console.log({ success });
      });
    },
  },
};
</script>

<style>
/**
 * Override default Jds-Select styling
 */
.popup-banner__form .duration .jds-popover__activator,
.popup-banner__form .duration .jds-select,
.popup-banner__form .duration .jds-input-text {
  width: 100% !important;
}

/**
 * Override default Jds-DateInput styling
 */
.popup-banner__form .date-input .jds-popover,
.popup-banner__form .date-input .jds-popover__activator,
.popup-banner__form .date-input .jds-date-input {
  width: 100% !important;
}
.popup-banner__form .date-input .jds-date-input__input[disabled] {
  background: #eee !important;
}

.popup-banner__form .date-input .jds-popover {
  visibility: unset !important;
}

.popup-banner__form .date-input .jds-form-control-label {
  font-size: 14px !important;
  margin-bottom: 4px !important;
}

.popup-banner__form .date-input .jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}
.popup-banner__form .date-input .jds-calendar {
  max-width: none !important;
}
.popup-banner__form .date-input .jds-calendar .jds-calendar__list-of-days,
.popup-banner__form .date-input .jds-calendar .jds-calendar__days {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
</style>
