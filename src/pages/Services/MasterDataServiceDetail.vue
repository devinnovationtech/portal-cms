<template>
  <main class="pb-20">
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->
        <BaseButton
          class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
          @click="showDeleteConfirmationModal(tableData.id)"
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
      <ApplicationTable
        v-else-if="currentTab === 'aplikasi'"
        :table-data="applicationTableData"
      />
      <AdditionalInformationTable
        v-else
        :table-data="additionalInformationTableData"
      />
    </section>

    <!-- Delete Action Modal -->
    <BaseModal
      :open="modalState === 'DELETE_CONFIRMATION'"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          Hapus Program
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          Apakah Anda yakin ingin menghapus Layanan ini?
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ tableData.services.name }}
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
            @click="modalMessage.action(tableData.id)"
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
import BaseModal from '@/common/components/BaseModal';
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import TabBar from '@/common/components/TabBar';
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
  components: {
    BaseButton,
    BaseModal,
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
      tableData: {},
      modalMessage: {
        title: '',
        message: '',
        action: null,
      },
      modalState: MODAL_STATE.NONE,
    };
  },
  computed: {
    informationTableData() {
      return {
        services: {
          opd_name: this.tableData.services?.opd_name ?? null,
          government_affair: this.tableData.services?.government_affair ?? null,
          sub_government_affair: this.tableData.services?.sub_government_affair ?? null,
          form: this.tableData.services?.form ?? null,
          type: this.tableData.services?.type ?? null,
          sub_service_type: this.tableData.services?.sub_service_type ?? null,
          name: this.tableData.services?.name ?? null,
          program_name: this.tableData.services?.program_name ?? null,
          description: this.tableData.services?.description ?? null,
          user: this.tableData.services?.user ?? null,
          sub_service_spbe: this.tableData.services?.sub_service_spbe ?? null,
          operational_status: this.tableData.services?.operational_status ?? null,
          technical: this.tableData.services?.technical ?? null,
          benefits: this.tableData.services?.benefits ?? [],
          facilities: this.tableData.services?.facilities ?? [],
          website: this.tableData.services?.website ?? null,
          links: this.tableData.services?.links ?? [],
          terms_and_conditions: this.tableData.services?.terms_and_conditions ?? [],
          service_procedures: this.tableData.services?.service_procedures ?? [],
          service_fee: this.tableData.services?.service_fee ?? null,
          operational_times: this.tableData.services?.operational_times ?? [],
          hotline_number: this.tableData.services?.hotline_number ?? null,
          hotline_mail: this.tableData.services?.hotline_mail ?? null,
          locations: this.tableData.services?.locations ?? [],
        },
      };
    },
    applicationTableData() {
      return {
        application: {
          status: this.tableData.application?.status ?? '-',
          name: this.tableData.application?.name ?? '-',
          features: this.tableData.application?.features ?? [],
        },
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
  mounted() {
    this.fetchMasterDataById();
  },
  methods: {
    async deleteMasterData(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await masterDataRepository.deleteMasterDataById(id);
        if (response.status === 204) {
          this.setModalMessage({
            title: 'Berhasil dihapus!',
            message: `Program ${this.tableData.services.name} berhasil dihapus.`,
          });
          this.modalState = MODAL_STATE.SUCCESS;
        }
      } catch (error) {
        this.setModalMessage({
          title: 'Hapus Program Gagal',
          message: 'Layanan Anda gagal dihapus.',
        });
        this.modalState = MODAL_STATE.ERROR;
      }
    },
    async fetchMasterDataById() {
      try {
        const response = await masterDataRepository.getMasterDataById(this.$route.params.id);
        const { data } = response.data;

        this.tableData = data;
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Master Data Layanan, silakan coba beberapa saat lagi',
        });
      }
    },
    handleCloseModal() {
      if (this.modalState === MODAL_STATE.SUCCESS) {
        this.$router.push('/layanan');
      } else {
        this.resetModalState();
      }
    },
    resetModalState() {
      this.modalState = MODAL_STATE.NONE;
      this.modalMessage.title = '';
      this.modalMessage.body = '';
    },
    setModalMessage(messageObj) {
      this.modalMessage = { ...messageObj };
    },
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
    showDeleteConfirmationModal(id) {
      this.modalState = MODAL_STATE.DELETE_CONFIRMATION;
      this.setModalMessage({
        title: 'Hapus Program!',
        message: 'Apakah Anda yakin ingin menghapus Layanan ini?',
        action: () => this.deleteMasterData(id),
      });
    },
  },
};
</script>
