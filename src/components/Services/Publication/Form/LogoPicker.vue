<template>
  <div class="col-span-2 grid grid-cols-[124px,1fr] gap-6 mt-7 mb-7">
    <div class="w-[124px] h-[124px] flex items-center justify-center border border-dashed border-gray-500 bg-gray-50 rounded-md p-4">
      <img
        :src="logoPreview || require('@/assets/icons/image-placeholder.svg')"
        width="108"
        height="108"
        :class="{
          'object-contain': true,
          'w-[34px] h-[34px]': !hasLogo
        }"
      >
    </div>

    <div class="w-full flex flex-col">
      <p class="font-lato text-blue-gray-800 text-[15px] font-medium leading-6">
        Logo Layanan
      </p>
      <p class="font-lato text-blue-gray-800 text-sm mb-[14px]">
        Ukuran maksimal 1 Mb, dengan resolusi 200x200 pixels. <br>
        File yang didukung adalah .jpg dan .png
      </p>

      <ValidationProvider
        v-slot="{ errors, valid }"
        ref="serviceLogo"
        rules="required|image|size:1000|maxdimensions:200,200"
        class="flex flex-col col-span-2"
      >
        <div class="flex items-center mb-4">
          <label
            for="service-logo"
            :class="{
              'w-fit min-h-[38px] flex px-4 py-[10px] rounded-lg bg-green-700 hover:bg-green-600': true,
              'text-white font-bold items-center text-sm cursor-pointer': true,
              'bg-gray-500 hover:bg-gray-500': !isMasterDataSelected || (hasLogo && valid)
            }"
          >
            <span>Pilih File</span>
            <JdsIcon
              name="plus"
              size="14px"
              fill="#fff"
              class="ml-3 h-[14px] w-[14px]"
            />
          </label>

          <p
            v-show="!hasLogo"
            class="ml-3 font-lato text-blue-gray-800 text-sm"
          >
            Belum ada file terpilih
          </p>
        </div>

        <input
          id="service-logo"
          type="file"
          name="service-logo"
          hidden
          accept="image/png, image/jpeg"
          :disabled="!isMasterDataSelected || (hasLogo && valid)"
          @change="handlePickLogo"
        >

        <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>

        <transition name="fade">
          <div
            v-if="hasLogo && valid"
            class="w-fit flex border border-green-700 rounded-lg min-h-[38px] items-center px-4"
          >
            <p class="text-sm font-lato leading-none">
              {{ logo.name }}
            </p>
            <button
              class="w-fit h-[38px] p-2 ml-3"
              @click="toggleImagePreview"
            >
              <JdsIcon
                name="eye"
                size="18px"
                fill="#069550"
              />
            </button>
            <button
              class="w-fit h-[38px] p-2 ml-3"
              @click="handleClearLogo"
            >
              <JdsIcon
                name="times"
                size="16px"
                fill="#069550"
              />
            </button>
          </div>
        </transition>
      </ValidationProvider>
    </div>

    <ImagePreview
      :source="imagePreviewSource"
      :open="isImagePreviewOpen"
      @close="toggleImagePreview"
    />
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import ImagePreview from '@/common/components/ImagePreview.vue';

export default {
  components: {
    ValidationProvider,
    ImagePreview,
  },
  data() {
    return {
      logo: null,
      logoPreview: null,
      isImagePreviewOpen: false,
    };
  },
  computed: {
    isMasterDataSelected() {
      return this.$store.getters['publicationForm/isMasterDataSelected'];
    },
    hasLogo() {
      return this.logo !== null;
    },
    imagePreviewSource() {
      return this.logoPreview;
    },
  },
  methods: {
    async handlePickLogo(event) {
      // eslint-disable-next-line prefer-destructuring
      this.logo = event.target.files[0];
      this.generateLogoPreview();

      const { valid } = await this.$refs.serviceLogo.validate(event.target.files[0]);

      if (valid) {
        this.$emit('upload', this.logo);
      }
    },
    generateLogoPreview() {
      const reader = new FileReader();
      reader.readAsDataURL(this.logo);
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
    },
    toggleImagePreview() {
      this.isImagePreviewOpen = !this.isImagePreviewOpen;
    },
    handleClearLogo() {
      this.logo = null;
      this.logoPreview = null;
      document.getElementById('service-logo').value = '';

      this.$emit('delete');
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
