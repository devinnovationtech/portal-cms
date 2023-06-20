<template>
  <section class="relative w-full min-h-[54px] px-4 py-3 border border-gray-300 rounded-xl">
    <div class="flex justify-between">
      <slot name="header">
        <h2 class="font-roboto font-medium text-base leading-7 text-blue-gray-800">
          {{ title }}
        </h2>
      </slot>
      <button
        class="w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100"
        type="button"
        @click="toggleOpen"
      >
        <JdsIcon
          name="chevron-down"
          size="16px"
          :class="{
            'h-4 text-blue-gray-800 transition-transform ease-in' : true,
            '-rotate-180': isOpen
          }"
        />
      </button>
    </div>
    <div
      :class="{
        'w-full transition-all ease-in-out duration-500 overflow-hidden': true,
        'max-h-0': !isOpen,
        'max-h-[99999999px]': isOpen
      }"
    >
      <div class="pt-6">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
