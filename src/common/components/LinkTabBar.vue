<template>
  <ul
    ref="tab-bar"
    class="w-full min-h-[48px] flex gap-3 px-4 bg-white rounded-lg mb-[14px]"
  >
    <router-link
      v-for="(tab, index) in tabs"
      :key="`${tab.label}${index}`"
      v-slot="{ href, navigate, isExactActive }"
      ref="tab-bar-item"
      :to="tab.link"
      custom
      :data-cy="tab.dataCy || ''"
    >
      <li>
        <a
          :href="href"
          class="h-full flex flex-col justify-between cursor-pointer"
          @click="navigate"
        >
          <span
            :class="{
              'mt-3 px-3 font-lato font-medium text-sm text-gray-700': true,
              'text-green-700': isExactActive
            }"
          >
            {{ tab.label }}
          </span>
          <div
            ref="tab-bar-indicator"
            class="w-full h-[3px] rounded-t-lg"
            :class="isExactActive ? 'bg-green-700' : 'bg-transparent'"
          />
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    tabs: {
      type: Array,
      default: () => [
        { label: 'Tab 1', link: '' },
        { label: 'Tab 2', link: '' },
        { label: 'Tab 3', link: '' },
      ],
    },
  },
};
</script>
