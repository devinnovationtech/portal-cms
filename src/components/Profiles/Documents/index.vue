<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <DocumentsTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        @update:currentTab="filterMasterDataByStatus"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="full flex justify-between mb-5 items-center">
          <!-- @TODO: implement search bar -->
          <SearchBar
            v-if="isShowSearchBar"
            placeholder="Cari arsip"
          />
          <LinkButton
            href="/profil-jawa-barat/arsip-dan-dokumen/tambah"
            title="Tambah Arsip Dokumen"
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
              Tambah Arsip Dokumen
            </p>
          </LinkButton>
        </div>
        <div class="w-full overflow-auto">
          <DocumentsTable
            :items="documents"
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
    <BaseModal :open="modalState === 'ERROR' || modalState === 'SUCCESS'">
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
import DocumentsTabBar from '@/components/Profiles/Documents/DocumentsTabBar';
import DocumentsTable from '@/components/Profiles/Documents/DocumentsTable';
import LinkButton from '@/common/components/LinkButton';
import SearchBar from '@/common/components/SearchBar';
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const documentsRepository = RepositoryFactory.get('documents');

const MODAL_STATE = Object.freeze({
  NONE: 'NONE',
  LOADING: 'LOADING',
  DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
});

export default {
  name: 'ListDocuments',
  components: {
    BaseButton,
    BaseModal,
    DocumentsTabBar,
    DocumentsTable,
    LinkButton,
    SearchBar,
  },
  data() {
    return {
      tabs: [
        {
          key: 'ALL',
          label: 'Semua Data',
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
          key: 'PUBLISH',
          label: 'Diterbitkan',
          icon: 'PublishIcon',
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
      documents: [],
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
    this.fetchDocument();
    this.fetchStatusCounter();
  },
  methods: {
    async fetchStatusCounter() {
      try {
        const response = await documentsRepository.getStatusCounter();
        const { data = [] } = response.data;
        const newTabs = [];

        this.tabs.forEach((tab) => {
          const object = data.find((item) => item.status === tab.key);
          newTabs.push({
            ...tab,
            count: object?.count || 0,
          });
        });

        // Get total document off all status
        const totalCount = data.map((item) => item.count).reduce((a, b) => a + b, 0);

        // Mutate the first index (object with the key of `ALL`) count property
        newTabs[0].count = totalCount;

        this.tabs = [...newTabs];
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Total Dokumen, silakan coba beberapa saat lagi',
        });
      }
    },
    async deleteMasterDataById(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await documentsRepository.deleteMasterDataById(id);
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
            title: 'Hapus Dokumen Gagal',
            message: 'Dokumen Anda tidak dapat dihapus karena digunakan dalam data publikasi',
          });
        } else {
          this.setModalMessage({
            title: 'Hapus Dokumen Gagal',
            message: 'Dokumen Anda gagal dihapus.',
          });
        }

        this.modalState = MODAL_STATE.ERROR;
      } finally {
        this.fetchStatusCounter();
      }
    },
    async fetchDocument() {
      try {
        this.loading = true;
        const response = await documentsRepository.getDocumentList(this.params);
        const { data, meta } = response.data;
        this.meta = meta;
        this.documents = data;
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Arsip dan Dokumen, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    async handleCloseModal() {
      this.resetModalState();
      await this.$nextTick();
      this.fetchDocument();
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
      this.fetchDocument();
    },
    handleDeleteMasterData(id) {
      const selectedService = this.documents.find((service) => service.id === id);
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
      this.fetchDocument();
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
