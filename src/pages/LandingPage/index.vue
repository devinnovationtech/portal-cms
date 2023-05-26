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
  name: 'LandingPage',
  components: {
    TabBar,
    PopupBanner: () => import('@/components/LandingPage/PopupBanner'),
    InfoGraphicsBanner: () => import('@/components/LandingPage/InfoGraphics'),
    Maintenance: () => import('@/common/components/Maintenance'),

  },
  data() {
    return {
      tabs: [
        { key: 'popup-banner', label: 'Popup Banner' },
        { key: 'infographics-banner', label: 'Infografis Banner' },
        { key: 'layanan-terpopuler', label: 'Layanan Terpopuler' },
        { key: 'akses-cepat', label: 'Akses Cepat' },
      ],
      currentTab: 'popup-banner',
    };
  },
  computed: {
    tab() {
      switch (this.currentTab) {
        case 'popup-banner':
          return 'PopupBanner';
        case 'infographics-banner':
          return 'InfoGraphicsBanner';
        default:
          return 'Maintenance';
      }
    },
  },
};
</script>
