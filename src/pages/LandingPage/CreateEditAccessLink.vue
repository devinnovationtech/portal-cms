<template>
  <main class="pb-14">
    <ValidationObserver
      ref="form"
      v-slot="{ invalid, changed }"
    >
      <div
        class="access-link__form"
        data-cy="access-link-form__container"
      >
        <!-- Submit -->
        <HeaderMenu>
          <div class="flex gap-4">
            <BaseButton
              type="submit"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
              data-cy="access-link-form__save-button"
              :disabled="invalid || (!changed && !isToggled)"
              @click="onConfirmation"
            >
              <p>
                Simpan Data
              </p>
            </BaseButton>
          </div>
        </HeaderMenu>

        <div class="w-full h-full py-8 px-5 rounded-xl bg-white">
          <!-- Logo Upload -->
          <section class="mb-8">
            <div class="col-span-2 flex justify-between">
              <h2 class="font-lato font-bold text-base leading-6 text-blue-gray-800 mb-3">
                Upload Logo Akses Cepat
              </h2>
            </div>
            <div class="w-full border border-[#E3E7ED] rounded-[10px] px-[125px] py-[50px] flex flex-col justify-center items-center gap-[10px]">
              <div
                v-if="!form.image"
                class="flex flex-col items-center gap-[10px]"
              >
                <CardIcon class="w-[220px] h-[160px]" />
                <p class="text-sm font-lato text-gray-700">
                  Belum Terpilih
                </p>
              </div>
              <div
                v-else
                class="flex flex-col items-center gap-[10px]"
              >
                <div class="grid place-content-center">
                  <img
                    ref="access-link-form_logo"
                    data-cy="access-link-form__logo"
                    :src="form.image"
                    alt="Ilustrasi logo terpilih"
                    width="160"
                    height="160"
                    class="w-[160px] h-[160px] max-w-full object-cover object-center rounded-full bg-gray-50"
                  >
                </div>
                <p class="text-sm font-lato text-gray-700">
                  Icon Terpilih
                </p>
              </div>
              <BaseButton
                class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white mt-5"
                data-cy="access-link-form__button-select-logo"
                @click="openModalListLogo"
              >
                <p v-if="!form.image">
                  Pilih Logo Layanan
                </p>
                <p v-else>
                  Ganti Icon
                </p>
              </BaseButton>
            </div>
          </section>

          <section>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|max:100"
            >
              <div class="flex flex-col mb-5">
                <label
                  class="font-lato text-blue-gray-800 mb-3 text-[15px]"
                >
                  Judul Akses
                </label>
                <JdsInputText
                  v-model.trim="form.title"
                  placeholder="Masukkan judul akses"
                  data-cy="access-link-form__title"
                  :error-message="errors[0]"
                />
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <div class="flex flex-col mb-5">
                <label
                  class="font-lato text-blue-gray-800 mb-3 text-[15px]"
                >
                  Deskripsi
                </label>
                <textarea
                  v-model="form.description"
                  placeholder="Masukkan deskripsi akses cepat"
                  rows="4"
                  maxlength="200"
                  class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  data-cy="access-link-form__description"
                />
                <span class="font-lato text-[13px] text-red-600 mt-1">
                  {{ errors[0] }}
                </span>
                <p
                  class="text-xs text-right text-gray-600"
                >
                  Tersisa
                  <strong>{{ descriptionCharCounter }}</strong>
                  karakter
                </p>
              </div>
            </ValidationProvider>

            <div class="font-lato text-blue-gray-800 mb-3 text-[15px] flex justify-between">
              <label>
                Link Redirect
              </label>
              <JdsToggle
                v-model="isActiveLink"
                data-cy="access-link-form__redirect-link-toggle"
                @change="onToggleClick"
              />
            </div>
            <ValidationProvider
              v-slot="{ errors }"
              :rules="isActiveLink ? 'required|url' : ''"
            >
              <div class="flex flex-col mb-5">
                <JdsInputText
                  v-model="form.link"
                  :disabled="!isActiveLink"
                  placeholder="contoh: https://"
                  :error-message="errors[0]"
                  data-cy="access-link-form__link"
                />
              </div>
            </ValidationProvider>
          </section>
        </div>
      </div>
    </ValidationObserver>

    <!-- List Logo Modal -->
    <BaseModal
      :open="showListLogo"
      data-cy="access-link-modal__list-logo"
    >
      <template #header>
        <div class="w-full h-full px-6 py-6 border border-b-2 border-gray-100 flex items-center">
          <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px]">
            Pilih Logo
          </h1>
        </div>
      </template>
      <div class="w-full h-full px-2">
        <div class="flex flex-col items-center gap-4">
          <div class="min-w-0 w-full flex items-center">
            <SearchBar
              placeholder="Cari logo"
              @input="onSearch($event)"
            />
          </div>
          <section class="w-full h-full border border-gray-100 rounded-lg px-4 py-6">
            <h1 class="font-medium">
              Daftar Icon
            </h1>
            <div class="bg-white w-full max-h-[240px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-[max-content] max-w-4xl mx-auto py-4 gap-2 overflow-y-scroll">
              <div
                v-for="icon in listIcon"
                :key="icon.id"
                class="max-h-max w-full"
              >
                <Button
                  class="h-full w-full flex flex-col justify-center items-center rounded-lg p-4 hover:border hover:border-green-600 active:border active:border-green-600 focus:border focus:border-green-600"
                  @click="onSelectLogo(icon.image)"
                >
                  <div class="w-16 h-16 flex items-center justify-center">
                    <img
                      :src="icon.image"
                      :alt="`Ilustrasi logo ${icon.title}`"
                      width="40"
                      height="40"
                      class="object-cover object-center"
                    >
                  </div>
                  <p
                    v-if="icon.title"
                    class="text-gray-700 font-lato text-sm text-center line-clamp-1"
                  >
                    {{ icon.title }}
                  </p>
                </Button>
              </div>
              <div v-if="listIcon.length === 0">
                <p>
                  Daftar icon tidak tersedia.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            data-cy="access-link-modal__button-cancel"
            @click="showListLogo = false"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            data-cy="access-link-modal__button-save"
            @click="onSaveLogo"
          >
            Simpan Logo
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Confirmation Popup -->
    <BaseModal
      :open="submitStatus === 'CONFIRMATION'"
      data-cy="access-link-form__confirmation-modal"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Simpan Data
        </h1>
        <div class="flex items-center gap-4">
          <p class="text-sm leading-6 to-blue-gray-800">
            Apakah Anda ingin menyimpan data?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            data-cy="access-link-form__confirmation-cancel"
            @click="onCancel"
          >
            Tidak
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            data-cy="access-link-form__confirmation-save"
            @click="handleSubmit"
          >
            Ya, simpan data
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Submit Progress -->
    <ProgressModal
      :open="submitStatus === 'LOADING'"
      :value="submitProgress"
      message="Mohon tunggu, penyimpanan data sedang diproses"
      data-cy="access-link-form__progress-modal"
    />

    <!-- Success/Error Message -->
    <BaseModal
      :open="submitStatus === 'SUCCESS' || submitStatus === 'ERROR'"
      data-cy="access-link-form__message-modal"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ messageTitle }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            :name="messageIconName"
            :class="messageIconClassName"
          />
          <p class="text-sm leading-6 to-blue-gray-800">
            {{ messageBody }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            data-cy="access-link-form__message-button"
            @click="messageAction"
          >
            Saya Mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import ProgressModal from '@/common/components/ProgressModal';
import SearchBar from '@/common/components/SearchBar';
import CardIcon from '@/assets/icons/card.svg?inline';

import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const quickLinkRepository = RepositoryFactory.get('quickLink');

const FORM_SUBMIT_STATUS = Object.freeze({
  NONE: 'NONE',
  CONFIRMATION: 'CONFIRMATION',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
});

export default {
  name: 'CreateEditAccessLink',
  components: {
    HeaderMenu,
    BaseButton,
    BaseModal,
    ProgressModal,
    SearchBar,
    CardIcon,
    ValidationProvider,
    ValidationObserver,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      if (to.meta.mode === 'create') {
        next();
      } else {
        const { id } = to.params;
        await quickLinkRepository.getLinkById(id);
        next();
      }
    } catch (error) {
      next('/landing-page');
    }
  },
  data() {
    return {
      listIcon: [],
      params: {
        q: '',
        per_page: 99,
        page: 1,
      },
      selectedLogo: '',
      form: {
        image: '',
        title: '',
        description: '',
        link: '',
      },
      successMessage: {
        title: '',
        body: '',
      },
      errorMessage: {
        title: '',
        body: '',
      },
      submitStatus: FORM_SUBMIT_STATUS.NONE,
      submitProgress: 0,
      isActiveLink: true,
      isToggled: false,
      showListLogo: false,
    };
  },
  computed: {
    mode() {
      return this.$route.meta?.mode || 'create';
    },
    isEditMode() {
      return this.mode === 'edit';
    },
    descriptionCharCounter() {
      if (this.form.description !== '') {
        return 200 - this.form.description.length;
      }
      return 200;
    },
    messageTitle() {
      return this.submitStatus === 'SUCCESS' ? this.successMessage.title : this.errorMessage.title;
    },
    messageBody() {
      return this.submitStatus === 'SUCCESS' ? this.successMessage.body : this.errorMessage.body;
    },
    messageIconName() {
      return this.submitStatus === 'SUCCESS' ? 'check-mark-circle' : 'warning';
    },
    messageIconClassName() {
      return this.submitStatus === 'SUCCESS' ? 'text-green-600' : 'text-red-600';
    },
  },
  async mounted() {
    this.fetchListIcon();
    if (this.isEditMode) {
      try {
        const { id } = this.$route.params;
        const response = await this.fetchData(id);
        const { data } = response.data;
        this.setInitialData(data);
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data.',
        });
      }
    }
  },
  methods: {
    async fetchListIcon() {
      try {
        const response = await quickLinkRepository.getListIcon(this.params);
        this.listIcon = response?.data?.data;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data, silakan coba beberapa saat lagi',
        });
      }
    },
    async fetchData(id) {
      try {
        const response = await quickLinkRepository.getLinkById(id);
        return new Promise((resolve) => {
          resolve(response);
        });
      } catch (error) {
        return new Promise(() => {
          throw new Error(error);
        });
      }
    },
    onToggleClick() {
      if (this.isEditMode) {
        this.isToggled = true;
      }
    },
    onSearch(query) {
      this.params.q = query;
      this.fetchListIcon();
    },
    openModalListLogo() {
      this.showListLogo = true;
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
    },
    onSelectLogo(logo) {
      this.selectedLogo = logo;
    },
    onSaveLogo() {
      this.showListLogo = false;
      this.form.image = this.selectedLogo;
    },
    onConfirmation() {
      this.submitStatus = FORM_SUBMIT_STATUS.CONFIRMATION;
    },
    onCancel() {
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
    },
    handleSubmit() {
      if (this.mode === 'create') {
        this.submitForm();
      } else {
        this.updateForm();
      }
    },
    async submitForm() {
      if (!this.isActiveLink) {
        this.form.link = '';
      }
      try {
        this.submitStatus = FORM_SUBMIT_STATUS.LOADING;
        this.submitProgress = 25;

        const response = await quickLinkRepository.createLink(this.form);
        if (response.status === 201) {
          // Add timeout to prevent progress bar too fast
          setTimeout(() => {
            this.submitProgress = 75;
            setTimeout(() => {
              this.successMessage = {
                title: 'Berhasil!',
                body: 'Data yang Anda buat berhasil disimpan.',
              };
              this.submitStatus = FORM_SUBMIT_STATUS.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch (error) {
        this.errorMessage = {
          title: 'Gagal!',
          body: 'Data yang Anda buat gagal disimpan.',
        };
        this.submitStatus = FORM_SUBMIT_STATUS.ERROR;
      }
    },
    async updateForm() {
      if (!this.isActiveLink) {
        this.form.link = '';
      }
      try {
        this.submitStatus = FORM_SUBMIT_STATUS.LOADING;
        this.submitProgress = 25;

        const { id } = this.$route.params;
        const response = await quickLinkRepository.updateLink(id, this.form);

        if (response.status === 200) {
          // Add timeout to prevent progress bar too fast
          setTimeout(() => {
            this.submitProgress = 75;

            setTimeout(() => {
              this.successMessage = {
                title: 'Update Berhasil!',
                body: 'Data yang Anda ubah berhasil disimpan.',
              };
              this.submitStatus = FORM_SUBMIT_STATUS.SUCCESS;
            }, 150);
          }, 150);
        }
      } catch (error) {
        this.errorMessage = {
          title: 'Update Gagal!',
          body: 'Data yang Anda ubah gagal disimpan.',
        };
        this.submitStatus = FORM_SUBMIT_STATUS.ERROR;
      }
    },
    messageAction() {
      if (this.submitStatus === FORM_SUBMIT_STATUS.SUCCESS) {
        this.$router.push('/landing-page/akses-cepat');
      } else {
        this.resetSubmitState();
      }
    },
    resetSubmitState() {
      this.submitStatus = FORM_SUBMIT_STATUS.NONE;
      this.submitProgress = 0;
      this.successMessage.title = '';
      this.successMessage.body = '';
      this.errorMessage.title = '';
      this.errorMessage.body = '';
    },
    setInitialData(data) {
      this.form.image = data.image;
      this.form.title = data.title;
      this.form.description = data.description;
      this.form.link = data.link;
      this.isActiveLink = !!(this.form.link);
    },
  },
};
</script>
