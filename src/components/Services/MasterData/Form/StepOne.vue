<template>
  <ValidationObserver ref="formStepOne">
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
              readonly
              :error-message="errors[0]"
            />
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
              placeholder="Pilih urusan pemerintahan"
              :options="governmentAffairOptions"
              :filterable="true"
              filter-type="contain"
            />
            <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
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
              placeholder="Pilih sub urusan pemerintahan"
              :options="subGovernmentAffairOptions"
              :filterable="true"
              filter-type="contain"
            />
            <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
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
              placeholder="Pilih bentuk layanan"
              :options="serviceFormOptions"
            />
            <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
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
              :error-message="errors[0]"
            />
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
              :error-message="errors[0]"
            />
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
              :error-message="errors[0]"
            />
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
              :error-message="errors[0]"
            />
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
            <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
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
              placeholder="Pilih pengguna layanan"
              :options="serviceUserOptions"
            />
            <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            class="flex flex-col"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Kategori Layanan SPBE (RAL Level 2)
            </label>
            <JdsSelect
              v-model="subServiceSPBE"
              placeholder="Pilih kategori layanan SPBE"
              :options="spbeRALOptions"
              :filterable="true"
              filter-type="contain"
            />
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
              placeholder="Pilih status operasional"
              :options="operationalStatusOptions"
            />
            <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
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
              placeholder="Pilih teknis layanan"
              :options="technicalOptions"
            />
            <span class="font-lato text-[13px] text-red-600 mt-1">{{ errors[0] }}</span>
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
              :error-message="errors[0]"
              @input="setBenefitByIndex($event, index)"
            />
            <div
              v-if="benefits.length > 1"
              class="flex justify-end"
            >
              <BaseButton
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500 mt-4"
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
            :rules="technical === 'ONLINE' ? '' : 'required'"
            class="flex flex-col col-span-2"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Fasilitas Layanan
            </label>
            <JdsInputText
              :value="facilities[index]"
              placeholder="Masukkan fasilitas layanan"
              :disabled="technical === 'ONLINE'"
              :error-message="errors[0]"
              @input="setFacilityByIndex($event, index)"
            />

            <div
              v-if="facilities.length > 1"
              class="flex justify-end"
            >
              <BaseButton
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500 mt-4"
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
              placeholder="Masukkan alamat website informasi resmi"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            v-for="(link, index) in links"
            :key="`step-one-links-${index}`"
            v-slot="{ errors }"
            class="col-span-2 grid grid-cols-2 gap-x-8 gap-y-4"
            rules="url"
          >
            <div class="flex flex-col">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Tautan Layanan
              </label>
              <JdsInputText
                :value="links[index].tautan"
                :prefix-text="links[index].type"
                :prefix-config="serviceLinkOptions"
                placeholder="https://"
                :error-message="errors[0]"
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
              v-if="links.length > 1"
              class="col-span-2 flex justify-end"
            >
              <BaseButton
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
                @click="removeLink(index)"
              >
                <span>
                  Hapus Tautan
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
          <ValidationProvider
            v-for="(_, index) in termsAndConditions"
            :key="`step-one-terms-and-condition-${index}`"
            v-slot="{ errors }"
            class="flex flex-col col-span-2"
            rules="required"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Syarat dan Ketentuan Layanan
            </label>
            <JdsInputText
              :value="termsAndConditions[index]"
              placeholder="Masukkan syarat dan ketentuan layanan"
              :error-message="errors[0]"
              @input="setTermAndConditionByIndex($event, index)"
            />

            <div
              v-if="termsAndConditions.length > 1"
              class="flex justify-end"
            >
              <BaseButton
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500 mt-4"
                @click="removeTermAndCondition(index)"
              >
                <span>
                  Hapus Syarat dan Ketentuan Layanan
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
              @click="addTermAndCondition"
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

          <ValidationProvider
            v-for="(_, index) in serviceProcedures"
            :key="`step-one-service-procedure-${index}`"
            v-slot="{ errors }"
            class="flex flex-col col-span-2"
            rules="required"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Prosedur Layanan
            </label>
            <JdsInputText
              :value="serviceProcedures[index]"
              placeholder="Masukkan prosedur layanan"
              :error-message="errors[0]"
              @input="setServiceProcedureByIndex($event, index)"
            />

            <div
              v-if="serviceProcedures.length > 1"
              class="flex justify-end"
            >
              <BaseButton
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500 mt-4"
                @click="removeServiceProcedure(index)"
              >
                <span>
                  Hapus Prosedur Layanan
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
              @click="addServiceProcedure"
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

          <ValidationProvider
            v-slot="{ errors }"
            class="flex flex-col col-span-2"
            rules="required|numeric"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Tarif Layanan
            </label>

            <JdsSectionMessage
              show
              variant="info"
              class="col-span-2 mb-3"
              message="Tidak boleh menggunakan titik"
            />

            <JdsInputText
              v-model="serviceFee"
              placeholder="cth: 7000"
              :error-message="errors[0]"
            />
          </ValidationProvider>

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
              v-for="(item, index) in operationalTime"
              :key="`step-one-operational-time-${index}`"
              class="grid grid-cols-[20px,160px,1fr,1fr] gap-x-3 mb-8 items-end"
            >
              <JdsCheckbox
                class="mb-2"
                :checked="operationalTime[index].selected"
                @change="setOperationalTimeDayByIndex(index)"
              />
              <div class="flex flex-col">
                <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                  Hari
                </label>
                <JdsInputText
                  :placeholder="dayMap[item.day]"
                  :readonly="true"
                />
              </div>
              <ValidationProvider
                v-slot="{ errors }"
                :rules="operationalTime[index].selected ? `required|timeformat|timebefore:${operationalTime[index].end}`: ''"
                class="flex flex-col relative"
              >
                <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                  Pelayanan dibuka
                </label>
                <TimePicker
                  :value="operationalTime[index].start"
                  :disabled="!operationalTime[index].selected"
                  placeholder="cth: 06:00"
                  manual-input
                  close-on-complete
                  @input="setOperationalStartTimeByIndex($event, index)"
                />
                <span class="absolute bottom-[-24px] font-lato text-[13px] text-red-700 mt-1">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                class="flex flex-col relative"
                :rules="operationalTime[index].selected ? 'required|timeformat': ''"
              >
                <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                  Pelayanan ditutup
                </label>
                <TimePicker
                  :value="operationalTime[index].end"
                  :disabled="!operationalTime[index].selected"
                  placeholder="cth: 17:00"
                  manual-input
                  close-on-complete
                  @input="setOperationalEndTimeByIndex($event, index)"
                />
                <span class="absolute bottom-[-24px] font-lato text-[13px] text-red-700 mt-1">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider
            v-slot="{ errors }"
            class="flex flex-col"
            rules="required|phonenumber"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Kontak Hotline  (Nomor HP/Telp)
            </label>
            <JdsInputText
              v-model="hotlineNumber"
              placeholder="cth: 022 2342345"
              :error-message="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            class="flex flex-col"
            rules="required|email"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Kontak Hotline  (Alamat E-mail)
            </label>
            <JdsInputText
              v-model="hotlineMail"
              placeholder="cth: jabarprov@go.id"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </section>
      </Collapse>

      <Collapse title="Lokasi Pelayanan">
        <section>
          <div
            v-for="(_,index) in locations"
            :key="`lokasi-pelayanan-${index}`"
            class="grid grid-cols-1 gap-x-8 gap-y-4"
          >
            <h3 class="font-roboto font-medium leading-7 text-base text-green-700">
              {{ index + 1 }}. Lokasi Pelayanan
            </h3>

            <ValidationProvider
              class="flex flex-col"
              tag="div"
            >
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Jenis Lokasi
              </label>
              <JdsSelect
                :value="locations[index].type"
                :options="typeLocationOptions"
                placeholder="Pilih Jenis Lokasi"
                @change="onChangeTypeLocation($event, index)"
              />
            </ValidationProvider>

            <div class="flex flex-col">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Penanggung Jawab Lokasi
              </label>
              <JdsSelect
                :value="locations[index].organization"
                :options="onCheckOption(index)"
                :filterable="true"
                filter-type="contain"
                :auto-close="true"
                placeholder="Pilih Penanggung Jawab Lokasi"
                @change="onChangeOrganization($event, index)"
              />
            </div>

            <ValidationProvider
              class="flex flex-col"
              tag="div"
            >
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Nama Lokasi
              </label>
              <JdsInputText
                :value="locations[index].name"
                placeholder="Masukkan nama lokasi"
                :readonly="locations[index].type === 'UNIT'"
                @input="setLocationName($event, index)"
              />
            </ValidationProvider>

            <ValidationProvider
              class="flex flex-col"
              tag="div"
            >
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Alamat Lokasi
              </label>
              <textarea
                :value="locations[index].address"
                :readonly="locations[index].type === 'UNIT'"
                placeholder="Masukkan alamat lokasi"
                rows="4"
                maxlength="255"
                class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
            hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                @input="setAddress($event.target.value, index)"
              />
              <p
                v-show="locations[index].address"
                class="text-xs text-right text-gray-600"
              >
                Tersisa {{ locations[index].address && 255 - locations[index].address.length }} karakter
              </p>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{errors}"
              class="flex flex-col"
              tag="div"
              rules="phonenumber"
            >
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Kontak Lokasi (Nomor HP/Telp)
              </label>
              <JdsInputText
                :value="locations[index].phone_number"
                placeholder="Masukkan kontak lokasi"
                :error-message="errors[0]"
                @input="setPhoneNumberOfContactLocation($event, index)"
              />
            </ValidationProvider>

            <div
              v-if="locations.length > 1"
              class="flex justify-end"
            >
              <BaseButton
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
                @click="removeItemLocation(index)"
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
              v-show="!(locations[index] === locations.slice(-1)[0])"
              class="mb-4"
            >
          </div>
          <div class="flex justify-end mt-4">
            <BaseButton
              type="button"
              class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
              @click="addItemLocation"
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
  </ValidationObserver>
</template>

<script>
import '@/common/helpers/vee-validate.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Collapse from '@/common/components/Collapse';
import BaseButton from '@/common/components/BaseButton.vue';
import TimePicker from '@/common/components/TimePicker.vue';

import { DAY_MAP } from '@/common/constants';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Collapse,
    BaseButton,
    TimePicker,
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
          label: 'Tidak Aktif',
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
      typeLocationOptions: [
        {
          label: 'Unit',
          value: 'UNIT',
        },
        {
          label: 'Khusus',
          value: 'KHUSUS',
        },
      ],
      organizationUnitOptions: [
        {
          label: 'Cabdin',
          value: 'CABDIN',
        },
        {
          label: 'UPTD',
          value: 'UPTD',
        },
        {
          label: 'BLUD',
          value: 'BLUD',
        },
      ],
      dayMap: DAY_MAP,
    };
  },
  computed: {
    OPDName() {
      return this.$store.getters['auth/unitName'];
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
    termsAndConditions() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.terms_and_conditions;
    },
    serviceProcedures() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.service_procedures;
    },
    serviceFee: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.service_detail.service_fee;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_SERVICE_FEE', value);
      },
    },
    operationalTime() {
      return this.$store.state.masterDataForm.stepOne.services.service_detail.operational_time;
    },
    hotlineNumber: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.service_detail.hotline_number;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_HOTLINE_NUMBER', value);
      },
    },
    hotlineMail: {
      get() {
        return this.$store.state.masterDataForm.stepOne.services.service_detail.hotline_mail;
      },
      set(value) {
        this.$store.commit('masterDataForm/SET_STEP_ONE_HOTLINE_MAIL', value);
      },
    },
    locations() {
      return this.$store.state.masterDataForm.stepOne.services.location;
    },
    organizationOptions() {
      return this.$store.getters['masterDataForm/organizationOptions'];
    },
  },
  deactivated() {
    // Trigger validation message when component deactivated
    this.$refs.formStepOne.validate();
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
    addTermAndCondition() {
      this.$store.commit('masterDataForm/ADD_STEP_ONE_TERM_AND_CONDITION');
    },
    removeTermAndCondition(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_ONE_TERM_AND_CONDITION', index);
    },
    setTermAndConditionByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_TERM_AND_CONDITION', { value, index });
    },
    addServiceProcedure() {
      this.$store.commit('masterDataForm/ADD_STEP_ONE_SERVICE_PROCEDURE');
    },
    removeServiceProcedure(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_ONE_SERVICE_PROCEDURE', index);
    },
    setServiceProcedureByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_SERVICE_PROCEDURE', { value, index });
    },
    setOperationalTimeDayByIndex(index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_OPERATIONAL_TIME_DAY', { index });
    },
    setOperationalStartTimeByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_OPERATIONAL_TIME_START', { value, index });
    },
    setOperationalEndTimeByIndex(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_OPERATIONAL_TIME_END', { value, index });
    },
    addItemLocation(value, index) {
      this.$store.commit('masterDataForm/ADD_STEP_ONE_LOCATION', { value, index });
    },
    removeItemLocation(index) {
      this.$store.commit('masterDataForm/REMOVE_STEP_ONE_LOCATION', index);
    },
    onChangeTypeLocation(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LOCATION_TYPE', { value, index });
    },
    setLocationName(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LOCATION_NAME', { value, index });
    },
    setAddress(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LOCATION_ADDRESS', { value, index });
    },
    setPhoneNumberOfContactLocation(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LOCATION_PHONE_NUMBER', { value, index });
    },
    onChangeOrganization(value, index) {
      this.$store.commit('masterDataForm/SET_STEP_ONE_LOCATION_ORGANIZATION', { value, index });
    },
    onCheckOption(index) {
      switch (this.locations[index].type) {
        case 'UNIT':
          return this.organizationOptions;
        case 'KHUSUS':
          return this.organizationUnitOptions;
        default:
          return [];
      }
    },
  },
};
</script>
