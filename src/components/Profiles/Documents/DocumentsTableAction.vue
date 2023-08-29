<template>
  <JdsPopover
    class="list-documents__action-button"
    :value="isDropdownOpen"
    :options="popoverOptions"
  >
    <template #activator>
      <button
        v-on-clickaway="closeDropdown"
        class="py-[6px] px-4 rounded-lg border border-green-700 flex items-center font-lato
        font-bold text-sm leading-5 text-green-700 hover:bg-green-50"
        data-cy="document__table-action-button"
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
        <li v-if="item.status !== 'ARCHIVED'">
          <router-link
            :to="`/profil-jawa-barat/arsip-dan-dokumen/detail/${item.id}`"
            class="font-lato text-sm leading-4 text-gray-800"
            data-cy="document__action-button--detail"
          >
            Detail
          </router-link>
        </li>

        <!-- Edit Action -->
        <li v-if="item.status !== 'ARCHIVED'">
          <router-link
            :to="`/profil-jawa-barat/arsip-dan-dokumen/${item.id}/ubah`"
            class="font-lato text-sm leading-4 text-gray-800"
            data-cy="document__action-button--edit"
          >
            Ubah
          </router-link>
        </li>

        <!-- Delete Action -->
        <li>
          <button
            class="font-lato text-sm leading-4 text-gray-800"
            data-cy="document__action-button--delete"
            @click="$emit('delete', item.id)"
          >
            Hapus
          </button>
        </li>

        <!-- Additional Action -->
        <li>
          <button
            class="font-lato text-sm leading-4 text-gray-800"
            @click="onAdditionalButtonClick(item)"
          >
            {{ getAdditionalButtonLabel(item.status) }}
          </button>
        </li>
      </ul>
    </div>
  </JdsPopover>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import { DOCUMENT_STATUS_ADDITIONAL_BUTTON } from '@/common/constants';

export default {
  name: 'ListDocumentsTableAction',
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
    getAdditionalButtonLabel(status) {
      return DOCUMENT_STATUS_ADDITIONAL_BUTTON[status] ?? '-';
    },
    onAdditionalButtonClick(item) {
      const { status } = item;
      if (status === 'PUBLISHED') {
        this.$emit('archive', item.id);
      } else {
        this.$emit('publish', item.id);
      }
    },
  },
};
</script>

<style>
/** Override default jds popover content styling */
.list-documents__action-button .jds-popover__content {
  z-index: 20 !important;
}
</style>
