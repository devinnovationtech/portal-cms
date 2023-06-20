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
  name: 'Services',
  components: {
    LinkTabBar,
  },
  data() {
    return {
      tabs: [
        { label: 'Daftar Layanan', link: '/layanan/daftar-layanan' },
        { label: 'Daftar Publikasi Layanan', link: '/layanan/daftar-publikasi-layanan' },
        { label: 'Program Unggulan', link: '/layanan/program-unggulan' },
      ],
    };
  },
};
</script>
