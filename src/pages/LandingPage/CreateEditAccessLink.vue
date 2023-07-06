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
            <div class="w-full border border-[#E3E7ED] rounded-[10px] px-[125px] py-[50px] flex flex-col justify-center items-center">
              <CardIcon class="w-[220px] h-[160px] mb-6" />
              <BaseButton
                class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
                data-cy="access-link-form__button-select-logo"
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
                  Tersisa {{ descriptionCharCounter }} karakter
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
                  :value="form.is_active"
                  :error-message="errors[0]"
                  @change="setStatus"
                  data-cy="access-link-form__status"
                />
              </div>
            </ValidationProvider>
          </section>
        </div>
      </form>
    </ValidationObserver>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import CardIcon from '@/assets/icons/card.svg?inline';

import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'CreateEditAccessLink',
  components: {
    HeaderMenu,
    BaseButton,
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
      form: {
        image: '',
        title: '',
        description: '',
        link: '',
        is_active: 1,
      },
      status: [
        { label: 'Aktif', value: 1 },
        { label: 'Non-Aktif', value: 0 },
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
  methods: {
    setStatus(status) {
      this.form.is_active = status;
    },
    onToggleClick() {
      if (this.isEditMode) {
        this.isToggled = true;
      }
    },
  },
};
</script>
