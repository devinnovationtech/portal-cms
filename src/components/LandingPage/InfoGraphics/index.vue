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
            :class="{
              'text-sm text-white': true,
              'bg-green-600 hover:bg-green-700': modalState === 'STATUS_ACTIVATE',
              'bg-red-500 hover:bg-red-400': modalState === 'STATUS_DEACTIVATE',
            }"
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
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
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
  STATUS_ACTIVATE: 'STATUS_ACTIVATE',
  STATUS_DEACTIVATE: 'STATUS_DEACTIVATE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
});

export default {
  name: 'InfographicsBannerList',
  components: {
    BaseButton,
    BaseModal,
    LinkButton,
    SortIcon,
    SaveIcon,
    InfoGraphicsBannerTable,
  },
  data() {
    return {
      banners: [],
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
      progressValue: 0,
      modalState: MODAL_STATE.NONE,
      modalMessage: {
        title: '',
        message: '',
        action: null,
      },
      bannerDetail: {},
    };
  },
  async mounted() {
    await this.fetchBanners();
  },
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

      if (item.is_active) {
        this.modalState = MODAL_STATE.STATUS_ACTIVATE;

        this.setModalMessage({
          title: 'Konfirmasi Pengaktifan',
          message: 'Apakah Anda yakin ingin mengaktifkan banner ini?',
          action: () => this.updateBannerStatusById(this.bannerDetail.id, 'ACTIVE'),
        });
      }

      if (!item.is_active) {
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
    setModalMessage(messageObj) {
      this.modalMessage = { ...messageObj };
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
    },
  },
};
</script>
