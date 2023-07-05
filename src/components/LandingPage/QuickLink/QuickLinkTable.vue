<template>
  <div class="quick-link rounded-lg border border-gray-100">
    <JdsSimpleTable class="!table-auto">
      <thead>
        <tr>
          <th
            v-for="header in tableHeader"
            :key="header.key"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr>
          <td colspan="6" class="text-center">
            <JdsSpinner
              size="56px"
              class="py-14"
            />
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="items.length === 0">
        <tr>
          <td>Data tidak tersedia</td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr
          v-for="(item, index) in listData"
          :key="index"
        >
          <td>
            <p
              class="px-2 line-clamp-2"
              :title="item.title"
            >
              {{ item.title }}
            </p>
          </td>
          <td>
            <div class="w-[172px] h-[63px] rounded-md overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover"
              >
            </div>
          </td>
          <td class="px-2">
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
          </td>
          <td>
            <JdsToggle
              :label="getStatusLabel(item.is_active)"
              :checked="item.is_active"
              @change="$emit('change:status', item)"
            />
          </td>
          <!-- @todo: change action component -->
          <td>
            <InfoGraphicsBannerTableAction
              :item="item"
              @delete="$emit('delete', $event)"
            />
          </td>
        </tr>
      </tbody>
    </JdsSimpleTable>
  </div>
</template>

<script>
import InfoGraphicsBannerTableAction from '@/components/LandingPage/InfoGraphics/InfoGraphicsBannerTableAction';
import { QUICK_LINK_TABLE_HEADER } from '@/common/constants';

export default {
  name: 'QuickLinkTable',
  components: {
    InfoGraphicsBannerTableAction,
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
