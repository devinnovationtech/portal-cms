<template>
  <div
    ref="dropzone"
    :class="{
      'w-full min-h-[250px] p-6 border border-dashed bg-gray-50 flex flex-col items-center rounded-lg': true,
      'border-red-500': isError
    }"
    @drop.prevent="onDropFile"
  >
    <span class="font-lato font-medium text-sm text-center leading-6 text-blue-gray-800 mb-3">
      drag and drop gambar di sini atau
    </span>
    <SearchFolderIcon :class="{'mb-3': true, 'opacity-50': disabled}" />
    <label class="cursor-pointer">
      <span
        :class="{
          'text-sm text-blue-500': true,
          'opacity-50': disabled
        }"
      >
        Pilih file
      </span>
      <input
        type="file"
        hidden
        :accept="accept"
        :disabled="disabled"
        @change="onChooseFile"
      >
    </label>
    <slot name="description" />
  </div>
</template>

<script>
import SearchFolderIcon from '@/assets/icons/search-folder.svg?inline';

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

export default {
  name: 'Dropzone',
  components: {
    SearchFolderIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: 0,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    events.forEach((eventName) => {
      this.$refs.dropzone.addEventListener(eventName, this.preventDefaults);
    });
  },
  destroyed() {
    events.forEach((eventName) => {
      this.$refs.dropzone.removeEventListener(eventName, this.preventDefaults);
    });
  },
  methods: {
    onDropFile(e) {
      if (this.disabled) return;

      const file = e.dataTransfer.files[0];

      this.selectedFile = file;
      this.$emit('change', this.selectedFile);
    },
    onChooseFile(e) {
      const file = e.target.files[0];

      this.selectedFile = file;
      this.$emit('change', this.selectedFile);
    },
    preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>
