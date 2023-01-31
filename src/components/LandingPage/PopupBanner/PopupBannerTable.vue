<template>
  <div class="popup-banner rounded-lg overflow-hidden border border-gray-100">
    <JdsDataTable
      :headers="tableHeader"
      :items="items"
      :loading="loading"
      :pagination="pagination"
      empty-text="Data tidak tersedia"
      @next-page="onPaginationChange('next-page', $event)"
      @previous-page="onPaginationChange('previous-page', $event)"
      @per-page-change="onPaginationChange('per-page-change', $event)"
      @page-change="onPaginationChange('page-change', $event)"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.title="{item}">
        <p
          class="line-clamp-2 w-[230px]"
          :title="item.title"
        >
          {{ item.title }}
        </p>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.preview="{item}">
        <div class="w-[172px] h-[63px] rounded-md overflow-hidden">
          <img
            :src="item.image.desktop"
            :alt="item.title"
            class="w-full h-full object-cover"
          >
        </div>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.link="{item}">
        <a
          v-if="item.link"
          :href="item.link"
          class="font-lato text-sm text-blue-700 underline hover:text-blue-800 break-all"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ item.link }}
        </a>
        <span v-else>-</span>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.duration="{item}">
        <p>{{ item.duration }} hari</p>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.start_date="{item}">
        <p>{{ formatDate(item.start_date) }}</p>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.status="{item}">
        <JdsToggle
          :label="getStatusLabel(item.status)"
          :checked="getStatusBool(item.status)"
        />
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.action="{item}">
        <PopupBannerTableAction
          :item="item"
          @delete="$emit('delete', $event)"
        />
      </template>
    </JdsDataTable>
  </div>
</template>

<script>
import PopupBannerTableAction from '@/components/LandingPage/PopupBanner/PopupBannerTableAction';
import { POPUP_BANNER_TABLE_HEADER } from '@/common/constants';
import { formatDate } from '@/common/helpers/date.js';

export default {
  name: 'PopupBannerTable',
  components: {
    PopupBannerTableAction,
  },
  props: {
    items: {
      type: Array,
      require: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      require: false,
      default: false,
    },
    meta: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      tableHeader: POPUP_BANNER_TABLE_HEADER,
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0,
        itemsPerPageOptions: [5, 10, 15, 30],
      },
      formatDate,
    };
  },
  watch: {
    meta: {
      handler() {
        this.pagination = {
          ...this.pagination,
          currentPage: this.meta?.current_page || 1,
          itemsPerPage: this.meta?.per_page || 5,
          totalRows: this.meta?.total_count || 0,
        };
      },
      immediate: true,
    },
  },
  methods: {
    getStatusLabel(status) {
      return status === 'ACTIVE' ? 'Aktif' : 'Tidak Aktif';
    },
    getStatusBool(status) {
      return status === 'ACTIVE';
    },
    onPaginationChange(action, value) {
      const paginationObj = { ...this.pagination };

      switch (action) {
        case 'next-page':
        case 'previous-page':
        case 'page-change':
          paginationObj.currentPage = value;
          break;

        case 'per-page-change':
          paginationObj.itemsPerPage = value;
          break;

        default:
          break;
      }

      this.pagination = { ...paginationObj };

      /**
       *  NOTE:
       *  `jds-pagination` emits `per-page-change` and `page-change` events
       *  whenever user changes per page value.
       *
       *  To avoid double fetch, we immediately stop this function on
       *  `per-page-change` event and let `page-change` event to
       *  fetch data from API
       */

      if (action === 'per-page-change') {
        return;
      }

      this.$emit('update:pagination', {
        page: this.pagination.currentPage,
        per_page: this.pagination.itemsPerPage,
      });
    },
  },
};
</script>

<style>
/**
 * Override default jds-data-table style
 */
.popup-banner .jds-data-table {
  table-layout: fixed !important;
}

.popup-banner .jds-data-table thead tr th:nth-child(1),
.popup-banner .jds-data-table thead tr th:nth-child(2),
.popup-banner .jds-data-table thead tr th:nth-child(3) {
  width: 200px !important;
}

.popup-banner .jds-options .jds-options__filter {
  width: 100% !important;
  height: 48px !important;
}

.popup-banner .jds-options--filterable {
  min-width: 120px !important;
}
</style>
