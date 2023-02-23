<template>
  <div class="service-table rounded-lg overflow-hidden border border-gray-100">
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
      @change:sort="onSortChange($event)"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.title="{item}">
        <p class="line-clamp-1">
          {{ item.name }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.author="{item}">
        <p class="capitalize">
          {{ item.opd_name }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.user="{item}">
        <p>
          {{ item.goverment_affair }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.operational="{item}">
        <p
          :class="{
            'font-lato font-bold text-[14px] leading-[23px]' : true,
            'w-fit rounded-[6px] bg-[#E3F0FF] text-blue-800 px-2 py-[2px] lowercase': item.operational_status === 'ONLINE',
            'w-fit rounded-[6px] bg-gray-200 text-gray-600 px-2 py-[2px] lowercase': item.operational_status === 'OFFLINE'
          }"
        >
          <span
            :class="{
              'w-2 h-2 rounded-full inline-block mr-[5px]': true,
              'bg-blue-800': item.operational_status === 'ONLINE',
              'bg-gray-600': item.operational_status === 'OFFLINE',
            }"
          />
          {{ item.operational_status }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.updated="{item}">
        <p>
          {{ item.updated_at }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.status="{item}">
        <p>
          {{ getServiceStatus(item.status) }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.action="{item}">
        <MasterDataTableAction
          :item="item"
          @delete="$emit('delete', $event)"
        />
      </template>
    </JdsDataTable>
  </div>
</template>

<script>
import { MASTER_DATA_TABLE_HEADER, MASTER_DATA_STATUS_MAP } from '@/common/constants';
import MasterDataTableAction from '@/components/Services/MasterData/MasterDataTableAction';

export default {
  name: 'MasterDataTable',
  components: {
    MasterDataTableAction,
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
      tableHeader: MASTER_DATA_TABLE_HEADER,
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalRows: 0,
        itemsPerPageOptions: [10, 20, 30, 40, 50],
      },
    };
  },
  watch: {
    meta: {
      handler() {
        this.pagination = {
          ...this.pagination,
          currentPage: this.meta?.current_page || 1,
          itemsPerPage: this.meta?.per_page || 10,
          totalRows: this.meta?.total_count || 0,
        };
      },
      immediate: true,
    },
  },
  methods: {
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

    getServiceStatus(status) {
      return MASTER_DATA_STATUS_MAP[status] ?? status;
    },

    onSortChange(sort) {
      this.$emit('change:sort', {
        sort_by: Object.keys(sort)[0],
        sort_order: Object.values(sort)[0].toUpperCase(),
      });
    },
  },
};
</script>

<style>
/**
 * Override default jds-data-table style
 */
.service-table .jds-data-table {
  table-layout: fixed !important;
}

.service-table .jds-data-table thead tr th:nth-child(1) {
  width: 300px !important;
}

.service-table .jds-data-table thead tr th:nth-child(3) {
  width: 180px !important;
}

.service-table .jds-options .jds-options__filter {
  width: 100% !important;
  height: 48px !important;
}

.service-table .jds-options--filterable {
  min-width: 120px !important;
}
</style>
