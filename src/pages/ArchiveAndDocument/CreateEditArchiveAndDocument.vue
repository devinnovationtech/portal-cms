<template>
  <main class="pb-14">
    <ValidationObserver
      ref="form"
      v-slot="{ invalid }"
    >
      <div
        class="archive-document-form"
        data-cy="archive-document-form__container"
      >
        <!-- Submit -->
        <section class="h-[66px] -mt-[14px] z-40 flex items-center sticky top-[72px] bg-gray-100">
          <div class="flex items-center">
            <BaseButton
              type="button"
              class="bg-red-500 hover:bg-red-400 font-lato text-sm text-white"
              data-cy="archive-document-form__button-cancel"
              @click="onCancelArchiveAndDocument"
            >
              <template #icon-left>
                <JdsIcon
                  name="arrow-left"
                  size="16px"
                  fill="#fff"
                  class="h-4 w-4"
                />
              </template>
              <p>
                Batalkan
              </p>
            </BaseButton>
          </div>
          <div class="ml-auto">
            <div class="flex gap-4">
              <BaseButton
                type="submit"
                class="bg-white font-lato text-sm text-green-700 border border-green-700"
                data-cy="archive-document-form__button-draft"
                @click="onDraftDocument"
              >
                <p>
                  Simpan Draf
                </p>
              </BaseButton>
              <BaseButton
                type="submit"
                class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
                data-cy="archive-document-form__button-publish"
                :disabled="invalid"
                @click="onPublishDocument"
              >
                <PublishIcon />
                <p>
                  Terbitkan Arsip Dokumen
                </p>
              </BaseButton>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <!-- Upload Dokumen -->
          <div class="w-full h-full py-4 px-5 rounded-xl bg-white">
            <div class="col-span-2 flex justify-between">
              <h2 class="font-lato font-bold text-base leading-6 text-green-700 mb-6">
                Upload Arsip Dokumen
              </h2>
            </div>
            <div class="w-full h-full bg-gray-50 border-dashed border-2 border-gray-200 rounded-[10px] flex flex-col justify-center items-center gap-[10px]">
              <ValidationProvider
                ref="documentUploader"
                v-slot="{ errors }"
                rules="required|size:5000"
              >
                <Dropzone
                  :is-error="errors.length > 0"
                  :is-link-field="false"
                  accept="application/pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  guide="drag and drop berkas disini atau"
                  @change="uploadDocument($event)"
                >
                  <template #description>
                    <span class="mt-4 text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 5 MB dengan format file yang didukung (doc,xls,pdf)
                    </span>
                  </template>
                </Dropzone>
              </ValidationProvider>
            </div>
            <transition name="slide-fade">
              <DropzoneUploadProgress
                v-if="!!document"
                :file="document"
                :progress="documentUploadProgress"
                :status="documentUploadStatus"
                :image-url="form.document.url"
                :image-size="form.document.size"
                class="mt-4"
                @retry="handleRetryUpload()"
                @delete="handleDeleteUpload()"
              />
            </transition>
          </div>

          <div class="w-full h-full py-4 px-5 rounded-xl bg-white mt-4">
            <div class="col-span-2 flex justify-between">
              <h2 class="font-lato font-bold text-base leading-6 text-green-700 mb-4">
                Judul Dokumen
              </h2>
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|max:150"
            >
              <div class="flex flex-col">
                <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
                  <input
                    id="title"
                    v-model.trim="form.title"
                    data-cy="archive-document-form__title"
                    type="text"
                    placeholder="Masukkan judul dokumen"
                    class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
                  >
                </div>
                <span class="font-lato text-[13px] text-red-600 mt-1 ml-1">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>

          <div class="w-full h-full py-4 px-5 rounded-xl bg-white mt-4">
            <div class="col-span-2 flex justify-between">
              <h2 class="font-lato font-bold text-base leading-6 text-green-700 mb-4">
                Kategori/Topik
              </h2>
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <div class="flex flex-col">
                <JdsSelect
                  v-model="form.category"
                  :options="categories"
                  placeholder="Pilih Kategori/Topik"
                  data-cy="archive-document-form__category"
                  :error-message="errors[0]"
                />
              </div>
            </ValidationProvider>
          </div>

          <div class="w-full h-full py-4 px-5 rounded-xl bg-white mt-4">
            <div class="col-span-2 flex justify-between">
              <h2 class="font-lato font-bold text-base leading-6 text-green-700 mb-4">
                Deskripsi Dokumen
              </h2>
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <div class="flex flex-col">
                <textarea
                  v-model="form.description"
                  placeholder="Masukkan deskripsi"
                  rows="5"
                  maxlength="500"
                  class="border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  data-cy="archive-document-form__description"
                />
                <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </section>
      </div>
    </ValidationObserver>

    <!-- Confirmation Popup -->
    <BaseModal
      :open="submitStatus === 'CONFIRMATION'"
      data-cy="archive-document-form__confirmation-modal"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1
          class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6"
          data-cy="archive-document-form__confirmation-modal-title"
        >
          {{ confirmationMessage.title }}
        </h1>
        <div class="flex items-center gap-4">
          <p
            class="text-sm leading-6 to-blue-gray-800"
            data-cy="archive-document-form__confirmation-modal-body"
          >
            {{ confirmationMessage.body }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            data-cy="archive-document-form__confirmation-button-dismiss"
            @click="onCancel"
          >
            Tidak
          </BaseButton>
          <BaseButton
            v-if="confirmationMessage.type === 'cancel'"
            class="bg-red-600 hover:bg-red-500 text-sm text-white"
            data-cy="archive-document-form__confirmation-button-cancel"
            @click="handleCancel"
          >
            Ya, saya yakin
          </BaseButton>
          <BaseButton
            v-else-if="confirmationMessage.type === 'draft'"
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            data-cy="archive-document-form__confirmation-button-publish"
            @click="handleDraft"
          >
            Ya, masukan draf
          </BaseButton>
          <BaseButton
            v-else-if="confirmationMessage.type === 'publish'"
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            data-cy="archive-document-form__confirmation-button-save"
            @click="handleSubmit"
          >
            Ya, terbitkan
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Submit Progress -->
    <ProgressModal
      :open="submitStatus === 'LOADING'"
      :value="submitProgress"
      message="Mohon tunggu, penyimpanan data sedang diproses"
      data-cy="archive-document-form__progress-modal"
    />

    <!-- Success/Error Message -->
    <BaseModal
      :open="submitStatus === 'SUCCESS' || submitStatus === 'ERROR'"
      data-cy="archive-document-form__message-modal"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1
          class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6"
          data-cy="archive-document-form__message-modal-title"
        >
          {{ messageTitle }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            :name="messageIconName"
            :class="messageIconClassName"
          />
          <p
            class="text-sm leading-6 to-blue-gray-800"
            data-cy="archive-document-form__message-modal-body"
          >
            {{ messageBody }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            data-cy="archive-document-form__message-modal-button"
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
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import ProgressModal from '@/common/components/ProgressModal';
import Dropzone from '@/common/components/Dropzone';
import DropzoneUploadProgress from '@/common/components/DropzoneUploadProgress';
import PublishIcon from '@/assets/icons/plane.svg?inline';

import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const mediaRepository = RepositoryFactory.get('media');

const DOCUMENT_UPLOAD_STATUS = Object.freeze({
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
  name: 'CreateEditArchiveAndDocument',
  components: {
    BaseButton,
    BaseModal,
    ProgressModal,
    Dropzone,
    DropzoneUploadProgress,
    PublishIcon,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      paramsDocument: {
        domain: 'archives',
        type: '',
      },
      form: {
        document: {
          url: '',
          fileName: '',
          size: 0,
        },
        title: '',
        category: '',
        description: '',
      },
      document: null,
      documentUploadProgress: 0,
      documentUploadStatus: DOCUMENT_UPLOAD_STATUS.NONE,
      categories: ['Dokumen Perencanaan', 'Laporan Pertanggungjawaban', 'Produk Hukum', 'Transparansi Kepegawaian', 'Transparansi Pengelolaan Keuangan Daerah'],
      confirmationMessage: {
        type: '',
        title: '',
        body: '',
      },
      successMessage: {
        title: '',
        body: '',
      },
      errorMessage: {
        title: '',
        body: '',
      },
      submitStatus: FORM_SUBMIT_STATUS.NONE,
      submitProgress: 0,
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
  methods: {
    onCancelArchiveAndDocument() {
      this.submitStatus = FORM_SUBMIT_STATUS.CONFIRMATION;
      this.confirmationMessage.type = 'cancel';
      this.confirmationMessage.title = 'Membatalkan Arsip Dokumen';
      this.confirmationMessage.body = 'Apakah Anda yakin ingin membatalkan Arsip Dokumen ini?';
    },
    onDraftDocument() {
      this.submitStatus = FORM_SUBMIT_STATUS.CONFIRMATION;
      this.confirmationMessage.type = 'draft';
      this.confirmationMessage.title = 'Simpan ke Draf ';
      this.confirmationMessage.body = 'Apakah Anda ingin menyimpan ke draf?';
    },
    onPublishDocument() {
      this.submitStatus = FORM_SUBMIT_STATUS.CONFIRMATION;
      this.confirmationMessage.type = 'publish';
      this.confirmationMessage.title = 'Terbitkan Arsip Dokumen';
      this.confirmationMessage.body = 'Apakah Anda ingin menerbitkan Arsip Dokumen ini?';
    },
    async uploadDocument(file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      try {
        this.document = file;
        this.documentUploadProgress = 0;
        this.documentUploadStatus = DOCUMENT_UPLOAD_STATUS.UPLOADING;

        const response = await mediaRepository.uploadMediaWithProgress(formData, (progress) => {
          this.documentUploadProgress = progress;
        });

        this.documentUploadStatus = DOCUMENT_UPLOAD_STATUS.SUCCESS;

        if (response.status === 201) {
          const { data } = response;
          this.form.document.url = data.file_download_uri;
          this.form.document.fileName = data.file_name;
          this.form.document.size = data.size;
        }
      } catch (error) {
        this.documentUploadStatus = DOCUMENT_UPLOAD_STATUS.ERROR;
        this.form.document.url = '';
        this.form.document.fileName = '';
        this.form.document.size = 0;
      }
    },
    handleRetryUpload() {
      this.uploadDocument(this.document);
    },
    async handleDeleteUpload() {
      try {
        await this.deleteUploadedDocument(this.form.document.fileName);
        this.resetDocumentState();

        this.$toast({
          type: 'success',
          message: 'Berhasil menghapus dokumen',
        });
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal menghapus dokumen!',
        });
      }
    },
    async deleteUploadedDocument(fileName) {
      try {
        const response = await mediaRepository.deleteMedia({
          key: fileName,
          domain: 'archives',
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
    resetDocumentState() {
      this.form.document.url = '';
      this.form.document.fileName = '';
      this.form.document.size = 0;
      this.document = null;
      this.documentUploadStatus = DOCUMENT_UPLOAD_STATUS.NONE;
    },
    onCancel() {
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
    },
    handleCancel() {
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
      this.$router.back();
    },
    handleDraft() {
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
      // TODO: create function draft data
    },
    handleSubmit() {
      if (this.mode === 'create') {
        this.submitForm();
      }
    },
    submitForm() {
      // TODO: create function publish data
    },
  },
};
</script>

<style>
.archive-document-form .jds-popover {
  width: 100%;
}
.archive-document-form .jds-form-control-label {
  margin-bottom: 4px !important;
}
.archive-document-form .jds-select,
.archive-document-form .jds-popover__activator,
.archive-document-form .jds-input-text {
  width: 100% !important;
}
.archive-document-form .jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}
</style>
