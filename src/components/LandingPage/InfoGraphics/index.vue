<template>
  <main class="w-full pb-20">
    <section class="px-3 py-6 rounded-lg bg-white border-2 border-green-600">
      <div class="w-full">
        <!-- Table Menu -->
        <div class="sm:flex-wrap flex mb-4 items-start justify-end">
          <div class="flex gap-4">
            <BaseButton
              class="bg-white text-sm text-green-700 border-green-700"
              v-show="!toggleSorting"
              @click="onEditSorting"
            >
              <template #icon-left>
                <SortIcon class="w-5 h-5 fill-green-600" />
              </template>
              <p>
                Edit Urutan
              </p>
            </BaseButton>
            <BaseButton
              class="bg-white text-sm text-green-700 border-green-700"
              v-show="toggleSorting"
              @click="onSaveSorting"
            >
              <template #icon-left>
                <SaveIcon class="w-5 h-5 fill-green-600" />
              </template>
              <p>
                Simpan Urutan
              </p>
            </BaseButton>
            <LinkButton
              href="/infographics-banner/tambah"
              title="Tambah Infographics Banner"
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
                Tambah Banner Infografis
              </p>
            </LinkButton>
          </div>
        </div>
        <div class="w-full overflow-auto">
          <InfoGraphicsBannerTable
            :items="data"
            :loading="loading"
            class="min-w-[1000px]"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import SortIcon from '@/assets/icons/fluent-arrow.svg?inline';
import SaveIcon from '@/assets/icons/uil-save.svg?inline';
import InfoGraphicsBannerTable from '@/components/LandingPage/InfoGraphics/InfoGraphicsBannerTable';

export default {
  name: 'InfographicsBannerList',
  components: {
    BaseButton,
    LinkButton,
    SortIcon,
    SaveIcon,
    InfoGraphicsBannerTable,
  },
  data() {
    return {
      data: [],
      loading: false,
      toggleSorting: false,
    };
  },
  methods: {
    onEditSorting() {
      this.toggleSorting = !this.toggleSorting;
    },
    onSaveSorting() {
      this.toggleSorting = !this.toggleSorting;
    },
  },
};
</script>
