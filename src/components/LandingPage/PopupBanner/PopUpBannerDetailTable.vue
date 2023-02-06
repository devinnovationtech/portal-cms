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
            {{ title }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Judul Button
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div v-else>
            {{ titleButton }}
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
              'underline text-blue-gray-500 font-bold' : link !== '-',
              'pointer-events-none' : link === '-'
            }"
            :href="link === '-' ? '' : link"
            target="_blank"
          >
            {{ link }}
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
            {{ status }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Durasi Penayangan
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <div v-else>
            {{ duration }}
          </div>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Waktu Penayangan
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/5 rounded-lg animate-pulse bg-gray-200"
          />
          <div v-else>
            {{ broadcastTime }}
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
            {{ lastUpdate }}
          </div>
        </td>
      </tr>
    </tbody>
  </JdsSimpleTable>
</template>

<script>
import { formatDate, getHour, getMinute } from '@/common/helpers/date';

export default {
  name: 'PopUpBannerDetailTable',
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
  computed: {
    title() {
      return this.banner?.title || '-';
    },
    titleButton() {
      return this.banner?.button_label || '-';
    },
    link() {
      return this.banner?.link || '-';
    },
    status() {
      let bannerStatus;
      switch (this.banner?.status) {
        case ('ACTIVE'):
          bannerStatus = 'Aktif';
          break;
        case ('NON-ACTIVE'):
          bannerStatus = 'Tidak Aktif';
          break;
        default:
          bannerStatus = '-';
      }
      return bannerStatus;
    },
    duration() {
      const duration = this.banner?.duration || null;
      if (duration && duration !== -1) {
        return `${duration} hari`;
      }

      return 'Tanpa batas waktu';
    },
    broadcastTime() {
      const startDate = formatDate(this.banner?.start_date);
      const endDate = formatDate(this.banner?.end_date);

      if (this.banner?.duration === -1) {
        return `${startDate} - selesai`;
      }
      return `${startDate} - ${endDate}`;
    },
    lastUpdate() {
      const updateDate = formatDate(this.banner?.updated_at);
      const hour = getHour(this.banner?.updated_at);
      const minute = getMinute(this.banner?.updated_at);
      if (this.banner?.updated_at) {
        return `Terakhir disimpan pada: ${updateDate} - ${hour}:${minute}`;
      }
      return '-';
    },
  },
};
</script>
