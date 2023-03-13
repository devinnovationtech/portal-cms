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
          />
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import MasterDataTabBar from '@/components/Services/MasterData/MasterDataTabBar';
import MasterDataTable from '@/components/Services/MasterData/MasterDataTable';
import LinkButton from '@/common/components/LinkButton';
import SearchBar from '@/common/components/SearchBar';
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const masterDataRepository = RepositoryFactory.get('masterDataService');

export default {
  name: 'ListServices',
  components: {
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
      services: [],
      currentTab: 'ALL',
      loading: false,
      meta: {
        total_count: 0,
        total_page: 0,
        current_page: 1,
        per_page: 10,
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
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchMasterData();
    },
    filterMasterDataByStatus(status) {
      if (status === 'ALL') {
        this.setParams({ status: null });
      } else {
        this.setParams({ status });
      }
      this.fetchMasterData();
    },
  },
};
</script>
