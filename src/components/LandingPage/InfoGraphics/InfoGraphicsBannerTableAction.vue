<template>
  <JdsPopover
    class="info-graphics-banner__action-button"
    :value="isDropdownOpen"
    :options="popoverOptions"
  >
    <template #activator>
      <button
        v-on-clickaway="closeDropdown"
        class="py-[6px] px-4 rounded-lg border border-green-700 flex items-center font-lato
        font-bold text-sm leading-5 text-green-700 hover:bg-green-50"
        @click="toggleDropdown"
      >
        Aksi
        <JdsIcon
          name="chevron-down"
          size="14px"
          fill="#069550"
          class="ml-[10px] transition-all ease-in duration-200"
          :class="isDropdownOpen ? '-rotate-180' : null"
        />
      </button>
    </template>

    <div class="bg-white p-[18px] rounded-lg border border-gray-200 shadow-xl">
      <ul class="flex flex-col gap-4">
        <li class="font-lato text-sm leading-4 text-gray-800">
          <router-link
            :to="`/landing-page/infographics-banner/detail/${item.id}`"
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Detail
          </router-link>
        </li>
        <li class="font-lato text-sm leading-4 text-gray-800">
          <router-link
            :to="`/landing-page/infographics-banner/detail/${item.id}/ubah`"
          >
            Ubah
          </router-link>
        </li>
        <li>
          <button
            class="font-lato text-sm leading-4 text-gray-800"
            @click="$emit('delete', item.id)"
          >
            Hapus
          </button>
        </li>
      </ul>
    </div>
  </JdsPopover>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  directives: {
    onClickaway,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isDropdownOpen: false,
      popoverOptions: {
        modifiers: [
          {
            name: 'offset',
            options: { offset: [-8, 8] },
          },
        ],
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
  },
};
</script>

<style>
/** Override default jds popover content styling */
.info-graphics-banner__action-button .jds-popover__content {
  z-index: 20 !important;
}
</style>
