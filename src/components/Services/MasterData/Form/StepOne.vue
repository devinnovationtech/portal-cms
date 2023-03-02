<template>
  <fieldset>
    <Collapse
      title="Informasi Layanan"
      class="mb-5"
    >
      <section class="grid grid-cols-2 gap-x-8 gap-y-4">
        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Nama Perangkat Daerah
          </label>
          <JdsInputText
            placeholder="Autofill"
          />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Urusan Pemerintahan
          </label>
          <JdsSelect />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Sub Urusan Pemerintahan
          </label>
          <JdsSelect />
        </div>

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Bentuk Layanan
          </label>
          <JdsSelect />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Jenis Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan jenis layanan"
          />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Sub Jenis Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan sub jenis layanan"
          />
        </div>

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Nama Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan nama layanan"
          />
        </div>

        <JdsSectionMessage
          show
          variant="info"
          class="col-span-2"
          message="Jika tidak ada nama program layanan, silakan isikan nama layanan di program layanan"
        />

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Nama Program Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan nama program layanan"
          />
        </div>

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Deskripsi Layanan
          </label>
          <textarea
            placeholder="Masukkan deskripsi layanan"
            rows="4"
            maxlength="500"
            class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
            hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
          />
          <p class="text-xs text-right text-gray-600">
            Tersisa xx karakter
          </p>
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Pengguna Layanan
          </label>
          <JdsSelect />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Kategori Layanan SPBE (RAL Level 2)
          </label>
          <JdsSelect />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Status Operasional
          </label>
          <JdsSelect />
        </div>

        <div class="flex flex-col">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Teknis Layanan
          </label>
          <JdsSelect />
        </div>

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Manfaat Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan manfaat layanan"
          />
        </div>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
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

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Fasilitas Layanan
          </label>
          <JdsInputText
            placeholder="Masukkan fasilitas layanan"
          />
        </div>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
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

        <div class="flex flex-col col-span-2">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
            Alamat Website Informasi Resmi
          </label>
          <JdsInputText
            prefix-text="https://"
            placeholder="Masukkan alamat website informasi resmi"
          />
        </div>

        <section class="col-span-2 grid grid-cols-2 gap-8">
          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Tautan Layanan
            </label>
            <JdsInputText
              prefix-text="GOOGLE_FORM"
              :prefix-config="tautanLayananOptions"
              placeholder="https://"
            />
          </div>

          <div class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Label Tautan
            </label>
            <JdsInputText
              placeholder="Masukkan label tautan"
            />
          </div>
        </section>

        <div class="flex justify-end col-span-2">
          <BaseButton
            type="button"
            class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
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
import Collapse from '@/common/components/Collapse';
import BaseButton from '@/common/components/BaseButton.vue';

import { DAY_MAP } from '@/common/constants';

export default {
  components: {
    Collapse,
    BaseButton,
  },
  data() {
    return {
      tautanLayananOptions: {
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
};
</script>
