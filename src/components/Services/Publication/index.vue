<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <PublicationTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        @update:currentTab="filterPublicationByStatus"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="full flex justify-between mb-5 items-center">
          <LinkButton
            href="/layanan/daftar-publikasi/tambah"
            title="Tambah Layanan"
            class="ml-auto"
          >
            <template #icon-left>
              <JdsIcon
                name="plus"
                size="14px"
                fill="#fff"
              />
            </template>
            <p class="font-lato font-bold text-sm text-white leading-none">
              Tambah Layanan
            </p>
          </LinkButton>
        </div>
        <div class="w-full overflow-auto">
          <PublicationTable
            :items="services"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @delete="handleDeletePublication($event)"
          />
        </div>
      </section>
    </section>

    <!-- Action Prompt -->
    <BaseModal :open="modalState === 'DELETE_CONFIRMATION'">
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ modalMessage.title }}
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          {{ modalMessage.message }}
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ serviceDetail.service_name }}
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
            @click="modalMessage.action"
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

    <!-- Success or Error Message Modal -->
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
import { formatDate } from '@/common/helpers/date';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import LinkButton from '@/common/components/LinkButton';
import PublicationTable from '@/components/Services/Publication/PublicationTable';
import PublicationTabBar from '@/components/Services/Publication/PublicationTabBar';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const masterDataPublicationRepository = RepositoryFactory.get('masterDataPublication');

const MODAL_STATE = Object.freeze({
  NONE: 'NONE',
  LOADING: 'LOADING',
  DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
});

export default {
  name: 'ListPublication',
  components: {
    BaseButton,
    BaseModal,
    LinkButton,
    PublicationTabBar,
    PublicationTable,
  },
  data() {
    return {
      currentTab: 'ALL',
      formatDate,
      loading: false,
      services: [],
      serviceDetail: {},
      tabs: [
        {
          key: 'ALL',
          label: 'Semua Layanan',
          icon: 'DocumentIcon',
          count: null,
        },
        {
          key: 'ARCHIVE',
          label: 'Draf',
          icon: 'DraftIcon',
          count: null,
        },
        {
          key: 'PUBLISH',
          label: 'Terbit',
          icon: 'PublishIcon',
          count: null,
        },
      ],
      params: {
        per_page: 10,
        page: 1,
        q: '',
        status: '',
      },
      meta: {
        total_count: 0,
        total_page: 0,
        current_page: 1,
        per_page: 10,
      },
      modalState: MODAL_STATE.NONE,
      modalMessage: {
        title: '',
        message: '',
        action: null,
      },
    };
  },
  mounted() {
    this.fetchPublicationData();
    this.fetchStatusCounter();
  },
  methods: {
    async deletePublication(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await masterDataPublicationRepository.deletePublicationById(id);
        if (response.status === 204) {
          this.setModalMessage({
            title: 'Berhasil dihapus!',
            message: `Layanan ${this.serviceDetail.service_name} berhasil dihapus.`,
          });
          this.modalState = MODAL_STATE.SUCCESS;
        }
      } catch {
        this.setModalMessage({
          title: 'Hapus Layanan Gagal',
          message: 'Layanan Anda gagal dihapus.',
        });
        this.modalState = MODAL_STATE.ERROR;
      } finally {
        this.fetchStatusCounter();
      }
    },
    async fetchPublicationData() {
      try {
        this.loading = true;
        const response = await masterDataPublicationRepository.getPublicationList(this.params);
        const { data, meta } = response.data;
        this.meta = meta;
        this.services = data;
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Publikasi Layanan, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchStatusCounter() {
      try {
        const response = await masterDataPublicationRepository.getStatusCounter();
        const { data = [] } = response.data;
        const newTabs = [];

        this.tabs.forEach((tab) => {
          const object = data.find((item) => item.status === tab.key);
          newTabs.push({
            ...tab,
            count: object?.count || 0,
          });
        });

        // Get total publication off all status
        const totalCount = data.map((item) => item.count).reduce((a, b) => a + b, 0);

        // Mutate the first index (object with the key of `ALL`) count property
        newTabs[0].count = totalCount;

        this.tabs = [...newTabs];
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Total daftar publikasi layanan, silakan coba beberapa saat lagi',
        });
      }
    },
    filterPublicationByStatus(status) {
      if (status === 'ALL') {
        this.setParams({
          per_page: 10,
          page: 1,
          status: null,
        });
      } else {
        this.setParams({
          per_page: 10,
          page: 1,
          status,
        });
      }
      this.fetchPublicationData();
    },
    async handleCloseModal() {
      this.resetModalState();
      await this.$nextTick();
      this.fetchPublicationData();
    },
    handleDeletePublication(id) {
      const selectedService = this.services.find((service) => service.id === id);
      this.serviceDetail = { ...selectedService };
      this.modalState = MODAL_STATE.DELETE_CONFIRMATION;

      this.setModalMessage({
        title: 'Hapus Layanan',
        message: 'Apakah Anda yakin ingin menghapus Layanan ini?',
        action: () => this.deletePublication(id),
      });
    },
    onUpdatePagination(params) {
      this.setParams(params);
      this.fetchPublicationData();
    },
    setModalMessage(messageObj) {
      this.modalMessage = { ...messageObj };
    },
    setParams(params) {
      const newParams = { ...this.params, ...params };
      this.params = { ...newParams };
    },
    resetModalState() {
      this.modalState = MODAL_STATE.NONE;
      this.modalMessage.title = '';
      this.modalMessage.message = '';
      this.modalMessage.action = null;
    },
  },
};
</script>