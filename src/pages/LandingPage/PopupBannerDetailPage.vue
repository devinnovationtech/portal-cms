<template>
  <main class="pb-20">
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->

        <BaseButton
          class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
          @click="showDeleteModal"
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

    <!-- Delete Action Prompt -->
    <BaseModal
      :open="isModalDelete"
      @close="showDeleteModal"
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
            @click="showDeleteModal"
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
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import BaseModal from '@/common/components/BaseModal';
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
        buttonLabel: this.banner?.button_label || '-',
        isContentMobile: this.isContentMobile,
      };
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
    showDeleteModal() {
      this.isModalDelete = !this.isModalDelete;
    },
    async deleteBanner(id) {
      try {
        this.deleteLoading = true;
        await popupBannerRepository.deleteBannerById(id);
        this.$toast({
          type: 'success',
          message: 'Data banner telah berhasil dihapus',
        });
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Data banner gagal dihapus',
        });
      } finally {
        this.deleteLoading = false;
        this.showDeleteModal();
        this.$router.back();
      }
    },
  },
};
</script>
