<template>
  <div class="ounded-lg overflow-hidden border border-gray-100">
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
      <tbody v-if="items.length === 0">
        <tr>
          <td>Data tidak tersedia</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="(item, index) in items"
          :key="index"
        >
          <!-- TODO: adjust response data -->
          <td>{{ item.title }}</td>
          <td>{{ item.image }}</td>
          <td>{{ item.sequence }}</td>
          <td>{{ item.link }}</td>
          <td>{{ getStatusLabel(item.is_active) }}</td>
          <td>
            <InfoGraphicsBannerTableAction
              :item="item"
            />
          </td>
        </tr>
      </tbody>
    </JdsSimpleTable>
  </div>
</template>

<script>
import InfoGraphicsBannerTableAction from '@/components/LandingPage/InfoGraphics/InfoGraphicsBannerTableAction';
import { INFO_GRAPHICS_BANNER_TABLE_HEADER } from '@/common/constants';

export default {
  name: 'PopupBannerTable',
  components: {
    InfoGraphicsBannerTableAction,
  },
  props: {
    items: {
      type: Array,
      require: false,
      default: () => [],
    },
  },
  data() {
    return {
      tableHeader: INFO_GRAPHICS_BANNER_TABLE_HEADER,
    };
  },
  methods: {
    getStatusLabel(isActive) {
      return isActive ? 'Aktif' : 'Tidak Aktif';
    },
  },
};
</script>
