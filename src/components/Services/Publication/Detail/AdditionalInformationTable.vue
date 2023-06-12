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
              Informasi Berita
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
              Keyword Berita
            </td>
            <td class="w-full font-lato text-blue-gray-500 text-sm">
              <template v-if="additionalInformation.keywords.length > 0">
                <div class="flex flex-row flex-wrap gap-4 w-full h-full">
                  <div
                    v-for="(keyword, index) in additionalInformation.keywords"
                    :key="index"
                  >
                    <div class="flex flex-row gap-x-1.5 w-fit h-fit pl-[10px] py-[6.5px] pr-[6.5px] rounded-full bg-gray-200">
                      <span class="text-gray-700 text-[14px] leading-[17px] font-lato font-normal">{{ keyword }}</span>
                    </div>
                  </div>
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
      v-if="isFaqActive"
      class="overflow-hidden rounded-lg border border-gray-200"
    >
      <JdsSimpleTable>
        <thead>
          <tr>
            <th
              colspan="2"
              class="font-roboto text-sm"
            >
              Frequently Asked Question
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="hasFaq">
            <template v-for="(item, index) in additionalInformation.faq.Items">
              <tr
                :key="`question-${index}`"
              >
                <td class="min-w-[280px] font-lato text-green-700 font-bold text-sm">
                  Pertanyaan ke {{ index + 1 }}
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  {{ item.question || '-' }}
                </td>
              </tr>
              <tr
                :key="`answer-${index}`"
              >
                <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                  Jawaban ke {{ index + 1 }}
                </td>
                <td class="w-full font-lato text-blue-gray-500 text-sm">
                  {{ item.answer || '-' }}
                </td>
              </tr>
            </template>
          </template>

          <template v-else>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Pertanyaan
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                -
              </td>
            </tr>
            <tr>
              <td class="min-w-[280px] font-lato text-blue-gray-500 font-bold text-sm">
                Jawaban
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                -
              </td>
            </tr>
          </template>
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
    hasFaq() {
      return Array.isArray(this.additionalInformation.faq.Items) && this.additionalInformation.faq.Items.length > 0;
    },
    isFaqActive() {
      return this.tableData.additional_information.faq.is_active === 1;
    },
  },
};
</script>
