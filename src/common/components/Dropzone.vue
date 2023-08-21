<template>
  <div
    ref="dropzone"
    :class="{
      'w-full min-h-[250px] p-6 border border-dashed bg-gray-50 flex flex-col justify-center items-center rounded-lg': true,
      'border-red-500': isError
    }"
    @drop.prevent="onDropFile"
  >
    <span class="font-lato font-medium text-sm text-center leading-6 text-blue-gray-800 mb-3">
      {{ guide }}
    </span>
    <div class="flex flex-row gap-x-4">
      <div class="flex flex-col gap-3 items-center">
        <SearchFolderIcon :class="{'opacity-50': disabled}" />
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
            :data-cy="dataCy ? `${dataCy}-dropzone__input-file` : 'dropzone__input-file'"
            @change="onChooseFile"
          >
        </label>
      </div>
      <div
        v-if="isLinkField"
        class="flex flex-col gap-3 items-center"
      >
        <LinkIcon :class="{'opacity-50': disabled}" />
        <button
          :class="{
            'text-green-500': true,
            'opacity-50': disabled
          }"
          :disabled="disabled"
          :data-cy="dataCy ? `${dataCy}-dropzone__button-link` : 'dropzone__button-link'"
          @click="onClick"
        >
          <span class="text-sm">Link Document</span>
        </button>
      </div>
      <div
        v-if="isYoutubeField"
        class="flex flex-col gap-3 items-center"
      >
        <YoutubeIcon :class="{'opacity-50': disabled}" />
        <button
          :class="{
            'text-red-500': true,
            'opacity-50': disabled
          }"
          :disabled="disabled"
          @click="onClick"
        >
          <span class="text-sm">Link Youtube</span>
        </button>
      </div>
    </div>
    <slot name="description" />
  </div>
</template>

<script>
import SearchFolderIcon from '@/assets/icons/search-folder.svg?inline';
import YoutubeIcon from '@/assets/icons/youtube.svg?inline';
import LinkIcon from '@/assets/icons/link-circle.svg?inline';

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

export default {
  name: 'Dropzone',
  components: {
    SearchFolderIcon,
    YoutubeIcon,
    LinkIcon,
  },
  props: {
    guide: {
      type: String,
      default: 'drag and drop gambar di sini atau',
    },
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
    isYoutubeField: {
      type: Boolean,
      default: false,
    },
    isLinkField: {
      type: Boolean,
      default: false,
    },
    dataCy: {
      type: String,
      default: null,
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
    onClick() {
      this.$emit('click');
    },
    preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>
