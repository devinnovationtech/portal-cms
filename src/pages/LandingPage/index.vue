<template>
  <div class="h-full">
    <LinkTabBar :tabs="tabs" />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import LinkTabBar from '@/common/components/LinkTabBar';

export default {
  name: 'LandingPage',
  components: {
    LinkTabBar,
  },
  data() {
    return {
      tabs: [
        { label: 'Popup Banner', link: '/landing-page/popup-banner' },
        { label: 'Infografis Banner', link: '/landing-page/infographics-banner' },
        { label: 'Layanan Terpopuler', link: '/landing-page/layanan-terpopuler' },
        { label: 'Akses Cepat', link: '/landing-page/akses-cepat' },
      ],
    };
  },
};
</script>
