<template>
  <JdsSimpleTable
    class="!table-auto"
    data-cy="documents-detail__table"
  >
    <thead>
      <tr>
        <th
          id="documents-info-detail"
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
          Arsip Dokumen
        </td>
        <td
          :class="{
            'w-full font-lato text-blue-gray-500 font-bold  text-sm': true,
            'underline hover:cursor-pointer': isHasFile,
          }"
        >
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <a
            v-else
            data-cy="documents-detail__file-name"
            @click="$emit('download', document.source)"
          >
            {{ getDocumentName() }}
          </a>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Judul
        </td>
        <td class="w-full font-lato text-blue-gray-500 text-sm">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <p
            v-else
            data-cy="documents-detail__title"
          >
            {{ document.title || '-' }}
          </p>
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
          <p
            v-else
            data-cy="documents-detail__description"
          >
            {{ document.description || '-' }}
          </p>
        </td>
      </tr>
      <tr>
        <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
          Kategori
        </td>
        <td class="w-full font-lato text-xs">
          <div
            v-if="loading"
            class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
          />
          <p
            v-else
            data-cy="documents-detail__category"
            class="py-1 px-2 rounded-md bg-gray-100 text-gray-600 w-fit"
          >
            {{ document.category || '-' }}
          </p>
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
            data-cy="documents-detail__last-update"
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
  name: 'DocumentsDetailTable',
  props: {
    document: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    lastUpdate() {
      const updateDate = formatDate(this.document?.updated_at, 'dd/MM/yyyy - HH:mm');
      if (this.document?.updated_at) {
        return `Terakhir disimpan pada: ${updateDate}`;
      }
      return '-';
    },
    isHasFile() {
      return this.document?.source && this.document?.mimetype;
    },
  },
  methods: {
    getDocumentName() {
      if (this.isHasFile) {
        return this.document?.source.substring(this.document?.source.lastIndexOf('/') + 1);
      }

      return '-';
    },
  },
};
</script>
