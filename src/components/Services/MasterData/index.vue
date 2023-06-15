<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <MasterDataTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        @update:currentTab="filterMasterDataByStatus"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="full flex justify-between mb-5 items-center">
          <SearchBar
            v-if="isShowSearchBar"
            placeholder="Cari layanan"
          />
          <LinkButton
            href="/layanan/master-data/tambah"
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
            <p class="font-lato font-bold text-snm text-white leading-none">
              Tambah Layanan
            </p>
          </LinkButton>
        </div>
        <div class="w-full overflow-auto">
          <MasterDataTable
            :items="services"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @delete="handleDeleteMasterData($event)"
          />
        </div>
      </section>
    </section>

    <!-- Action Prompt -->
    <BaseModal :open="modalState === 'DELETE_CONFIRMATION'">
      <div class="w-full">
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
            @click="modalMessage.action(serviceDetail.id)"
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
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import MasterDataTabBar from '@/components/Services/MasterData/MasterDataTabBar';
import MasterDataTable from '@/components/Services/MasterData/MasterDataTable';
import LinkButton from '@/common/components/LinkButton';
import SearchBar from '@/common/components/SearchBar';
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const masterDataRepository = RepositoryFactory.get('masterDataService');

const MODAL_STATE = Object.freeze({
  NONE: 'NONE',
  LOADING: 'LOADING',
  DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
});

export default {
  name: 'ListServices',
  components: {
    BaseButton,
    BaseModal,
    MasterDataTabBar,
    MasterDataTable,
    LinkButton,
    SearchBar,
  },
  data() {
    return {
      tabs: [
        {
          key: 'ALL',
          label: 'Semua Layanan',
          icon: 'DocumentIcon',
          count: null,
        },
        {
          key: 'DRAFT',
          label: 'Draf',
          icon: 'DraftIcon',
          count: null,
        },
        {
          key: 'ARCHIVE',
          label: 'Tersimpan',
          icon: 'ArchiveIcon',
          count: null,
        },
      ],
      // @TODO: remove isShowSearchBar varible when search feature is develop
      isShowSearchBar: false,
      services: [],
      serviceDetail: {},
      currentTab: 'ALL',
      loading: false,
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
      params: {
        per_page: 10,
        page: 1,
        q: '',
      },
      formatDate,
    };
  },
  mounted() {
    this.fetchMasterData();
    this.fetchStatusCounter();
  },
  methods: {
    async deleteMasterDataById(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await masterDataRepository.deleteMasterDataById(id);
        if (response.status === 204) {
          this.setModalMessage({
            title: 'Berhasil dihapus!',
            message: `Program ${this.serviceDetail.service_name} berhasil dihapus.`,
          });
          this.modalState = MODAL_STATE.SUCCESS;
        }
      } catch (error) {
        if (error.response.status === 403) {
          this.setModalMessage({
            title: 'Hapus Layanan Gagal',
            message: 'Layanan Anda tidak dapat dihapus karena digunakan dalam data publikasi',
          });
        } else {
          this.setModalMessage({
            title: 'Hapus Layanan Gagal',
            message: 'Layanan Anda gagal dihapus.',
          });
        }

        this.modalState = MODAL_STATE.ERROR;
      } finally {
        this.fetchStatusCounter();
      }
    },
    async fetchMasterData() {
      try {
        this.loading = true;
        const response = await masterDataRepository.getMasterDataList(this.params);
        const { data, meta } = response.data;
        this.meta = meta;
        this.services = data;
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Master Data Layanan, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchStatusCounter() {
      try {
        const response = await masterDataRepository.getStatusCounter();
        const { data = [] } = response.data;
        const newTabs = [];

        this.tabs.forEach((tab) => {
          const object = data.find((item) => item.status === tab.key);
          newTabs.push({
            ...tab,
            count: object?.count || 0,
          });
        });

        // Get total master data off all status
        const totalCount = data.map((item) => item.count).reduce((a, b) => a + b, 0);

        // Mutate the first index (object with the key of `ALL`) count property
        newTabs[0].count = totalCount;

        this.tabs = [...newTabs];
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Total Berita, silakan coba beberapa saat lagi',
        });
      }
    },
    async handleCloseModal() {
      this.resetModalState();
      await this.$nextTick();
      this.fetchMasterData();
    },
    filterMasterDataByStatus(status) {
      if (status === 'ALL') {
        this.setParams({
          status: null,
          per_page: 10,
          page: 1,
        });
      } else {
        this.setParams({
          status,
          per_page: 10,
          page: 1,
        });
      }
      this.fetchMasterData();
    },
    handleDeleteMasterData(id) {
      const selectedService = this.services.find((service) => service.id === id);
      this.serviceDetail = { ...selectedService };

      this.modalState = MODAL_STATE.DELETE_CONFIRMATION;

      this.setModalMessage({
        title: 'Hapus Layanan',
        message: 'Apakah Anda yakin ingin menghapus Layanan ini?',
        action: () => this.deleteMasterDataById(id),
      });
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchMasterData();
    },
    resetModalState() {
      this.modalState = MODAL_STATE.NONE;
      this.modalMessage.title = '';
      this.modalMessage.body = '';
      this.modalMessage.action = null;
    },
    setModalMessage(messageObj) {
      this.modalMessage = { ...messageObj };
    },
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
  },
};
</script>
