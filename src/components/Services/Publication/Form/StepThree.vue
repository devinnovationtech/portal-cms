<template>
  <ValidationObserver ref="formStepThree">
    <fieldset>
      <Collapse
        title="Informasi Berita"
        class="mb-4"
      >
        <ValidationProvider
          v-slot="{ errors }"
          ref="keywordNewsValidator"
          tag="div"
          class="flex flex-col gap-y-4 col-span-2"
        >
          <label
            for="keywordNews"
            class="font-lato font-bold text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
          >
            Keyword Berita
          </label>
          <input
            id="keywordNews"
            ref="keywordsNews"
            class="w-full h-[38px] px-2 py-1 font-lato bg-gray-50 rounded-lg border border-gray-500
            focus:border-green-500 focus:outline-none focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500 hover:border-green-600 hover:bg-white disabled:bg-gray-200 placeholder:text-gray-600"
            placeholder="Tambahkan keyword lalu tekan 'enter'"
            :error-message="errors[0]"
            @keyup.enter="addKeyword($event.target.value)"
          >
          <div class="flex flex-row flex-wrap gap-4 w-full h-full p-4 border border-gray-200 rounded-lg">
            <div
              v-for="(keyword, index) in keywordNews"
              :key="index"
            >
              <div class="flex flex-row gap-x-1.5 w-fit h-fit pl-[10px] py-[6.5px] pr-[6.5px] rounded-full bg-gray-200">
                <span class="text-gray-700 text-[14px] leading-[17px] font-lato font-normal">{{ keyword }}</span>
                <JdsIcon
                  name="times"
                  size="14px"
                  class="text-gray-500 w-4 h-4 items-center"
                  @click="removeKeyowrd(index)"
                />
              </div>
            </div>
          </div>

          <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
        </ValidationProvider>
      </Collapse>

      <Collapse class="mb-4">
        <template #header>
          <div class="flex">
            <JdsToggle
              v-model="isFaq"
              class="mr-3"
            />
            <h2 class="font-roboto font-medium text-base leading-7 text-blue-gray-800 mr-3">
              Frequently Asked Question
            </h2>
            <span
              :class="{
                'text-[11px] leading-[28px] h-[32px] rounded-lg px-3 py-[3px] font-bold italic' : true,
                'bg-green-100 text-green-700' : isFaq,
                'bg-gray-300 text-gray-700' : !isFaq
              } "
            >
              {{ FaqText }}
            </span>
          </div>
        </template>

        <section>
          <h3 class="font-lato font-bold text-blue-gray-800 mb-3 text-[15px] leading-[23px]">
            Frequently Asked Question
          </h3>

          <div
            v-for="(_,index) in faqItems"
            :key="index"
            class="mb-4"
          >
            <div class="col-span-2 flex flex-row gap-x-4 pb-4">
              <p class="self-start font-roboto text-blue-gray-800 font-medium text-[16px] leading-[26px]">
                {{ index + 1 }}.
              </p>
              <ValidationProvider
                v-slot="{ errors }"
                class="w-full"
                tag="div"
              >
                <label class="font-lato font-normal text-blue-gray-800 mb-3 text-[15px]">
                  Pertanyaan
                </label>
                <textarea
                  :disabled="!isFaq"
                  :value="faqItems[index].question"
                  placeholder="Masukkan pertanyaan FAQ"
                  rows="4"
                  maxlength="255"
                  class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
            hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  @input="setQuestion($event.target.value, index)"
                />
                <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
                <p
                  v-show="true"
                  class="text-xs text-right text-gray-600"
                >
                  Tersisa {{ 255 - faqItems[index].question.length }} karakter
                </p>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                class="w-full"
                tag="div"
              >
                <label class="font-lato font-normal text-blue-gray-800 mb-3 text-[15px] pb-2">
                  Jawaban
                </label>
                <textarea
                  :disabled="!isFaq"
                  :value="faqItems[index].answer"
                  placeholder="Masukkan jawaban FAQ"
                  rows="4"
                  maxlength="500"
                  class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
            hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  @input="setAnswer($event.target.value, index)"
                />
                <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
                <p
                  v-show="true"
                  class="text-xs text-right text-gray-600"
                >
                  Tersisa {{ 500 - faqItems[index].answer.length }} karakter
                </p>
              </ValidationProvider>
            </div>
            <div
              v-if="faqItems.length > 1"
              class="col-span-2 flex justify-end"
            >
              <BaseButton
                :disabled="!isFaq"
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
                @click="removeFaq(index)"
              >
                <span>
                  Hapus Pertanyaan
                </span>
                <template #icon-right>
                  <JdsIcon
                    name="trash"
                    size="16px"
                    :fill="isFaq ? '#F44336' : '#757575'"
                  />
                </template>
              </BaseButton>
            </div>
          </div>

          <div class="flex justify-end col-span-2">
            <BaseButton
              :disabled="!isFaq"
              type="button"
              class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
              @click="addFaq"
            >
              <span>
                Tambahkan Pertanyaan
              </span>
              <template #icon-right>
                <JdsIcon
                  name="plus"
                  size="16px"
                  :fill="isFaq ? '#069550' : '#757575'"
                />
              </template>
            </BaseButton>
          </div>
        </section>
      </Collapse>
    </fieldset>
  </validationobserver>
</template>

<script>
import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import BaseButton from '@/common/components/BaseButton';
import Collapse from '@/common/components/Collapse';

export default {
  components: {
    BaseButton,
    Collapse,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return { };
  },
  computed: {
    keywordNews() {
      return this.$store.state.publicationForm.stepThree.additional_information.keywords;
    },
    isFaq: {
      get() {
        return this.$store.state.publicationForm.stepThree.additional_information.faq.is_active === 1;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_IS_ACTIVE', value);
      },
    },
    FaqText() {
      return this.isFaq ? 'Konten Aktif' : 'Konten Tidak Aktif';
    },
    faqItems() {
      return this.$store.state.publicationForm.stepThree.additional_information.faq.items;
    },
  },
  deactivated() {
    // Trigger validation message when component deactivated
    this.$refs.formStepThree.validate();
    this.validateKeywordNews();
  },
  methods: {
    addFaq() {
      this.$store.commit('publicationForm/ADD_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEMS');
    },
    removeFaq(index) {
      this.$store.commit('publicationForm/REMOVE_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEMS', index);
    },
    setQuestion(value, index) {
      this.$store.commit('publicationForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEM_QUESTION', { value, index });
    },
    setAnswer(value, index) {
      this.$store.commit('publicationForm/SET_STEP_THREE_ADDITIONAL_INFORMATION_FAQ_ITEM_ANSWER', { value, index });
    },
    addKeyword(value) {
      this.$store.commit('publicationForm/ADD_STEP_THREE_ADDITIONAL_INFORMATION_KEYWORDS', value);
      this.$refs.keywordsNews.value = '';

      this.validateKeywordNews();
    },
    removeKeyowrd(index) {
      this.$store.commit('publicationForm/REMOVE_STEP_THREE_ADDITIONAL_INFORMATION_KEYWORDS', index);

      this.validateKeywordNews();
    },
    validateKeywordNews() {
      this.$refs.keywordNewsValidator.validate(this.keywordNews);
    },
  },
};
</script>

<style>

</style>
