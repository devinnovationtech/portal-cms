<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <JdsSimpleTable>
      <thead>
        <tr>
          <th
            id="generalService"
            colspan="2"
            class="!font-roboto !text-sm"
          >
            Informasi Layanan
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            headers="generalService"
            class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm"
          >
            Status Ketersediaan Aplikasi
          </td>
          <td
            headers="generalService"
            class="w-full font-lato"
          >
            <p
              :class="{
                'w-fit font-bold text-[12px] leading-[23px]': true,
                'px-4 py-[2px] bg-[#F2ECFA] text-[#49148C] rounded-[6px]' : applicationStatus === 'Tersedia',
                'px-4 py-[2px] bg-gray-200 text-gray-600 rounded-[6px]' : applicationStatus === 'Tidak Tersedia'
              }"
            >
              {{ applicationStatus }}
            </p>
          </td>
        </tr>
        <tr>
          <td
            headers="generalService"
            class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm"
          >
            Nama Aplikasi
          </td>
          <td
            headers="generalService"
            class="w-full font-lato text-blue-gray-500 text-sm"
          >
            {{ application.name || '-' }}
          </td>
        </tr>
        <template v-if="hasFeature">
          <template v-for="(feature, index) in application.features">
            <tr
              :key="`nama-${index}`"
            >
              <td
                headers="generalService"
                class="min-w-[228px] font-lato text-green-700 font-bold text-sm"
              >
                Fitur Aplikasi ke {{ index + 1 }}
              </td>
              <td
                headers="generalService"
                class="w-full font-lato text-blue-gray-500 text-sm"
              >
                {{ feature.name || '-' }}
              </td>
            </tr>
            <tr
              :key="`deskripsi-${index}`"
            >
              <td
                headers="generalService"
                class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm"
              >
                Deskripsi Fitur Aplikasi
              </td>
              <td
                headers="generalService"
                class="w-full font-lato text-blue-gray-500 text-sm"
              >
                {{ feature.description || '-' }}
              </td>
            </tr>
          </template>
        </template>
        <template v-else>
          <tr>
            <td
              headers="generalService"
              class="min-w-[228px] font-lato text-green-700 font-bold text-sm"
            >
              Fitur Aplikasi ke 1
            </td>
            <td
              headers="generalService"
              class="w-full font-lato text-blue-gray-500 text-sm"
            >
              -
            </td>
          </tr>
          <tr>
            <td
              headers="generalService"
              class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm"
            >
              Deskripsi Fitur Aplikasi
            </td>
            <td
              headers="generalService"
              class="w-full font-lato text-blue-gray-500 text-sm"
            >
              -
            </td>
          </tr>
        </template>
      </tbody>
    </JdsSimpleTable>
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
    application() {
      return this.tableData.application;
    },
    applicationStatus() {
      switch (this.application.status) {
        case 'AVAILABLE':
          return 'Tersedia';
        case 'NOT-AVAILABLE':
          return 'Tidak Tersedia';
        default:
          return '-';
      }
    },
    hasFeature() {
      return Array.isArray(this.application.features) && this.application.features.length > 0;
    },
  },
};
</script>
