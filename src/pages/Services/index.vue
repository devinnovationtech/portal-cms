<template>
  <div class="h-full">
    <TabBar
      :tabs="tabs"
      :current-tab.sync="currentTab"
    />
    <keep-alive>
      <component :is="tab" />
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '@/common/components/TabBar';

export default {
  name: 'Services',
  components: {
    TabBar,
    Maintenance: () => import('@/common/components/Maintenance'),
    MasterData: () => import('@/components/Services/MasterData'),
    Publication: () => import('@/components/Services/Publication'),
  },
  data() {
    return {
      tabs: [
        { key: 'service', label: 'Daftar Layanan' },
        { key: 'publication', label: 'Daftar Publikasi Layanan' },
        { key: 'program', label: 'Program Unggulan' },
      ],
      currentTab: 'service',
    };
  },
  computed: {
    tab() {
      switch (this.currentTab) {
        case 'service':
          return 'MasterData';
        case 'publication':
          return 'Publication';
        case 'program':
          return 'Maintenance';
        default:
          return 'Maintenance';
      }
    },
  },

};
</script>
