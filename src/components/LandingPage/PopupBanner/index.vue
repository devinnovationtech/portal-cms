<template>
  <main class="w-full pb-20">
    <section class="px-3 py-6 rounded-lg bg-white border-2 border-green-600">
      <div class="w-full">
        <!-- Table Menu -->
        <div class="sm:flex-wrap flex mb-4 items-start">
          <LinkButton
            href="/landing-page/popup-banner/tambah"
            title="Tambah Pop-up Banner"
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
              Tambah Pop-up Banner
            </p>
          </LinkButton>
        </div>
        <div class="w-full overflow-auto">
          <PopupBannerTable
            :items="banners"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @delete="handleDeleteBanner($event)"
            @change:status="handleUpdateStatus($event)"
          />
        </div>
      </div>
    </section>

    <!-- Action Prompt -->
    <BaseModal
      :open="
        modalState === 'DELETE_CONFIRMATION' ||
          modalState === 'STATUS_ACTIVATE' ||
          modalState === 'STATUS_DEACTIVATE'"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ modalMessage.title }}
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          {{ modalMessage.message }}
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ bannerDetail.title }}
        </h2>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="handleCloseModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-red-500 hover:bg-red-400 text-sm text-white"
            :disabled="modalState === 'LOADING'"
            @click="modalMessage.action(bannerDetail.id)"
          >
            <p
              v-if="modalState === 'LOADING'"
              class="flex gap-2 items-center text-gray-500"
            >
              <JdsSpinner
                size="16"
                foreground="#757575"
              />
              Loading...
            </p>
            <p v-else>
              Ya, saya yakin
            </p>
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Swap Status Prompt -->
    <BaseModal
      v-if="modalState === 'STATUS_SWAP'"
      :open="modalState === 'STATUS_SWAP'"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ modalMessage.title }}
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-6">
          {{ modalMessage.message }}
        </p>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h2 class="font-roboto text-base leading-6 text-[#627798]">
              Banner Awal (Aktif)
            </h2>
            <p class="font-roboto text-base leading-6 text-blue-gray-800 mb-6">
              {{ activeBanner.title }}
            </p>
            <div class="w-[220px] h-[120px] rounded-md overflow-hidden">
              <img
                :src="activeBanner.image?.desktop"
                :alt="activeBanner.title"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
          <div>
            <h2 class="font-roboto text-base leading-6 text-[#627798]">
              Banner Baru:
            </h2>
            <p class="font-roboto text-base leading-6 text-blue-gray-800 mb-6">
              {{ bannerDetail.title }}
            </p>
            <div class="w-[220px] h-[120px] rounded-md overflow-hidden">
              <img
                :src="bannerDetail.image?.desktop"
                :alt="bannerDetail.title"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="handleCloseModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-green-600 hover:bg-green-700 text-sm text-white"
            :disabled="modalState === 'LOADING'"
            @click="modalMessage.action(bannerDetail.id)"
          >
            <p
              v-if="modalState === 'LOADING'"
              class="flex gap-2 items-center text-gray-500"
            >
              <JdsSpinner
                size="16"
                foreground="#757575"
              />
              Loading...
            </p>
            <p v-else>
              Ya, saya yakin
            </p>
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Action Progress -->
    <ProgressModal
      v-if="modalState === 'LOADING'"
      :open="modalState === 'LOADING'"
      :value="progressValue"
    />

    <!-- Success or Erros Message Modal -->
    <BaseModal
      v-if="modalState === 'ERROR' || modalState === 'SUCCESS'"
      :open="modalState === 'ERROR' || modalState === 'SUCCESS'"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ modalMessage.title }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            v-show="modalState === 'SUCCESS'"
            name="check-mark-circle"
            class="text-green-600"
          />
          <JdsIcon
            v-show="modalState === 'ERROR'"
            name="warning"
            class="text-red-600"
          />
          <p class="text-sm leading-6 text-gray-800">
            {{ modalMessage.message }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="handleCloseModal"
          >
            Saya Mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import PopupBannerTable from '@/components/LandingPage/PopupBanner/PopupBannerTable';
import LinkButton from '@/common/components/LinkButton';
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';
import ProgressModal from '@/common/components/ProgressModal';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const popupBannerRepository = RepositoryFactory.get('popupBanner');

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
  name: 'PopupBannerList',
  components: {
    PopupBannerTable,
    LinkButton,
    BaseModal,
    BaseButton,
    ProgressModal,
  },
  data() {
    return {
      banners: [],
      activeBanner: null,
      loading: false,
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
      bannerDetail: {},
      progressValue: 0,
      modalState: MODAL_STATE.NONE,
      modalMessage: {
        title: '',
        message: '',
        action: null,
      },
    };
  },
  async mounted() {
    await this.fetchBanners();
  },
  methods: {
    async fetchBanners() {
      try {
        this.loading = true;
        const response = await popupBannerRepository.getBanners(this.params);
        const { data, meta } = response.data;

        this.banners = data;
        this.meta = meta;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Pop-up Banner, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
        this.setActiveBanner();
      }
    },
    setActiveBanner() {
      const activeBanner = this.banners.find((banner) => banner.is_live === 1);

      this.activeBanner = activeBanner || null;
    },
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
    setModalMessage(messageObj) {
      this.modalMessage = { ...messageObj };
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchBanners();
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
    handleUpdateStatus(item) {
      const filterBanner = this.banners.filter((banner) => banner.id === item.id)[0];
      this.bannerDetail = { ...filterBanner };

      if (this.activeBanner !== null && item.status === 'NON-ACTIVE') {
        this.modalState = MODAL_STATE.STATUS_SWAP;

        this.setModalMessage({
          title: 'Konfirmasi Penggantian',
          message: 'Apakah Anda yakin akan mengganti Banner Pop-up yang sedang aktif?',
          action: () => this.updateBannerStatusById(this.bannerDetail.id, 'ACTIVE'),
        });
      }

      if (this.activeBanner === null && item.status === 'NON-ACTIVE') {
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
    async deleteBannerById(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await popupBannerRepository.deleteBannerById(id);
        if (response.status === 204) {
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.setModalMessage({
                title: 'Berhasil dihapus!',
                message: `Banner ${this.bannerDetail.title} berhasil hapus.`,
              });
              this.modalState = MODAL_STATE.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch {
        this.setModalMessage({
          title: 'Hapus Banner Gagal',
          message: 'Banner yang Anda buat gagal dihapus.',
        });
        this.modalState = MODAL_STATE.ERROR;
      }
    },
    async updateBannerStatusById(id, status) {
      try {
        this.modalState = MODAL_STATE.LOADING;

        const response = await popupBannerRepository.updateBannerStatusById(id, {
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
    async handleCloseModal() {
      this.resetModalState();
      await this.$nextTick();
      this.fetchBanners();
    },
    resetModalState() {
      this.modalState = MODAL_STATE.NONE;
      this.progressValue = 0;
      this.modalMessage.title = '';
      this.modalMessage.body = '';
      this.modalMessage.action = null;
      this.activeBanner = null;
    },
  },
};
</script>
