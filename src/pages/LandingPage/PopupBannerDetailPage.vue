<template>
  <div>
    <PopupBannerDetail
      :banners="banner"
      :selected-preview="selectedPreview"
      :is-show-mobile-preview="showMobilePreview"
      :is-show-content-mobile="showContentMobile"
      :is-show-desktop-preview="showDesktopPreview"
      :loading="loading"
      :is-delete-modal-open="isModalDelete"
      :delete-loading="deleteLoading"
      :link-banner-update="linkBannerUpdatePage"
      @showPreviewImage="showPreviewImage"
      @showContentMobile="getShowContentMobile"
      @showDeleteModal="showDeleteModal"
      @deleteBanner="deleteBanner"
      @openUpdatePage="goToUpdateBannerPage"
    />
  </div>
</template>

<script>
import PopupBannerDetail from '@/components/LandingPage/PopupBanner/PopupBannerDetail.vue';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const popupBannerRepository = RepositoryFactory.get('popupBanner');

export default {
  name: 'PopupBannerDetailPage',
  components: {
    PopupBannerDetail,
  },
  data() {
    return {
      banner: {},
      selectedPreview: 1,
      loading: false,
      showMobilePreview: false,
      showContentMobile: false,
      showDesktopPreview: true,
      isModalDelete: false,
      deleteLoading: false,
      // @TODO: change the right link to update banner page
      linkBannerUpdatePage: '/landing-page',
    };
  },
  async mounted() {
    await this.fetchBannerById();
  },
  methods: {
    async fetchBannerById() {
      try {
        this.loading = true;
        const response = await popupBannerRepository.getBannerById(this.$route.params.id);
        const { data } = response.data;
        this.banner = data;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Pop-up Banner, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    showPreviewImage(item) {
      this.selectedPreview = item.id;
      this.showDesktopPreview = item.id === 1;
      this.showMobilePreview = item.id === 2;
    },
    getShowContentMobile() {
      this.showContentMobile = !this.showContentMobile;
    },
    showDeleteModal() {
      this.isModalDelete = !this.isModalDelete;
    },
    deleteBanner() {
      // @TODO: create function to delete the specific banner by id
    },
  },
};
</script>
