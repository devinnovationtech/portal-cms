<template>
  <main class="w-full pb-20">
    <section class="px-3 py-6 rounded-lg bg-white border-2 border-green-600">
      <div class="w-full">
        <!-- Table Menu -->
        <div class="sm:flex-wrap flex mb-4 items-start">
          <LinkButton
            href="/popup-banner/tambah"
            title="Tambah Pop-up Banner"
            class="ml-auto"
          >
            <template #icon-left>
              <JdsIcon
                name="plus"
                size="14px"
                fill="#fff"
                class="h-[14px] w-[14px]"
              />
            </template>
            <p class="font-lato font-bold text-sm text-white leading-none">
              Tambah Pop-up Banner
            </p>
          </LinkButton>
        </div>
        <div class="w-full overflow-auto">
          <PopupBannerTable
            :items="banners"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PopupBannerTable from '@/components/LandingPage/PopupBanner/PopupBannerTable';
import LinkButton from '@/common/components/LinkButton';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const popupBannerRepository = RepositoryFactory.get('popupBanner');

export default {
  name: 'Agenda',
  components: {
    PopupBannerTable,
    LinkButton,
  },
  data() {
    return {
      banners: [],
      loading: false,
      meta: {
        total_count: 0,
        total_page: 0,
        current_page: 1,
        per_page: 5,
      },
      params: {
        per_page: 5,
        page: 1,
        q: '',
      },
    };
  },
  async mounted() {
    await this.fetchBanners();
  },
  methods: {
    async fetchBanners() {
      try {
        this.loading = true;
        const response = await popupBannerRepository.getBanners(this.params);
        const { data, meta } = response.data;

        this.banners = data;
        this.meta = meta;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Pop-up Banner, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchBanners();
    },
  },
};
</script>
