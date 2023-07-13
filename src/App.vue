<template>
  <div id="app">
    <AppLayout>
      <keep-alive include="Settings">
        <router-view />
      </keep-alive>
    </AppLayout>
    <portal-target name="modal" />
    <Toast />
    <ForbiddenAccessModal />
  </div>
</template>

<script>
import AppLayout from '@/layouts/AppLayout';
import Toast from '@/common/components/Toast';
import ForbiddenAccessModal from '@/common/components/ForbiddenAccessModal';

export default {
  components: {
    AppLayout,
    Toast,
    ForbiddenAccessModal,
  },
  metaInfo() {
    return {
      meta: [
        { name: 'robots', content: 'noindex' }, // prevent search engine to index this site
      ],
      script: [
        // Initiate New Relic Browser Monitoring Script
        {
          src: './new-relic-browser-script.js',
          type: 'text/javascript',
          defer: true,
          'data-account-id': process.env.VUE_APP_ACCOUNT_ID_NEW_RELIC,
          'data-browser-license-key': process.env.VUE_APP_LICENSE_KEY_NEW_RELIC_ACCOUNT,
          'data-application-id': process.env.VUE_APP_APPLICATION_ID_NEW_RELIC,
        },
      ],
    };
  },
};
</script>
