<template>
  <main class="w-full">
    <!-- Table -->
    <section class="px-3 py-4 rounded-lg bg-white border-2 border-green-600 h-auto overflow-hidden">
      <div
        class="w-full"
        data-cy="quick-link__container"
      >
        <!-- Table Menu -->
        <div class="sm:flex-wrap flex mb-4 items-start justify-end">
          <LinkButton
            href="/landing-page/akses-cepat/tambah"
            title="Tambah Akses Cepat"
            data-cy="quick-link__add-button"
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
              Tambah Akses Cepat
            </p>
          </LinkButton>
        </div>
        <div class="w-full h-full overflow-hidden rounded-xl">
          <QuickLinkTable
            :items="links"
            :loading="loading"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @delete="handleDeleteQuickLink($event)"
            @change:status="handleUpdateStatus($event)"
            @scrollFetch="fetchQuickLinks"
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
      data-cy="quick-link__confirmation-modal"
    >
      <div class="w-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ modalMessage.title }}
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          {{ modalMessage.message }}
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ linkDetail.title }}
        </h2>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            data-cy="quick-link__confirmation-modal__cancel-button"
            @click="handleCloseModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            :class="{
              'text-sm text-white': true,
              'bg-green-600 hover:bg-green-700': modalState === 'STATUS_ACTIVATE',
              'bg-red-500 hover:bg-red-400': modalState === 'STATUS_DEACTIVATE' || modalState === 'DELETE_CONFIRMATION',
            }"
            :disabled="modalState === 'LOADING'"
            data-cy="quick-link__confirmation-modal__save-button"
            @click="modalMessage.action(linkDetail.id)"
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

    <!-- Success or Erros Message Modal -->
    <BaseModal
      v-if="modalState === 'ERROR' || modalState === 'SUCCESS'"
      :open="modalState === 'ERROR' || modalState === 'SUCCESS'"
      data-cy="quick-link__message-modal"
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
            data-cy="quick-link__message-modal__button"
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
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import LinkButton from '@/common/components/LinkButton';
import QuickLinkTable from '@/components/LandingPage/QuickLink/QuickLinkTable';

const quickLinkRepository = RepositoryFactory.get('quickLink');

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
  name: 'QuickLinkList',
  components: {
    BaseButton,
    BaseModal,
    LinkButton,
    QuickLinkTable,
  },
  data() {
    return {
      links: [
        {
          title: 'Laporan Keuangan',
          image: 'https://dvgddkosknh6r.cloudfront.net/staging/media/img/1688464070-img_4876x1627.jpg',
          link: 'www.google.com',
          is_active: true,
        },
      ],
      loading: false,
      params: {
        per_page: 5,
        page: 1,
        q: '',
        is_active: null,
      },
      progressValue: 0,
      modalState: MODAL_STATE.NONE,
      modalMessage: {
        title: '',
        message: '',
        action: null,
      },
      linkDetail: {},
    };
  },
  // @todo: implement mounted in next PR
  // async mounted() {
  //   await this.fetchQuickLinks();
  // },
  methods: {
    async fetchQuickLinks() {
      try {
        // @todo: change vuex method name
        const response = await quickLinkRepository.getBanners(this.params);
        const { data } = response.data;
        this.links = data;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Akses Cepat, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchQuickLinks();
    },
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
    handleUpdateStatus(item) {
      const filterQuickLink = this.links.filter((link) => link.id === item.id)[0];
      this.linkDetail = { ...filterQuickLink };

      if (!item.is_active) {
        this.modalState = MODAL_STATE.STATUS_ACTIVATE;

        this.setModalMessage({
          title: 'Konfirmasi Pengaktifan',
          message: 'Apakah Anda yakin ingin mengaktifkan akses cepat ini?',
          action: () => this.updateQuickLinkStatusById(this.linkDetail.id, 1),
        });
      } else if (item.is_active) {
        this.modalState = MODAL_STATE.STATUS_DEACTIVATE;

        this.setModalMessage({
          title: 'Konfirmasi Pengaktifan',
          message: 'Apakah Anda yakin ingin menonaktifkan akses cepat ini?',
          action: () => this.updateQuickLinkStatusById(this.linkDetail.id, 0),
        });
      }
    },
    async updateQuickLinkStatusById(id, status) {
      try {
        this.modalState = MODAL_STATE.LOADING;

        const response = await quickLinkRepository.updateQuickLinkStatusById(id, {
          is_active: status,
        });

        if (response.status === 200) {
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.setModalMessage({
                title: 'Berhasil!',
                message: `Akses Cepat berhasil ${status === 1 ? 'diaktifkan' : 'dinonaktifkan'}`,
              });
              this.modalState = MODAL_STATE.SUCCESS;
              this.fetchQuickLinks();
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
    handleDeleteQuickLink(id) {
      const filterQuickLink = this.links.filter((link) => link.id === id)[0];
      this.linkDetail = { ...filterQuickLink };

      this.modalState = MODAL_STATE.DELETE_CONFIRMATION;

      this.setModalMessage({
        title: 'Hapus Akses Cepat!',
        message: 'Apakah Anda yakin ingin menghapus link akses cepat ini?',
        action: () => this.deleteQuickLinkById(id),
      });
    },
    async deleteQuickLinkById(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await quickLinkRepository.deleteQuickLinkById(id);
        if (response.status === 200) {
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.setModalMessage({
                title: 'Berhasil dihapus!',
                message: `Akses Cepat ${this.linkDetail.title} berhasil hapus.`,
              });
              this.modalState = MODAL_STATE.SUCCESS;
              this.fetchQuickLinks();
            }, 150);
          }, 150);
        }
      } catch {
        this.setModalMessage({
          title: 'Hapus Akses Cepat Gagal',
          message: 'Akses Cepat yang Anda buat gagal dihapus.',
        });
        this.modalState = MODAL_STATE.ERROR;
      }
    },
    setModalMessage(messageObj) {
      this.modalMessage = { ...messageObj };
    },
    async handleCloseModal() {
      this.resetModalState();
      await this.$nextTick();
      this.fetchQuickLinks();
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
