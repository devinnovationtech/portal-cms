<template>
  <ValidationObserver ref="formStepTwo">
    <fieldset>
      <section
        v-if="isShowForm"
        class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3"
      >
        <h2 class="font-roboto font-medium text-blue-gray-800 text-[16px] leading-[28px] pb-7">
          Aplikasi
        </h2>
        <section class="grid grid-cols-1 gap-4">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="flex flex-col gap-[6px] mb-4"
            tag="div"
          >
            <label class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800">
              Status Ketersediaan Aplikasi
            </label>
            <JdsSelect
              v-model="applicationStatus"
              :options="status"
              placeholder="Pilih Ketersediaan Aplikasi"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :rules="applicationStatus === 'NOT-AVAILABLE' ? null : 'required'"
            class="flex flex-col gap-[6px]"
            tag="div"
          >
            <label
              class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
              for="application-name"
            >
              Nama Aplikasi
            </label>
            <JdsInputText
              id="application-name"
              v-model="applicationName"
              placeholder="Nama Aplikasi"
              :error-message="errors[0]"
              :disabled="applicationStatus === 'NOT-AVAILABLE'"
            />
          </ValidationProvider>
        </section>
        <hr class="w-full h-[2px] bg-gray-300 my-[32px]">
        <section>
          <div
            v-for="(item,index) in applicationFeatures"
            :key="index"
          >
            <h3 class="font-roboto font-medium text-green-700 text-[16px] leading-[26px] pb-4">
              {{ index + 1 }}. Fitur Aplikasi
            </h3>
            <ValidationProvider
              v-slot="{ errors }"
              :rules="applicationStatus === 'NOT-AVAILABLE' ? null : 'required'"
              class="flex flex-col gap-[6px] mb-4"
              tag="div"
            >
              <label
                class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
                for="application-feature"
              >
                Fitur Aplikasi
              </label>
              <JdsInputText
                id="application-feature"
                :value="applicationFeatures[index].name"
                placeholder="Masukkan fitur aplikasi"
                :error-message="errors[0]"
                :disabled="applicationStatus === 'NOT-AVAILABLE'"
                @input="setNameFeature($event, index)"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              :rules="applicationStatus === 'NOT-AVAILABLE' ? null : 'required'"
              class="flex flex-col mb-4"
              tag="div"
            >
              <label
                class="font-lato font-normal text-[15px] leading-[23px] mb-3 text-blue-gray-800"
                for="application-feature"
              >
                Deskripsi Fitur Aplikasi
              </label>
              <textarea
                id="application-feature"
                class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
              hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500
              disabled:bg-gray-200 disabled:text-gray-400"
                :value="applicationFeatures[index].description"
                placeholder="Masukkan deskripsi"
                rows="4"
                maxlength="255"
                :disabled="applicationStatus === 'NOT-AVAILABLE'"
                @input="setDescriptionFeature($event.target.value, index)"
              />
              <p
                v-show="applicationFeatures[index].description"
                class="text-xs text-right text-gray-600"
              >
                Tersisa {{ applicationFeatures[index].description && 255 - applicationFeatures[index].description.length }} karakter
              </p>
              <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
            </ValidationProvider>
            <div
              v-if="applicationFeatures.length > 1"
              class="flex flex-row justify-end mb-4"
            >
              <BaseButton
                type="button"
                class="bg-white font-lato text-sm border-red-700 hover:bg-red-50 focus:bg-red-50 focus:shadow-[inset_0px_0px_0px_1px_rgba(255,200,0,1)]"
                @click="removeFeature(index)"
              >
                <template #icon-right>
                  <JdsIcon
                    name="trash"
                    size="16px"
                    fill="#F44336"
                    class="h-4 w-4"
                  />
                </template>
                <p class="text-red-500">
                  Hapus Fitur Aplikasi
                </p>
              </BaseButton>
            </div>
            <hr
              v-show="!(applicationFeatures[index] === applicationFeatures.slice(-1)[0])"
              class="w-full h-[2px] bg-gray-300 my-[32px]"
            >
          </div>
        </section>
        <div class="flex flex-row justify-end">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
            :disabled="applicationStatus === 'NOT-AVAILABLE'"
            @click="addNewFeature"
          >
            <template #icon-right>
              <JdsIcon
                name="plus-bold"
                size="16px"
                fill="#069550"
                class="h-4 w-4"
              />
            </template>
            <span>
              Tambahkan Fitur Aplikasi
            </span>
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
  </ValidationObserver>
</template>

<script>
import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import BaseButton from '@/common/components/BaseButton';

export default {
  components: {
    BaseButton,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      status: [
        {
          label: 'Tersedia',
          value: 'AVAILABLE',
        },
        {
          label: 'Tidak Tersedia',
          value: 'NOT-AVAILABLE',
        },
      ],

    };
  },
  computed: {
    isShowForm() {
      return this.$store.state.masterDataForm.stepOne.services.information.technical === 'ONLINE';
    },
    applicationStatus: {
      get() {
        return this.$store.state.masterDataForm.stepTwo.application.status;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_TWO_APPLICATION_STATUS', value);
      },
    },
    applicationName: {
      get() {
        return this.$store.state.masterDataForm.stepTwo.application.name;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_TWO_APPLICATION_NAME', value);
      },
    },
    applicationFeatures() {
      return this.$store.state.masterDataForm.stepTwo.application.features;
    },
  },
  deactivated() {
    // Trigger validation message when component deactivated
    this.$refs.formStepTwo.validate();
  },
  methods: {
    setNameFeature(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_TWO_APPLICATION_FEATURES_NAME', { value, index });
    },
    setDescriptionFeature(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_TWO_APPLICATION_FEATURES_DESCRIPTION', { value, index });
    },
    addNewFeature() {
      this.$store.commit('masterDataForm/ADD_STEP_TWO_APPLICATION_FEATURES');
    },
    removeFeature(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_TWO_APPLICATION_FEATURES', index);
    },
  },
};
</script>
