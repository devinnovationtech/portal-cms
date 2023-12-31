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
            <DocumentsCategoryFilter
              class="ml-6"
              @change:filter="onFilter($event)"
            />
          </div>
          <LinkButton
            v-if="showAddDocumentButtonOnTop"
            href="/profil-jawa-barat/arsip-dan-dokumen/tambah"
            title="Tambah Arsip Dokumen"
            class="ml-auto"
            data-cy="documents__add-button"
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
            v-if="documents.length || loading"
            :items="documents"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @delete="handleDeleteDocument($event)"
            @archive="handleArchiveDocument($event)"
            @publish="handlePublishDocument($event)"
          />
          <EmptyState
            v-else
            v-bind="emptyStateData"
          >
            <template #button>
              <LinkButton
                v-if="showAddDocumentButtonOnBottom"
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
                <p class="font-lato font-bold text-sm text-white leading-none">
                  Tambah Arsip Dokumen
                </p>
              </LinkButton>
            </template>
          </EmptyState>
        </div>
      </section>
    </section>

    <!-- Action Progress -->
    <ProgressModal
      v-if="modalState === 'LOADING'"
      :open="modalState === 'LOADING'"
      :value="progressValue"
      :title="loadingMessage.title"
      :message="loadingMessage.body"
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
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import { DATA_NOT_FOUND_STATE } from '@/common/constants/index';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import EmptyState from '@/common/components/EmptyState';
import LinkButton from '@/common/components/LinkButton';
import SearchBar from '@/common/components/SearchBar';
import ProgressModal from '@/common/components/ProgressModal';
import DocumentsTabBar from '@/components/Profiles/Documents/DocumentsTabBar';
import DocumentsTable from '@/components/Profiles/Documents/DocumentsTable';
import DocumentsCategoryFilter from '@/components/Profiles/Documents/DocumentsCategoryFilter';

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
    DocumentsCategoryFilter,
    LinkButton,
    SearchBar,
    ProgressModal,
    EmptyState,
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
      loadingMessage: {
        title: '',
        body: '',
      },
      isSearched: false,
      isFiltered: false,
      dataNotFoundState: DATA_NOT_FOUND_STATE,
      documentsEmptyState: {
        image: require('@/assets/icons/empty-state.svg'),
        alternateImage: 'gambar data dokumen belum ada',
        width: 140,
        height: 140,
        title: 'Anda belum memiliki data !',
        description: 'Kamu belum memiliki Arsip dan Dokumen , Kamu dapat menambahkan Arsip dan Dokumen dengan mengklik tombol Tambah Arsip dan Dokumen dibawah',
      },
    };
  },
  computed: {
    showConfirmationModal() {
      return this.modalState === 'DELETE_CONFIRMATION'
        || this.modalState === 'ARCHIVE_CONFIRMATION'
        || this.modalState === 'PUBLISH_CONFIRMATION'
        || this.modalState === 'UNCOMPLETE_ALERT';
    },
    emptyStateData() {
      return this.isSearched || this.isFiltered ? this.dataNotFoundState : this.documentsEmptyState;
    },
    showAddDocumentButtonOnTop() {
      return (this.documents.length === 0 && (this.isSearched || this.isFiltered)) || this.documents.length;
    },
    showAddDocumentButtonOnBottom() {
      return this.documents.length === 0 && (this.isSearched || this.isFiltered) ? !this.dataNotFoundState : !!this.documentsEmptyState;
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
        this.loadingMessage.title = 'Menghapus Dokumen';
        this.loadingMessage.body = 'Mohon tunggu, hapus dokumen sedang diproses.';
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
    async updateStatusDocumentById(id, status, statusBefore) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        if (status === 'ARCHIVED') {
          this.loadingMessage.title = 'Mengarsipkan Dokumen';
          this.loadingMessage.body = 'Mohon tunggu, pengarsipan dokumen sedang diproses.';
        } else if (statusBefore === 'DRAFT') {
          this.loadingMessage.title = 'Menerbitkan Dokumen';
          this.loadingMessage.body = 'Mohon tunggu, penerbitan dokumen sedang diproses.';
        } else {
          this.loadingMessage.title = 'Memulihkan Dokumen';
          this.loadingMessage.body = 'Mohon tunggu, pemulihan dokumen sedang diproses.';
        }
        const body = { status };
        const response = await documentsRepository.updateStatusDocument(body, id);
        if (response.status === 200) {
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              if (status === 'ARCHIVED') {
                this.setModalMessage({
                  title: 'Berhasil diarsipkan !',
                  message: 'Anda berhasil mengarsipkan dokumen',
                });
              } else if (statusBefore === 'DRAFT') {
                this.setModalMessage({
                  title: 'Berhasil diterbitkan !',
                  message: 'Anda berhasil menerbitkan dokumen.',
                });
              } else {
                this.setModalMessage({
                  title: 'Berhasil dipulihkan !',
                  message: 'Anda berhasil memulihkan dokumen.',
                });
              }
              this.modalState = MODAL_STATE.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch {
        this.setModalMessage({
          title: 'Update Status Dokumen Gagal !',
          message: 'Gagal memperbarui status Dokumen, silakan coba beberapa saat lagi',
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
        title: 'Hapus Dokumen',
        message: 'Apakah Anda yakin ingin menghapus Dokumen ini?',
        action: () => this.deleteDocumentById(id),
      });
    },
    async handleArchiveDocument(item) {
      this.findDocumentById(item.id);
      this.modalState = MODAL_STATE.ARCHIVE_CONFIRMATION;

      this.setModalMessage({
        title: 'Arsipkan Dokumen',
        message: 'Apakah Anda yakin ingin mengarsipkan Dokumen ini?',
        action: () => this.updateStatusDocumentById(item.id, 'ARCHIVED'),
      });
    },
    async handlePublishDocument(item) {
      const { id, status } = item;
      this.findDocumentById(id);
      if (this.documentDetail.is_completed) {
        this.modalState = MODAL_STATE.PUBLISH_CONFIRMATION;
        this.setModalMessage({
          title: `${status === 'DRAFT' ? 'Terbitkan' : 'Pulihkan'} Dokumen`,
          message: `Apakah Anda yakin ingin ${status === 'DRAFT' ? 'menerbitkan' : 'memulihkan'} Dokumen ini?`,
          action: () => this.updateStatusDocumentById(id, 'PUBLISHED', status),
        });
      } else {
        this.modalState = MODAL_STATE.UNCOMPLETE_ALERT;
        this.setModalMessage({
          title: 'Dokumen belum lengkap',
          message: 'Mohon lengkapi Dokumen Anda terlebih dahulu sebelum menerbitkan',
          action: () => this.$router.push(`/profil-jawa-barat/arsip-dan-dokumen/${id}/ubah`),
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
      this.isSearched = !!query;
      this.setParams({ q: query, page: 1 });
      this.fetchDocument();
    },
    /**
     * Set new params and fetch news when filter changes
     *
     * @param {Object} data - object containing new param based on emit values
     * @property {Array} cat - news category params
     */
    onFilter(data) {
      this.isFiltered = !!data.cat.length;
      this.setParams({ ...data, page: 1 });
      this.fetchDocument();
    },
  },
};
</script>
