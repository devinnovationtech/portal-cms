<template>
  <div class="infographics-banner rounded-lg border border-gray-100">
    <JdsSimpleTable class="!table-auto">
      <thead>
        <tr>
          <th
            v-show="sorting"
            width="50"
          />
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
        <draggable
          v-model="listData"
          tag="tr"
          :scroll-sensitivity="300"
          :force-fallback="true"
          :animation="300"
          ghost-class="ghost"
          handle=".iconHandle"
          class="w-fit"
        >
          <tr
            v-for="(item, index) in listData"
            :key="index"
          >
            <td
              v-show="sorting"
              width="50"
              class="iconHandle cursor-pointer"
            >
              <DragIcon />
            </td>
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
                  :src="item.image.desktop"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                >
              </div>
            </td>
            <td>
              <p
                :title="item.sequence"
                class="flex justify-center"
              >
                {{ item.sequence !== 0 ? item.sequence : '-' }}
              </p>
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
            <td>
              <InfoGraphicsBannerTableAction
                :item="item"
                @delete="$emit('delete', $event)"
              />
            </td>
          </tr>
          <tr>
            <InfiniteScrollObserver
              v-if="listData.length"
              class="h-[10px]"
              @intersect="$emit('scrollFetch')"
            />
          </tr>
        </draggable>
      </tbody>
    </JdsSimpleTable>
  </div>
</template>

<script>
import InfoGraphicsBannerTableAction from '@/components/LandingPage/InfoGraphics/InfoGraphicsBannerTableAction';
import InfiniteScrollObserver from '@/common/components/InfiniteScrollObserver';
import { INFO_GRAPHICS_BANNER_TABLE_HEADER } from '@/common/constants';
import draggable from 'vuedraggable';
import DragIcon from '@/assets/icons/drag.svg?inline';

export default {
  name: 'InfographicsBannerTable',
  components: {
    DragIcon,
    InfoGraphicsBannerTableAction,
    InfiniteScrollObserver,
    draggable,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    additionalItems: {
      type: Array,
      default: () => [],
    },
    sorting: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableHeader: INFO_GRAPHICS_BANNER_TABLE_HEADER,
      listData: [],
    };
  },
  watch: {
    items: {
      handler() {
        if ((this.sorting && this.items.length <= 5) || !this.sorting) {
          this.listData = this.items;
        }
      },
      immediate: true,
    },
    additionalItems: {
      handler() {
        this.listData = this.listData.concat(this.additionalItems);
      },
      immediate: true,
    },
    listData: {
      handler() {
        if (this.listData.length > 0) {
          const sequenceData = [];
          this.listData.forEach((item) => {
            sequenceData.push(item.id);
          });
          this.$emit('change:sequence', sequenceData);
        }
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
.infographics-banner .jds-simple-table {
  table-layout: fixed !important;
  height: 400px !important;
}

.infographics-banner .jds-simple-table tbody {
  height: 400px !important;
  display: block;
}

.infographics-banner .jds-simple-table thead, tbody tr {
    display:table;
    width:100%;
    table-layout: fixed;
}
</style>
