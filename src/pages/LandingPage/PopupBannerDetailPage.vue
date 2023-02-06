<template>
  <main class="pb-20">
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->

        <BaseButton
          class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
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
          :href="linkBannerUpdatePage"
          variant="secondary"
          class="hover:bg-green-50 font-lato text-sm font-bold text-green-700"
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

      <div class="flex flex-row justify-between">
        <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-blue-gray-600">
          Detail Banner Pop-up
        </h1>
        <div class="flex flex-row gap-[15px]">
          <BaseButton
            v-for="item in previewButtonData"
            :key="item.name"
            :class="{
              'border-0 font-lato text-[14px] leading-[18px] font-medium text-gray-600 cursor-pointer': true,
              'bg-gray-300 text-gray-800 transition duration-150 ease-linear': selectedPreview === item.name
            }"
            @click="showPreviewImage(item)"
          >
            <template #icon-left>
              <img
                :src="item.image"
                alt=""
                :width="item.width"
                :height="item.height"
              >
            </template>
            {{ item.name }}
          </BaseButton>
        </div>
      </div>

      <!-- Image Preview -->

      <div class="bg-gray-50 w-full h-full overflow-hidden rounded-[8px]">
        <component
          :is="imagePreviewComponent"
          :image-desktop="banner?.image.desktop || defaultImageDesktop"
          :image-mobile="banner?.image.mobile || defaultImageMobile"
          v-bind="{ ...propsImagePreview }"
          @showContentMobile="showContentMobile"
        />
      </div>

      <!-- Data Preview -->

      <div class="rounded-lg overflow-hidden border border-gray-200">
        <PopUpBannerDetailTable
          :banner="banner"
          :loading="loading"
        />
      </div>
    </section>

    <!-- Delete Action Modal -->
    <BaseModal
      :open="modalStatus === 'CONFIRMATION'"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          Hapus Banner
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          Apakah Anda yakin ingin menghapus banner ini?
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ banner.title }}
        </h2>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="onCancel"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-red-500 hover:bg-red-400 text-sm text-white"
            :disabled="deleteLoading"
            @click="deleteBanner(banner.id)"
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

    <!-- Success or Erros Message Modal -->

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
            @click="messageAction"
          >
            Saya Mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import BaseModal from '@/common/components/BaseModal';
import { STATUS_MODAL } from '@/common/constants/index';
import ProgressModal from '@/common/components/ProgressModal';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import PopUpBannerDetailTable from '@/components/LandingPage/PopupBanner/PopUpBannerDetailTable';
import PopupBannerImagePreview from '@/components/LandingPage/PopupBanner/PopupBannerImagePreview';

const popupBannerRepository = RepositoryFactory.get('popupBanner');

export default {
  name: 'PopupBannerDetailPage',
  components: {
    BaseButton,
    HeaderMenu,
    BaseModal,
    ProgressModal,
    LinkButton,
    PopUpBannerDetailTable,
    PopupBannerImagePreview,
  },
  data() {
    return {
      previewButtonData: [
        {
          id: 1,
          name: 'Desktop',
          image: require('@/assets/icons/desktop.svg'),
          width: '16',
          height: '18',
        },
        {
          id: 2,
          name: 'Mobile',
          image: require('@/assets/icons/mobile.svg'),
          width: '11',
          height: '18',
        },
      ],
      defaultImageDesktop: 'https://picsum.photos/1000/400',
      defaultImageMobile: 'https://picsum.photos/200/300',
      banner: {},
      selectedPreview: 'Desktop',
      loading: false,
      isMobilePreview: false,
      isContentMobile: false,
      isDesktopPreview: true,
      isModalDelete: false,
      deleteLoading: false,
      progressValue: 0,
      modalStatus: STATUS_MODAL.NONE,
      successMessage: {
        title: '',
        body: '',
      },
      errorMessage: {
        title: '',
        body: '',
      },
      // @TODO: change the right link to update banner page
      linkBannerUpdatePage: '/landing-page',
    };
  },
  computed: {
    imagePreviewComponent() {
      return PopupBannerImagePreview;
    },
    propsImagePreview() {
      if (this.selectedPreview === 'Desktop') {
        return {
          isSelected: this.selectedPreview,
        };
      }
      return {
        isSelected: this.selectedPreview,
        link: this.banner?.link || '-',
        buttonLabel: this.banner?.button_label || 'Tutup',
        isContentMobile: this.isContentMobile,
      };
    },
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
  async mounted() {
    await this.fetchBannerById();
  },
  methods: {
    async fetchBannerById() {
      try {
        this.loading = true;
        const response = await popupBannerRepository.getBannerById(this.$route.params.id);
        const { data } = response.data;
        this.banner = data;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Pop-up Banner, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    showPreviewImage(item) {
      this.selectedPreview = item.name;
      if (item.name === 'Mobile') this.isContentMobile = true;
    },
    showContentMobile() {
      this.isContentMobile = !this.isContentMobile;
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
    async deleteBanner(id) {
      try {
        this.deleteLoading = true;
        const response = await popupBannerRepository.deleteBannerById(id);
        if (response.status === 204) {
          this.modalStatus = STATUS_MODAL.LOADING;
          this.progressValue = 25;
          setTimeout(() => {
            this.progressValue = 75;
            setTimeout(() => {
              this.successMessage = {
                title: 'Berhasil dihapus!',
                body: `Banner ${this.banner.title} berhasil hapus.`,
              };
              this.modalStatus = STATUS_MODAL.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch {
        this.errorMessage = {
          title: 'Hapus Banner Gagal',
          body: `Banner ${this.banner.title} gagal dihapus.`,
        };
        this.modalStatus = STATUS_MODAL.ERROR;
      } finally {
        this.deleteLoading = false;
      }
    },
    messageAction() {
      if (this.modalStatus === STATUS_MODAL.SUCCESS) {
        this.$router.push('/landing-page');
      } else {
        this.resetDeleteState();
      }
    },
  },
};
</script>
