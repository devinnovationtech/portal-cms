<template>
  <transition name="iphone">
    <img
      v-if="isSelected === 'Desktop'"
      class="w-full h-[397px] object-contain"
      :src="imageDesktop"
      width="1082"
      height="576"
      alt=""
    >
    <div
      v-else
      class="iphone-frame relative m-auto border-solid border-black border-[10px] rounded-[30px] w-[195px] h-[414px] shadow-lg shadow-gray-800"
    >
      <div class="iphone-screen absolute z-10 w-full h-full rounded-[20px] bg-[url('https://picsum.photos/200/300')] bg-no-repeat bg-cover">
        <div class="iphone-notch z-20 absolute top-0 left-[36px] w-[100px] h-[20px] bg-black rounded-[0px_0px_10px_10px]" />
        <div class="iphone-content mt-6 top-[36px] w-full h-fit ">
          <div class="iphone-apps flex flex-row p-2">
            <button @click="showContentMobile">
              <img
                src="@/assets/icons/chrome.svg"
                width="36"
                height="36"
                alt=""
              >
            </button>
          </div>
        </div>
        <div
          :class="{
            'iphone-modal w-full h-full absolute inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm overflow-hidden': isContentMobile
          }"
        >
          <transition name="content">
            <div
              v-if="isContentMobile"
              class="absolute w-full h-[calc(100%-20px)] top-4"
            >
              <div class="flex py-1 px-2 w-full justify-end">
                <button
                  class="h-8 w-8 bg-green-600 rounded-full hover:bg-green-700 transition-colors ease-brand duration-250 text-white"
                  @click="showContentMobile"
                >
                  <JdsIcon
                    name="times"
                    size="16px"
                    class="text-white"
                  />
                </button>
              </div>
              <div class="bg-gray-50 p-1 rounded-[10px] min-h-[335px] flex flex-col justify-between">
                <div class="flex justify-center overflow-y-auto min-w-full max-h-full">
                  <img
                    class="w-auto h-auto object-contain"
                    :src="imageMobile"
                    alt=""
                    width="255"
                    height="443"
                  >
                </div>
                <div class="w-full bg-gray-50 flex items-center justify-center pt-2">
                  <a
                    class="rounded-md bg-green-700 py-1 px-2 w-full text-[12px] leading-[20px] text-white text-center font-lato"
                    :class="{
                      'pointer-events-none' : link === '-'
                    }"
                    :href="link === '-' ? '' : link"
                    target="_blank"
                  >
                    {{ buttonLabel }}
                  </a>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupBannerImagePreview',
  props: {
    link: {
      type: String,
      default: '',
    },
    buttonLabel: {
      type: String,
      default: 'Tutup',
    },
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
    isContentMobile: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    showContentMobile() {
      this.$emit('showContentMobile');
    },
  },
};
</script>

<style>
.iphone-enter-active, .content-enter-active {
  transition: all .8s cubic-bezier(0.175, 0.885, 0.32, 1.3);
}
.content-leave-active {
  transition: all .8s ease-out;
}
.iphone-enter, .iphone-leave-to {
  transform: translateY(600px);
}

.content-enter, .content-leave-to {
  transform: translateY(500px);
}
</style>
