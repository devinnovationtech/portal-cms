<template>
  <main class="pb-14">
    <ValidationObserver
      ref="form"
      v-slot="{ invalid, changed }"
    >
      <form
        class="access-link__form"
        data-cy="access-link-form__container"
        @submit.prevent="onConfirmation"
      >
        <!-- Submit -->
        <HeaderMenu>
          <div class="flex gap-4">
            <BaseButton
              type="submit"
              class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
              data-cy="access-link-form__save-button"
              :disabled="invalid || (!changed && !isToggled)"
            >
              <p>
                Simpan Data
              </p>
            </BaseButton>
          </div>
        </HeaderMenu>

        <div class="w-full h-full py-8 px-5 rounded-xl bg-white">
          <!-- Banner Upload -->
          <section class="mb-8">
            <div class="col-span-2 flex justify-between">
              <h2 class="font-lato font-bold text-base leading-6 text-blue-gray-800 mb-3">
                Upload Logo Akses Cepat
              </h2>
            </div>
            <!-- TODO: change display if image selected -->
            <div class="w-full border border-[#E3E7ED] rounded-[10px] px-[125px] py-[50px] flex flex-col justify-center items-center">
              <CardIcon class="w-[220px] h-[160px] mb-6" />
              <BaseButton
                class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
                data-cy="access-link-form__button-select-logo"
                @click="showListLogo = true"
              >
                <p>
                  Pilih Logo Layanan
                </p>
              </BaseButton>
            </div>
          </section>

          <section>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|max:50"
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

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <div class="flex flex-col mb-5">
                <label
                  class="font-lato text-blue-gray-800 mb-3 text-[15px]"
                >
                  Status Akses
                </label>
                <JdsRadioButtonGroup
                  :items="status"
                  placeholder-key="label"
                  name="radio-button-group"
                  orientation="horizontal"
                  data-cy="access-link-form__status"
                  :value="form.is_active"
                  :error-message="errors[0]"
                  @change="setStatus"
                />
              </div>
            </ValidationProvider>
          </section>
        </div>
      </form>
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
              <div v-if="listIcon && listIcon.length > 0">
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
              </div>
              <div v-else>
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
            @click="handleSubmitLogo"
          >
            Simpan Logo
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
import SearchBar from '@/common/components/SearchBar';
import CardIcon from '@/assets/icons/card.svg?inline';

import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const quickLinkRepository = RepositoryFactory.get('quickLink');

export default {
  name: 'CreateEditAccessLink',
  components: {
    HeaderMenu,
    BaseButton,
    BaseModal,
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
        // TODO : fetch data form if edit
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
      form: {
        image: '',
        title: '',
        description: '',
        link: '',
        is_active: '1',
      },
      status: [
        { label: 'Aktif', value: '1' },
        { label: 'Non-Aktif', value: '0' },
      ],
      successMessage: {
        title: '',
        body: '',
      },
      errorMessage: {
        title: '',
        body: '',
      },
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
  },
  mounted() {
    this.fetchListIcon();
  },
  methods: {
    async fetchListIcon() {
      try {
        const response = await quickLinkRepository.getListIcon(this.params);
        this.listIcon = response?.data?.data;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data icon akses cepat, silakan coba beberapa saat lagi',
        });
      }
    },
    setStatus(status) {
      this.form.is_active = status;
    },
    onToggleClick() {
      if (this.isEditMode) {
        this.isToggled = true;
      }
    },
    handleSubmitLogo() {
      this.showListLogo = false;
    },
    onConfirmation() {
      // TODO: handle post
    },
    onSearch(query) {
      this.params.q = query;
      this.fetchListIcon();
    },
    onSelectLogo(image) {
      this.form.image = image;
    },
  },
};
</script>
