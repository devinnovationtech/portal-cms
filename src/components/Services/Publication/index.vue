<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <PublicationTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        @update:currentTab="filterPublicationByStatus"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="full flex gap-x-4 mb-5 items-center">
          <SearchBar
            placeholder="Cari layanan"
            @input="onSearch($event)"
          />
          <ServiceFilter
            :opd-name-options="opdNameLists"
            :params="params"
            @change:filter="onChangeFilter($event)"
          />
          <LinkButton
            v-show="showMasterDataTable || !showAddServiceButton"
            href="/layanan/daftar-publikasi/tambah"
            title="Tambah Layanan Publik"
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
              Publikasi Layanan
            </p>
          </LinkButton>
        </div>
        <div class="w-full overflow-auto">
          <PublicationTable
            v-if="showMasterDataTable"
            :items="items"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @delete="handleDeletePublication($event)"
          />
          <div
            v-else-if="loading"
            class="w-full flex items-center justify-center min-h-[300px]"
          >
            <JdsSpinner />
          </div>
          <EmptyState
            v-else
            v-bind="emptyStateData"
          >
            <template #button>
              <LinkButton
                v-if="showAddServiceButton"
                href="/layanan/daftar-publikasi/tambah"
                title="Tambah Publikasi"
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
                  Tambah Publikasi
                </p>
              </LinkButton>
            </template>
          </EmptyState>
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
import { mapGetters } from 'vuex';
import { formatDate } from '@/common/helpers/date';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import EmptyState from '@/common/components/EmptyState';
import LinkButton from '@/common/components/LinkButton';
import PublicationTable from '@/components/Services/Publication/PublicationTable';
import PublicationTabBar from '@/components/Services/Publication/PublicationTabBar';
import { DATA_NOT_FOUND_STATE } from '@/common/constants/index';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import SearchBar from '@/common/components/SearchBar';
import ServiceFilter from '@/components/Services/serviceFilter';

const masterDataPublicationRepository = RepositoryFactory.get('masterDataPublication');
const unitRepository = RepositoryFactory.get('unit');

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
    EmptyState,
    LinkButton,
    PublicationTabBar,
    PublicationTable,
    SearchBar,
    ServiceFilter,
  },
  data() {
    return {
      currentTab: 'ALL',
      dataNotFoundState: DATA_NOT_FOUND_STATE,
      formatDate,
      loading: false,
      // isSearch use to check search feature is used or not
      isSearch: false,
      // isFilter use to check filter feature is used or not
      isFilter: false,
      publicationEmptyState: {
        image: require('@/assets/images/empty-state.svg'),
        alternateImage: 'gambar data layanan belum ada',
        width: 140,
        height: 140,
        title: 'Anda belum memiliki data !',
        description: 'Kamu belum memiliki data layanan , Kamu dapat menambahkan layanan dengan mengklik tombol tambahkan layanan dibawah',
      },
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
        opd_name: '',
        service_user: '',
        technical: '',
        start_date: '',
        end_date: '',
      },
      opdParams: {
        per_page: 100,
        page: 1,
        q: '',
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
      opdNameLists: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    isSuperAdmin() {
      return this.user?.role?.name === 'Super Admin';
    },
    /**
     * check condition services data is empty and search or filter feature is used or not
     *
     * @return {object} - dataNotFoundState or publicationEmptyState
     * @property {string} image
     * @property {string} alternateImage
     * @property {string} width
     * @property {string} height
     * @property {string} title
     * @property {string} description     *
     */
    emptyStateData() {
      return this.services.length === 0 && (this.isSearch || this.isFilter) ? this.dataNotFoundState : this.publicationEmptyState;
    },
    /**
     * check condition services data is empty and search or filter feature is used or not
     *
     * @return {boolean}
     */
    showAddServiceButton() {
      return this.services.length === 0 && (this.isSearch || this.isFilter) ? !this.dataNotFoundState : !!this.publicationEmptyState;
    },
    showMasterDataTable() {
      return this.services.length > 0;
    },
    items() {
      if (Array.isArray(this.services)) {
        const items = this.services.map((item) => ({
          id: item.id,
          opd_name: item.opd_name,
          service_name: item.service_name,
          service_user: item.service_user,
          technical: item.technical,
          status: item.status,
          updated_at: item.updated_at,
        }));
        return items;
      }
      return [];
    },
  },
  mounted() {
    this.fetchPublicationData();
    this.fetchStatusCounter();
    if (this.isSuperAdmin) {
      this.fetchOpdNameLists();
    }
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
    async fetchOpdNameLists() {
      try {
        const response = await unitRepository.getUnitLists(this.opdParams);
        const { data, meta } = response.data;
        this.meta = meta;
        // Mapping data to get opd name lists and push to opdNameLists variable
        data.map((unit) => this.opdNameLists.push(unit.name));
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data author, silakan coba beberapa saat lagi',
        });
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
    onSearch(query) {
      if (query !== '') {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }

      this.setParams({
        page: 1,
        q: query,
      });
      this.fetchPublicationData();
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
    /**
     * Set new params when filter changes
     * and fetch master data again
     *
     * @param {object} data - object cotaining new param based on emit values
     * @property {string} opd_name
     * @property {string} service_user
     * @property {string} technical
     * @property {string} start_date
     * @property {string} end_date
     */
    onChangeFilter(data) {
      if (Object.keys(data).some((key) => data[key] !== '' && data[key] !== null)) {
        this.isFilter = true;
      } else {
        this.isFilter = false;
      }

      this.setParams(data);
      this.fetchPublicationData();
    },
  },
};
</script>
