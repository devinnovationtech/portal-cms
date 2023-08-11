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
          v-show="!!filterCount"
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
            @click="clearFilter"
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
          class="service-filter__author w-full mb-6"
        >
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Author
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <JdsSelect
            v-model="filter.opd_name"
            placeholder="Pilih Author"
            filterable
            filter-type="contain"
            :options="opdNameOptions"
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
            v-model="filter.service_user"
            placeholder="Pilih Pengguna Layanan"
            :options="serviceUserOptions"
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
            v-model="filter.technical"
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
                v-model="filter.start_date"
                label="Tanggal Awal"
                @input="isDatePickerTouched = true"
              />
              <div
                v-show="isStartDateEmpty"
                class="py-2"
              >
                <p class="text-[13px] text-red-500">
                  Tanggal awal tidak boleh kosong
                </p>
              </div>
            </div>
            <div>
              <JdsDateInput
                v-model="filter.end_date"
                label="Tanggal Akhir"
                @input="isDatePickerTouched = true"
              />
              <div
                v-show="isEndDateEmpty"
                class="py-2"
              >
                <p class="text-[13px] text-red-500">
                  Tanggal akhir tidak boleh kosong
                </p>
              </div>
              <div
                v-show="isEndDateValid"
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
            :disabled="!isFilterValid"
            @click="submitFilter"
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
import clonedeep from 'lodash.clonedeep';
import { mapGetters } from 'vuex';
import { daysDifference, formatDate } from '@/common/helpers/date';
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
  props: {
    params: {
      type: Object,
      default: () => ({
        opd_name: '',
        service_user: '',
        technical: '',
        start_date: null,
        end_date: null,
      }),
    },
    opdNameOptions: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      filter: {
        opd_name: '',
        service_user: '',
        technical: '',
        start_date: formatDate(new Date(), 'dd/MM/yyyy'),
        end_date: formatDate(new Date(), 'dd/MM/yyyy'),
      },
      isFilterOpen: false,
      isDatePickerTouched: false,
      types: [
        { label: 'Online', value: 'ONLINE' },
        { label: 'Offline', value: 'OFFLINE' },
      ],
      filterCount: 0,
      serviceUserOptions: [
        {
          label: 'Umum',
          value: 'UMUM',
        },
        {
          label: 'ASN',
          value: 'ASN',
        },
        {
          label: 'Lembaga',
          value: 'LEMBAGA',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    filterButtonLabel() {
      return this.filterCount > 0 ? 'Diterapkan' : 'Belum ada filter';
    },
    isFilterValid() {
      if (this.isDatePickerTouched) {
        return this.isSelectedDateValid;
      }

      return true;
    },
    isEndDateValid() {
      return this.isDatePickerTouched && this.filter.end_date && !this.isSelectedDateValid;
    },
    isEndDateEmpty() {
      return this.isDatePickerTouched && !this.filter.end_date;
    },
    isSelectedDateValid() {
      const { start_date: start, end_date: end } = this.filter;

      if (start && end) {
        const startDate = this.convertStringToDate(start);
        const endDate = this.convertStringToDate(end);

        return daysDifference(endDate, startDate) >= 0;
      }

      return false;
    },
    isStartDateEmpty() {
      return this.isDatePickerTouched && !this.filter.start_date;
    },
    isSuperAdmin() {
      return this.user?.role?.name === 'Super Admin';
    },
  },
  methods: {
    clearFilter() {
      this.filter = {
        opd_name: '',
        service_user: '',
        technical: '',
        start_date: null,
        end_date: null,
      };
      this.resetDatePicker();
      this.isDatePickerTouched = false;
    },
    convertStringToDate(string) {
      const date = string.split('/');
      const year = date[2];
      // month is zero based, we need to subtract 1
      const month = date[1] - 1;
      const day = date[0];

      return new Date(year, month, day);
    },
    toggleFilterDropdown() {
      this.isFilterOpen = !this.isFilterOpen;
    },
    closeFilterDropdown() {
      this.isFilterOpen = false;
      this.resetFilter();
    },
    submitFilter() {
      const filterObj = clonedeep(this.filter);
      const { start_date: startDate, end_date: endDate } = filterObj;

      if (startDate && endDate) {
        filterObj.start_date = formatDate(this.convertStringToDate(startDate), 'yyyy/MM/dd');
        filterObj.end_date = formatDate(this.convertStringToDate(endDate), 'yyyy/MM/dd');
      }

      this.$emit('change:filter', filterObj);
      this.updateFilterCount();
      this.toggleFilterDropdown();
    },
    updateFilterCount() {
      let count = 0;

      Object.keys(this.filter).forEach((item) => {
        if (Array.isArray(this.filter[item])) {
          if (this.filter[item].length) {
            count += 1;
          }
        } else if (this.filter[item]) {
          count += 1;
        }
      });

      this.filterCount = count;
    },
    /**
     * NOTE:
     * There is an issue with `JdsDateInput` component,
     * the value displayed in the date picker is not reset back to default
     * when we change the bound model to `null` or `undefined`.
     *
     * One solution we can do is to reset the values
     * manually using the DOM element selector
     */
    resetDatePicker() {
      const datePickers = document.querySelectorAll('.service-filter .jds-date-input #date');

      datePickers.forEach((datePicker) => {
        datePicker.value = null;
      });
    },
    /**
     * Reset filter state to original/actual filter params
     */
    resetFilter() {
      const prevStartDate = this.filter.start_date;
      const prevEndDate = this.filter.end_date;

      this.filter = {
        opd_name: this.params.opd_name,
        service_user: this.params.service_user,
        technical: this.params.technical,
        start_date: this.params.start_date
          ? formatDate(this.params.start_date, 'dd/MM/yyyy')
          : prevStartDate,
        end_date: this.params.end_date
          ? formatDate(this.params.end_date, 'dd/MM/yyyy')
          : prevEndDate,
      };

      this.isDatePickerTouched = false;
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
  max-height: 290px !important;
}

.service-filter .service-filter__author .jds-popover .jds-popover__content .jds-select__options .jds-options__option-list .jds-options__option-list-item {
 height: 35px !important;
}

.service-filter .jds-popover .jds-popover__content {
  z-index: 10 !important;
}

/**
* Override jds-radio-button-group styling
*/

.service-filter .jds-radio-button-group .jds-radio-button .jds-radio-button__label {
  flex-direction: row-reverse !important;
  gap: 6px !important
}

.service-filter .jds-radio-button-group .jds-radio-button {
  background-color: #EEEEEE !important;
  border-radius: 27px !important;
  padding: 8px 10px !important;
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
