<template>
  <fieldset>
    <Collapse
      title="Informasi Layanan"
      class="mb-5"
    >
      <section class="grid grid-cols-2 gap-x-8 gap-y-4">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label
            for="opd-name"
            class="font-lato text-blue-gray-800 mb-3 text-[15px]"
          >
            Nama Perangkat Daerah
          </label>
          <JdsInputText
            id="opd-name"
            v-model="OPDName"
            placeholder="Autofill"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Urusan Pemerintahan
          </label>
          <JdsSelect
            v-model="governmentAffair"
            :options="governmentAffairOptions"
            :filterable="true"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Sub Urusan Pemerintahan
          </label>
          <JdsSelect
            v-model="subGovernmentAffair"
            :options="subGovernmentAffairOptions"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Bentuk Layanan
          </label>
          <JdsSelect
            v-model="serviceForm"
            :options="serviceFormOptions"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Jenis Layanan
          </label>
          <JdsInputText
            v-model="serviceType"
            placeholder="Masukkan jenis layanan"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Sub Jenis Layanan
          </label>
          <JdsInputText
            v-model="subServiceType"
            placeholder="Masukkan sub jenis layanan"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Nama Layanan
          </label>
          <JdsInputText
            v-model="serviceName"
            placeholder="Masukkan nama layanan"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <JdsSectionMessage
          show
          variant="info"
          class="col-span-2"
          message="Jika tidak ada nama program layanan, silakan isikan nama layanan di program layanan"
        />

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Nama Program Layanan
          </label>
          <JdsInputText
            v-model="programName"
            placeholder="Masukkan nama program layanan"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Deskripsi Layanan
          </label>
          <textarea
            v-model="programDescription"
            placeholder="Masukkan deskripsi layanan"
            rows="4"
            maxlength="500"
            class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
            hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
          <p
            v-show="programDescriptionCharCounter"
            class="text-xs text-right text-gray-600"
          >
            Tersisa {{ programDescriptionCharCounter }} karakter
          </p>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Pengguna Layanan
          </label>
          <JdsSelect
            v-model="user"
            :options="serviceUserOptions"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Kategori Layanan SPBE (RAL Level 2)
          </label>
          <JdsSelect
            v-model="subServiceSPBE"
            :options="spbeRALOptions"
            :filterable="true"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Status Operasional
          </label>
          <JdsSelect
            v-model="operationalStatus"
            :options="operationalStatusOptions"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="flex flex-col"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Teknis Layanan
          </label>
          <JdsSelect
            v-model="technical"
            :options="technicalOptions"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider
          v-for="(benefit, index) in benefits"
          v-slot="{ errors }"
          :key="`step-one-benefit-${index}`"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Manfaat Layanan
          </label>
          <JdsInputText
            :value="benefits[index]"
            placeholder="Masukkan manfaat layanan"
            @input="setBenefitByIndex($event, index)"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
          <div
            v-if="index !== 0"
            class="flex justify-end"
          >
            <BaseButton
              type="button"
              class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
              @click="removeBenefit(index)"
            >
              <span>
                Hapus Manfaat
              </span>
              <template #icon-right>
                <JdsIcon
                  name="trash"
                  size="16px"
                  fill="#F44336"
                />
              </template>
            </BaseButton>
          </div>
        </ValidationProvider>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
            @click="addBenefit"
          >
            <span>
              Tambahkan Manfaat
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

        <JdsSectionMessage
          show
          variant="info"
          class="col-span-2"
          message="Jika Teknis Layanan bersifat online maka fasilitas layanan tidak aktif"
        />

        <ValidationProvider
          v-for="(facility, index) in facilities"
          v-slot="{ errors }"
          :key="`step-one-facility-${index}`"
          rules="required"
          class="flex flex-col col-span-2"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Fasilitas Layanan
          </label>
          <JdsInputText
            :value="facilities[index]"
            placeholder="Masukkan fasilitas layanan"
            :disabled="technical === 'ONLINE'"
            @input="setFacilityByIndex($event, index)"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>

          <div
            v-if="index !== 0"
            class="flex justify-end"
          >
            <BaseButton
              type="button"
              class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
              @click="removeFacility(index)"
            >
              <span>
                Hapus Fasilitas Layanan
              </span>
              <template #icon-right>
                <JdsIcon
                  name="trash"
                  size="16px"
                  fill="#F44336"
                />
              </template>
            </BaseButton>
          </div>
        </ValidationProvider>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
            :disabled="technical === 'ONLINE'"
            @click="addFacility"
          >
            <span>
              Tambahkan Fasilitas
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

        <ValidationProvider
          v-slot="{ errors }"
          class="flex flex-col col-span-2"
          rules="url"
        >
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Alamat Website Informasi Resmi
          </label>
          <JdsInputText
            v-model="website"
            prefix-text="https://"
            placeholder="Masukkan alamat website informasi resmi"
          />
          <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
        </ValidationProvider>

        <section
          v-for="(link, index) in links"
          :key="`step-one-links-${index}`"
          class="col-span-2 grid grid-cols-2 gap-x-8 gap-y-4"
        >
          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Tautan Layanan
            </label>
            <JdsInputText
              :value="links[index].link"
              prefix-text="GOOGLE_FORM"
              :prefix-config="serviceLinkOptions"
              placeholder="https://"
              @input="setLinkByIndex($event, index)"
              @change:prefix-text="setLinkTypeByIndex($event, index)"
            />
          </div>

          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Label Tautan
            </label>
            <JdsInputText
              :value="links[index].label"
              placeholder="Masukkan label tautan"
              @input="setLinkLabelByIndex($event, index)"
            />
          </div>

          <div
            v-if="index !== 0"
            class="col-span-2 flex justify-end"
          >
            <BaseButton
              type="button"
              class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
              @click="removeLink(index)"
            >
              <span>
                Hapus Fasilitas Layanan
              </span>
              <template #icon-right>
                <JdsIcon
                  name="trash"
                  size="16px"
                  fill="#F44336"
                />
              </template>
            </BaseButton>
          </div>
        </section>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
            @click="addLink"
          >
            <span>
              Tambahkan Tautan Layanan
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

        <div class="h-[130px] col-span-2" />
      </section>
    </Collapse>

    <Collapse
      title="Detail"
      class="mb-5"
    >
      <section class="grid grid-cols-2 gap-x-8 gap-y-4">
        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Syarat dan Ketentuan Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan syarat dan ketentuan layanan"
          />
        </div>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          >
            <span>
              Tambahkan Syarat dan Ketentuan
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

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Prosedur Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan prosedur layanan"
          />
        </div>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          >
            <span>
              Tambahkan Prosedur Layanan
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

        <JdsSectionMessage
          show
          variant="info"
          class="col-span-2"
          message="Tidak boleh menggunakan titik"
        />

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Tarif Layanan
          </label>
          <JdsInputText
            placeholder="cth: 7000"
          />
        </div>

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Waktu Operasional
          </label>

          <JdsSectionMessage
            show
            variant="info"
            class="col-span-2 mb-3"
            message="Jika hari operasional tidak diceklis maka hari operasional tersebut Tutup"
          />

          <div
            v-for="(value, key) in dayMap"
            :key="key"
            class="grid grid-cols-[20px,160px,1fr,1fr] gap-x-3 mb-5 items-end"
          >
            <JdsCheckbox class="mb-2" />
            <div class="flex flex-col">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Hari
              </label>
              <JdsInputText
                :placeholder="value"
                :readonly="true"
              />
            </div>
            <div class="flex flex-col">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Pelayanan dibuka
              </label>
              <JdsInputText
                placeholder="cth: 6:00"
              />
            </div>
            <div class="flex flex-col">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Pelayanan ditutup
              </label>
              <JdsInputText
                placeholder="cth: 17:00"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Kontak Hotline  (Nomor HP/Telp)
          </label>
          <JdsInputText
            placeholder="cth: 022 2342345"
          />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Kontak Hotline  (Alamat E-mail)
          </label>
          <JdsInputText
            placeholder="cth: jabarprov@go.id"
          />
        </div>
      </section>
    </Collapse>

    <Collapse title="Lokasi Pelayanan">
      <section>
        <div
          v-for="index in 2"
          :key="`lokasi-pelayanan-${index}`"
          class="grid grid-cols-1 gap-x-8 gap-y-4"
        >
          <h3 class="font-roboto font-medium leading-7 text-base text-green-700">
            {{ index }}. Lokasi Pelayanan
          </h3>

          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Jenis Lokasi
            </label>
            <JdsSelect />
          </div>

          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Penanggung Jawab Lokasi
            </label>
            <JdsSelect />
          </div>

          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Nama Lokasi
            </label>
            <JdsInputText
              placeholder="Masukkan nama lokasi"
            />
          </div>

          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Alamat Lokasi
            </label>
            <textarea
              placeholder="Masukkan alamat lokasi"
              rows="4"
              maxlength="255"
              class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
            hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
            />
            <p class="text-xs text-right text-gray-600">
              Tersisa xx karakter
            </p>
          </div>

          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Kontak Lokasi (Nomor HP/Telp)
            </label>
            <JdsInputText
              placeholder="Masukkan kontak lokasi"
            />
          </div>

          <div class="flex justify-end">
            <BaseButton
              type="button"
              class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
            >
              <span>
                Hapus Lokasi
              </span>
              <template #icon-right>
                <JdsIcon
                  name="trash"
                  size="16px"
                  fill="#F44336"
                />
              </template>
            </BaseButton>
          </div>

          <hr
            v-show="index !== 2"
            class="mb-4"
          >
        </div>
        <div class="flex justify-end mt-4">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          >
            <span>
              Tambahkan Lokasi
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
      </section>
    </Collapse>
  </fieldset>
</template>

<script>
import '@/common/helpers/vee-validate.js';
import { ValidationProvider } from 'vee-validate';
import Collapse from '@/common/components/Collapse';
import BaseButton from '@/common/components/BaseButton.vue';

import { DAY_MAP } from '@/common/constants';

export default {
  components: {
    ValidationProvider,
    Collapse,
    BaseButton,
  },
  data() {
    return {
      serviceFormOptions: [
        {
          value: 'ADMINISTRATIF',
          label: 'Administratif',
        },
        {
          value: 'BARANG',
          label: 'Barang',
        },
        {
          value: 'JASA',
          label: 'Jasa',
        },
      ],
      serviceUserOptions: [
        {
          value: 'UMUM',
          label: 'Umum',
        },
        {
          value: 'ASN',
          label: 'ASN',
        },
        {
          value: 'LEMBAGA',
          label: 'Lembaga',
        },
      ],
      operationalStatusOptions: [
        {
          value: 'ACTIVE',
          label: 'Aktif',
        },
        {
          value: 'NOT-ACTIVE',
          label: 'Non Aktif',
        },
      ],
      technicalOptions: [
        {
          value: 'OFFLINE',
          label: 'Offline',
        },
        {
          value: 'ONLINE',
          label: 'Online',
        },
      ],
      serviceLinkOptions: {
        valueKey: 'value',
        labelKey: 'label',
        options: [
          {
            value: 'GOOGLE_FORM',
            label: 'Google Form',
          },
          {
            value: 'GOOGLE_PLAYSTORE',
            label: 'Playstore',
          },
          {
            value: 'APP_STORE',
            label: 'App Store',
          },
          {
            value: 'WEBSITE',
            label: 'Website',
          },
        ],
      },
      dayMap: DAY_MAP,
    };
  },
  computed: {
    OPDName: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.opd_name;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_OPD_NAME', value);
      },
    },
    governmentAffairOptions() {
      return this.$store.getters['masterDataForm/governmentAffairOptions'];
    },
    governmentAffair: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.government_affair;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_GOVERNMENT_AFFAIR', value);
        this.$store.commit('masterDataForm/RESET_STEP_ONE_SUB_GOVERNMENT_AFFAIR');
      },
    },
    subGovernmentAffairOptions() {
      return this.$store.getters['masterDataForm/subGovernmentAffairOptions'];
    },
    subGovernmentAffair: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.sub_government_affair;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_SUB_GOVERNMENT_AFFAIR', value);
      },
    },
    serviceForm: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.form;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_SERVICE_FORM', value);
      },
    },
    serviceType: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.type;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_SERVICE_TYPE', value);
      },
    },
    subServiceType: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.sub_service_type;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_SUB_SERVICE_TYPE', value);
      },
    },
    serviceName: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.name;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_SERVICE_NAME', value);
      },
    },
    programName: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.program_name;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_PROGRAM_NAME', value);
      },
    },
    programDescription: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.description;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_PROGRAM_DESCRIPTION', value);
      },
    },
    programDescriptionCharCounter() {
      if (this.programDescription !== '') {
        return 500 - this.programDescription.length;
      }
      return null;
    },
    user: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.user;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_USER', value);
      },
    },
    spbeRALOptions() {
      return this.$store.getters['masterDataForm/spbeRALOptions'];
    },
    subServiceSPBE: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.sub_service_spbe;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_SUB_SERVICE_SPBE', value);
      },
    },
    operationalStatus: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.operational_status;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_OPERATIONAL_STATUS', value);
      },
    },
    technical: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.technical;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_TECHNICAL', value);
      },
    },
    benefits() {
      return this.$store.state.masterDataForm.stepOne.services.information.benefits;
    },
    facilities() {
      return this.$store.state.masterDataForm.stepOne.services.information.facilities;
    },
    website: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.information.website;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_WEBSITE', value);
      },
    },
    links() {
      return this.$store.state.masterDataForm.stepOne.services.information.links;
    },
  },
  methods: {
    addBenefit() {
      this.$store.commit('masterDataForm/ADD_STEP_ONE_BENEFIT');
    },
    removeBenefit(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_ONE_BENEFIT', index);
    },
    setBenefitByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_BENEFIT', { value, index });
    },
    addFacility() {
      this.$store.commit('masterDataForm/ADD_STEP_ONE_FACILITIES');
    },
    removeFacility(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_ONE_FACILITIES', index);
    },
    setFacilityByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_FACILITIES', { value, index });
    },
    addLink() {
      this.$store.commit('masterDataForm/ADD_STEP_ONE_LINKS');
    },
    removeLink(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_ONE_LINKS', index);
    },
    setLinkTypeByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LINK_TYPE', { value, index });
    },
    setLinkLabelByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LINK_LABEL', { value, index });
    },
    setLinkByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LINK', { value, index });
    },
  },
};
</script>
