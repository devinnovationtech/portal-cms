<template>
  <ValidationObserver ref="formStepOne">
    <fieldset>
      <section class="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
        <ValidationProvider
          v-if="isCreateMode"
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2 mb-3"
        >
          <label
            for="opd-name"
            class="font-lato text-blue-gray-800 mb-3 text-[15px]"
          >
            Pilih Layanan
          </label>
          <JdsSelect
            v-model="masterDataId"
            :options="masterDataOptions"
            placeholder="Pilih layanan dari master data"
            :filterable="true"
            filter-type="contain"
          />
          <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
        </ValidationProvider>

        <!-- Show mock select input for edit purposes based on UI Design -->
        <ValidationProvider
          v-if="isEditMode"
          class="flex flex-col col-span-2 mb-3"
        >
          <label
            for="opd-name"
            class="font-lato text-blue-gray-800 mb-3 text-[15px]"
          >
            Pilih Layanan
          </label>
          <JdsSelect
            :placeholder="serviceName"
            :disabled="true"
          />
        </ValidationProvider>

        <div class="col-span-2 border-b border-gray-300" />

        <LogoPicker
          :status="logo.status"
          :initial-image-uri="isEditMode ? logo.file_download_uri : null"
          :initial-image-name="isEditMode ? logo.file_name : null"
          @upload="handleUploadServiceLogo"
          @delete="handleDeleteServiceLogo"
        />

        <ValidationProvider class="flex flex-col col-span-2">
          <label
            for="opd-name"
            class="font-lato text-blue-gray-800 mb-3 text-[15px]"
          >
            Nama Perangkat Daerah
          </label>
          <JdsInputText
            id="opd-name"
            v-model="OPDName"
            placeholder="Nama Perangkat Daerah"
            :disabled="!isMasterDataSelected"
            readonly
          />
        </ValidationProvider>

        <ValidationProvider class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Bentuk Layanan
          </label>
          <JdsInputText
            v-model="serviceForm"
            placeholder="Administratif/Barang/Jasa"
            :disabled="!isMasterDataSelected"
            readonly
          />
        </ValidationProvider>

        <ValidationProvider class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Nama Layanan
          </label>
          <JdsInputText
            v-model="serviceName"
            readonly
            :disabled="!isMasterDataSelected"
            placeholder="Nama Layanan"
          />
        </ValidationProvider>

        <ValidationProvider class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Deskripsi Layanan
          </label>
          <textarea
            v-model="programDescription"
            placeholder="Deskripsi Layanan"
            rows="4"
            maxlength="500"
            readonly
            :disabled="!isMasterDataSelected"
            class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white disabled:bg-gray-200 disabled:border-gray-500
            hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
          />
          <p
            v-show="programDescriptionCharCounter"
            class="text-xs text-right text-gray-600"
          >
            Tersisa {{ programDescriptionCharCounter }} karakter
          </p>
        </ValidationProvider>

        <ValidationProvider class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Pengguna Layanan
          </label>
          <JdsInputText
            v-model="user"
            readonly
            :disabled="!isMasterDataSelected"
            placeholder="Umum/ASN/Lembaga"
          />
        </ValidationProvider>

        <ValidationProvider class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Nama Program Layanan
          </label>
          <JdsInputText
            v-model="programName"
            placeholder="Nama Program Layanan"
            :disabled="!isMasterDataSelected"
            readonly
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Kategori Layanan Jabarprovgoid
          </label>
          <JdsSelect
            v-model="portalCategory"
            :disabled="!isMasterDataSelected"
            placeholder="Pilih data kategori"
            :options="jabarprovCategoryOptions"
          />
          <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Status Operasional
          </label>
          <JdsInputText
            v-model="operationalStatus"
            placeholder="Status Operasional"
            readonly
            :disabled="!isMasterDataSelected"
          />
        </ValidationProvider>

        <ValidationProvider class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Teknis Layanan
          </label>
          <JdsInputText
            v-model="technical"
            placeholder="Teknis Layanan"
            :disabled="!isMasterDataSelected"
            readonly
          />
        </ValidationProvider>
      </section>

      <Collapse class="mb-4">
        <template #header>
          <div class="flex">
            <JdsToggle
              v-model="isBenefitSectionActive"
              class="mr-3"
              @change="resetBenefitSectionError"
            />
            <h2 class="font-roboto font-medium text-base leading-7 text-blue-gray-800 mr-3">
              Manfaat Layanan untuk Masyarakat
            </h2>
            <span
              :class="{
                'text-sm leading-[28px] h-[32px] rounded-lg px-3 py-[3px] font-bold italic' : true,
                'bg-green-100 text-green-700' : isBenefitSectionActive,
                'bg-gray-300 text-gray-700' : !isBenefitSectionActive
              } "
            >
              {{ isBenefitSectionActive ? 'Konten Aktif' : 'Konten Tidak Aktif' }}
            </span>
          </div>
        </template>
        <section class="border border-gray-300 rounded-xl py-4 px-10 mb-3 grid grid-cols-2 gap-x-8 gap-y-4">
          <ValidationProvider
            ref="benefitTitle"
            v-slot="{ errors }"
            :rules="isBenefitSectionActive ? 'required' : ''"
            class="col-span-2 mb-3"
          >
            <JdsInputText
              v-model="benefitSectionTitle"
              placeholder="Judul Section"
              :disabled="!isMasterDataSelected || !isBenefitSectionActive"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <div
            v-for="(benefit, index) in benefits"
            :key="`step-one-benefit-${index}`"
            class="col-span-2"
          >
            <div class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-4 items-center">
              <p class="font-roboto font-medium text-base leading-7 text-blue-gray-800">
                {{ index + 1 }}.
              </p>
              <ValidationProvider class="flex flex-col">
                <JdsInputText
                  v-model="benefit.name"
                  placeholder="Berisi Manfaat Layanan"
                  :disabled="!isMasterDataSelected || !isBenefitSectionActive"
                  readonly
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                ref="benefitImageUploader"
                :rules="benefitImageUploaderValidationRules"
                class="col-span-2"
              >
                <Dropzone
                  :id="`benefitImageDropzone${index}`"
                  :disabled="!isMasterDataSelected || !!benefit.image.file || !isBenefitSectionActive"
                  :is-error="errors.length > 0"
                  @change="handleUploadBenefitImage($event, index)"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 1 Mb dengan Resolusi yang disarankan  392 x 200 Pixel .(.jpg dan.png )
                    </span>
                  </template>
                </Dropzone>
                <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
              </ValidationProvider>

              <transition name="slide-fade">
                <DropzoneUploadProgress
                  v-if="!!benefit.image.file"
                  :disabled="!isBenefitSectionActive"
                  :file="benefit.image.file"
                  :progress="benefit.image.upload_progress"
                  :status="benefit.image.upload_status"
                  :image-url="benefit.image.file_download_uri"
                  :image-size="benefit.image.size"
                  class="col-span-2"
                  @delete="handleDeleteBenefitImage(benefit.image.file_name, index)"
                  @retry="handleRetryBenefitImage(benefit.image.file, index)"
                />
              </transition>
            </div>
          </div>
        </section>
      </Collapse>

      <Collapse
        v-if="isShowFacilitySection"
        class="mb-4"
      >
        <template #header>
          <div class="flex">
            <JdsToggle
              v-model="isFacilitySectionActive"
              class="mr-3"
              @change="resetFacilitySectionError"
            />
            <h2 class="font-roboto font-medium text-base leading-7 text-blue-gray-800 mr-3">
              Fasilitas yang Tersedia
            </h2>
            <span
              :class="{
                'text-sm leading-[28px] h-[32px] rounded-lg px-3 py-[3px] font-bold italic' : true,
                'bg-green-100 text-green-700' : isFacilitySectionActive,
                'bg-gray-300 text-gray-700' : !isFacilitySectionActive
              } "
            >
              {{ isFacilitySectionActive ? 'Konten Aktif' : 'Konten Tidak Aktif' }}
            </span>
          </div>
        </template>
        <section class="border border-gray-300 rounded-xl py-4 px-10 mb-3 grid grid-cols-2 gap-x-8 gap-y-4">
          <ValidationProvider
            ref="facilityTitle"
            v-slot="{ errors }"
            :rules="isShowFacilitySection && isFacilitySectionActive ? 'required' : ''"
            class="col-span-2 mb-3"
          >
            <JdsInputText
              v-model="facilitySectionTitle"
              placeholder="Judul Section"
              :disabled="!isMasterDataSelected || !isFacilitySectionActive"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <div
            v-for="(facility, index) in facilities"
            :key="`step-one-benefit-${index}`"
            class="col-span-2"
          >
            <div class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-4 items-center">
              <p class="font-roboto font-medium text-base leading-7 text-blue-gray-800">
                {{ index + 1 }}.
              </p>
              <ValidationProvider class="flex flex-col">
                <JdsInputText
                  v-model="facility.name"
                  placeholder="Berisi Fasilitas Tersedia"
                  :disabled="!isMasterDataSelected || !isFacilitySectionActive"
                  readonly
                />
              </ValidationProvider>

              <ValidationProvider
                ref="facilityImageUploader"
                v-slot="{ errors }"
                :rules="isShowFacilitySection || isFacilitySectionActive ? 'image|size:1000|maxdimensions:392,200' : ''"
                class="col-span-2"
              >
                <Dropzone
                  :id="`facilityImageDropzone${index}`"
                  :disabled="!isMasterDataSelected || !!facility.image.file || !isFacilitySectionActive"
                  :is-error="errors.length > 0"
                  @change="handleUploadFacilityImage($event, index)"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 1 Mb dengan Resolusi yang disarankan  392 x 200 Pixel .(.jpg dan.png )
                    </span>
                  </template>
                </Dropzone>
                <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
              </ValidationProvider>

              <transition name="slide-fade">
                <DropzoneUploadProgress
                  v-if="!!facility.image.file"
                  :disabled="!isFacilitySectionActive"
                  :file="facility.image.file"
                  :progress="facility.image.upload_progress"
                  :status="facility.image.upload_status"
                  :image-url="facility.image.file_download_uri"
                  :image-size="facility.image.size"
                  class="col-span-2"
                  @delete="handleDeleteFacilityImage(facility.image.file_name, index)"
                  @retry="handleRetryFacilityImage(facility.image.file, index)"
                />
              </transition>
            </div>
          </div>
        </section>
      </Collapse>

      <section class="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
        <ValidationProvider class="flex flex-col col-span-2">
          <label
            class="font-lato text-blue-gray-800 mb-3 text-[15px]"
          >
            Alamat Website Resmi
          </label>
          <JdsInputText
            v-model="website"
            :disabled="!isMasterDataSelected"
            placeholder="Alamat Website Resmi"
            readonly
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          class="flex flex-col col-span-2"
        >
          <label
            class="font-lato text-blue-gray-800 mb-3 text-[15px]"
          >
            Kustomisasi URL Informasi Layanan Portal Jabar
          </label>
          <JdsInputText
            v-model="urlCustomization"
            :disabled="!isMasterDataSelected"
            placeholder="tambahkan sub alamat"
            prefix-text="https://www.jabarprov.go.id/layanan/"
            :error-message="errors[0]"
          />
        </ValidationProvider>
      </section>
    </fieldset>
  </ValidationObserver>
</template>

<script>
import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import Collapse from '@/common/components/Collapse';
import Dropzone from '@/common/components/Dropzone';
import DropzoneUploadProgress from '@/common/components/DropzoneUploadProgress';
import LogoPicker from '@/components/Services/Publication/Form/LogoPicker';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Collapse,
    Dropzone,
    DropzoneUploadProgress,
    LogoPicker,
  },
  data() {
    return {
      jabarprovCategoryOptions: [
        {
          value: 'Kependudukan dan Tempat Tinggal',
          label: 'Kependudukan dan Tempat Tinggal',
        },
        {
          value: 'Pendidikan dan Pembelajaran',
          label: 'Pendidikan dan Pembelajaran',
        },
        {
          value: 'Kesehatan',
          label: 'Kesehatan',
        },
        {
          value: 'Sosial dan Keluarga',
          label: 'Sosial dan Keluarga',
        },
        {
          value: 'Lingkungan',
          label: 'Lingkungan',
        },
        {
          value: 'Ekonomi, Bisnis dan Profesi',
          label: 'Ekonomi, Bisnis dan Profesi',
        },
        {
          value: 'Teknologi dan Komunikasi',
          label: 'Teknologi dan Komunikasi',
        },
        {
          value: 'Sarana dan Prasarana',
          label: 'Sarana dan Prasarana',
        },
        {
          value: 'Khusus',
          label: 'Khusus',
        },
      ],
    };
  },
  computed: {
    benefitImageUploaderValidationRules() {
      if (this.isCreateMode) {
        if (this.isBenefitSectionActive) {
          return 'image|size:1000|maxdimensions:392,200';
        }
        return '';
      }

      if (this.isEditMode) {
        return 'image|size:1000|maxdimensions:392,200';
      }
      return 'image|size:1000|maxdimensions:392,200';
    },
    masterDataOptions() {
      return this.$store.getters['publicationForm/masterDataOptions'];
    },
    masterDataId: {
      get() {
        return this.$store.state.publicationForm.masterDataId;
      },
      set(value) {
        if (!value) return;
        this.$store.commit('publicationForm/SET_STEP_ONE_MASTER_DATA_ID', value);
      },
    },
    isMasterDataSelected() {
      return this.$store.getters['publicationForm/isMasterDataSelected'];
    },
    isCreateMode() {
      return this.$route.meta?.mode === 'create';
    },
    isEditMode() {
      return this.$route.meta?.mode === 'edit';
    },
    logo() {
      return this.$store.state.publicationForm.stepOne.default_information.logo;
    },
    OPDName() {
      return this.$store.state.publicationForm.stepOne.default_information.opd_name;
    },
    serviceForm() {
      const SERVICE_FORM_MAP = {
        ADMINISTRATIF: 'Administratif',
        BARANG: 'Barang',
        JASA: 'Jasa',
      };
      return SERVICE_FORM_MAP[this.$store.state.publicationForm.stepOne.default_information.form] ?? '';
    },
    serviceName() {
      return this.$store.state.publicationForm.stepOne.default_information.name;
    },
    programDescription() {
      return this.$store.state.publicationForm.stepOne.default_information.description;
    },
    programDescriptionCharCounter() {
      if (this.programDescription !== '') {
        return 500 - this.programDescription.length;
      }
      return null;
    },
    user() {
      const SERVICE_USER_MAP = {
        UMUM: 'Umum',
        ASN: 'ASN',
        LEMBAGA: 'Lembaga',
      };
      return SERVICE_USER_MAP[this.$store.state.publicationForm.stepOne.default_information.user] ?? '';
    },
    programName() {
      return this.$store.state.publicationForm.stepOne.default_information.program_name;
    },
    portalCategory: {
      get() {
        return this.$store.state.publicationForm.stepOne.default_information.portal_category;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_ONE_PORTAL_CATEGORY', value);
      },
    },
    operationalStatus() {
      const OPERATIONAL_STATUS_MAP = {
        ACTIVE: 'Aktif',
        'NOT-ACTIVE': 'Tidak Aktif',
      };

      const label = OPERATIONAL_STATUS_MAP[this.$store.state.publicationForm.stepOne.default_information.operational_status] ?? '';
      return label;
    },
    technical() {
      const TECHNICAL_MAP = {
        OFFLINE: 'Offline',
        ONLINE: 'Online',
      };

      const label = TECHNICAL_MAP[this.$store.state.publicationForm.stepOne.default_information.technical] ?? '';
      return label;
    },
    isBenefitSectionActive: {
      get() {
        return this.$store.state.publicationForm.stepOne.default_information.benefits.is_active === 1;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_ONE_BENEFIT_SECTION_IS_ACTIVE', value);
      },
    },
    benefitSectionTitle: {
      get() {
        return this.$store.state.publicationForm.stepOne.default_information.benefits.title;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_ONE_BENEFIT_SECTION_TITLE', value);
      },
    },
    benefits() {
      return this.$store.state.publicationForm.stepOne.default_information.benefits.items;
    },
    isFacilitySectionActive: {
      get() {
        return this.$store.state.publicationForm.stepOne.default_information.facilities.is_active === 1;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_ONE_FACILITY_SECTION_IS_ACTIVE', value);
      },
    },
    facilitySectionTitle: {
      get() {
        return this.$store.state.publicationForm.stepOne.default_information.facilities.title;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_ONE_FACILITY_SECTION_TITLE', value);
      },
    },
    facilities() {
      return this.$store.state.publicationForm.stepOne.default_information.facilities.items;
    },
    website() {
      return this.$store.state.publicationForm.stepOne.default_information.website;
    },
    urlCustomization: {
      get() {
        return this.$store.state.publicationForm.stepOne.default_information.slug;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_ONE_URL_CUSTOMIZATION', value);
      },
    },
    isShowFacilitySection() {
      // show section on intial render
      if (this.masterDataId === null) {
        return true;
      }

      if (this.masterDataId && this.isMasterDataSelected) {
        return this.$store.state.publicationForm.stepOne.default_information.technical === 'OFFLINE';
      }

      return false;
    },
  },
  deactivated() {
    // Trigger validation message when component deactivated
    this.$refs.formStepOne.validate();
  },
  methods: {
    handleUploadServiceLogo(file) {
      this.$store.dispatch('publicationForm/handleUploadServiceLogo', file);
    },
    handleDeleteServiceLogo() {
      this.$store.dispatch('publicationForm/handleDeleteServiceLogo');
    },
    async handleUploadBenefitImage(file, index) {
      const { valid } = await this.$refs.benefitImageUploader[index].validate(file);

      if (valid) {
        this.$store.dispatch('publicationForm/handleUploadBenefitImage', { file, index });
      }
    },
    handleDeleteBenefitImage(fileName, index) {
      this.$store.dispatch('publicationForm/handleDeleteBenefitImage', { fileName, index });
      // reset input type file value
      document.querySelector(`#benefitImageDropzone${index} input`).value = '';
    },
    handleRetryBenefitImage(file, index) {
      this.$store.dispatch('publicationForm/handleUploadBenefitImage', { file, index });
    },
    async handleUploadFacilityImage(file, index) {
      const { valid } = await this.$refs.facilityImageUploader[index].validate(file);

      if (valid) {
        this.$store.dispatch('publicationForm/handleUploadFacilityImage', { file, index });
      }
    },
    handleDeleteFacilityImage(fileName, index) {
      this.$store.dispatch('publicationForm/handleDeleteFacilityImage', { fileName, index });
      // reset input type file value
      document.querySelector(`#facilityImageDropzone${index} input`).value = '';
    },
    handleRetryFacilityImage(file, index) {
      this.$store.dispatch('publicationForm/handleUploadFacilityImage', { file, index });
    },
    resetBenefitSectionError() {
      this.resetValidation('benefitTitle');
      this.benefits.forEach((item, index) => {
        this.$refs.benefitImageUploader[index].reset();
      });
    },
    resetFacilitySectionError() {
      this.resetValidation('facilityTitle');
      this.facilities.forEach((item, index) => {
        this.$refs.facilityImageUploader[index].reset();
      });
    },
    resetValidation(ref) {
      const element = this.$refs[ref];
      if (element) {
        this.$refs[ref].reset();
      }
    },
  },
};
</script>
