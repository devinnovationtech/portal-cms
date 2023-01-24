<template>
  <main class="w-full pb-20">
    <section class="px-3 py-6 rounded-lg bg-white border-2 border-green-600">
      <div class="w-full">
        <!-- Table Menu -->
        <div class="sm:flex-wrap flex mb-4 items-start">
          <LinkButton
            href="#"
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
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PopupBannerTable from '@/components/LandingPage/PopupBanner/PopupBannerTable';
import LinkButton from '@/common/components/LinkButton';

const dummyData = [
  {
    id: 1,
    title: 'BIAN',
    image: {
      desktop: 'https://picsum.photos/200/300',
      mobile: 'https://picsum.photos/200/300',
    },
    link: 'https://unsplash.com',
    duration: 3,
    start_date: '2023-01-24',
    status: 'ACTIVE',
    created_at: '2023-01-24T07:56:37Z',
    updated_at: '2023-01-24T07:56:37Z',
  },
  {
    id: 2,
    title: 'BIAN 2',
    image: {
      desktop: 'https://picsum.photos/200/300',
      mobile: 'https://picsum.photos/200/300',
    },
    link: 'https://unsplash.com',
    duration: 3,
    start_date: '2023-01-24',
    status: 'NON-ACTIVE',
    created_at: '2023-01-24T07:56:37Z',
    updated_at: '2023-01-24T07:56:37Z',
  },
  {
    id: 3,
    title: 'BIAN 3',
    image: {
      desktop: 'https://picsum.photos/200/300',
      mobile: 'https://picsum.photos/200/300',
    },
    link: 'https://unsplash.com',
    duration: 3,
    start_date: '2023-01-24',
    status: 'NON-ACTIVE',
    created_at: '2023-01-24T07:56:37Z',
    updated_at: '2023-01-24T07:56:37Z',
  },
];

export default {
  name: 'Agenda',
  components: {
    PopupBannerTable,
    LinkButton,
  },
  data() {
    return {
      // @todo: change banner data with real data
      banners: dummyData,
      loading: false,
      meta: {
        total_count: 0,
        total_page: 0,
        current_page: 1,
        per_page: 10,
      },
    };
  },
  async mounted() {
    await this.fetchBanners();
  },
  methods: {
    async fetchBanners() {
      // @todo: fetch banner data from API
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },

};
</script>
