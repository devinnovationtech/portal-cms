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
          :href="`/layanan/daftar-publikasi/${tableData.id}/ubah`"
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
      <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-blue-gray-600 mb-3">
        Detail Layanan
      </h1>
      <TabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        class="-mx-4"
      />

      <GeneralInformation
        v-if="currentTab === 'pengaturan-dasar'"
        :table-data="generalInformationTableData"
      />
      <ServiceDescription
        v-if="currentTab === 'deskripsi-layanan'"
        :table-data="serviceDescriptionTableData"
      />

      <AdditionalInformation
        v-if="currentTab === 'informasi-tambahan'"
        :table-data="additionalInformationTableData"
      />
    </section>

    <!-- Delete Action Modal -->
    <BaseModal
      :open="modalState === 'DELETE_CONFIRMATION'"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          Hapus Layanan
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          Apakah Anda yakin ingin menghapus Layanan ini?
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ tableData.default_information.service_name }}
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

const masterDataPublicationRepository = RepositoryFactory.get('masterDataPublication');

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
    GeneralInformation: () => import('@/components/Services/Publication/Detail/GeneralInformation'),
    ServiceDescription: () => import('@/components/Services/Publication/Detail/ServiceDescriptionTable'),
    AdditionalInformation: () => import('@/components/Services/Publication/Detail/AdditionalInformationTable'),
  },
  data() {
    return {
      tabs: [
        { key: 'pengaturan-dasar', label: 'Pengaturan Dasar' },
        { key: 'deskripsi-layanan', label: 'Deskripsi Layanan' },
        { key: 'informasi-tambahan', label: 'Informasi Tambahan' },
      ],
      currentTab: 'pengaturan-dasar',
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
    generalInformationTableData() {
      return {
        default_information: {
          benefits: this.tableData.default_information?.benefits ?? {},
          description: this.tableData.default_information?.description ?? null,
          facilities: this.tableData.default_information?.facilities ?? {},
          logo: this.tableData.default_information?.logo ?? {},
          opd_name: this.tableData.default_information?.opd_name ?? null,
          operator_status: this.tableData.default_information?.operator_status ?? null,
          portal_category: this.tableData.default_information?.portal_category ?? null,
          program_name: this.tableData.default_information?.program_name ?? null,
          service_form: this.tableData.default_information?.service_form ?? null,
          service_name: this.tableData.default_information?.service_name ?? null,
          service_user: this.tableData.default_information?.service_user ?? null,
          slug: this.tableData.default_information?.slug ?? null,
          technical: this.tableData.default_information?.technical ?? null,
        },
      };
    },
    serviceDescriptionTableData() {
      return {
        service_description: {
          application: this.tableData.service_description?.application ?? {},
          cover: this.tableData.service_description?.cover ?? {},
          hotline_mail: this.tableData.service_description?.hotline_mail ?? null,
          hotline_number: this.tableData.service_description?.hotline_number ?? null,
          images: this.tableData.service_description?.images ?? [],
          infographics: this.tableData.service_description?.infographics ?? {},
          links: this.tableData.service_description?.links ?? [],
          locations: this.tableData.service_description?.locations ?? [],
          operational_times: this.tableData.service_description?.operational_times ?? [],
          service_fee: this.tableData.service_description?.service_fee ?? {},
          service_procedures: this.tableData.service_description?.service_procedures ?? {},
          social_media: this.tableData.service_description?.social_media ?? [],
          terms_and_conditions: this.tableData.service_description?.terms_and_conditions ?? {},
        },
      };
    },
    additionalInformationTableData() {
      return {
        additional_information: {
          faq: this.tableData.additional_information?.faq ?? {},
          keywords: this.tableData.additional_information?.keywords ?? [],
        },
      };
    },
  },
  mounted() {
    this.fetchPublicationById();
  },
  methods: {
    async deletePublication(id) {
      try {
        this.modalState = MODAL_STATE.LOADING;
        const response = await masterDataPublicationRepository.deletePublicationById(id);
        if (response.status === 204) {
          this.setModalMessage({
            title: 'Berhasil dihapus!',
            message: `Layanan ${this.tableData.default_information.service_name} berhasil dihapus.`,
          });
          this.modalState = MODAL_STATE.SUCCESS;
        }
      } catch (error) {
        this.setModalMessage({
          title: 'Hapus Layanan Gagal',
          message: 'Layanan Anda gagal dihapus.',
        });
        this.modalState = MODAL_STATE.ERROR;
      }
    },
    async fetchPublicationById() {
      try {
        const response = await masterDataPublicationRepository.getPublicationById(this.$route.params.id);
        const { data } = response.data;

        this.tableData = data;
      } catch {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Layanan Publikasi, silakan coba beberapa saat lagi',
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
        title: 'Hapus Layanan',
        message: 'Apakah Anda yakin ingin menghapus Layanan ini?',
        action: () => this.deletePublication(id),
      });
    },
  },
};
</script>
