<template>
  <main class="pb-14">
    <ValidationObserver
      ref="form"
      v-slot="{ invalid }"
    >
      <form
        class="popup-banner__form"
        @submit.prevent="onConfirmation"
      >
        <!-- Submit -->
        <HeaderMenu>
          <div class="flex gap-4">
            <BaseButton
              type="submit"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
              :disabled="invalid"
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
                  Banner Desktop
                </span>
                <span class="w-full h-[2px] ml-4 bg-gray-300" />
              </div>
              <ValidationProvider
                ref="desktopImageUploader"
                v-slot="{ errors }"
                rules="required|image|maxdimensions:2837,1667|size:2000"
              >
                <Dropzone
                  :is-error="errors.length > 0"
                  :disabled="!!imageDesktopFile"
                  @change="handleUploadByType($event, 'DESKTOP')"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 2 Mb dengan resolusi 2837 x 1667. <br>
                      (.jpg dan.png )
                    </span>
                  </template>
                </Dropzone>
                <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
              </ValidationProvider>
              <transition name="slide-fade">
                <DropzoneUploadProgress
                  v-if="!!imageDesktopFile"
                  :file="imageDesktopFile"
                  :progress="imageDesktopUploadProgress"
                  :status="imageDesktopUploadStatus"
                  :image-url="form.image.desktop.url"
                  :image-size="form.image.desktop.size"
                  class="mt-4"
                  @retry="handleRetryUpload('DESKTOP')"
                  @delete="handleDeleteUpload('DESKTOP')"
                />
              </transition>
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
                rules="required|image|maxdimensions:1503,2419|size:1000"
              >
                <Dropzone
                  :is-error="errors.length > 0"
                  :disabled="!!imageMobileFile"
                  @change="handleUploadByType($event, 'MOBILE')"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 1 Mb dengan resulosi 1503 x 2419. <br>
                      (.jpg dan.png )
                    </span>
                  </template>
                </Dropzone>
                <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
              </ValidationProvider>
              <transition name="slide-fade">
                <DropzoneUploadProgress
                  v-if="!!imageMobileFile"
                  :file="imageMobileFile"
                  :progress="imageMobileUploadProgress"
                  :status="imageMobileUploadStatus"
                  :image-url="form.image.mobile.url"
                  :image-size="form.image.mobile.size"
                  class="mt-4"
                  @retry="handleRetryUpload('MOBILE')"
                  @delete="handleDeleteUpload('MOBILE')"
                />
              </transition>
            </div>
          </section>

          <section>
            <ValidationProvider
              rules="required"
            >
              <input
                v-model="form.image.desktop.url"
                type="text"
                hidden
              >
            </ValidationProvider>
            <ValidationProvider
              rules="required"
            >
              <input
                v-model="form.image.mobile.url"
                type="text"
                hidden
              >
            </ValidationProvider>
          </section>

          <!-- Title -->
          <section>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|max:50"
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

          <!-- Customize Button -->
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
              :rules="isCustomizeButton ? 'max:20|required' : ''"
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
                  placeholder="contoh: https://"
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
              v-slot="{ errors, classes }"
              :rules="{
                'required': isScheduled,
                'nobackdate': true
              }"
              immediate
            >
              <div class="flex flex-col">
                <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                  Waktu Penayangan
                </label>
                <div class="date-input flex items-start">
                  <div class="relative w-full">
                    <JdsDateInput
                      v-model="form.scheduler.startDate"
                      :class="classes"
                    />
                    <p
                      v-show="errors[0]"
                      class="font-lato text-[13px] leading-6 text-[#D32F2F]"
                    >
                      {{ errors[0] }}
                    </p>
                    <div
                      v-if="!isScheduled"
                      class="absolute inset-0 bg-gray-500 opacity-20 rounded-md cursor-not-allowed"
                    />
                  </div>
                  <div class="min-w-[150px] ml-4 mt-2 ">
                    <p
                      v-show="isScheduled"
                      class="whitespace-nowrap text-gray-500 text-[15px]"
                    >
                      hingga <strong class="text-gray-800">{{ endDate }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </ValidationProvider>
          </section>
        </div>
      </form>
    </ValidationObserver>

    <!-- Confirmation Popup -->
    <BaseModal :open="submitStatus === 'CONFIRMATION'">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Simpan Banner
        </h1>
        <div class="flex items-center gap-4">
          <p class="text-sm leading-6 to-blue-gray-800">
            Apakah Anda ingin menyimpan banner ini terlebih dahulu?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="onCancel"
          >
            Tidak
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="handleSubmit"
          >
            Ya, simpan banner
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Submit Progress -->
    <ProgressModal
      :open="submitStatus === 'LOADING'"
      :value="submitProgress"
    />

    <!-- Success/Error Message -->
    <BaseModal :open="submitStatus === 'SUCCESS' || submitStatus === 'ERROR'">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ messageTitle }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            :name="messageIconName"
            :class="messageIconClassName"
          />
          <p class="text-sm leading-6 to-blue-gray-800">
            {{ messageBody }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="messageAction"
          >
            Saya Mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import Dropzone from '@/common/components/Dropzone';
import DropzoneUploadProgress from '@/common/components/DropzoneUploadProgress';
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import ProgressModal from '@/common/components/ProgressModal';

import { formatDate, addDay } from '@/common/helpers/date.js';
import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { POPUP_BANNER_SCHEDULE_OPTIONS } from '@/common/constants';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const mediaRepository = RepositoryFactory.get('media');
const bannerRepository = RepositoryFactory.get('popupBanner');

const IMAGE_UPLOAD_STATUS = Object.freeze({
  NONE: 'NONE',
  UPLOADING: 'UPLOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  HASDEFAULT: 'HASDEFAULT',
});

const FORM_SUBMIT_STATUS = Object.freeze({
  NONE: 'NONE',
  CONFIRMATION: 'CONFIRMATION',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});

export default {
  name: 'CreateEditPopupBanner',
  components: {
    Dropzone,
    DropzoneUploadProgress,
    HeaderMenu,
    BaseButton,
    BaseModal,
    ProgressModal,
    ValidationProvider,
    ValidationObserver,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      if (to.meta.mode === 'create') {
        next();
      } else {
        const { id } = to.params;
        const response = await bannerRepository.getBannerById(id);
        const { is_live: isLive } = response.data.data;

        if (isLive === 0) {
          next();
        } else {
          next('/landing-page');
        }
      }
    } catch (error) {
      next('/landing-page');
    }
  },
  data() {
    return {
      form: {
        image: {
          desktop: {
            url: '',
            fileName: '',
            size: 0,
          },
          mobile: {
            url: '',
            fileName: '',
            size: 0,
          },
        },
        title: '',
        customButton: {
          label: '',
          link: '',
        },
        scheduler: {
          duration: 2,
          startDate: '',
        },
      },
      imageDesktopFile: null,
      imageMobileFile: null,
      imageDesktopUploadProgress: 0,
      imageDesktopUploadStatus: IMAGE_UPLOAD_STATUS.NONE,
      imageMobileUploadProgress: 0,
      imageMobileUploadStatus: IMAGE_UPLOAD_STATUS.NONE,
      isCustomizeButton: true,
      isScheduled: true,
      scheduleOptions: POPUP_BANNER_SCHEDULE_OPTIONS,
      submitStatus: FORM_SUBMIT_STATUS.NONE,
      submitProgress: 0,
      successMessage: {
        title: '',
        body: '',
      },
      errorMessage: {
        title: '',
        body: '',
      },
    };
  },
  computed: {
    mode() {
      return this.$route.meta?.mode || 'create';
    },
    isEditMode() {
      return this.mode === 'edit';
    },
    endDate() {
      const { duration, startDate } = this.form.scheduler;

      if (duration && startDate) {
        // normalized date because JdsDateInput doesn't return a valid date format
        const normalizedStartDate = this.normalizeDate(startDate);

        const endDate = addDay(normalizedStartDate, duration);
        return formatDate(endDate);
      }

      return null;
    },
    messageTitle() {
      return this.submitStatus === 'SUCCESS' ? this.successMessage.title : this.errorMessage.title;
    },
    messageBody() {
      return this.submitStatus === 'SUCCESS' ? this.successMessage.body : this.errorMessage.body;
    },
    messageIconName() {
      return this.submitStatus === 'SUCCESS' ? 'check-mark-circle' : 'warning';
    },
    messageIconClassName() {
      return this.submitStatus === 'SUCCESS' ? 'text-green-600' : 'text-red-600';
    },
  },
  watch: {
    isScheduled(value) {
      if (value === false) {
        this.form.scheduler.duration = -1; // -1 is a value of infinite duration
        this.form.scheduler.startDate = formatDate(new Date(), 'dd/MM/yyyy'); // get today's date
      } else {
        this.form.scheduler.duration = 2; // set to default value
      }
    },
  },
  async mounted() {
    if (this.isEditMode) {
      try {
        const { id } = this.$route.params;
        const response = await this.fetchData(id);
        const { data } = response.data;
        this.setInitialData(data);
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data banner.',
        });
      }
    }
  },
  methods: {
    normalizeDate(initialDate) {
      if (!initialDate) return null;

      const date = initialDate.split('/');
      const year = date[2];
      const month = date[1] - 1;
      const day = date[0];

      return new Date(year, month, day);
    },
    messageAction() {
      if (this.submitStatus === FORM_SUBMIT_STATUS.SUCCESS) {
        this.$router.push('/landing-page');
      } else {
        this.resetSubmitState();
      }
    },
    async fetchData(id) {
      try {
        const response = await bannerRepository.getBannerById(id);
        return new Promise((resolve) => {
          resolve(response);
        });
      } catch (error) {
        return new Promise(() => {
          throw new Error(error);
        });
      }
    },
    async handleUploadByType(file, type) {
      const isValid = await this.validateSelectedImage(file, type);

      if (!isValid) return;

      if (type === 'DESKTOP') {
        this.uploadDesktopImage(file);
      }

      if (type === 'MOBILE') {
        this.uploadMobileImage(file);
      }
    },
    async uploadDesktopImage(file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      try {
        this.imageDesktopFile = file;
        this.imageDesktopUploadProgress = 0;
        this.imageDesktopUploadStatus = IMAGE_UPLOAD_STATUS.UPLOADING;

        const response = await mediaRepository.uploadMediaWithProgress(formData, (progress) => {
          this.imageDesktopUploadProgress = progress;
        });

        this.imageDesktopUploadStatus = IMAGE_UPLOAD_STATUS.SUCCESS;

        if (response.status === 201) {
          const { data } = response;
          this.form.image.desktop.url = data.file_download_uri;
          this.form.image.desktop.fileName = data.file_name;
          this.form.image.desktop.size = data.size;
        }
      } catch (error) {
        this.imageDesktopUploadStatus = IMAGE_UPLOAD_STATUS.ERROR;
        this.form.image.desktop.url = '';
        this.form.image.desktop.fileName = '';
        this.form.image.desktop.size = 0;
      }
    },
    async uploadMobileImage(file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      try {
        this.imageMobileFile = file;
        this.imageMobileUploadProgress = 0;
        this.imageMobileUploadStatus = IMAGE_UPLOAD_STATUS.UPLOADING;

        const response = await mediaRepository.uploadMediaWithProgress(formData, (progress) => {
          this.imageMobileUploadProgress = progress;
        });

        this.imageMobileUploadStatus = IMAGE_UPLOAD_STATUS.SUCCESS;

        if (response.status === 201) {
          const { data } = response;
          this.form.image.mobile.url = data.file_download_uri;
          this.form.image.mobile.fileName = data.file_name;
          this.form.image.mobile.size = data.size;
        }
      } catch (error) {
        this.imageMobileUploadStatus = IMAGE_UPLOAD_STATUS.ERROR;
        this.form.image.mobile.url = '';
        this.form.image.mobile.fileName = '';
        this.form.image.mobile.size = 0;
      }
    },
    async deleteUploadedImage(fileName) {
      try {
        const response = await mediaRepository.deleteMedia({
          key: fileName,
          domain: 'pop-up-banners',
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
    handleSubmit() {
      if (this.mode === 'create') {
        this.submitForm();
      } else {
        this.updateForm();
      }
    },
    handleRetryUpload(type) {
      if (type === 'DESKTOP') {
        this.uploadDesktopImage(this.imageDesktopFile);
      } else {
        this.uploadMobileImage(this.imageMobileFile);
      }
    },
    async handleDeleteUpload(type) {
      try {
        if (type === 'DESKTOP') {
          await this.deleteUploadedImage(this.form.image.desktop.fileName);
          this.resetDesktopImageState();
        } else {
          await this.deleteUploadedImage(this.form.image.mobile.fileName);
          this.resetMobileImageState();
        }

        this.$toast({
          type: 'success',
          message: 'Berhasil menghapus media',
        });
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal menghapus media!',
        });
      }
    },
    onCancel() {
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
    },
    onConfirmation() {
      this.submitStatus = FORM_SUBMIT_STATUS.CONFIRMATION;
    },
    async submitForm() {
      try {
        this.submitStatus = FORM_SUBMIT_STATUS.LOADING;
        this.submitProgress = 25;
        const formData = this.generateFormData();

        const response = await bannerRepository.createBanner(formData);

        if (response.status === 201) {
          // Add timeout to prevent progress bar too fast
          setTimeout(() => {
            this.submitProgress = 75;

            setTimeout(() => {
              this.successMessage = {
                title: 'Tambah Pop-up Banner Berhasil',
                body: 'Banner yang Anda buat berhasil ditambahkan.',
              };
              this.submitStatus = FORM_SUBMIT_STATUS.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch (error) {
        this.errorMessage = {
          title: 'Tambah Banner Gagal',
          body: 'Banner yang Anda buat gagal ditambahkan.',
        };
        this.submitStatus = FORM_SUBMIT_STATUS.ERROR;
      }
    },
    async updateForm() {
      // @todo: add update form functionality
      try {
        this.submitStatus = FORM_SUBMIT_STATUS.LOADING;
        this.submitProgress = 25;

        const { id } = this.$route.params;
        const formData = this.generateFormData();

        const response = await bannerRepository.updateBanner(id, formData);

        if (response.status === 200) {
          // Add timeout to prevent progress bar too fast
          setTimeout(() => {
            this.submitProgress = 75;

            setTimeout(() => {
              this.successMessage = {
                title: 'Update Pop-up Banner Berhasil',
                body: 'Banner yang Anda ubah berhasil disimpan.',
              };
              this.submitStatus = FORM_SUBMIT_STATUS.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch (error) {
        this.errorMessage = {
          title: 'Update Banner Gagal',
          body: 'Banner yang Anda ubah gagal disimpan.',
        };
        this.submitStatus = FORM_SUBMIT_STATUS.ERROR;
      }
    },
    setInitialData(data) {
      this.imageDesktopUploadStatus = IMAGE_UPLOAD_STATUS.HASDEFAULT;
      this.imageMobileUploadStatus = IMAGE_UPLOAD_STATUS.HASDEFAULT;

      this.form.image.desktop.url = data.image?.desktop;
      this.form.image.desktop.fileName = '';
      this.form.image.desktop.size = 0;

      this.form.image.mobile.url = data.image?.mobile;
      this.form.image.mobile.fileName = '';
      this.form.image.mobile.size = 0;

      this.form.title = data.title;

      if (data.button_label || data.link) {
        this.form.customButton.label = data.button_label;
        this.form.customButton.link = data.link;
      } else {
        this.isCustomizeButton = false;
        this.form.customButton.label = '';
        this.form.customButton.link = '';
      }

      if (data.duration === -1) {
        this.isScheduled = false;
      } else {
        this.form.scheduler.duration = data.duration;
        this.form.scheduler.startDate = formatDate(data.start_date, 'dd/MM/yyyy');
      }

      this.imageDesktopFile = new File([''], data.image?.desktop);
      this.imageMobileFile = new File([''], data.image?.desktop);
    },
    resetSubmitState() {
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
      this.submitProgress = 0;
      this.successMessage.title = '';
      this.successMessage.body = '';
      this.errorMessage.title = '';
      this.errorMessage.body = '';
    },
    resetDesktopImageState() {
      this.form.image.desktop.url = '';
      this.form.image.desktop.fileName = '';
      this.form.image.desktop.size = 0;
      this.imageDesktopFile = null;
      this.imageDesktopUploadStatus = IMAGE_UPLOAD_STATUS.NONE;
    },
    resetMobileImageState() {
      this.form.image.mobile.url = '';
      this.form.image.mobile.fileName = '';
      this.form.image.mobile.size = 0;
      this.imageMobileFile = null;
      this.imageMobileUploadStatus = IMAGE_UPLOAD_STATUS.NONE;
    },
    generateFormData() {
      const normalizedStartDate = this.normalizeDate(this.form.scheduler.startDate);

      const formData = {
        ...this.form,
        image: {
          desktop: this.form.image.desktop.url,
          mobile: this.form.image.mobile.url,
        },
        custom_button: {
          label: this.isCustomizeButton ? this.form.customButton.label : '',
          link: this.isCustomizeButton ? this.form.customButton.link : '',
        },
        scheduler: {
          duration: this.form.scheduler.duration,
          start_date: formatDate(normalizedStartDate, 'yyyy-MM-dd'),
        },
      };

      return formData;
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>

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
 .popup-banner__form .date-input .jds-popover.invalid .jds-date-input__input {
  border: 1px solid #D32F2F !important;
 }

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
