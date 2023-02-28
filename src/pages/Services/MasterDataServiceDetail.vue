<template>
  <main class="pb-20">
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->
        <BaseButton
          class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
        >
          <template #icon-left>
            <JdsIcon
              name="trash"
              size="16px"
              class="text-red-500"
            />
          </template>
          Hapus
        </BaseButton>
        <!-- Edit Button -->
        <LinkButton
          href="#"
          variant="secondary"
          class="hover:bg-green-50"
        >
          <template #icon-left>
            <JdsIcon
              name="pencil-outline"
              size="16px"
              class="h-4 text-green-700"
            />
          </template>
          <p class="font-lato font-bold text-sm text-green-700">
            Ubah Data
          </p>
        </LinkButton>
      </div>
    </HeaderMenu>
    <section class="px-6 py-4 rounded-lg bg-white mb-4">
      <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-green-700 mb-3">
        Detail Layanan
      </h1>
      <TabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        class="-mx-4"
      />

      <InformationTable
        v-if="currentTab === 'pelayanan'"
        :table-data="informationTableData"
      />
      <ApplicationTable v-else-if="currentTab === 'aplikasi'" />
      <AdditionalInformationTable
        v-else
        :table-data="additionalInformationTableData"
      />
    </section>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import TabBar from '@/common/components/TabBar';

export default {
  components: {
    BaseButton,
    LinkButton,
    HeaderMenu,
    TabBar,
    InformationTable: () => import('@/components/Services/MasterData/Detail/InformationTable'),
    ApplicationTable: () => import('@/components/Services/MasterData/Detail/ApplicationTable'),
    AdditionalInformationTable: () => import('@/components/Services/MasterData/Detail/AdditionalInformationTable'),
  },
  data() {
    return {
      tabs: [
        { key: 'pelayanan', label: 'Pelayanan' },
        { key: 'aplikasi', label: 'Aplikasi' },
        { key: 'informasi-tambahan', label: 'Informasi Tambahan' },
      ],
      currentTab: 'pelayanan',
      // @todo: replace dummy data with API data
      tableData: {
        services: {
          information: {
            opd_name: 'Badan Pendapatan Daerah',
            goverment_affair: 'Pajak',
            sub_goverment_affair: 'Kurikulum',
            form: 'Administratif',
            type: 'Layanan Pajak Online',
            sub_service_type: 'Pembayaran Pajak Tahunan Kendaraan Bermotor',
            name: 'Pelayanan Pajak Online',
            program_name: 'SAMBARA',
            description: 'bayar pajak jadi lebih mudah!',
            user: 'Umum',
            sub_service_spbe: 'RAL.01.01',
            operational_status: 'NOT-ACTIVE',
            technical: 'ONLINE',
            benefits: [
              'kemudahan',
              'praktis',
            ],
            facilities: [
              'bayar online',
              'dimana saja kapan saja',
            ],
            website: 'https://bappenda.jabarprov.go.id/samsat-mobile-jawa-barat-sambara',
            links: [
              {
                link: 'https://google.com',
                type: 'google_form',
                label: 'Google Forms',
              },
              {
                link: 'https://google.com',
                type: 'google_playstore',
                label: 'Google Playstore',
              },
              {
                link: 'https://apple.com',
                type: 'apple_store',
                label: 'Apple Store',
              },
            ],
          },
          service_detail: {
            terms_and_conditions: [
              'memiliki kendaraan',
              'bayar pajak',
            ],
            service_procedures: [
              'mbanking',
              'kredit',
            ],
            service_fee: 'free',
            operational_time: [
              {
                day: 'MONDAY',
                start: '07:00',
                end: '16:00',
              },
              {
                day: 'SATURDAY',
                start: '08:00',
                end: '12:00',
              },
            ],
            hotline_number: '085218598090',
            hotline_mail: 'portaljabar@gmail.com',
          },
          location: [
            {
              type: 'khusus',
              organization: 'Badap Pendapatan Daerah',
              name: 'UPTD Pusat Layanan Operasional Pendapatan Daerah',
              address: 'Jl. Merdeka Raya No. 2',
              phone_number: '085314276935',
            },
          ],
        },
        application: {
          status: 'available',
          name: 'SAMBARA',
          feature: [
            {
              name: 'online payment',
              description: 'via e-wallet or mbanking',
            },
            {
              name: 'online check fee',
              description: 'vehicle numbers',
            },
          ],
        },
        additional_information: {
          responsible_name: 'Adzhar Amrullah',
          phone_number: '082157849232',
          email: 'portaljabar@gmail.com',
          social_media: [
            {
              name: 'SAMBARA TUTORIAL',
              type: 'youtube',
              link: 'https://www.youtube.com/@bappendantb9973',
            },
          ],
        },
      },
    };
  },
  computed: {
    informationTableData() {
      return {
        information: {
          opd_name: this.tableData.services?.information?.opd_name ?? null,
          goverment_affair: this.tableData.services?.information?.goverment_affair ?? null,
          sub_goverment_affair: this.tableData.services?.information?.sub_goverment_affair ?? null,
          form: this.tableData.services?.information?.form ?? null,
          type: this.tableData.services?.information?.type ?? null,
          sub_service_type: this.tableData.services?.information?.sub_service_type ?? null,
          name: this.tableData.services?.information?.name ?? null,
          program_name: this.tableData.services?.information?.program_name ?? null,
          description: this.tableData.services?.information?.description ?? null,
          user: this.tableData.services?.information?.user ?? null,
          sub_service_spbe: this.tableData.services?.information?.sub_service_spbe ?? null,
          operational_status: this.tableData.services?.information?.operational_status ?? null,
          technical: this.tableData.services?.information?.technical ?? null,
          benefits: this.tableData.services?.information?.benefits ?? [],
          facilities: this.tableData.services?.information?.facilities ?? [],
          website: this.tableData.services?.information?.website ?? null,
          links: this.tableData.services?.information?.links ?? [],
        },
        service_detail: {
          terms_and_conditions: this.tableData.services?.service_detail?.terms_and_conditions ?? [],
          service_procedures: this.tableData.services?.service_detail?.service_procedures ?? [],
          service_fee: this.tableData.services?.service_detail?.service_fee ?? null,
          operational_time: this.tableData.services?.service_detail?.operational_time ?? [],
          hotline_number: this.tableData.services?.service_detail?.hotline_number ?? null,
          hotline_mail: this.tableData.services?.service_detail?.hotline_mail ?? null,
        },
        location: this.tableData.services?.location ?? [],
      };
    },
    additionalInformationTableData() {
      return {
        additional_information: {
          responsible_name: this.tableData.additional_information?.responsible_name ?? '-',
          phone_number: this.tableData.additional_information?.phone_number ?? '-',
          email: this.tableData.additional_information?.email ?? '-',
          social_media: this.tableData.additional_information?.social_media ?? [],
        },
      };
    },
  },
};
</script>
