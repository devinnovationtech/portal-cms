<template>
  <JdsSimpleTable
    class="!table-auto"
    data-cy="quick-link-detail__container"
  >
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
          Judul Akses
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div
            v-else
            data-cy="quick-link-detail__title"
          >
            {{ title }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Deskripsi
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div
            v-else
            data-cy="quick-link-detail__sequence"
          >
            {{ description }}
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
            v-else-if="link"
            class="font-lato text-[12px] leading-[23px]"
            :class="{
              'underline text-blue-gray-500 font-bold' : true,
              'pointer-events-none' : false
            }"
            :href="link"
            target="_blank"
            data-cy="quick-link-detail__link"
          >
            {{ link }}
          </a>
          <span v-else>
            -
          </span>
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
            data-cy="quick-link-detail__status"
          >
            {{ status }}
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
          <div
            v-else
            data-cy="quick-link-detail__last-update"
          >
            {{ lastUpdate }}
          </div>
        </td>
      </tr>
    </tbody>
  </JdsSimpleTable>
</template>

<script>
import { formatDate } from '@/common/helpers/date';

export default {
  name: 'QuickLinkDetailTable',
  props: {
    quickLink: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      return this.quickLink?.title || '-';
    },
    description() {
      return this.quickLink?.description || '-';
    },
    link() {
      return this.quickLink?.link;
    },
    status() {
      if (this.quickLink.is_active) {
        return 'Aktif';
      }
      return 'Tidak Aktif';
    },
    lastUpdate() {
      const updateDate = formatDate(this.quickLink?.updated_at, 'dd/MM/yyyy - HH:mm');
      if (this.quickLink?.updated_at) {
        return `Terakhir disimpan pada: ${updateDate}`;
      }
      return '-';
    },
  },
};
</script>
