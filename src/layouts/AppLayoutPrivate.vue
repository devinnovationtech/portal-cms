<template>
  <div class="w-full h-screen grid grid-cols-layout bg-gray-100">
    <Sidebar />
    <div class="w-full max-h-screen overflow-y-auto">
      <Header />
      <div class="w-full h-[calc(100%-72px)] py-[14px] px-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/common/components/Sidebar';
import Header from '@/common/components/Header';

export default {
  name: 'AppLayoutPrivate',
  components: {
    Sidebar,
    Header,
  },
};
</script>
