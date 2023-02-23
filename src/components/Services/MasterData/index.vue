<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <MasterDataTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="full flex justify-between mb-5 items-center">
          <SearchBar
            placeholder="Cari layanan"
          />
          <LinkButton
            href="/layanan"
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

const EXAMPLE_LIST_SERVICES = [
  {
    id: 1,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'ONLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 2,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'ONLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 3,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 4,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 5,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 6,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 7,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'SAVED',
  },
  {
    id: 8,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 9,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
  {
    id: 10,
    name: 'Dashboard Satgas Citarum',
    opd_name: 'Pariwisata',
    goverment_affair: 'Umum',
    operational_status: 'OFFLINE',
    updated_at: formatDate(new Date(), 'dd/MM/yyyy'),
    status: 'DRAFT',
  },
];

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
          key: 'SAVED',
          label: 'Tersimpan',
          icon: 'ArchiveIcon',
          count: null,
        },
      ],
      services: EXAMPLE_LIST_SERVICES,
      currentTab: 'ALL',
      loading: false,
      meta: {
        total_count: 0,
        total_page: 0,
        current_page: 1,
        per_page: 10,
      },
    };
  },
};
</script>
