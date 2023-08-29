<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <DocumentsTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        @update:currentTab="filterDocumentByStatus"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="full flex justify-between mb-5 items-center">
          <div class="flex">
            <SearchBar
              placeholder="Cari dokumen"
              data-cy-suffix="documents"
              @input="onSearch($event)"
            />
            <!-- will be implemented in next PR
            <DocumentsCategoryFilter
              class="ml-6"
              @change:filter="onFilter($event)"
            /> -->
          </div>
          <LinkButton
            href="/profil-jawa-barat/arsip-dan-dokumen/tambah"
            title="Tambah Arsip Dokumen"
            class="ml-auto"
            data-cy="document__add-button"
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
            @delete="handleDeleteDocument($event)"
            @archive="handleArchiveDocument($event)"
            @publish="handlePublishDocument($event)"
          />
        </div>
      </section>
    </section>

    <!-- Action Progress -->
    <ProgressModal
      v-if="modalState === 'LOADING'"
      :open="modalState === 'LOADING'"
      :value="progressValue"
      title="Menyimpan Data Dokumen"
      message="Mohon tunggu, penyimpanan data dokumen sedang diproses."
      data-cy="documents__progress-modal"
    />

    <!-- Action Prompt -->
    <BaseModal :open="showConfirmationModal">
      <div class="w-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ modalMessage.title }}
        </h1>
        <p class="flex items-center font-lato text-sm text-gray-800 mb-2">
          <JdsIcon
            v-if="modalState === 'UNCOMPLETE_ALERT'"
            name="warning"
            size="16px"
            class="text-[#FF7500] mr-2"
          />
          {{ modalMessage.message }}
        </p>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            data-cy="documents__modal-button--cancel"
            @click="handleCloseModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            :class="{
              'bg-green-700 hover:bg-green-600  text-sm text-white': true,
              '!bg-red-500 !hover:bg-red-400': modalState === 'DELETE_CONFIRMATION'
            }"
            data-cy="documents__modal-button--confirm"
            @click="modalMessage.action(documentDetail.id)"
          >
            <p
              v-if="modalState === 'UNCOMPLETE_ALERT'"
              class="flex items-center"
            >
              Lengkapi arsip dokumen
              <JdsIcon
                name="arrow-right"
                size="16px"
                class="ml-2"
              />
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
            data-cy="documents__modal-button--undarstand"
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
import ProgressModal from '@/common/components/ProgressModal';
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const documentsRepository = RepositoryFactory.get('documents');

const MODAL_STATE = Object.freeze({
  NONE: 'NONE',
  LOADING: 'LOADING',
  DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
  ARCHIVE_CONFIRMATION: 'ARCHIVE_CONFIRMATION',
  PUBLISH_CONFIRMATION: 'PUBLISH_CONFIRMATION',
  UNCOMPLETE_ALERT: 'UNCOMPLETE_ALERT',
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
    ProgressModal,
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
          key: 'PUBLISHED',
          label: 'Terbit',
          icon: 'PublishIcon',
          count: null,
        },
        {
          key: 'ARCHIVED',
          label: 'Diarsipkan',
          icon: 'ArchiveIcon',
          count: null,
        },
      ],
      // @TODO: remove isShowSearchBar varible when search feature is develop
      isShowSearchBar: false,
      documents: [],
      documentDetail: {},
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
      progressValue: 0,
    };
  },
  computed: {
    showConfirmationModal() {
      return this.modalState === 'DELETE_CONFIRMATION'
        || this.modalState === 'ARCHIVE_CONFIRMATION'
        || this.modalState === 'PUBLISH_CONFIRMATION'
        || this.modalState === 'UNCOMPLETE_ALERT';
    },
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
    async deleteDocumentById(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await documentsRepository.deleteDocumentById(id);
        if (response.status === 200) {
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.setModalMessage({
                title: 'Berhasil dihapus!',
                message: `Dokumen ${this.documentDetail.title} berhasil dihapus.`,
              });
              this.modalState = MODAL_STATE.SUCCESS;
            }, 150);
          }, 150);
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
    async updateStatusDocumentById(id, status) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const body = { status };
        const response = await documentsRepository.updateStatusDocument(body, id);
        if (response.status === 200) {
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.setModalMessage({
                title: `Berhasil ${status === 'PUBLISHED' ? 'diterbitkan' : 'diarsipkan'}!`,
                message: `Anda berhasil ${status === 'PUBLISHED' ? 'menerbitkan' : 'mengarsipkan'} dokumen.`,
              });
              this.modalState = MODAL_STATE.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal memperbaharui status Dokumen, silakan coba beberapa saat lagi',
        });
        this.setModalMessage({
          title: 'Arsipkan Dokumen Gagal',
          message: 'Dokumen Anda gagal diarsipkan.',
        });
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
    filterDocumentByStatus(status) {
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
    handleDeleteDocument(id) {
      this.findDocumentById(id);
      this.modalState = MODAL_STATE.DELETE_CONFIRMATION;

      this.setModalMessage({
        title: 'Hapus Layanan',
        message: 'Apakah Anda yakin ingin menghapus Dokumen ini?',
        action: () => this.deleteDocumentById(id),
      });
    },
    async handleArchiveDocument(id) {
      this.findDocumentById(id);
      this.modalState = MODAL_STATE.ARCHIVE_CONFIRMATION;

      this.setModalMessage({
        title: 'Arsipkan Dokumen',
        message: 'Apakah Anda yakin ingin mengarsipkan Dokumen ini?',
        action: () => this.updateStatusDocumentById(id, 'ARCHIVED'),
      });
    },
    async handlePublishDocument(id) {
      this.findDocumentById(id);
      if (this.documentDetail.is_completed) {
        this.modalState = MODAL_STATE.PUBLISH_CONFIRMATION;
        this.setModalMessage({
          title: 'Terbitkan Dokumen',
          message: 'Apakah Anda yakin ingin menerbitkan Dokumen ini?',
          action: () => this.updateStatusDocumentById(id, 'PUBLISHED'),
        });
      } else {
        this.modalState = MODAL_STATE.UNCOMPLETE_ALERT;
        // @TODO: change route into edit form route
        this.setModalMessage({
          title: 'Dokumen belum lengkap',
          message: 'Mohon lengkapi Dokumen Anda terlebih dahulu sebelum menerbitkan',
          action: () => this.$router.push('/profil-jawa-barat/arsip-dan-dokumen/tambah'),
        });
      }
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchDocument();
    },
    resetModalState() {
      this.modalState = MODAL_STATE.NONE;
      this.progressValue = 0;
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
    findDocumentById(id) {
      const selectedDocument = this.documents.find((document) => document.id === id);
      this.documentDetail = { ...selectedDocument };
    },
    /**
     * Set new params and fetch news when search-bar value changes
     *
     * @param {string} query - search-bar emit values
     */
    onSearch(query) {
      this.setParams({ q: query });
      this.fetchDocument();
    },
  },
};
</script>
