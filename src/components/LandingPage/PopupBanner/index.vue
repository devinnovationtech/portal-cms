<template>
  <main class="w-full pb-20">
    <section class="px-3 py-6 rounded-lg bg-white border-2 border-green-600">
      <div class="w-full">
        <!-- Table Menu -->
        <div class="sm:flex-wrap flex mb-4 items-start">
          <LinkButton
            href="/popup-banner/tambah"
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
            @delete="deleteBanner($event)"
          />
        </div>
      </div>
    </section>

    <!-- Delete Action Prompt -->
    <BaseModal
      :open="isModalDelete"
      @click="showDeleteModal"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          Hapus Banner
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          Apakah Anda yakin ingin menghapus banner ini?
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ bannerDetail.title }}
        </h2>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="showDeleteModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-red-500 hover:bg-red-400 text-sm text-white"
            :disabled="deleteLoading"
            @click="deleteBannerById(bannerDetail.id)"
          >
            <p v-if="!deleteLoading">
              Ya, saya yakin
            </p>
            <p
              v-else
              class="flex gap-2 items-center text-gray-500"
            >
              <JdsSpinner
                size="16"
                foreground="#757575"
              />
              Loading...
            </p>
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Submit Progress -->

    <ProgressModal
      :open="deleteStatus === 'LOADING'"
      :value="progressValue"
    />

    <!-- Success or Erros Message Modal -->

    <BaseModal
      :open="(deleteStatus === 'SUCCESS' || deleteStatus === 'ERROR') || !(deleteStatus === 'NONE')"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ messageTitle }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            :name="messageIconName"
            :class="messageIconClassName"
          />
          <p class="text-sm leading-6 text-gray-800">
            {{ messageBody }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="messageAction"
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
import { STATUS_MODAL } from '@/common/constants/index';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const popupBannerRepository = RepositoryFactory.get('popupBanner');

export default {
  name: 'Agenda',
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
      isModalDelete: false,
      deleteLoading: false,
      progressValue: 0,
      deleteStatus: STATUS_MODAL.NONE,
      successMessage: {
        title: '',
        body: '',
      },
      errorMessage: {
        title: '',
        body: '',
      },
    };
  },
  computed: {
    messageTitle() {
      return this.deleteStatus === 'SUCCESS' ? this.successMessage.title : this.errorMessage.title;
    },
    messageBody() {
      return this.deleteStatus === 'SUCCESS' ? this.successMessage.body : this.errorMessage.body;
    },
    messageIconName() {
      return this.deleteStatus === 'SUCCESS' ? 'check-mark-circle' : 'warning';
    },
    messageIconClassName() {
      return this.deleteStatus === 'SUCCESS' ? 'text-green-600' : 'text-red-600';
    },
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
      }
    },
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchBanners();
    },
    showDeleteModal() {
      this.isModalDelete = !this.isModalDelete;
    },
    deleteBanner(id) {
      const filterBanner = this.banners.filter((banner) => banner.id === id)[0];
      this.bannerDetail = { ...filterBanner };
      this.showDeleteModal();
    },
    async deleteBannerById(id) {
      try {
        this.deleteLoading = true;
        const response = await popupBannerRepository.deleteBannerById(id);
        if (response.status === 204) {
          this.deleteStatus = STATUS_MODAL.LOADING;
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.successMessage = {
                title: 'Berhasil dihapus!',
                body: `Banner ${this.bannerDetail.title} berhasil hapus.`,
              };
              this.deleteStatus = STATUS_MODAL.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch {
        this.errorMessage = {
          title: 'Hapus Banner Gagal',
          body: 'Banner yang Anda buat gagal dihapus.',
        };
        this.deleteStatus = STATUS_MODAL.ERROR;
      } finally {
        this.deleteLoading = false;
        this.showDeleteModal();
      }
    },
    resetSubmitState() {
      this.deleteStatus = STATUS_MODAL.NONE;
      this.progressValue = 0;
      this.successMessage.title = '';
      this.successMessage.body = '';
      this.errorMessage.title = '';
      this.errorMessage.body = '';
    },
    messageAction() {
      this.resetSubmitState();
      this.fetchBanners();
    },
  },
};
</script>
