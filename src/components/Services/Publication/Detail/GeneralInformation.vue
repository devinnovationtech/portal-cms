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
              General
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Logo Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <img
                v-if="!!defaultInformation.logo.file_download_uri"
                :src="defaultInformation.logo.file_download_uri"
                :alt="defaultInformation.logo.file_name"
                width="55"
                height="40"
              >
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Nama Perangkat Daerah
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.opd_name || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Bentuk Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.service_form || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Nama Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.service_name || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-[12px] leading-[23px]">
              Deskripsi Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.description || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Pengguna Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.service_user || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Nama Program Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.program_name || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Kategori Layanan Portal Jabarprovgoid
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.portal_category || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Status Operasional
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <div
                class="w-fit font-lato text-[12px] leading-[23px] capitalize"
                :class="{
                  'bg-green-50 text-green-700 px-[10px] rounded-[5px] font-bold ' : operationalStatus.value === 'ACTIVE',
                  'bg-gray-200 text-gray-600 px-[10px] rounded-[5px] font-bold ' : operationalStatus.value === 'NOT-ACTIVE'
                }"
              >
                <span>{{ operationalStatus.label || '-' }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Teknis Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <div
                class="w-fit flex items-center font-lato text-[12px] leading-[23px]"
                :class="{
                  'bg-blue-50 px-[10px] rounded-[5px] font-bold text-blue-800' : defaultInformation.technical === 'ONLINE',
                  'bg-gray-200 text-gray-600 px-[10px] rounded-[5px] font-bold ' : defaultInformation.technical === 'OFFLINE'
                }"
              >
                <span
                  v-show="defaultInformation.technical"
                  :class="{
                    'w-2 h-2 mr-2 rounded-full': true,
                    'bg-blue-800': defaultInformation.technical === 'ONLINE',
                    'bg-gray-600': defaultInformation.technical === 'OFFLINE',
                  }"
                />
                <span class="capitalize">{{ (defaultInformation.technical && defaultInformation.technical.toLowerCase()) || '-' }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Judul Manfaat Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.benefit_title || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Manfaat Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <template v-if="hasBenefits">
                <div
                  v-for="(benefit, index) in defaultInformation.benefits"
                  :key="`benefit-${index}`"
                  class="mb-1 flex flex-row gap-2"
                >
                  <span class="leading-[23px]">{{ index + 1 }}.</span>
                  <img
                    :src="benefit.image.file_download_uri"
                    :alt="benefit.name"
                    width="60"
                    height="40"
                  >
                  <span class="leading-[23px]">{{ benefit.name }}</span>
                </div>
              </template>
              <template v-else>
                <span>-</span>
              </template>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Judul Fasilitas Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ defaultInformation.facility_title }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Fasilitas Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <template v-if="hasFacilities">
                <div
                  v-for="(facility, index) in defaultInformation.facilities"
                  :key="`benefit-${index}`"
                  class="mb-1 flex flex-row gap-2"
                >
                  <span class="leading-[23px]">{{ index + 1 }}.</span>
                  <img
                    :src="facility.image.file_download_uri"
                    :alt="facility.name"
                    width="60"
                    height="40"
                  >
                  <span class="leading-[23px]">{{ facility.name }}</span>
                </div>
              </template>
              <template v-else>
                <span>-</span>
              </template>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Kustomisasi URL Informasi Layanan Portal Jabar
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ 'http://www.jabarprov.go.id/layanan/' + defaultInformation.slug || '-' }}
            </td>
          </tr>
        </tbody>
      </JdsSimpleTable>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    defaultInformation() {
      return this.tableData.default_information;
    },
    operationalStatus() {
      if (this.tableData.default_information.operator_status === null) {
        return { value: null, label: '-' };
      }

      if (this.tableData.default_information.operator_status === 'ACTIVE') {
        return { value: 'ACTIVE', label: 'Aktif' };
      }

      return { value: 'NOT-ACTIVE', label: 'Tidak Aktif' };
    },
    hasBenefits() {
      return this.tableData.default_information.benefits.length > 0
      && this.tableData.default_information.benefits.every((item) => item.name !== undefined);
    },
    hasFacilities() {
      return this.tableData.default_information.facilities.length > 0
      && this.tableData.default_information.facilities.every((item) => item.name !== undefined);
    },
  },
};
</script>
