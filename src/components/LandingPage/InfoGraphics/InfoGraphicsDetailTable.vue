<template>
  <JdsSimpleTable class="!table-auto">
    <thead>
      <tr>
        <th
          colspan="2"
          class="!font-roboto !text-sm"
        >
          Info Detail
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Judul
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div v-else>
            Akses Sapawarga
          </div>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Urutan
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div v-else>
            1
          </div>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Link Redirect
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <a
            v-else
            class="font-lato text-[12px] leading-[23px]"
            :class="{
              'underline text-blue-gray-500 font-bold' : true,
              'pointer-events-none' : false
            }"
            href="https://google.com"
            target="_blank"
          >
            https://google.com
          </a>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-[12px] leading-[23px]">
          Status
        </td>
        <td class="w-full">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div
            v-else
            class="w-fit font-lato text-[12px] leading-[23px]"
            :class="{
              'bg-green-50 text-green-700 px-[10px] rounded-[5px] font-bold ' : status === 'Aktif',
              'bg-gray-200 text-gray-600 px-[10px] rounded-[5px] font-bold ' : status === 'Tidak Aktif'
            }"
          >
            Aktif
          </div>
        </td>
      </tr>
      <tr>
        <td class="font-lato text-blue-gray-500 font-bold text-sm">
          Update Terakhir
        </td>
        <td class="font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div v-else>
            Terakhir disimpan pada: 12/01/2022 - 15:00
          </div>
        </td>
      </tr>
    </tbody>
  </JdsSimpleTable>
</template>

<script>

export default {
  name: 'InfoGraphicsDetailTable',
  props: {
    banner: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: 'Aktif',
    };
  },
};
</script>
