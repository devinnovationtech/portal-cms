<template>
  <fieldset>
    <Collapse
      title="Penanggung Jawab"
      class="mb-5"
    >
      <section class="grid grid-cols-2 gap-x-8 gap-y-4">
        <div class="flex flex-col col-span-2">
          <label
            for="employeeName"
            class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Nama Pejabat Penanggung Jawab
          </label>
          <JdsInputText
            id="employeeName"
            placeholder="Masukkan Nama Pejabat Penanggung Jawab"
          />
        </div>
        <div class="flex flex-col">
          <label
            for="phoneNumber"
            class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Nomor HP
          </label>
          <JdsInputText
            id="phoneNumber"
            placeholder="cth: 0812345678"
          />
        </div>
        <div class="flex flex-col">
          <label
            for="email"
            class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Alamat Email
          </label>
          <JdsInputText
            id="email"
            placeholder="cth: jabarprov@go.id"
          />
        </div>
      </section>
    </Collapse>
    <Collapse
      title="Sosial Media"
      class="mb-5"
    >
      <section class="flex flex-col gap-8">
        <div class="flex flex-col col-span-2">
          <label
            for="socialMedia"
            class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Nama Sosial Media Layanan
          </label>
          <JdsInputText
            id="socialMedia"
            placeholder="Masukkan Nama Sosial Media"
          />
        </div>
        <div class="flex flex-col col-span-2">
          <JdsInputText
            prefix-text="GOOGLE_FORM"
            :prefix-config="linkOptions"
            placeholder="https://"
          />
        </div>
        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          >
            <span>
              Tambahkan Sosial Media
            </span>
            <template #icon-right>
              <JdsIcon
                name="plus"
                size="16px"
                fill="#069550"
              />
            </template>
          </BaseButton>
        </div>
      </section>
    </Collapse>
  </fieldset>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import Collapse from '@/common/components/Collapse';

export default {
  components: {
    BaseButton,
    Collapse,
  },
  data() {
    return {
      linkOptions: {
        valueKey: 'value',
        labelKey: 'label',
        options: [
          {
            value: 'GOOGLE_FORM',
            label: 'Google Form',
          },
          {
            value: 'GOOGLE_PLAYSTORE',
            label: 'Playstore',
          },
          {
            value: 'APP_STORE',
            label: 'App Store',
          },
          {
            value: 'WEBSITE',
            label: 'Website',
          },
        ],
      },
    };
  },
};
</script>
