<template>
  <main class="pb-20">
    <ValidationObserver
      ref="form"
      v-slot="{ invalid }"
    >
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
              @click="previousStep"
            >
              <span>
                Sebelumnya
              </span>
            </BaseButton>
            <BaseButton
              v-if="!isLastStep"
              type="button"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
              @click="nextStep"
            >
              <span>
                Simpan & Lanjutkan
              </span>
            </BaseButton>
            <BaseButton
              v-if="isLastStep"
              type="button"
              class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
              @click="openSaveConfirmation"
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
    </ValidationObserver>

    <!-- Confirmation Popup -->
    <BaseModal :open="submitStatus === 'SAVE_AS_DRAFT_CONFIRMATION'">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Tambahkan Layanan
        </h1>
        <div class="flex items-center gap-4">
          <p class="text-sm leading-6 to-blue-gray-800">
            Apakah Anda ingin menambah layanan ini?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="closeConfirmation"
          >
            Tidak
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="saveAsDraft"
          >
            Ya, tambahkan layanan
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Success/Error Message -->
    <BaseModal :open="submitStatus === 'SUCCESS' || submitStatus === 'ERROR'">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ submitMessage.title }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            :name="submitMessage.iconName"
            :class="submitMessage.iconClass"
          />
          <p class="text-sm leading-6 to-blue-gray-800">
            {{ submitMessage.message }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="handleCloseConfirmation"
          >
            Saya Mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu.vue';
import BaseButton from '@/common/components/BaseButton.vue';
import BaseModal from '@/common/components/BaseModal';
import MasterDataFormStepper from '@/components/Services/MasterData/Form/Stepper.vue';

import { mapActions, mapGetters } from 'vuex';
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    HeaderMenu,
    BaseButton,
    BaseModal,
    MasterDataFormStepper,
    StepOne: () => import('@/components/Services/MasterData/Form/StepOne'),
    StepTwo: () => import('@/components/Services/MasterData/Form/StepTwo'),
    StepThree: () => import('@/components/Services/MasterData/Form/StepThree'),
  },
  computed: {
    ...mapGetters('masterDataForm', [
      'currentFormStep',
      'isFirstStep',
      'isLastStep',
      'submitStatus',
      'submitMessage',
    ]),
    mode() {
      return this.$route.meta?.mode || 'create';
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
  watch: {
    currentFormStep() {
      this.$refs.form.validate();
    },
  },
  mounted() {
    this.$store.dispatch('masterDataForm/resetFormData');
    this.$store.dispatch('masterDataForm/getGovernmentAffairOptions');
    this.$store.dispatch('masterDataForm/getRALOptions');
    this.$store.dispatch('masterDataForm/getOrganizationOptions');

    if (this.mode === 'create') {
      this.$store.dispatch('masterDataForm/setInitialOPDName');
    }
  },
  methods: {
    ...mapActions('masterDataForm', [
      'nextStep',
      'previousStep',
      'saveAsDraft',
      'openSaveConfirmation',
      'closeConfirmation',
    ]),
    handleCloseConfirmation() {
      if (this.submitStatus === 'SUCCESS') {
        this.$router.push('/layanan');
      } else {
        this.closeConfirmation();
      }
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
