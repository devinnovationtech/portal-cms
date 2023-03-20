<template>
  <BaseModal :open="open">
    <template #header>
      <div class="w-full px-6 py-4 ">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px]">
          {{ title }}
        </h1>
      </div>
      <hr>
      <TabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        class="px-6 my-4"
      />
    </template>
    <section class="w-full min-w-[600px] h-full pb-4 text-blue-gray-800">
      <template v-if="currentTab === 'service'">
        <div class="px-4 py-3 bg-white border-b border-b-[#F4F4F4]">
          <h2 class="font-roboto text-base leading-6 text-green-700">
            Informasi Layanan
          </h2>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Nama Perangkat Daerah:
          </p>
          <p>{{ OPDName || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Nama Layanan:
          </p>
          <p>{{ serviceName || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Nama Program Layanan:
          </p>
          <p>{{ programName || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Deskripsi Layanan:
          </p>
          <p>{{ programDescription || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Pengguna Layanan:
          </p>
          <p>{{ user }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Kategori Layanan SPBE (RAL 2):
          </p>
          <p>{{ subServiceSPBE || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Status Operasional:
          </p>
          <p
            class="w-fit font-lato px-[10px] rounded-[5px] font-bold text-[14px] leading-[23px] capitalize mt-2"
            :class="{
              'bg-green-50 text-green-700' : operationalStatus === 'ACTIVE',
              'bg-gray-200 text-gray-600' : operationalStatus === 'NOT-ACTIVE'
            }"
          >
            <span>{{ operationalStatus.toLowerCase() }}</span>
          </p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Teknis Layanan:
          </p>
          <p
            :class="{
              'w-fit rounded-[6px] px-2 py-[2px] font-lato font-bold text-[14px] leading-[23px] capitalize mt-2' : true,
              'bg-[#E3F0FF] text-blue-800': technical === 'ONLINE',
              'bg-gray-200 text-gray-600': technical === 'OFFLINE'
            }"
          >
            <span
              :class="{
                'w-2 h-2 rounded-full inline-block mr-[5px]': true,
                'bg-blue-800': technical === 'ONLINE',
                'bg-gray-600': technical === 'OFFLINE',
              }"
            />
            {{ technical.toLowerCase() }}
          </p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Manfaat Layanan:
          </p>
          <ul>
            <li
              v-for="(benefit, index) in benefits"
              :key="`benefit-${index}`"
            >
              <span v-if="benefit !== ''">{{ index + 1 }}. {{ benefit }}</span>
              <span v-else> - </span>
            </li>
          </ul>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Fasilitas Layanan:
          </p>
          <ul>
            <li
              v-for="(facility, index) in facilities"
              :key="`facility-${index}`"
            >
              <span v-if="facility !== ''">{{ index + 1 }}. {{ facility }}</span>
              <span v-else> - </span>
            </li>
          </ul>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Alamat Website Informasi Resmi:
          </p>
          <a
            :href="website"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-blue-500"
          >
            {{ website || '-' }}
          </a>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Tautan:
          </p>
          <ul>
            <li
              v-for="(link, index) in links"
              :key="`link-${index}`"
            >
              <p v-if="link.tautan !== ''">
                {{ link.label }} :
                <a
                  :href="link.tautan"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline text-blue-500"
                >
                  {{ link.tautan }}
                </a>
              </p>
              <p v-else>
                -
              </p>
            </li>
          </ul>
        </div>

        <div class="px-4 py-3 bg-white border-b border-b-[#F4F4F4]">
          <h2 class="font-roboto text-base leading-6 text-green-700">
            Detail
          </h2>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Syarat dan Ketentuan Layanan:
          </p>
          <ul>
            <li
              v-for="(item, index) in termsAndConditions"
              :key="`terms-${index}`"
            >
              <span v-if="item !== ''">{{ index + 1 }}. {{ item }}</span>
              <span v-else> - </span>
            </li>
          </ul>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Prosedur Layanan:
          </p>
          <ul>
            <li
              v-for="(item, index) in serviceProcedures"
              :key="`procedure-${index}`"
            >
              <span v-if="item !== ''">{{ index + 1 }}. {{ item }}</span>
              <span v-else> - </span>
            </li>
          </ul>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Tarif Layanan:
          </p>
          <p>{{ serviceFee || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Waktu Operasional:
          </p>
          <ul>
            <li
              v-for="(item, index) in operationalTime"
              :key="`operational-time-${index}`"
            >
              <span>{{ `${dayMap[item.day]} ${item.start} - ${item.end}` }}</span>
            </li>
          </ul>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Kontak Hotline (Nomor HP/Telp):
          </p>
          <p>{{ hotlineNumber || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Kontak Hotline (Alamat Email):
          </p>
          <a
            :href="`mailto: ${hotlineMail}`"
            class="underline text-blue-500"
          >
            {{ hotlineMail || '-' }}
          </a>
        </div>

        <div
          v-for="(location, index) in locations"
          :key="`location-${index}`"
        >
          <div class="px-4 py-3 bg-white border-b border-b-[#F4F4F4]">
            <h2 class="font-roboto text-base leading-6 text-green-700">
              Lokasi Pelayanan {{ index + 1 }}
            </h2>
          </div>
          <hr>

          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Jenis Lokasi:
            </p>
            <p>{{ location.type || '-' }}</p>
          </div>

          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Penanggung Jawab Lokasi:
            </p>
            <p>{{ location.organization || '-' }}</p>
          </div>

          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Nama Lokasi:
            </p>
            <p>{{ location.name || '-' }}</p>
          </div>

          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Alamat Lokasi:
            </p>
            <p>{{ location.address || '-' }}</p>
          </div>

          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Kontak Lokasi (Nomor HP/Telp):
            </p>
            <p>{{ location.phone_number || '-' }}</p>
          </div>
        </div>
      </template>

      <template v-if="currentTab === 'application'">
        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Status Ketersediaan Aplikasi:
          </p>
          <p>{{ applicationStatus || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Nama Aplikasi:
          </p>
          <p>{{ applicationName || '-' }}</p>
        </div>

        <div
          v-for="(item, index) in applicationFeatures"
          :key="`feature-${index}`"
        >
          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Fitur Aplikasi:
            </p>
            <p>{{ item.name || '-' }}</p>
          </div>

          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Deskripsi Fitur:
            </p>
            <p>{{ item.description || '-' }}</p>
          </div>
        </div>
      </template>

      <template v-if="currentTab === 'additional_information'">
        <div class="px-4 py-3 bg-white border-b border-b-[#F4F4F4]">
          <h2 class="font-roboto text-base leading-6 text-green-700">
            Penanggung Jawab
          </h2>
        </div>
        <hr>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Nama Pejabat Penanggung Jawab:
          </p>
          <p>{{ responsibleName || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Nomor Kontak (HP/Telp):
          </p>
          <p>{{ phoneNumber || '-' }}</p>
        </div>

        <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
          <p class="font-roboto text-base leading-6 text-[#627798]">
            Alamat Email:
          </p>
          <a
            :href="`mailto: ${email}`"
            class="underline text-blue-500"
          >
            {{ email || '-' }}
          </a>
        </div>

        <div class="px-4 py-3 bg-white border-b border-b-[#F4F4F4]">
          <h2 class="font-roboto text-base leading-6 text-green-700">
            Media Sosial
          </h2>
        </div>
        <hr>

        <div
          v-for="(item, index) in socialMedias"
          :key="`social-media-${index}`"
        >
          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              Nama Media Sosial Layanan:
            </p>
            <p>{{ item.name || '-' }}</p>
          </div>
          <div class="px-4 py-3 bg-white even:bg-[#FCFCFC]">
            <p class="font-roboto text-base leading-6 text-[#627798]">
              {{ item.type }}
            </p>
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="underline text-blue-500"
            >
              {{ item.link || '-' }}
            </a>
          </div>
        </div>
      </template>
    </section>

    <template #footer>
      <section class="flex w-full h-full items-center justify-center gap-4 p-2">
        <BaseButton
          type="button"
          class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
          @click="$emit('close')"
        >
          Batal
        </BaseButton>
        <BaseButton
          type="button"
          class="bg-green-700 hover:bg-green-600 text-sm text-white"
          @click="$emit('submit')"
        >
          {{ submitButtonLabel }}
        </BaseButton>
      </section>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';
import TabBar from '@/common/components/TabBar';

import { DAY_MAP } from '@/common/constants';

const USER_MAP = {
  UMUM: 'Umum',
  ASN: 'ASN',
  LEMBAGA: 'Lembaga',
};

const LOCATION_TYPE_MAP = {
  KHUSUS: 'Khusus',
  UNIT: 'Unit',
};

const APPLICATION_STATUS_MAP = {
  AVAILABLE: 'Tersedia',
  'NOT-AVAILABLE': 'Tidak Tersedia',
};

export default {
  components: {
    BaseModal,
    BaseButton,
    TabBar,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    submitButtonLabel: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentTab: 'service',
      dayMap: DAY_MAP,
    };
  },
  computed: {
    tabs() {
      if (this.technical === 'ONLINE') {
        return [
          { key: 'service', label: 'Pelayanan' },
          { key: 'application', label: 'Aplikasi' },
          { key: 'additional_information', label: 'Informasi Tambahan' },
        ];
      }

      return [
        { key: 'service', label: 'Pelayanan' },
        { key: 'additional_information', label: 'Informasi Tambahan' },
      ];
    },
    OPDName() {
      return this.$store.state.auth.user.unit.name;
    },
    serviceName() {
      return this.$store.state.masterDataForm.stepOne.services.information.name;
    },
    programName() {
      return this.$store.state.masterDataForm.stepOne.services.information.program_name;
    },
    programDescription() {
      return this.$store.state.masterDataForm.stepOne.services.information.description;
    },
    user() {
      const { user } = this.$store.state.masterDataForm.stepOne.services.information;

      return USER_MAP[user] ?? '-';
    },
    subServiceSPBE() {
      return this.$store.state.masterDataForm.stepOne.services.information.sub_service_spbe;
    },
    operationalStatus() {
      return this.$store.state.masterDataForm.stepOne.services.information.operational_status;
    },
    technical() {
      return this.$store.state.masterDataForm.stepOne.services.information.technical;
    },
    benefits() {
      return this.$store.state.masterDataForm.stepOne.services.information.benefits;
    },
    facilities() {
      return this.$store.state.masterDataForm.stepOne.services.information.facilities;
    },
    website() {
      return this.$store.state.masterDataForm.stepOne.services.information.website;
    },
    links() {
      return this.$store.state.masterDataForm.stepOne.services.information.links;
    },
    termsAndConditions() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.terms_and_conditions;
    },
    serviceProcedures() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.service_procedures;
    },
    serviceFee() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.service_fee;
    },
    operationalTime() {
      const operationalTimes = this.$store.state.masterDataForm.stepOne.services.service_detail.operational_time;
      return operationalTimes.filter((item) => item.selected);
    },
    hotlineNumber() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.hotline_number;
    },
    hotlineMail() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.hotline_mail;
    },
    locations() {
      const locations = this.$store.state.masterDataForm.stepOne.services.location;

      return locations.map((item) => ({
        ...item,
        type: LOCATION_TYPE_MAP[item.type] ?? '-',
      }));
    },
    applicationStatus() {
      const { status } = this.$store.state.masterDataForm.stepTwo.application;

      return APPLICATION_STATUS_MAP[status] ?? '-';
    },
    applicationName() {
      return this.$store.state.masterDataForm.stepTwo.application.name;
    },
    applicationFeatures() {
      return this.$store.state.masterDataForm.stepTwo.application.features;
    },
    responsibleName() {
      return this.$store.state.masterDataForm.stepThree.additional_information.responsible_name;
    },
    phoneNumber() {
      return this.$store.state.masterDataForm.stepThree.additional_information.phone_number;
    },
    email() {
      return this.$store.state.masterDataForm.stepThree.additional_information.email;
    },
    socialMedias() {
      return this.$store.state.masterDataForm.stepThree.additional_information.social_media;
    },
  },

};
</script>
