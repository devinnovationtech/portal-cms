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
  name: 'Profiles',
  components: {
    LinkTabBar,
  },
  data() {
    return {
      tabs: [
        { label: 'Arsip dan Dokumen', link: '/profil-jawa-barat/arsip-dan-dokumen', dataCy: 'document__tab-menu' },
        { label: 'Tentang Jawa Barat', link: '/profil-jawa-barat/tentang-jawa-barat', dataCy: 'about__tab-menu' },
      ],
    };
  },
};
</script>
