<template>
  <ul class="form-stepper w-full min-w-0 min-h-[84px] grid grid-cols-3 justify-between gap-3">
    <li
      :class="{
        'flex flex-col': true,
        'form-stepper--active': currentFormStep === 1
      }"
    >
      <div class="flex items-center">
        <span class="form-stepper__step w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-gray-600">
          1
        </span>
        <h2 class="form-stepper__title flex-shrink-0 mx-2 font-roboto text-base leading-6 text-gray-600">
          Pengaturan Dasar
        </h2>
        <div class="w-full h-[2px] bg-gray-300" />
      </div>
      <p class="form-stepper__description ml-10 font-lato text-gray-800 text-sm leading-6">
        Informasi dasar untuk landing page
      </p>
    </li>

    <li
      :class="{
        'flex flex-col': true,
        'form-stepper--active': currentFormStep === 2
      }"
    >
      <div class="flex items-center">
        <span class="form-stepper__step w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-gray-600">
          2
        </span>
        <h2 class="form-stepper__title flex-shrink-0 mx-2 font-roboto text-base leading-6 text-gray-600">
          Deskripsi Layanan
        </h2>
        <div class="w-full h-[2px] bg-gray-300" />
      </div>
      <p class="form-stepper__description ml-10 font-lato text-gray-800 text-sm leading-6">
        Berbagai penjelasan terkait layanan
      </p>
    </li>

    <li
      :class="{
        'flex flex-col': true,
        'form-stepper--active': currentFormStep === 3
      }"
    >
      <div class="flex items-center">
        <span class="form-stepper__step w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-gray-600">
          3
        </span>
        <h2 class="form-stepper__title flex-shrink-0 mx-2 font-roboto text-base leading-6 text-gray-600 whitespace-nowrap">
          Informasi Tambahan
        </h2>
      </div>
      <p class="form-stepper__description ml-10 font-lato text-gray-800 text-sm leading-6">
        Informasi pendukung terkait layanan
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    currentFormStep() {
      return this.$store.getters['publicationForm/currentFormStep'];
    },
  },
};
</script>

<style lang="scss" scoped>
.form-stepper--active {
  .form-stepper__step {
    background: #069550;
    color: white;
  }

  .form-stepper__title {
    font-weight: bold;
    color: #008444;
  }

  .form-stepper__description {
    font-weight: bold;
  }
}
</style>
