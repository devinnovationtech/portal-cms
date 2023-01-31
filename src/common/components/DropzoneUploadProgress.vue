<template>
  <div
    :class="{
      'min-h-[110px] w-full rounded-md px-5 py-4 border border-blue-600': true,
      'border-red-600': status === 'ERROR'
    }"
  >
    <div class="grid grid-cols-[auto,1fr,auto] gap-x-6">
      <div class="relative w-[86px] h-[75px] overflow-hidden rounded-md">
        <img
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
      </div>
      <div class="flex flex-col justify-between">
        <div class="flex mb-3">
          <p class="font-lato font-bold text-[15px] leading-6 line-clamp-2">
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
            Gambar berhasil diupload
          </p>
          <!-- ERROR -->
          <p
            v-show="status === 'ERROR'"
            class="col-span-3 w-full font-lato text-sm text-gray-800"
          >
            Upload gagal, coba periksa koneksi anda kembali
          </p>
        </div>
      </div>
      <div class="self-center">
        <!-- Delete Button -->
        <button
          v-if="status === 'SUCCESS'"
          type="button"
          class="w-7 h-7 flex items-center justify-center bg-red-50 rounded-full"
          @click="$emit('delete')"
        >
          <JdsIcon
            name="trash"
            size="16px"
            class="h-4 text-red-600"
          />
        </button>
        <!-- Retry Button -->
        <button
          v-if="status === 'ERROR'"
          type="button"
          class="w-7 h-7 flex items-center justify-center bg-blue-gray-50 rounded-full"
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
</template>

<script>
import RetryIcon from '@/assets/icons/retry.svg?inline';

export default {
  name: 'DropzoneUploadProgress',
  components: {
    RetryIcon,
  },
  props: {
    progress: {
      type: Number,
      default: 50,
    },
    file: {
      type: File,
      default: null,
    },
    status: {
      type: String,
      validator(value) {
        // The value must match one of these strings
        return ['NONE', 'UPLOADING', 'SUCCESS', 'ERROR'].includes(value);
      },
      default: 'NONE',
    },
  },
  data() {
    return {
      image: null,
    };
  },
  computed: {
    fileName() {
      return this.file ? this.file.name : '';
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
