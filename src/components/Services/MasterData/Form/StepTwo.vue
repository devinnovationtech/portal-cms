<template>
  <fieldset>
    <section
      v-if="isShowForm"
      class="application__form border border-gray-300 rounded-xl h-full w-full px-[10px] py-3"
    >
      <h2 class="font-roboto font-medium text-blue-gray-800 text-[16px] leading-[28px] pb-7">
        Aplikasi
      </h2>
      <section>
        <div class="flex flex-col gap-[6px] mb-4">
          <label class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800">
            Status Ketersediaan Aplikasi
          </label>
          <JdsSelect
            :options="status"
            placeholder="Pilih Ketersediaan Aplikasi"
          />
        </div>
        <div class="flex flex-col gap-[6px]">
          <label
            class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
            for="application-name"
          >
            Nama Aplikasi
          </label>
          <JdsInputText
            id="application-name"
            placeholder="Nama Aplikasi"
          />
        </div>
      </section>
      <hr class="w-full h-[2px] bg-gray-300 my-[32px]">
      <section>
        <h3 class="font-roboto font-medium text-green-700 text-[16px] leading-[26px] pb-4">
          1. Fitur Aplikasi
        </h3>
        <div class="flex flex-col gap-[6px] mb-4">
          <label
            class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
            for="application-feature"
          >
            Fitur Aplikasi
          </label>
          <JdsInputText
            id="application-feature"
            placeholder="Masukkan fitur aplikasi"
          />
        </div>
        <div class="flex flex-col gap-[6px] mb-4">
          <label
            class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
            for="application-feature"
          >
            Deskripsi Fitur Aplikasi
          </label>
          <JdsTextArea
            id="application-feature"
            placeholder="Masukkan deskripsi"
          />
          <p class="text-xs text-gray-600 text-right">
            Tersisa 255 karakter
          </p>
        </div>
      </section>
      <div class="flex flex-row justify-end">
        <BaseButton
          type="button"
          class="bg-white font-lato text-sm border-green-700 hover:bg-green-50 focus:bg-green-50 focus:shadow-[inset_0px_0px_0px_1px_rgba(255,200,0,1)]"
        >
          <template #icon-right>
            <JdsIcon
              name="plus-bold"
              size="16px"
              fill="#069550"
              class="h-4 w-4"
            />
          </template>
          <p class="text-green-700 ">
            Tambahkan Fitur Aplikasi
          </p>
        </BaseButton>
      </div>
    </section>
    <section
      v-else
      class="h-[557px] flex flex-col items-center gap-8"
    >
      <img
        src="@/assets/images/ilustrasi-layanan-master-data-offline.svg"
        width="355"
        height="315"
        alt=""
        class="pt-[92px]"
      >
      <p class="font-lato font-medium text-[14px] leading-[23px] text-center">
        Layanan anda bersifat offline anda tidak memiliki <br> <span class="text-green-700">Aplikasi layanan</span>
      </p>
    </section>
  </fieldset>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      // @TODO: isShowForm is temporarly use, it will replace based on teknis layanan in form one
      isShowForm: false,
      status: [
        {
          label: 'Tersedia',
          value: 'Tersedia',
        },
        {
          label: 'Tidak Tersedia',
          value: 'Tidak Tersedia',
        },
      ],

    };
  },
};
</script>

<style>
/* Custom style for jds-text-area */

.application__form .jds-text-area__input-wrapper > textarea {
  border: 1px solid #9E9E9E;
}
.application__form .jds-text-area__input-wrapper > textarea:hover {
  border: 1px solid #16a34a;
}

/* Custom style for jds-select */

.application__form .jds-popover__content {
  z-index: 10 !important;
}
.application__form .jds-select,
.application__form .jds-popover__activator,
.application__form .jds-input-text {
  width: 100% !important;
}

</style>
