<template>
  <main class="pb-20">
    <ValidationObserver
      ref="form"
      v-slot="{ invalid }"
    >
      <form
        class="publication__form"
        @submit.prevent=""
      >
        <HeaderMenu>
          <template #left-button>
            <BaseButton
              type="button"
              class="bg-red-400 hover:bg-red-600 font-lato text-sm text-white"
              @click="cancelConfirmation"
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
              v-if="(isCreateMode || isDraft) && isLastStep"
              type="button"
              class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
              :disabled="!isMasterDataSelected"
              @click="openSaveConfirmation"
            >
              <span>
                Simpan
              </span>
            </BaseButton>
            <BaseButton
              v-if="(isCreateMode || isDraft) && isLastStep"
              type="button"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
              :disabled="invalid"
              @click="publishConfirmation"
            >
              <span>
                Tambahkan Layanan
              </span>
            </BaseButton>
            <BaseButton
              v-if="isEditMode && !isDraft && isLastStep"
              type="button"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
              :disabled="invalid"
            >
              <span>
                Simpan Perubahan
              </span>
            </BaseButton>
          </div>
        </HeaderMenu>

        <section class="w-full h-full bg-white rounded-lg p-6">
          <PublicationFormStepper />
          <keep-alive>
            <component
              :is="renderedForm"
              :current-form-step="currentFormStep"
            />
          </keep-alive>
        </section>
      </form>
    </ValidationObserver>

    <!-- Cancelation Popup -->
    <BaseModal :open="submitStatus === 'CANCEL_CONFIRMATION'">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Membatalkan Layanan
        </h1>
        <div class="flex items-center gap-4">
          <p class="text-sm leading-6 to-blue-gray-800">
            Apakah Anda yakin ingin membatalkan Layanan ini ?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="closeConfirmation"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-red-400 hover:bg-red-600 text-sm text-white"
            @click="handleCancelation"
          >
            Ya, saya yakin
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Save as Archive Confirmation Popup -->
    <BaseModal :open="submitStatus === 'SAVE_AS_ARCHIVE_CONFIRMATION'">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Simpan Layanan
        </h1>
        <div class="flex items-center gap-4">
          <p class="text-sm leading-6 to-blue-gray-800">
            Apakah Anda ingin menyimpan perubahan pada layanan ini?
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
            @click="handleSaveForm"
          >
            Ya, simpan layanan
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Publish Confirmation Popup -->
    <BaseModal :open="submitStatus === 'PUBLISH_CONFIRMATION'">
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
            @click="handlePublishForm"
          >
            Ya, simpan layanan
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
import ProgressModal from '@/common/components/ProgressModal';
import PublicationFormStepper from '@/components/Services/Publication/Form/Stepper.vue';

import { mapActions, mapGetters } from 'vuex';
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    HeaderMenu,
    BaseButton,
    BaseModal,
    ProgressModal,
    PublicationFormStepper,
    StepOne: () => import('@/components/Services/Publication/Form/StepOne'),
    StepTwo: () => import('@/components/Services/Publication/Form/StepTwo'),
    StepThree: () => import('@/components/Services/Publication/Form/StepThree'),
  },
  computed: {
    ...mapGetters('publicationForm', [
      'currentFormStep',
      'isFirstStep',
      'isLastStep',
      'isDraft',
      'masterDataId',
      'isMasterDataSelected',
      'submitStatus',
      'submitMessage',
    ]),
    isCreateMode() {
      return this.$route.meta?.mode === 'create';
    },
    isEditMode() {
      return this.$route.meta?.mode === 'edit';
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
    masterDataId: {
      handler(newValue, oldValue) {
        if (this.isMasterDataSelected && newValue !== oldValue) {
          this.$store.dispatch('publicationForm/setInitialFormData', this.masterDataId);
        }
      },
    },
  },
  created() {
    this.$store.dispatch('publicationForm/resetFormData');
    this.$store.dispatch('publicationForm/getMasterDataOptions');
  },
  methods: {
    ...mapActions('publicationForm', [
      'nextStep',
      'previousStep',
      'resetFormData',
      'saveAsArchive',
      'openSaveConfirmation',
      'closeConfirmation',
      'cancelConfirmation',
      'publishConfirmation',
      'publishForm',
    ]),
    handleSaveForm() {
      this.saveAsArchive();
    },
    handlePublishForm() {
      this.publishForm();
    },
    handleCloseConfirmation() {
      if (this.submitStatus === 'SUCCESS') {
        this.$router.push('/layanan');
      } else {
        this.closeConfirmation();
      }
    },
    handleCancelation() {
      this.$router.back();
    },
  },
};
</script>

<style>
/**
 * Override default Jds-Select styling
 */
.publication__form .jds-popover__activator,
.publication__form .jds-select,
.publication__form .jds-input-text {
  width: 100% !important;
}

.publication__form .jds-popover__content {
  z-index: 10 !important;
  background-color: white !important;
}

.publication__form .jds-options__option-list {
  max-height: 235px !important;
}

.publication__form .jds-text-area__input-wrapper > textarea {
  border: 1px solid #9E9E9E;
}
.publication__form .jds-text-area--error .jds-text-area__input-wrapper > textarea {
  border: 1px solid #D32F2F !important;
}

.publication__form .jds-text-area__input-wrapper > textarea:hover {
  border: 1px solid #16a34a;
}
</style>
