<template>
  <div class="quick-link rounded-lg border border-gray-100">
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
          class="line-clamp-2"
          :title="item.title"
        >
          {{ item.title }}
        </p>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.preview="{item}">
        <div class="w-[172px] h-[63px] rounded-md overflow-hidden">
          <img
            :src="item.image"
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
      <template #item.status="{item}">
        <JdsToggle
          :label="getStatusLabel(item.is_active)"
          :checked="item.is_active"
          @change="$emit('change:status', item)"
        />
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.action="{item}">
        <QuickLinkTableAction
          :item="item"
          @delete="$emit('delete', $event)"
        />
      </template>
    </JdsDataTable>
  </div>
</template>

<script>
import QuickLinkTableAction from '@/components/LandingPage/QuickLink/QuickLinkTableAction';
import { QUICK_LINK_TABLE_HEADER } from '@/common/constants';

export default {
  name: 'QuickLinkTable',
  components: {
    QuickLinkTableAction,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableHeader: QUICK_LINK_TABLE_HEADER,
      pagination: {
        currentPage: 1,
        itemsPerPage: 5,
        totalRows: 0,
        itemsPerPageOptions: [5, 10, 15, 30],
      },
      listData: [],
    };
  },
  watch: {
    items: {
      handler() {
        this.listData = this.items;
      },
      immediate: true,
    },
  },
  methods: {
    getStatusLabel(isActive) {
      return isActive ? 'Aktif' : 'Tidak Aktif';
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

<style scoped>
/**
 * Override default jds-simple-table style
 */
.quick-link .jds-simple-table {
  table-layout: fixed !important;
  height: 400px !important;
}

.quick-link .jds-simple-table tbody {
  height: 400px !important;
  display: block;
}

.quick-link .jds-simple-table thead, tbody tr {
    display:table;
    width:100%;
    table-layout: fixed;
}
</style>
