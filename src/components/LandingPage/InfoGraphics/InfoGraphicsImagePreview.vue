<template>
  <transition name="mobile">
    <img
      v-if="isSelected === 'Desktop'"
      class="w-full h-[397px] object-contain"
      :src="imageDesktop"
      alt="image preview dekstop"
      width="1082"
      height="576"
    >
    <div
      v-else
      class="mobile-frame relative m-auto border-solid border-black border-[23px] border-b-0 rounded-b-none rounded-tr-[50px] rounded-tl-[50px] w-[437px] h-[397px] shadow-lg shadow-gray-800"
    >
      <div class="mobile-screen absolute flex flex-col z-10 w-full h-full border-b-0 rounded-b-none rounded-tr-[30px] rounded-tl-[30px] bg-white">
        <div class="mobile-notch z-20 relative top-0 left-[130px] w-[126px] h-[20px] bg-black rounded-[0px_0px_10px_10px]" />
        <img
          :src="imageMobile"
          alt="image preview mobile"
          class="mobile-image relative top-[80px] w-[360px] h-[120px] rounded-[8px] mx-auto"
        >
        <div class="mobile-container-content flex flex-row mx-auto">
          <span
            v-for="(item,index) in 3"
            :key="index"
            :class="{
              'mobile-pagination relative top-[100px] mr-4 rounded-full w-4 h-4 border-2 border-green-700' : true,
              'bg-green-700': index === 0
            }"
          />
        </div>
      </div>
      <div class="relative z-10 bg-gray-800 rounded-tr-[4px] rounded-br-[4px] top-[230px] right-[-413px] w-2 h-[135px]" />
      <div class="relative z-10 bg-gray-800 rounded-tl-[4px] rounded-bl-[4px] top-[-10px] left-[-30px] w-2 h-[50px]" />
      <div class="relative z-10 bg-gray-800 rounded-tl-[4px] rounded-bl-[4px] top-8 left-[-30px] w-2 h-[70px]" />
      <div class="relative z-10 bg-gray-800 rounded-tl-[4px] rounded-bl-[4px] top-10 left-[-30px] w-2 h-[70px]" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'InfoGraphicsImagePreview',
  props: {
    imageMobile: {
      type: String,
      default: '',
    },
    imageDesktop: {
      type: String,
      default: '',
    },
    isSelected: {
      type: String,
      default: 'Desktop',
    },
  },
};
</script>

<style>
.mobile-enter-active {
  transition: all .8s cubic-bezier(0.175, 0.885, 0.32, 1.3);
}
.content-leave-active {
  transition: all .8s ease-out;
}
.mobile-enter, .mobile-leave-to {
  transform: translateY(600px);
}
</style>
