<template>
  <div class="p-6 flex flex-col gap-[10px] items-center">
    <img
      :src="image"
      :alt="alternateImage"
      :width="width"
      :height="height"
    >
    <h3 class="max-w-[550px] text-center font-roboto text-[21px] leading-[34px] font-medium text-blue-gray-900">
      {{ title }}
    </h3>
    <p class="max-w-[771px] text-center font-lato text-[14px] leading-[23px] font-normal text-gray-700 pb-[10px]">
      {{ description }}
    </p>
    <div>
      <slot name="button" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    /**
     * image props used to define image source
     */
    image: {
      default: '',
      type: String,
    },
    /**
     * alternateImage props specifices alternate text for an image, if the image cannot be displayed.
     */
    alternateImage: {
      default: '',
      type: String,
    },
    /**
     * width props specifices width an image and the default is 140px.
     */
    width: {
      default: 140,
      type: Number,
    },
    /**
     * height props specifices height an image and the default is 140px.
     */
    height: {
      default: 140,
      type: Number,
    },
    /**
     * title props used to show the text for title.
     */
    title: {
      default: '',
      type: String,
    },
    /**
     * description props used to show the text for description.
     */
    description: {
      default: '',
      type: String,
    },
  },
};
</script>
