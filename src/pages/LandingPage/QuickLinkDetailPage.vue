<template>
  <main
    class="pb-20"
    data-cy="quick-link-detail__container"
  >
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->

        <BaseButton
          class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
          data-cy="quick-link-detail__button-delete"
          @click="showDeleteConfirmationModal"
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

        <!-- Update Button -->

        <LinkButton
          :href="`/landing-page/akses-cepat/detail/${quickLink.id}/ubah`"
          variant="secondary"
          class="hover:bg-green-50 font-lato text-sm font-bold text-green-700"
          data-cy="quick-link-detail__button-edit"
        >
          <template #icon-left>
            <JdsIcon
              name="pencil"
              size="16"
              class="h-4 text-green-700"
            />
          </template>
          Ubah Data
        </LinkButton>
      </div>
    </HeaderMenu>
    <section class="px-6 py-4 rounded-lg bg-white mb-4 flex flex-col gap-6">
      <!-- Title Section -->

      <div class="flex">
        <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-blue-gray-600">
          Detail Akses Cepat
        </h1>
      </div>

      <!-- Image -->

      <div class="flex justify-center py-12 bg-gray-50 rounded-lg">
        <img
          :src="quickLink.image"
          :alt="quickLink.title"
          height="173"
          width="472"
        >
      </div>

      <!-- Data Preview -->

      <div class="rounded-lg overflow-hidden border border-gray-200">
        <QuickLinkDetailTable
          :quick-link="quickLink"
          :loading="loading"
        />
      </div>

      <!-- Delete Action Modal -->
      <BaseModal
        :open="modalStatus === 'CONFIRMATION'"
      >
        <div class="w-full h-full">
          <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
            Hapus Akses Cepat
          </h1>
          <p class="font-lato text-sm text-gray-800 mb-2">
            Apakah Anda yakin ingin menghapus akses cepat ini?
          </p>
          <h2 class="font-lato text-md font-bold text-gray-800">
            {{ quickLink.title }}
          </h2>
        </div>
        <template #footer>
          <div class="flex gap-4 justify-end">
            <BaseButton
              class="border-green-700 hover:bg-green-50 text-sm text-green-700"
              data-cy="quick-link-detail__button-action-cancel"
              @click="onCancel"
            >
              Batal
            </BaseButton>
            <BaseButton
              class="bg-red-500 hover:bg-red-400 text-sm text-white"
              :disabled="deleteLoading"
              data-cy="quick-link-detail__button-action-delete"
              @click="deleteQuickLink(quickLink.id)"
            >
              <p v-if="!deleteLoading">
                Ya, saya yakin
              </p>
              <p
                v-else
                class="flex gap-2 items-center text-gray-500"
              >
                <JdsSpinner
                  size="16"
                  foreground="#757575"
                />
                Loading...
              </p>
            </BaseButton>
          </div>
        </template>
      </BaseModal>

      <!-- Delete Progress -->

      <ProgressModal
        :open="modalStatus === 'LOADING'"
        :value="progressValue"
      />

      <!-- Success or Error Message Modal -->

      <BaseModal
        :open="modalStatus === 'SUCCESS' || modalStatus === 'ERROR'"
      >
        <div class="w-full h-full px-2 pb-4">
          <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
            {{ messageTitle }}
          </h1>
          <div class="flex items-center gap-4">
            <JdsIcon
              :name="messageIconName"
              :class="messageIconClassName"
            />
            <p class="text-sm leading-6 text-gray-800">
              {{ messageBody }}
            </p>
          </div>
        </div>
        <template #footer>
          <div class="flex w-full h-full items-center justify-center gap-4 p-2">
            <BaseButton
              class="bg-green-700 hover:bg-green-600 text-sm text-white"
              data-cy="quick-link-detail__button-action-confirmation"
              @click="messageAction"
            >
              Saya Mengerti
            </BaseButton>
          </div>
        </template>
      </BaseModal>
    </section>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import BaseModal from '@/common/components/BaseModal';
import ProgressModal from '@/common/components/ProgressModal';
import { STATUS_MODAL } from '@/common/constants/index';
import QuickLinkDetailTable from '@/components/LandingPage/QuickLink/QuickLinkDetailTable';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const quickLinkRepository = RepositoryFactory.get('quickLink');

export default {
  name: 'QuickLinkDetailPage',
  components: {
    HeaderMenu,
    BaseButton,
    LinkButton,
    BaseModal,
    ProgressModal,
    QuickLinkDetailTable,
  },
  data() {
    return {
      defaultImageDesktop: 'https://picsum.photos/1000/400',
      quickLink: {},
      loading: false,
      modalStatus: STATUS_MODAL.NONE,
      isModalDelete: false,
      deleteLoading: false,
      successMessage: {
        title: '',
        body: '',
      },
      errorMessage: {
        title: '',
        body: '',
      },
      progressValue: 0,
    };
  },
  computed: {
    messageTitle() {
      return this.modalStatus === 'SUCCESS' ? this.successMessage.title : this.errorMessage.title;
    },
    messageBody() {
      return this.modalStatus === 'SUCCESS' ? this.successMessage.body : this.errorMessage.body;
    },
    messageIconName() {
      return this.modalStatus === 'SUCCESS' ? 'check-mark-circle' : 'warning';
    },
    messageIconClassName() {
      return this.modalStatus === 'SUCCESS' ? 'text-green-600' : 'text-red-600';
    },
  },
  mounted() {
    this.fetchQuickLinkById();
  },
  methods: {
    async fetchQuickLinkById() {
      try {
        this.loading = true;
        const response = await quickLinkRepository.getLinkById(this.$route.params.id);
        const { data } = response.data;
        this.quickLink = data;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Akses Cepat, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    onCancel() {
      this.modalStatus = STATUS_MODAL.NONE;
    },
    showDeleteConfirmationModal() {
      this.modalStatus = STATUS_MODAL.CONFIRMATION;
    },
    resetDeleteState() {
      this.modalStatus = STATUS_MODAL.NONE;
      this.progressValue = 0;
      this.successMessage.title = '';
      this.successMessage.body = '';
      this.errorMessage.title = '';
      this.errorMessage.body = '';
    },
    async deleteQuickLink(id) {
      try {
        this.deleteLoading = true;
        const response = await quickLinkRepository.deleteQuickLinkById(id);
        if (response.status === 200) {
          this.modalStatus = STATUS_MODAL.LOADING;
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.successMessage = {
                title: 'Berhasil dihapus!',
                body: `Akses Cepat ${this.quickLink.title} berhasil hapus.`,
              };
              this.modalStatus = STATUS_MODAL.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch {
        this.errorMessage = {
          title: 'Hapus Akses Cepat Gagal',
          body: `Akses Cepat ${this.quickLink.title} gagal dihapus.`,
        };
        this.modalStatus = STATUS_MODAL.ERROR;
      } finally {
        this.deleteLoading = false;
      }
    },
    messageAction() {
      if (this.modalStatus === STATUS_MODAL.SUCCESS) {
        this.$router.push('/landing-page/akses-cepat');
      } else {
        this.resetDeleteState();
      }
    },
  },
};
</script>
