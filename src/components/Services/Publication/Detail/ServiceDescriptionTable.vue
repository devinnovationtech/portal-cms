<template>
  <div class="flex flex-col gap-y-4">
    <div class="overflow-hidden rounded-lg border border-gray-200">
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
              Cover Gambar
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="(!!serviceDescription.cover.image.file_download_uri && !!serviceDescription.cover.video)">
                <img
                  v-if="!!serviceDescription.cover.image.file_download_uri"
                  :src="serviceDescription.cover.image.file_download_uri"
                  :alt="serviceDescription.cover.image.file_name"
                  width="55"
                  height="40"
                >
                <a
                  v-else
                  target="_blank"
                  :href="serviceDescription.cover.video"
                  rel="noopener noreferrer"
                  class="hover:underline"
                >
                  {{ serviceDescription.cover.video || '-' }}
                </a>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Gambar Konten
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm flex flex-row gap-2">
              <template v-if="serviceDescription.images.length > 0">
                <div
                  v-for="(item, index) in serviceDescription.images"
                  :key="`images-${index}`"
                >
                  <img
                    :src="item.file_download_uri"
                    :alt="item.file_name"
                    width="55"
                    height="40"
                  >
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Judul Syarat Dan Ketentuan Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ serviceDescription.terms_and_conditions.title || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-[12px] leading-[23px]">
              Syarat dan Ketentuan Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="!!serviceDescription.terms_and_conditions.items">
                <div
                  v-for="(item, index) in serviceDescription.terms_and_conditions.items"
                  :key="`images-${index}`"
                >
                  <p class="inline">
                    {{ index + 1 + '. ' + item.name + '.' || '-' }}
                  </p>
                  <a
                    v-if="!!item.link"
                    :href="item.link"
                    target="_blank"
                    class="text-[#1E88E5]"
                  >
                    Link
                    <LinkIcon class="w-4 h-4 fill-[#1E88E5] inline" />
                  </a>
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Cover Gambar Syarat dan Ketentuan Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <img
                v-if="!!serviceDescription.terms_and_conditions.cover.file_download_uri"
                :src="serviceDescription.terms_and_conditions.cover.file_download_uri"
                :alt="serviceDescription.terms_and_conditions.cover.file_name"
                width="55"
                height="40"
              >
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Judul Alur atau Prosedur Penggunaan Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ serviceDescription.service_procedures.title || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Alur atau Prosedur Penggunaan Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="!!serviceDescription.service_procedures.items">
                <div
                  v-for="(item, index) in serviceDescription.service_procedures.items"
                  :key="`images-${index}`"
                >
                  <p class="inline">
                    {{ index + 1 + '. ' + item.name + '.' || '-' }}
                  </p>
                  <a
                    v-if="!!item.link"
                    :href="item.link"
                    target="_blank"
                    class="text-[#1E88E5]"
                  >
                    Link
                    <LinkIcon class="w-4 h-4 fill-[#1E88E5] inline" />
                  </a>
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Cover Gambar Alur atau Prosedur Penggunaan Layanan
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              <img
                v-if="!!serviceDescription.service_procedures.cover.file_download_uri"
                :src="serviceDescription.service_procedures.cover.file_download_uri"
                :alt="serviceDescription.service_procedures.cover.file_name"
                width="55"
                height="40"
              >
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Waktu Operasional
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="serviceDescription.operational_times.length > 0">
                <div
                  v-for="(item, index) in serviceDescription.operational_times"
                  :key="`operational-time-${index}`"
                  class="mb-1"
                >
                  <p>{{ getOperationalTimeLabel(item) }}</p>
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Kontak Hotline (NomorHP/Telp)
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ serviceDescription.hotline_number || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Kontak Hotline (Alamat E-mail)
            </td>
            <td class="font-lato text-blue-gray-500 text-sm">
              {{ serviceDescription.hotline_mail || '-' }}
            </td>
          </tr>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Infografis Terkait Layanan
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm flex flex-row gap-2">
              <template v-if=" serviceDescription.infographics.images.length > 0">
                <div
                  v-for="(item, index) in serviceDescription.infographics.images"
                  :key="`infographics-${index}`"
                >
                  <img
                    :src="item.file_download_uri"
                    :alt="item.file_name"
                    width="55"
                    height="40"
                  >
                </div>
              </template>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </JdsSimpleTable>
    </div>

    <div
      v-if="serviceDescription.locations.length > 0"
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
            v-for="(item, index) in serviceDescription.locations"
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

    <div class="overflow-hidden rounded-lg border border-gray-200">
      <JdsSimpleTable>
        <thead>
          <tr>
            <th
              colspan="2"
              class="font-roboto text-sm"
            >
              Aplikasi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
              Status Ketersediaan Aplikasi
            </td>
            <td class="w-full font-lato">
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
            <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
              Nama Aplikasi
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              {{ serviceDescription.application.name || '-' }}
            </td>
          </tr>
          <template v-if="hasFeature">
            <template v-for="(feature, index) in serviceDescription.application.features">
              <tr
                :key="`nama-${index}`"
              >
                <td class="min-w-[228px] font-lato text-green-700 font-bold text-sm">
                  Fitur Aplikasi ke {{ index + 1 }}
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  {{ feature.name || '-' }}
                </td>
              </tr>
              <tr
                :key="`deskripsi-${index}`"
              >
                <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                  Deskripsi Fitur Aplikasi
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  {{ feature.description || '-' }}
                </td>
              </tr>
            </template>
          </template>
          <template v-else>
            <tr>
              <td class="min-w-[228px] font-lato text-green-700 font-bold text-sm">
                Fitur Aplikasi ke 1
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                -
              </td>
            </tr>
            <tr>
              <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                Deskripsi Fitur Aplikasi
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                -
              </td>
            </tr>
          </template>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Tautan Layanan
            </td>
            <td class="w-full flex flex-wrap font-lato text-blue-gray-500 font-bold text-sm">
              <template v-if="serviceDescription.links.length">
                <div
                  v-for="(link, index) in serviceDescription.links"
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
                    :href="link.tautan"
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

    <div
      v-if="hasSocialMedia"
      class="overflow-hidden rounded-lg border border-gray-200"
    >
      <JdsSimpleTable>
        <thead>
          <tr>
            <th
              colspan="2"
              class="!font-roboto !text-sm"
            >
              Sosial Media
            </th>
          </tr>
        </thead>
        <tbody>
          <div
            v-for="(socialMedia, index) in serviceDescription.social_media"
            :key="`social-media-${index}`"
          >
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Nama Sosial Media
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                {{ socialMedia.name || '-' }}
              </td>
            </tr>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm capitalize">
                {{ socialMedia.type.toLowerCase() || '-' }}
              </td>
              <td class="w-full font-lato font-bold text-blue-gray-500 text-sm">
                <template v-if="!!socialMedia.link">
                  <a
                    :href="socialMedia.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline"
                  >
                    {{ socialMedia.link }}
                  </a>
                </template>
                <template v-else>
                  <span>-</span>
                </template>
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
import LinkIcon from '@/assets/icons/link.svg?inline';

export default {
  components: {
    LinkIcon,
  },
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    applicationStatus() {
      switch (this.serviceDescription.application.status) {
        case 'AVAILABLE':
          return 'Tersedia';
        case 'NOT-AVAILABLE':
          return 'Tidak Tersedia';
        default:
          return '-';
      }
    },
    serviceDescription() {
      return this.tableData.service_description;
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
    hasBenefits() {
      return this.tableData.services.benefits.length > 0
      && this.tableData.services.benefits.every((item) => item.name !== undefined);
    },
    hasFacilities() {
      return this.tableData.services.facilities.length > 0
      && this.tableData.services.facilities.every((item) => item.name !== undefined);
    },
    hasTermsAndConditions() {
      return this.tableData.services.terms_and_conditions.length > 0
      && this.tableData.services.terms_and_conditions.every((item) => item.name !== undefined);
    },
    hasServiceProcedures() {
      return this.tableData.services.service_procedures.length > 0
      && this.tableData.services.service_procedures.every((item) => item.name !== undefined);
    },
    hasSocialMedia() {
      return Array.isArray(this.serviceDescription.social_media) && this.serviceDescription.social_media.length > 0;
    },
    hasFeature() {
      return Array.isArray(this.serviceDescription.application.features) && this.serviceDescription.application.features.length > 0;
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
