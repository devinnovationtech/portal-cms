<template>
  <main class="pb-14">
    <ValidationObserver
      ref="form"
      v-slot="{ invalid, dirty }"
    >
      <form
        class="infographics-banner__form"
        @submit.prevent="onConfirmation"
      >
        <!-- Submit -->
        <HeaderMenu>
          <div class="flex gap-4">
            <BaseButton
              type="submit"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
              :disabled="invalid || !dirty"
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
                Upload Banner Infografis
              </h2>
            </div>
            <div>
              <div class="flex items-center justify-center mb-6">
                <span class="text-blue-gray-800 text-[15px] whitespace-nowrap">
                  Banner Desktop/Tablet
                </span>
                <span class="w-full h-[2px] ml-4 bg-gray-300" />
              </div>
              <ValidationProvider
                ref="desktopImageUploader"
                v-slot="{ errors }"
                rules="required|image|maxdimensions:4877,1628|size:2000"
              >
                <Dropzone
                  :is-error="errors.length > 0"
                  :disabled="!!imageDesktopFile"
                  @change="handleUploadByType($event, 'DESKTOP')"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 2 MB dengan resolusi 4877 x 1628. <br>
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
                  Banner Mobile
                </span>
                <span class="w-full h-[2px] ml-4 bg-gray-300" />
              </div>
              <ValidationProvider
                ref="mobileImageUploader"
                v-slot="{ errors }"
                rules="required|image|maxdimensions:1501,501|size:1000"
              >
                <Dropzone
                  :is-error="errors.length > 0"
                  :disabled="!!imageMobileFile"
                  @change="handleUploadByType($event, 'MOBILE')"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 1 MB dengan resulosi 1501 x 501. <br>
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

          <!-- Title & Link Redirect -->
          <section>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|max:50"
            >
              <div class="flex flex-col mb-5">
                <label
                  class="font-lato text-blue-gray-800 mb-3 text-[15px]"
                >
                  Judul Banner
                </label>
                <JdsInputText
                  v-model.trim="form.title"
                  placeholder="Masukkan judul banner"
                  :error-message="errors[0]"
                />
              </div>
            </ValidationProvider>
            <div class="font-lato text-blue-gray-800 mb-3 text-[15px] flex justify-between">
              <label>
                Link Redirect
              </label>
              <JdsToggle v-model="isActiveLink" />
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              rules="url"
            >
              <div class="flex flex-col">
                <JdsInputText
                  v-model="form.link"
                  :disabled="!isActiveLink"
                  placeholder="contoh: https://"
                  :error-message="errors[0]"
                />
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

import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const mediaRepository = RepositoryFactory.get('media');
const bannerRepository = RepositoryFactory.get('infographicsBanner');

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
  name: 'CreateEditInfographicsBanner',
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
        await bannerRepository.getBannerById(id);
        next();
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
        link: '',
      },
      imageDesktopFile: null,
      imageMobileFile: null,
      imageDesktopUploadProgress: 0,
      imageDesktopUploadStatus: IMAGE_UPLOAD_STATUS.NONE,
      imageMobileUploadProgress: 0,
      imageMobileUploadStatus: IMAGE_UPLOAD_STATUS.NONE,
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
      isActiveLink: false,
    };
  },
  computed: {
    mode() {
      return this.$route.meta?.mode || 'create';
    },
    isEditMode() {
      return this.mode === 'edit';
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
    isActiveLink: {
      handler() {
        if (!this.isActiveLink) {
          this.form.link = '';
        }
      },
      immediate: true,
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
          domain: 'infographic-banners',
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
                title: 'Tambah Infografis Banner Berhasil',
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
                title: 'Update Infografis Banner Berhasil',
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

      this.form.image.desktop.url = data.image_metadata?.desktop?.file_download_uri;
      this.form.image.desktop.fileName = data.image_metadata?.desktop?.file_name;
      this.form.image.desktop.size = data.image_metadata?.desktop?.size;

      this.form.image.mobile.url = data.image_metadata?.mobile?.file_download_uri;
      this.form.image.mobile.fileName = data.image_metadata?.mobile?.file_name;
      this.form.image.mobile.size = data.image_metadata?.mobile?.size;

      this.form.title = data.title;
      this.form.link = data.link;
      if (this.form.link) {
        this.isActiveLink = true;
      }

      this.imageDesktopFile = new File([''], data.image_metadata?.desktop?.file_name);
      this.imageMobileFile = new File([''], data.image_metadata?.mobile?.file_name);
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
      const formData = {
        ...this.form,
        image: {
          desktop: this.form.image.desktop.url,
          mobile: this.form.image.mobile.url,
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
.infographics-banner__form .duration .jds-popover__activator,
.infographics-banner__form .duration .jds-select,
.infographics-banner__form .duration .jds-input-text {
  width: 100% !important;
}

/**
 * Override default Jds-DateInput styling
 */
 .infographics-banner__form .date-input .jds-popover.invalid .jds-date-input__input {
  border: 1px solid #D32F2F !important;
 }

.infographics-banner__form .date-input .jds-popover,
.infographics-banner__form .date-input .jds-popover__activator,
.infographics-banner__form .date-input .jds-date-input {
  width: 100% !important;
}

.infographics-banner__form .date-input .jds-date-input__input[disabled] {
  background: #eee !important;
}

.infographics-banner__form .date-input .jds-popover {
  visibility: unset !important;
}

.infographics-banner__form .date-input .jds-form-control-label {
  font-size: 14px !important;
  margin-bottom: 4px !important;
}

.infographics-banner__form .date-input .jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}

.infographics-banner__form .date-input .jds-calendar {
  max-width: none !important;
}

.infographics-banner__form .date-input .jds-calendar .jds-calendar__list-of-days,
.infographics-banner__form .date-input .jds-calendar .jds-calendar__days {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
</style>
