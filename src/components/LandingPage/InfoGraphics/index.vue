<template>
  <main class="w-full pb-20">
    <section class="px-3 py-6 rounded-lg bg-white border-2 border-green-600">
      <div class="w-full">
        <!-- Table Menu -->
        <div class="sm:flex-wrap flex mb-4 items-start justify-end">
          <div class="flex gap-4">
            <BaseButton
              v-show="!toggleSorting"
              class="bg-white text-sm text-green-700 border-green-700"
              @click="onEditSorting"
            >
              <template #icon-left>
                <SortIcon class="w-5 h-5 fill-green-600" />
              </template>
              <p>
                Edit Urutan
              </p>
            </BaseButton>
            <BaseButton
              v-show="toggleSorting"
              class="bg-white text-sm text-green-700 border-green-700"
              @click="onSaveSorting"
            >
              <template #icon-left>
                <SaveIcon class="w-5 h-5 fill-green-600" />
              </template>
              <p>
                Simpan Urutan
              </p>
            </BaseButton>
            <LinkButton
              href="/infographics-banner/tambah"
              title="Tambah Infographics Banner"
              class="ml-auto"
            >
              <template #icon-left>
                <JdsIcon
                  name="plus"
                  size="14px"
                  fill="#fff"
                  class="h-[14px] w-[14px]"
                />
              </template>
              <p class="font-lato font-bold text-sm text-white leading-none">
                Tambah Banner Infografis
              </p>
            </LinkButton>
          </div>
        </div>
        <div class="w-full overflow-auto">
          <InfoGraphicsBannerTable
            :items="banners"
            :loading="loading"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @delete="handleDeleteBanner($event)"
            @change:status="handleUpdateStatus($event)"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import SortIcon from '@/assets/icons/fluent-arrow.svg?inline';
import SaveIcon from '@/assets/icons/uil-save.svg?inline';
import InfoGraphicsBannerTable from '@/components/LandingPage/InfoGraphics/InfoGraphicsBannerTable';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const infographicsBannerRepository = RepositoryFactory.get('infographicsBanner');

const MODAL_STATE = Object.freeze({
  NONE: 'NONE',
  LOADING: 'LOADING',
  DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
  STATUS_SWAP: 'STATUS_SWAP',
  STATUS_ACTIVATE: 'STATUS_ACTIVATE',
  STATUS_DEACTIVATE: 'STATUS_DEACTIVATE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
});

export default {
  name: 'InfographicsBannerList',
  components: {
    BaseButton,
    LinkButton,
    SortIcon,
    SaveIcon,
    InfoGraphicsBannerTable,
  },
  data() {
    return {
      banners: [ // TODO: delete this dummy value
        {
          title: 'Judul Infographics',
          image: {
            desktop: 'https://dvgddkosknh6r.cloudfront.net/live/media/img/1679647349-Template-Pop-Up-IPJ-03.jpg',
            mobile: 'https://dvgddkosknh6r.cloudfront.net/live/media/img/1679647355-Template-Pop-Up-IPJ-01.jpg',
          },
          order: 1,
          link: 'https://aljabbar.jabarprov.go.id',
          is_active: true,
        },
      ],
      loading: false,
      toggleSorting: false,
      meta: {
        total_count: 0,
        total_page: 0,
        current_page: 1,
        per_page: 5,
      },
      params: {
        per_page: 5,
        page: 1,
        q: '',
      },
    };
  },
  // TODO: imlement this mounted function
  // async mounted() {
  //   await this.fetchBanners();
  // },
  methods: {
    async fetchBanners() {
      try {
        this.loading = true;
        const response = await infographicsBannerRepository.getBanners(this.params);
        const { data, meta } = response.data;

        this.banners = data;
        this.meta = meta;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Infographics Banner, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    onEditSorting() {
      this.toggleSorting = !this.toggleSorting;
    },
    onSaveSorting() {
      this.toggleSorting = !this.toggleSorting;
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchBanners();
    },
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
    handleUpdateStatus(item) {
      const filterBanner = this.banners.filter((banner) => banner.id === item.id)[0];
      this.bannerDetail = { ...filterBanner };

      if (item.status === 'NON-ACTIVE') {
        this.modalState = MODAL_STATE.STATUS_ACTIVATE;

        this.setModalMessage({
          title: 'Konfirmasi Pengaktifan',
          message: 'Apakah Anda yakin ingin mengaktifkan banner ini?',
          action: () => this.updateBannerStatusById(this.bannerDetail.id, 'ACTIVE'),
        });
      }

      if (item.status === 'ACTIVE') {
        this.modalState = MODAL_STATE.STATUS_DEACTIVATE;

        this.setModalMessage({
          title: 'Konfirmasi Pengaktifan',
          message: 'Apakah Anda yakin ingin menonaktifkan banner ini?',
          action: () => this.updateBannerStatusById(this.bannerDetail.id, 'NON-ACTIVE'),
        });
      }
    },
    async updateBannerStatusById(id, status) {
      try {
        this.modalState = MODAL_STATE.LOADING;

        const response = await infographicsBannerRepository.updateBannerStatusById(id, {
          status,
        });

        if (response.status === 200) {
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.setModalMessage({
                title: 'Berhasil!',
                message: `Banner berhasil ${status === 'ACTIVE' ? 'diaktifkan' : 'dinonaktifkan'}`,
              });
              this.modalState = MODAL_STATE.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch (error) {
        this.setModalMessage({
          title: 'Update Gagal!',
          message: 'Update status gagal, mohon coba beberapa saat lagi',
        });
        this.modalState = MODAL_STATE.ERROR;
      }
    },
    handleDeleteBanner(id) {
      const filterBanner = this.banners.filter((banner) => banner.id === id)[0];
      this.bannerDetail = { ...filterBanner };

      this.modalState = MODAL_STATE.DELETE_CONFIRMATION;

      this.setModalMessage({
        title: 'Hapus Banner!',
        message: 'Apakah Anda yakin ingin menghapus banner ini?',
        action: () => this.deleteBannerById(id),
      });
    },
  },
};
</script>
