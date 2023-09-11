<template>
  <div>
    <div class="overflow-hidden rounded-lg border border-gray-200 mb-4">
      <JdsSimpleTable>
        <thead>
          <tr>
            <th
              id="responsible"
              colspan="2"
              class="!font-roboto !text-sm"
            >
              Penanggung Jawab
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              headers="responsible"
              class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm"
            >
              Nama Pejabat Penanggung Jawab
            </td>
            <td
              headers="responsible"
              class="w-full font-lato text-blue-gray-500 text-sm"
            >
              {{ additionalInformation.responsible_name || '-' }}
            </td>
          </tr>
          <tr>
            <td
              headers="responsible"
              class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm"
            >
              Nomor HP
            </td>
            <td
              headers="responsible"
              class="w-full font-lato text-blue-gray-500 text-sm"
            >
              {{ additionalInformation.phone_number || '-' }}
            </td>
          </tr>
          <tr>
            <td
              headers="responsible"
              class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm"
            >
              Alamat Email
            </td>
            <td
              headers="responsible"
              class="w-full font-lato text-blue-gray-500 text-sm"
            >
              {{ additionalInformation.email || '-' }}
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
              id="socialMedia"
              colspan="2"
              class="!font-roboto !text-sm"
            >
              Sosial Media
            </th>
          </tr>
        </thead>
        <tbody>
          <div
            v-for="(socialMedia, index) in additionalInformation.social_media"
            :key="`social-media-${index}`"
          >
            <tr>
              <td
                headers="socialMedia"
                class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm"
              >
                Nama Sosial Media
              </td>
              <td
                headers="socialMedia"
                class="w-full font-lato text-blue-gray-500 text-sm"
              >
                {{ socialMedia.name || '-' }}
              </td>
            </tr>
            <tr>
              <td
                headers="socialMedia"
                class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm capitalize"
              >
                {{ socialMedia.type.toLowerCase() || '-' }}
              </td>
              <td
                headers="socialMedia"
                class="w-full font-lato font-bold text-blue-gray-500 text-sm"
              >
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
export default {
  name: 'AdditionalInformationTable',
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    additionalInformation() {
      return this.tableData.additional_information;
    },
    hasSocialMedia() {
      return Array.isArray(this.additionalInformation.social_media) && this.additionalInformation.social_media.length > 0;
    },
  },
};
</script>
