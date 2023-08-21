<template>
  <section>
    <div
      :class="{
        'min-h-[110px] w-full rounded-md px-5 py-4 border': true,
        'border-blue-600' : !disabled,
        'border-gray-300' : disabled,
        'border-red-600': status === 'ERROR',
      }"
      :data-cy="dataCy ? `${dataCy}-dropzone-upload-progress` : 'dropzone-upload-progress'"
    >
      <div
        :class="{
          ' grid grid-cols-[auto,1fr,auto] gap-x-6' : true,
          'opacity-50' : disabled,
        }"
      >
        <div class="relative w-[86px] h-[75px] overflow-hidden rounded-md">
          <!-- Display image using file type -->
          <div
            v-if="fileType === 'xlsx' || fileType === 'xls'"
            class="w-full h-full flex justify-center items-center bg-gray-200"
          >
            <ExcelIcon />
          </div>
          <div
            v-if="fileType === 'docx' || fileType === 'doc'"
            class="w-full h-full flex justify-center items-center bg-gray-200"
          >
            <WordIcon />
          </div>
          <div
            v-if="fileType === 'pdf'"
            class="w-full h-full flex justify-center items-center bg-gray-200"
          >
            <PdfIcon />
          </div>

          <!-- Display image using url if has an url (for edit mode) -->
          <img
            v-else-if="status === 'HASDEFAULT'"
            :src="imageUrl"
            class="w-full h-full object-cover"
          >
          <img
            v-else
            :src="image"
            class="w-full h-full object-cover"
          >
          <transition name="fade">
            <div
              v-if="status === 'UPLOADING'"
              class="absolute bottom-0 w-full h-0 bg-[#1975CA] opacity-60 transition-all ease-out"
              :style="{ height: `${progress}%` }"
            />
          </transition>
          <!-- Preview Button -->
          <transition name="fade">
            <button
              v-if="status === 'SUCCESS' || status === 'HASDEFAULT'"
              type="button"
              :class="{
                'absolute inset-0 w-full h-full flex items-center justify-center transition-all ease-in group' : true,
                'hover:bg-black hover:opacity-60' : !disabled,
              }"
              :disabled="disabled"
              :data-cy="dataCy ? `${dataCy}-dropzone-upload-progress__button-preview` : 'dropzone-upload-progress__button-preview'"
              @click="toggleImagePreview"
            >
              <div
                v-show="!disabled"
                class="flex flex-col opacity-0 group-hover:opacity-100 items-center justify-center"
              >
                <EyeIcon class="mb-1" />
                <small class="text-white text-[8px]">Klik untuk melihat <br> gambar</small>
              </div>
            </button>
          </transition>
        </div>
        <div class="flex flex-col justify-between">
          <div class="flex mb-3">
            <p class="font-lato font-bold text-[15px] leading-6 line-clamp-1 break-all">
              {{ fileName }}
            </p>
            <span
              v-show="status === 'SUCCESS'"
              class="ml-4"
            >
              <JdsIcon
                name="check-mark"
                size="16px"
                class="h-4 text-green-900"
              />
            </span>
          </div>
          <div>
            <!-- UPLOAD PROGRESS PERCENTAGE -->
            <p
              v-show="status === 'UPLOADING'"
              class="text-sm"
            >
              {{ progress }}%
            </p>
            <!-- SUCCESS -->
            <p
              v-show="status === 'SUCCESS'"
              class="col-span-3 w-full font-lato text-sm text-gray-800"
            >
              {{ fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' ? 'Gambar' : 'Dokumen' }} berhasil diupload
            </p>
            <!-- ERROR -->
            <p
              v-show="status === 'ERROR'"
              class="col-span-3 w-full font-lato text-sm text-gray-800"
            >
              Upload gagal, coba periksa koneksi anda kembali
            </p>
            <!-- SIZE (for edit purposes) -->
            <p
              v-show="fileSize && status === 'HASDEFAULT'"
              class="col-span-3 w-full font-lato text-sm text-gray-800"
            >
              {{ fileSize }}
            </p>
          </div>
        </div>
        <div class="self-center">
          <!-- Delete Button -->
          <button
            v-if="status === 'SUCCESS' || status === 'HASDEFAULT'"
            type="button"
            class="w-7 h-7 flex items-center justify-center bg-red-50 rounded-full"
            :disabled="disabled"
            :data-cy="dataCy ? `${dataCy}-dropzone-upload-progress__button-delete` : 'dropzone-upload-progress__button-delete'"
            @click="$emit('delete')"
          >
            <JdsIcon
              name="trash"
              size="16px"
              :fill="disabled ? '#757575' : '#F44336'"
              class="h-4"
            />
          </button>
          <!-- Retry Button -->
          <button
            v-if="status === 'ERROR'"
            type="button"
            class="w-7 h-7 flex items-center justify-center bg-blue-gray-50 rounded-full"
            :disabled="disabled"
            :data-cy="dataCy ? `${dataCy}-dropzone-upload-progress__button-retry` : 'dropzone-upload-progress__button-retry'"
            @click="$emit('retry')"
          >
            <RetryIcon />
          </button>
        </div>
        <!-- UPLOAD PROGRESS BAR -->
        <div
          v-show="status === 'UPLOADING'"
          class="col-span-3 w-full h-2 bg-gray-100 rounded-lg mt-4"
        >
          <div
            class="bg-blue-800 h-2 rounded-lg transition-all ease-in"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
    </div>

    <ImagePreview
      :source="imagePreviewSource"
      :open="isImagePreviewOpen"
      @close="toggleImagePreview"
    />
  </section>
</template>

<script>
import RetryIcon from '@/assets/icons/retry.svg?inline';
import EyeIcon from '@/assets/icons/eye.svg?inline';
import ImagePreview from '@/common/components/ImagePreview.vue';

import ExcelIcon from '@/assets/icons/excel.svg?inline';
import WordIcon from '@/assets/icons/word.svg?inline';
import PdfIcon from '@/assets/icons/pdf.svg?inline';

import mime from 'mime-types';

export default {
  name: 'DropzoneUploadProgress',
  components: {
    RetryIcon,
    EyeIcon,
    ImagePreview,
    ExcelIcon,
    WordIcon,
    PdfIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 50,
    },
    file: {
      type: File,
      default: null,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    imageSize: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      validator(value) {
        // The value must match one of these strings
        return ['NONE', 'UPLOADING', 'SUCCESS', 'ERROR', 'HASDEFAULT'].includes(value);
      },
      default: 'NONE',
    },
    dataCy: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      image: null,
      isImagePreviewOpen: false,
    };
  },
  computed: {
    fileName() {
      return this.file ? this.file.name : '';
    },
    fileSize() {
      if (this.imageSize === 0) {
        return null;
      }

      const sizeToMB = this.imageSize / 1000000;
      return `${sizeToMB.toFixed(2)} MB`;
    },
    imagePreviewSource() {
      if (this.status === 'HASDEFAULT') {
        return this.imageUrl;
      }

      return this.image;
    },
    fileType() {
      return this.file && this.file.type ? mime.extension(this.file.type) : '';
    },
  },
  watch: {
    file: {
      handler() {
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.image = reader.result;
        };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    toggleImagePreview() {
      this.isImagePreviewOpen = !this.isImagePreviewOpen;
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
