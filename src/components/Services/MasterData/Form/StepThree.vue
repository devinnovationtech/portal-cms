<template>
  <fieldset>
    <Collapse
      title="Penanggung Jawab"
      class="mb-5"
    >
      <section class="grid grid-cols-2 gap-x-8 gap-y-4">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2"
          tag="div"
        >
          <label
            for="responsibleName"
            class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Nama Pejabat Penanggung Jawab
          </label>
          <JdsInputText
            id="responsibleName"
            v-model="responsibleName"
            placeholder="Masukkan Nama Pejabat Penanggung Jawab"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
          tag="div"
        >
          <label
            for="phoneNumber"
            class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Nomor HP
          </label>
          <JdsInputText
            id="phoneNumber"
            v-model="phoneNumber"
            placeholder="cth: 0812345678"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
          tag="div"
        >
          <label
            for="email"
            class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Alamat Email
          </label>
          <JdsInputText
            id="email"
            v-model="email"
            placeholder="cth: jabarprov@go.id"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </section>
    </Collapse>
    <Collapse
      title="Sosial Media"
      class="mb-5"
    >
      <section class="flex flex-col gap-4">
        <div
          v-for="(_,index) in socialMedias"
          :key="index"
          class="flex flex-col gap-8"
        >
          <ValidationProvider
            tag="div"
            class="flex flex-col col-span-2"
          >
            <label
              for="socialMedia"
              class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
            >
              Nama Sosial Media Layanan
            </label>
            <JdsInputText
              id="socialMedia"
              :value="socialMedias[index].name"
              placeholder="Masukkan Nama Sosial Media"
              @input="setSocialMediaName($event, index)"
            />
          </ValidationProvider>
          <ValidationProvider
            tag="div"
            class="flex flex-col col-span-2"
          >
            <JdsInputText
              :value="socialMedias[index].link"
              :prefix-text="socialMedias[index].type"
              :prefix-config="linkOptions"
              placeholder="https://"
              @change:prefix-text="changePrefix($event, index)"
              @input="setSocialMediaLink($event, index)"
            />
          </ValidationProvider>
          <div
            v-if="socialMedias.length > 1"
            class="flex flex-row justify-end mb-4"
          >
            <BaseButton
              type="button"
              class="bg-white font-lato text-sm border-red-700 hover:bg-red-50 focus:bg-red-50 focus:shadow-[inset_0px_0px_0px_1px_rgba(255,200,0,1)]"
              @click="removeSocialMedia(index)"
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
                Hapus Layanan
              </p>
            </BaseButton>
          </div>
        </div>
        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
            @click="addSocialMedia"
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
        <div
          v-show="socialMedias.length <= 1"
          class="h-[130px] col-span-2"
        />
      </section>
    </Collapse>
  </fieldset>
</template>

<script>
import '@/common/helpers/vee-validate.js';
import { ValidationProvider } from 'vee-validate';
import BaseButton from '@/common/components/BaseButton';
import Collapse from '@/common/components/Collapse';

export default {
  components: {
    BaseButton,
    Collapse,
    ValidationProvider,
  },
  data() {
    return {
      linkOptions: {
        valueKey: 'value',
        labelKey: 'label',
        options: [
          {
            value: 'FACEBOOK',
            label: 'Facebook',
          },
          {
            value: 'INSTAGRAM',
            label: 'Intragram',
          },
          {
            value: 'TWITTER',
            label: 'Twitter',
          },
          {
            value: 'YOUTUBE',
            label: 'Youtube',
          },
        ],
      },
    };
  },
  computed: {
    responsibleName: {
      get() {
        return this.$store.state.masterDataForm.stepThree.additional_information.responsible_name;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_RESPONSIBLE_NAME', value);
      },
    },
    phoneNumber: {
      get() {
        return this.$store.state.masterDataForm.stepThree.additional_information.phone_number;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_PHONE_NUMBER', value);
      },
    },
    email: {
      get() {
        return this.$store.state.masterDataForm.stepThree.additional_information.email;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_EMAIL', value);
      },
    },
    socialMedias() {
      return this.$store.state.masterDataForm.stepThree.additional_information.social_media;
    },
  },
  methods: {
    setSocialMediaName(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA_NAME', { value, index });
    },
    changePrefix(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA_TYPE', { value, index });
    },
    setSocialMediaLink(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA_LINK', { value, index });
    },
    addSocialMedia() {
      this.$store.commit('masterDataForm/ADD_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA');
    },
    removeSocialMedia(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_THREE_ADDITIONAL_INFORMATION_SOCIAL_MEDIA', index);
    },
  },
};
</script>
