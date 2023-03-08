<template>
  <main class="pb-20">
    <form class="master-data__form">
      <HeaderMenu>
        <template #left-button>
          <BaseButton
            type="button"
            class="bg-red-400 hover:bg-red-600 font-lato text-sm text-white"
            @click="$router.back()"
          >
            <template #icon-left>
              <JdsIcon
                name="arrow-left"
                size="16px"
                fill="#fff"
                class="h-4 w-4"
              />
            </template>
            <p>
              Batalkan
            </p>
          </BaseButton>
        </template>
        <div class="flex gap-4">
          <BaseButton
            v-if="!isFirstStep"
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
            @click="goToPrevStep"
          >
            <span>
              Sebelumnya
            </span>
          </BaseButton>
          <BaseButton
            v-if="!isLastStep"
            type="button"
            class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
            @click="goToNextStep"
          >
            <span>
              Simpan & Lanjutkan
            </span>
          </BaseButton>
          <BaseButton
            v-if="isLastStep"
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          >
            <span>
              Simpan
            </span>
          </BaseButton>
          <BaseButton
            v-if="isLastStep"
            type="button"
            class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
            :disabled="invalid"
          >
            <span>
              Tambahkan Layanan
            </span>
          </BaseButton>
        </div>
      </HeaderMenu>

      <section class="w-full h-full bg-white rounded-lg p-6">
        <MasterDataFormStepper />
        <keep-alive>
          <component
            :is="renderedForm"
            :current-form-step="currentFormStep"
          />
        </keep-alive>
      </section>
    </form>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu.vue';
import BaseButton from '@/common/components/BaseButton.vue';
import MasterDataFormStepper from '@/components/Services/MasterData/Form/Stepper.vue';

export default {
  components: {
    HeaderMenu,
    BaseButton,
    MasterDataFormStepper,
    StepOne: () => import('@/components/Services/MasterData/Form/StepOne'),
    StepTwo: () => import('@/components/Services/MasterData/Form/StepTwo'),
    StepThree: () => import('@/components/Services/MasterData/Form/StepThree'),
  },
  computed: {
    currentFormStep() {
      return this.$store.getters['masterDataForm/currentFormStep'];
    },
    isFirstStep() {
      return this.$store.getters['masterDataForm/isFirstStep'];
    },
    isLastStep() {
      return this.$store.getters['masterDataForm/isLastStep'];
    },
    renderedForm() {
      switch (this.currentFormStep) {
        case 1:
          return 'StepOne';
        case 2:
          return 'StepTwo';
        case 3:
          return 'StepThree';
        default:
          return null;
      }
    },
  },
  mounted() {
    this.$store.dispatch('masterDataForm/resetFormData');
    this.$store.dispatch('masterDataForm/getGovernmentAffairOptions');
    this.$store.dispatch('masterDataForm/getRALOptions');
  },
  methods: {
    goToNextStep() {
      this.$store.dispatch('masterDataForm/nextStep');
    },
    goToPrevStep() {
      this.$store.dispatch('masterDataForm/previousStep');
    },
  },
};
</script>

<style>
/**
 * Override default Jds-Select styling
 */
.master-data__form .jds-popover__activator,
.master-data__form .jds-select,
.master-data__form .jds-input-text {
  width: 100% !important;
}

.master-data__form .jds-popover__content {
  z-index: 10 !important;
  background-color: white !important;
}

.master-data__form .jds-options__option-list {
  max-height: 235px !important;
}

.master-data__form .jds-text-area__input-wrapper > textarea {
  border: 1px solid #9E9E9E;
}
.master-data__form .jds-text-area--error .jds-text-area__input-wrapper > textarea {
  border: 1px solid #D32F2F !important;
}

.master-data__form .jds-text-area__input-wrapper > textarea:hover {
  border: 1px solid #16a34a;
}
</style>
