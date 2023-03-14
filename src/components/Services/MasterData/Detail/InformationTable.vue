<template>
  <div>
    <div class="overflow-hidden rounded-lg border border-gray-200 mb-4">
      <JdsSimpleTable>
        <thead>
          <tr>
            <th
              colspan="2"
              class="!font-roboto !text-sm"
            >
              Informasi Layanan
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Nama Perangkat Daerah
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.opd_name || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Urusan Pemerintahan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.goverment_affair || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Sub Urusan Pemerintahan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.sub_goverment_affair || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-[12px] leading-[23px]">
              Bentuk Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.form || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Jenis Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.type || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Sub Jenis Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.sub_service_type || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Nama Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ services.name || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Nama Program Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ services.program_name || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Deskripsi Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ services.description || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Pengguna Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ services.user || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Kategori Layanan SPBE (RAL Level 2)
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ services.sub_service_spbe || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Status Operasional
            </td>
            <td>
              <div
                class="w-fit font-lato text-[12px] leading-[23px] capitalize"
                :class="{
                  'bg-green-50 text-green-700 px-[10px] rounded-[5px] font-bold ' : operationalStatus.value === 'ACTIVE',
                  'bg-gray-200 text-gray-600 px-[10px] rounded-[5px] font-bold ' : operationalStatus.value === 'NOT-ACTIVE'
                }"
              >
                <span>{{ operationalStatus.label }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Jenis Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <div
                class="w-fit flex items-center font-lato text-[12px] leading-[23px]"
                :class="{
                  'bg-blue-50 px-[10px] rounded-[5px] font-bold text-blue-800' : services.technical === 'ONLINE',
                  'bg-gray-200 text-gray-600 px-[10px] rounded-[5px] font-bold ' : services.technical === 'OFFLINE'
                }"
              >
                <span
                  v-show="services.technical"
                  :class="{
                    'w-2 h-2 mr-2 rounded-full': true,
                    'bg-blue-800': services.technical === 'ONLINE',
                    'bg-gray-600': services.technical === 'OFFLINE',
                  }"
                />
                <span class="capitalize">{{ (services.technical && services.technical.toLowerCase()) || '-' }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Manfaat Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <template v-if="services.benefits.length > 0">
                <div
                  v-for="(benefit, index) in services.benefits"
                  :key="`benefit-${index}`"
                  class="mb-1"
                >
                  <span class="leading-[23px]">{{ index + 1 }}. {{ benefit }}</span>
                </div>
              </template>
              <template v-else>
                <span>-</span>
              </template>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Fasilitas Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <template v-if="services.facilities.length > 0">
                <div
                  v-for="(facility, index) in services.facilities"
                  :key="`facility-${index}`"
                  class="mb-1"
                >
                  <span class="leading-[23px]">{{ index + 1 }}. {{ facility }}</span>
                </div>
              </template>
              <template v-else>
                <span>-</span>
              </template>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Alamat Website Informasi Resmi
            </td>
            <td class="font-lato text-blue-gray-500 font-bold hover:underline text-sm">
              <a
                :href="services.website"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ services.website || '-' }}
              </a>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Tautan Layanan
            </td>
            <td class="w-full flex flex-wrap font-lato text-blue-gray-500 font-bold text-sm">
              <template v-if="services.links.length">
                <div
                  v-for="(link, index) in services.links"
                  :key="`link-${index}`"
                  class="w-fit flex mr-4"
                >
                  <img
                    :src="getServiceLinkIcon(link.type)"
                    width="36"
                    height="23"
                    class="w-full h-full object-contain object-center mr-2"
                  >
                  <a
                    :href="link.link"
                    class="whitespace-nowrap hover:underline"
                    :class="getServiceLinkLabelColor(link.type)"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {{ link.label }}
                  </a>
                </div>
              </template>
              <template v-else>
                <span>-</span>
              </template>
            </td>
          </tr>
        </tbody>
      </JdsSimpleTable>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 mb-4">
      <JdsSimpleTable>
        <thead>
          <tr>
            <th
              colspan="2"
              class="!font-roboto !text-sm"
            >
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Syarat dan Ketentuan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="services.terms_and_conditions.length > 0">
                <div
                  v-for="(item, index) in services.terms_and_conditions"
                  :key="`terms-and-condition-${index}`"
                  class="mb-1"
                >
                  <span>{{ `${index + 1}. ${item}` }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Prosedur Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="services.terms_and_conditions.length > 0">
                <div
                  v-for="(item, index) in services.service_procedures"
                  :key="`service-procedure-${index}`"
                  class="mb-1"
                >
                  <span>{{ `${index + 1}. ${item}` }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Tarif Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.service_fee || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Waktu Operasional
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="services.operational_time.length > 0">
                <div
                  v-for="(item, index) in services.operational_time"
                  :key="`operational-time-${index}`"
                  class="mb-1"
                >
                  <span>{{ getOperationalTimeLabel(item) }}</span>
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Kontak Hotline (Nomor HP/Telp)
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.hotline_number || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Kontak Hotline (Alamat E-mail)
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ services.hotline_mail || '-' }}
            </td>
          </tr>
        </tbody>
      </JdsSimpleTable>
    </div>

    <div
      v-if="services.location.length > 0"
      class="overflow-hidden rounded-lg border border-gray-200"
    >
      <JdsSimpleTable>
        <thead>
          <tr>
            <th
              colspan="2"
              class="!font-roboto !text-sm"
            >
              Lokasi Pelayanan
            </th>
          </tr>
        </thead>
        <tbody>
          <div
            v-for="(item, index) in services.location"
            :key="`location-${index}`"
          >
            <tr>
              <td class="min-w-[280px] font-lato text-green-700 font-bold text-sm">
                Lokasi No
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                {{ index + 1 }}
              </td>
            </tr>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Jenis Lokasi
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                {{ item.type }}
              </td>
            </tr>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Penanggung Jawab Lokasi
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                {{ item.organization }}
              </td>
            </tr>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Nama Lokasi
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                {{ item.name }}
              </td>
            </tr>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Alamat Lokasi
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                {{ item.address }}
              </td>
            </tr>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Kontak Lokasi (Nomor HP/Telp)
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                {{ item.phone_number }}
              </td>
            </tr>
          </div>
        </tbody>
      </JdsSimpleTable>
    </div>
  </div>
</template>

<script>
import { DAY_MAP } from '@/common/constants';

export default {
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    services() {
      return this.tableData.services;
    },
    operationalStatus() {
      if (this.tableData.services.operational_status === null) {
        return { value: null, label: '-' };
      }

      if (this.tableData.services.operational_status === 'ACTIVE') {
        return { value: 'ACTIVE', label: 'Aktif' };
      }

      return { value: 'NOT-ACTIVE', label: 'Tidak Aktif' };
    },
  },
  methods: {
    getServiceLinkIcon(type) {
      switch (type) {
        case 'GOOGLE_FORM':
          return require('@/assets/icons/google_form_logo.svg');
        case 'GOOGLE_PLAYSTORE':
          return require('@/assets/icons/google_playstore_logo.svg');
        case 'APP_STORE':
          return require('@/assets/icons/apple_store_logo.svg');
        case 'WEBSITE':
          return require('@/assets/icons/website_logo.svg');
        default:
          return null;
      }
    },
    getServiceLinkLabelColor(type) {
      switch (type) {
        case 'GOOGLE_FORM':
          return 'text-[#764EBE]';
        case 'GOOGLE_PLAYSTORE':
          return 'text-[#20A2BD]';
        case 'APP_STORE':
          return 'text-[#1A4373]';
        case 'WEBSITE':
          return 'text-[#16A75C]';
        default:
          return null;
      }
    },
    getOperationalTimeLabel(item) {
      if (this.isObjectEmpty(item)) {
        return '-';
      }

      return `${DAY_MAP[item.day]} (Pukul ${item.start} - ${item.end})`;
    },
    isObjectEmpty(object) {
      return Object.keys(object).length === 0;
    },
  },
};
</script>
