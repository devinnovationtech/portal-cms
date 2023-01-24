<template>
  <div class="rounded-lg overflow-hidden border border-gray-100">
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
          class="font-lato text-sm text-blue-700 underline hover:text-blue-800"
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
        itemsPerPage: 10,
        totalRows: 0,
        itemsPerPageOptions: [10, 20, 30, 40, 50],
      },
      formatDate,
    };
  },
  methods: {
    getStatusLabel(status) {
      return status === 'ACTIVE' ? 'Aktif' : 'Tidak Aktif';
    },
    getStatusBool(status) {
      return status === 'ACTIVE';
    },
  },
};
</script>
