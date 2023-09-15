<template>
  <main class="relative">
    <div class="fixed top-0 z-20 w-full min-h-[72px] bg-gray-900 flex items-center">
      <div class="px-8 lg:px-0 max-w-screen-xl w-full mx-auto flex ">
        <BaseButton
          class="text-sm text-white border-transparent bg-green-700 hover:bg-green-800"
          title="Perbaharui Berita"
          @click="refreshPage"
        >
          <template #icon-left>
            <ReloadIcon
              width="20"
              height="20"
              class="fill-white"
            />
          </template>
          Perbaharui
        </BaseButton>
        <p
          data-html2canvas-ignore
          class="flex items-center text-white ml-8"
        >
          <JdsIcon
            name="eye"
            size="16px"
            class="mr-3"
          />
          Anda sedang dalam mode pratinjau informasi layanan
        </p>
      </div>
    </div>
    <div
      id="publication-preview-container"
      class="w-full h-screen"
    >
      <iframe
        id="publication-preview-iframe"
        title="Preview halaman layanan publikasi"
        :src="publicationPreviewURL"
        width="100%"
        height="100%"
        @load="loadPreviewData"
      />
    </div>
  </main>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import ReloadIcon from '@/assets/icons/reload.svg?inline';

export default {
  components: {
    BaseButton,
    ReloadIcon,
  },
  data() {
    return {
      publicationPreviewURL: process.env.VUE_APP_PUBLICATION_PREVIEW_URL,
    };
  },
  computed: {
    previewData() {
      return this.$store.getters['publicationForm/previewData'];
    },
  },
  methods: {
    refreshPage() {
      this.$router.go(this.$router.currentRoute);
    },
    loadPreviewData() {
      const iframe = document.getElementById('publication-preview-iframe');
      const recieverOrigin = process.env.VUE_APP_PORTAL_JABAR_URL;

      if (iframe && recieverOrigin) {
        iframe.contentWindow.postMessage(this.previewData, `${recieverOrigin}`);
      }
    },
  },
};
</script>
