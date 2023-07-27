<template>
  <section class="min-w-0 flex gap-3 items-center justify-center">
    <FilterIcon class="w-5 h-5 fill-blue-gray-800" />
    <p class="font-lato text-sm">
      Filter :
    </p>
    <BaseButton
      class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white rounded-full"
      @click="toggleFilterDropdown"
    >
      <div class="min-w-0 flex gap-2 items-center">
        <p class="font-normal">
          {{ filterButtonLabel }}
        </p>
        <div
          v-show="false"
          class="w-5 h-5 rounded-full bg-red-500 text-white"
        >
          {{ filterCount }}
        </div>
      </div>
      <template #icon-right>
        <JdsIcon
          name="chevron-down"
          size="16px"
          fill="#fff"
          class="h-4 w-4"
        />
      </template>
    </BaseButton>

    <!-- Filter Modal -->
    <BaseModal :open="isFilterOpen">
      <template #header>
        <!-- Title and Reset Button -->
        <div class="min-w-0 w-full p-4 pb-0 flex items-center justify-between">
          <h2 class="font-roboto font-bold text-blue-gray-800">
            Filter Layanan
          </h2>
          <BaseButton
            class="border-transparent hover:bg-green-50"
          >
            <p class="font-normal text-sm text-green-700">
              Hapus semua filter
            </p>
          </BaseButton>
        </div>
      </template>
      <section class="service-filter min-w-[400px]">
        <!-- Author Select Box -->
        <div
          v-if="isSuperAdmin"
          class="w-full mb-6"
        >
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Author
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <JdsSelect
            placeholder="Pilih Author"
          />
        </div>
        <!-- User Select -->
        <div class="w-full mb-6">
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Pengguna Layanan
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <JdsSelect
            placeholder="Pilih Pengguna Layanan"
          />
        </div>
        <!-- Technical Service -->
        <div class="w-full mb-6">
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Teknis Layanan
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <JdsRadioButtonGroup
            :items="types"
            placeholder-key="label"
            name="radio-button-group"
            orientation="horizontal"
          />
        </div>
        <!-- Start and End Date Picker -->
        <div class="w-full mb-6">
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Diperbaharui
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <div class="date-input relative min-w-0 w-full grid grid-cols-2 gap-3">
            <div>
              <JdsDateInput
                label="Tanggal Awal"
              />
              <div
                v-show="false"
                class="py-2"
              >
                <p class="text-[13px] text-red-500">
                  Tanggal awal tidak boleh kosong
                </p>
              </div>
            </div>
            <div>
              <JdsDateInput
                label="Tanggal Akhir"
              />
              <div
                v-show="false"
                class="py-2"
              >
                <p class="text-[13px] text-red-500">
                  Tanggal akhir tidak boleh kosong
                </p>
              </div>
              <div
                v-show="false"
                class="py-2"
              >
                <p class="text-[13px] text-red-500 leading-5">
                  Tanggal akhir tidak boleh kurang
                  <br>
                  dari tanggal awal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <template #footer>
        <!-- Cancel and Submit buttons -->
        <div
          class="w-full flex gap-3"
        >
          <BaseButton
            class="border-green-700 hover:bg-green-50 bg-white w-full"
            @click="closeFilterDropdown"
          >
            <p class="w-full text-sm font-normal text-green-700 text-center">
              Batal
            </p>
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 w-full"
          >
            <p class="w-full text-sm font-normal text-white text-center">
              Terapkan
            </p>
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import FilterIcon from '@/assets/icons/filter.svg?inline';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';

export default {
  name: 'ServiceFilter',
  components: {
    FilterIcon,
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      isFilterOpen: false,
      types: [
        { label: 'Offline', value: 'offline' },
        { label: 'Online', value: 'online' },
      ],
      filterCount: 0,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    filterButtonLabel() {
      return this.filterCount > 0 ? 'Diterapkan' : 'Belum ada filter';
    },
    isSuperAdmin() {
      return this.user?.role?.name === 'Super Admin';
    },
  },
  methods: {
    toggleFilterDropdown() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    closeFilterDropdown() {
      this.isFilterOpen = false;
    },
  },
};
</script>

<style>

/**
 * Override default Jds-Select styling
 */
.service-filter .jds-select,
.service-filter .jds-popover,
.service-filter .jds-popover__activator,
.service-filter .jds-input-text {
  width: 100% !important;
}

.service-filter .jds-popover .jds-popover__content .jds-select__options {
  width: 478px !important;
}

/**
 * Override default Jds-DateInput styling
 */
.service-filter .date-input .jds-popover {
  visibility: unset !important;
}

.service-filter .date-input .jds-form-control-label {
  font-size: 14px !important;
  margin-bottom: 4px !important;
}

.service-filter .date-input .jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}
.service-filter .date-input .jds-calendar {
  max-width: none !important;
}
.service-filter .date-input .jds-calendar .jds-calendar__list-of-days,
.service-filter .date-input .jds-calendar .jds-calendar__days {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
</style>
