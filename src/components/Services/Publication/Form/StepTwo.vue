<template>
  <ValidationObserver ref="formStepTwo">
    <fieldset>
      <Collapse
        title="Detail"
        class="mb-4 grid grid-cols-1"
      >
        <section class="grid grid-cols-1 gap-4">
          <div class="flex flex-row gap-x-4">
            <h3 class="self-center font-roboto font-bold text-green-800 text-[14px] leading-[23px] min-w-fit">
              Cover Gambar
            </h3>
            <hr class="self-center w-full h-[2px] bg-gray-300 my-[32px]">
          </div>

          <JdsSectionMessage
            show
            variant="info"
            class="col-span-2"
            message="Anda dapat memasukkan minimal 1 Gambar/Video."
          />

          <ValidationProvider
            ref="coverImageUploader"
            v-slot="{ errors }"
            :rules="coverImageValidationRules"
            class="col-span-2"
            tag="div"
          >
            <Dropzone
              id="coverImage"
              accept="image/jpeg, image/png, image/jpg"
              :disabled="isDisable || !!coverImageFile"
              :is-error="errors.length > 0"
              :is-youtube-field="true"
              @click="showLinkYoutubeField"
              @change="handleUploadCoverImage($event)"
            >
              <template #description>
                <span class="mt-auto text-sm text-blue-gray-300 text-center">
                  Ukuran Maksimal file upload 5 Mb dengan resolusi 816 x 460 pixel.(.jpg dan.png)
                </span>
              </template>
            </Dropzone>
            <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
          </ValidationProvider>
          <transition name="slide-fade">
            <DropzoneUploadProgress
              v-if="!!coverImageFile"
              :file="coverImageFile"
              :progress="coverImageProgress"
              :status="coverImageStatus"
              :image-url="coverImageUrl"
              :image-size="coverImageSize"
              class="mt-4"
              @retry="handleRetryUploadCoverImage(coverImageFile)"
              @delete="handleDeleteCoverImage(coverImageFile.name)"
            />
          </transition>
          <ValidationProvider
            v-if="isYoutubeLinkChosen"
            v-slot="{ errors }"
            class="flex flex-col col-span-2"
            rules="required|url"
          >
            <JdsInputText
              v-model="youtubeLink"
              placeholder="Masukkan URL youtube disini"
              :error-message="errors[0]"
            >
              <template #prefix-icon>
                <button
                  @click="closeLinkYoutubeField"
                >
                  <jds-icon
                    class="pt-1"
                    name="times"
                    size="1em"
                    fill="#EF5350"
                  />
                </button>
              </template>
              <template #suffix-icon>
                <a
                  :href="youtubeLink"
                  target="_blank"
                  :class="
                    {
                      'text-sm h-[28px] font-bold w-full px-4 text-center justify-center flex items-center rounded-lg border whitespace-nowrap border-green-700': true,
                      'text-gray-500 !border-gray-200 pointer-events-none' : youtubeLink === '' || !!errors[0],
                      'text-green-700' : !errors[0]
                    }
                  "
                >
                  Buka Link
                </a>
              </template>
            </JdsInputText>
          </ValidationProvider>
        </section>

        <section class="grid grid-cols-1 gap-4 mb-4">
          <div class="flex flex-row gap-x-4">
            <h3 class="self-center font-roboto font-bold text-green-800 text-[14px] leading-[23px] min-w-fit">
              Gambar Konten <span class="font-lato font-normal text-gray-500">(Opsional)</span>
            </h3>
            <hr class="self-center w-full h-[2px] bg-gray-300 my-[32px]">
          </div>

          <div
            v-for="(_, index) in contentImages"
            :key="index"
          >
            <ValidationProvider
              ref="contentImageUploader"
              v-slot="{ errors }"
              rules="image|size:5000|maxdimensions:816,460"
              class="col-span-2"
              tag="div"
            >
              <Dropzone
                :id="`contentImage-${index}`"
                accept="image/jpeg, image/png, image/jpg"
                :is-error="errors.length > 0"
                :disabled="!!contentImages[index].image_file"
                @change="handleUploadImage($event, index)"
              >
                <template #description>
                  <span class="mt-auto text-sm text-blue-gray-300 text-center">
                    Ukuran Maksimal file upload 5 Mb dengan resolusi 816 x 460 pixel.(.jpg dan.png)
                  </span>
                </template>
              </Dropzone>
              <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
            </ValidationProvider>
            <transition name="slide-fade">
              <DropzoneUploadProgress
                v-if="!!contentImages[index].image_file"
                :file="contentImages[index].image_file"
                :progress="contentImages[index].image_upload_progress"
                :status="contentImages[index].image_upload_status"
                :image-url="contentImages[index].file_download_uri"
                :image-size="contentImages[index].size"
                class="mt-4"
                @retry="handleRetryUpload(contentImages[index].image_file, index)"
                @delete="handleDeleteUpload(contentImages[index].file_name, index)"
              />
            </transition>

            <div
              v-if="contentImages.length > 1"
              class="col-span-2 flex justify-end"
            >
              <BaseButton
                type="button"
                class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500 mt-4"
                @click="removeContentImage(index)"
              >
                <span>
                  Hapus Gambar Konten
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
          </div>

          <div class="flex flex-row justify-end">
            <BaseButton
              type="button"
              class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
              @click="addContentImages"
            >
              <template #icon-right>
                <JdsIcon
                  name="plus-bold"
                  size="16px"
                  fill="#069550"
                  class="h-4 w-4"
                />
              </template>
              <span>
                Tambahkan Gambar Konten
              </span>
            </BaseButton>
          </div>
        </section>

        <section class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3 mb-5">
          <div class="flex flex-row gap-x-4">
            <JdsToggle
              v-model="isTermAndCondition"
              @change="resetTermAndConditionError"
            />
            <h3 class="font-roboto font-medium text-blue-gray-800 text-[16px] leading-[28px] pb-7">
              Syarat dan Ketentuan Layanan
            </h3>
            <span
              :class="{
                'text-[11px] leading-[28px] h-[32px] rounded-lg px-3 py-[3px] font-bold italic' : true,
                'bg-green-100 text-green-700' : isTermAndCondition,
                'bg-gray-300 text-gray-700' : !isTermAndCondition
              } "
            >
              {{ contentText }}
            </span>
          </div>

          <section class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3 flex flex-col gap-4">
            <ValidationProvider
              ref="termAndConditionServiceTitle"
              v-slot="{ errors }"
              rules="required"
              class="flex flex-col"
              tag="div"
            >
              <JdsInputText
                v-model="termAndContiditionTitle"
                placeholder="Judul Section"
                :disabled="!isTermAndCondition"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <div
              v-for="(_, index) in termAndContiditionItems"
              :key="`termsAndConditions-${index}`"
              class="grid grid-cols-2 gap-x-8 gap-y-4 w-full"
            >
              <div class="col-span-2 flex flex-row gap-x-4 w-full">
                <label class="font-lato font-medium text-blue-gray-800 text-[16px] leading-[26px] self-center">
                  {{ index + 1 }}.
                </label>
                <ValidationProvider
                  class="w-full"
                  tag="div"
                >
                  <JdsInputText
                    :disabled="!isTermAndCondition || !isMasterDataSelected"
                    :value="termAndContiditionItems[index].name"
                    class="w-full"
                    placeholder="Berisi Syarat dan Ketentuan"
                    readonly
                    @input="setTermAndConditienNameByIndex($event, index)"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  class="w-full"
                  rules="url"
                  tag="div"
                >
                  <JdsInputText
                    :value="termAndContiditionItems[index].link"
                    :disabled="!isTermAndCondition"
                    :error-message="errors[0]"
                    class="w-full"
                    placeholder="Berisi link (Opsional)"
                    @input="setTermAndConditienLinkByIndex($event, index)"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex flex-row gap-x-4">
              <h3 class="self-center font-roboto font-bold text-green-800 text-[14px] leading-[23px] min-w-fit">
                Cover Gambar <span class="font-lato font-normal text-gray-500">(Opsional)</span>
              </h3>
              <hr class="self-center w-full h-[2px] bg-gray-300 my-[32px]">
            </div>
            <ValidationProvider
              ref="desktopImageUploader"
              v-slot="{ errors }"
              rules="image|size:2000|maxdimensions:525,525"
              class="col-span-2"
              tag="div"
            >
              <Dropzone
                id="termAndConditionImage"
                accept="image/jpeg, image/png, image/jpg"
                :is-error="errors.length > 0"
                :disabled="!isTermAndCondition || !!termAndConditionImageFile"
                @change="handleUploadTermAndConditionImage($event)"
              >
                <template #description>
                  <span class="mt-auto text-sm text-blue-gray-300 text-center">
                    Ukuran Maksimal file upload 2 Mb dengan resolusi 525 x 525 Pixel.(.jpg dan.png)
                  </span>
                </template>
              </Dropzone>
              <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
            </ValidationProvider>
            <transition name="slide-fade">
              <DropzoneUploadProgress
                v-if="!!termAndConditionImageFile"
                :file="termAndConditionImageFile"
                :progress="termAndConditionImageProgress"
                :status="termAndConditionImageStatus"
                :image-url="termAndConditionImageUri"
                :image-size="termAndConditionImageSize"
                class="mt-4"
                @retry="handleRetryUploadTermAndConditionImage(termAndConditionImageFile)"
                @delete="handleDeleteTermAndConditionImage(termAndConditionImageFile.name)"
              />
            </transition>
          </section>
        </section>

        <section class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3 mb-5">
          <div class="flex flex-row gap-x-4">
            <JdsToggle
              v-model="isProcedure"
              @change="resetProcedureError"
            />
            <h3 class="font-roboto font-medium text-blue-gray-800 text-[16px] leading-[28px] pb-7">
              Alur atau Prosedur Penggunaan Layanan
            </h3>
            <span
              :class="{
                'text-[11px] leading-[28px] h-[32px] rounded-lg px-3 py-[3px] font-bold italic' : true,
                'bg-green-100 text-green-700' : isProcedure,
                'bg-gray-300 text-gray-700' : !isProcedure
              } "
            >
              {{ procedureText }}
            </span>
          </div>

          <section class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3 flex flex-col gap-4">
            <ValidationProvider
              ref="procedureServiceTitle"
              v-slot="{ errors }"
              rules="required"
              class="flex flex-col"
              tag="div"
            >
              <JdsInputText
                v-model="procedureTitle"
                placeholder="Judul Section"
                :disabled="!isProcedure"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <div
              v-for="(_, index) in procedureItems"
              :key="`procedure-${index}`"
              class="grid grid-cols-2 gap-x-8 gap-y-4"
            >
              <div class="col-span-2 flex flex-row gap-x-4">
                <p class="font-lato text-blue-gray-800 text-[16px] leading-[26px] self-center">
                  {{ index + 1 }}.
                </p>
                <ValidationProvider
                  class="w-full"
                  tag="div"
                >
                  <JdsInputText
                    :value="procedureItems[index].name"
                    :disabled="!isProcedure || !isMasterDataSelected"
                    class="w-full"
                    placeholder="Berisi alur atau prosedur"
                    readonly
                    @input="setProcedureItemByName($event, index)"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  class="w-full"
                  rules="url"
                  tag="div"
                >
                  <JdsInputText
                    :value="procedureItems[index].link"
                    placeholder="Berisi link (Opsional)"
                    :disabled="!isProcedure"
                    :error-message="errors[0]"
                    class="w-full"
                    @input="setProcedureItemByLink($event, index)"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="flex flex-row gap-x-4">
              <h3 class="self-center font-roboto font-bold text-green-800 text-[14px] leading-[23px] min-w-fit">
                Cover Gambar <span class="font-lato font-normal text-gray-500">(Opsional)</span>
              </h3>
              <hr class="self-center w-full h-[2px] bg-gray-300 my-[32px]">
            </div>
            <ValidationProvider
              ref="procedureImageUploader"
              v-slot="{ errors }"
              rules="image|size:2000|maxdimensions:520,650"
              class="col-span-2"
              tag="div"
            >
              <Dropzone
                id="procedureImage"
                accept="image/jpeg, image/png, image/jpg"
                :is-error="errors.length > 0"
                :disabled="!isProcedure || !!procedureImageFile"
                @change="handleUploadProcedureImage($event)"
              >
                <template #description>
                  <span class="mt-auto text-sm text-blue-gray-300 text-center">
                    Ukuran Maksimal file upload 2 Mb dengan resolusi 520 x 650 Pixel Pixel.(.jpg dan.png)
                  </span>
                </template>
              </Dropzone>
              <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
            </ValidationProvider>
            <transition name="slide-fade">
              <DropzoneUploadProgress
                v-if="!!procedureImageFile"
                :file="procedureImageFile"
                :progress="procedureImageProgress"
                :status="procedureImageStatus"
                :image-url="procedureImageUri"
                :image-size="procedureImageSize"
                class="mt-4"
                @retry="handleRetryUploadProcedureImage(procedureImageFile)"
                @delete="handleDeleteProcedureImage(procedureImageFile.name)"
              />
            </transition>
          </section>
        </section>

        <div class="flex flex-col col-span-2">
          <JdsSectionMessage
            show
            variant="info"
            class="col-span-2 mb-4"
            message="Tidak boleh menggunakan titik"
          />
          <div class="w-full flex flex-row gap-2">
            <div class="w-full flex flex-col gap-y-2">
              <label class="font-lato text-blue-gray-800 text-[15px] leading-[23px]">
                Tarif Layanan
              </label>
              <ValidationProvider>
                <JdsInputText
                  v-model="minimumFee"
                  class="w-full"
                  placeholder="cth: 7000"
                  readonly
                  :disabled="hasDescription"
                />
              </ValidationProvider>
            </div>
            <hr class="w-[10px] h-[2px] bg-gray-500 mt-[50px]">
            <div class="w-full grid grid-cols-2 gap-y-2">
              <label class="font-lato text-blue-gray-800 text-[15px]">
                Tarif Maksimal
              </label>
              <ValidationProvider class="col-span-4 mb-6">
                <JdsInputText
                  v-model="maximumFee"
                  class="w-full"
                  placeholder="cth: 7000"
                  readonly
                  :disabled="hasDescription || !maximumFee"
                />
              </ValidationProvider>
            </div>
          </div>
        </div>

        <div class="flex flex-col col-span-2 gap-y-2">
          <label class="font-lato text-blue-gray-800 text-[15px]">
            Keterangan Khusus
          </label>
          <ValidationProvider class="mb-6 w-full block">
            <JdsInputText
              v-model="specialDescription"
              class="w-full"
              placeholder="Masukkan keterangan khusus berupa text atau link"
              readonly
              :disabled="!hasDescription"
            />
          </ValidationProvider>
        </div>

        <div class="flex flex-col col-span-2 mb-4">
          <label class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]">
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
            :key="`operational-time-${index}`"
            class="grid grid-cols-[20px,160px,1fr,1fr] gap-x-3 mb-4 items-end"
          >
            <JdsCheckbox
              class="mb-2 pointer-events-none"
              :checked="operationalTime[index].selected"
            />
            <div class="flex flex-col">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Hari
              </label>
              <JdsInputText
                :placeholder="dayMap[item.day]"
                :disabled="!operationalTime[index].selected || !isMasterDataSelected"
                :readonly="true"
              />
            </div>
            <ValidationProvider class="flex flex-col relative">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Pelayanan dibuka
              </label>
              <TimePicker
                :input-class="{
                  'timepicker-readonly': !!operationalTime[index].selected
                }"
                :value="operationalTime[index].start"
                disabled
                placeholder="cth: 06:00"
                @input="setOperationalStartTimeByIndex($event, index)"
              />
            </ValidationProvider>
            <ValidationProvider class="flex flex-col relative">
              <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
                Pelayanan ditutup
              </label>
              <TimePicker
                :input-class="{
                  'timepicker-readonly': !!operationalTime[index].selected
                }"
                :value="operationalTime[index].end"
                disabled
                placeholder="cth: 17:00"
                @input="setOperationalEndTimeByIndex($event, index)"
              />
            </ValidationProvider>
          </div>

          <ValidationProvider
            class="flex flex-col mb-4"
            tag="div"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px] mt-20">
              Hotline Layanan (HP/Telp)
            </label>
            <JdsInputText
              v-model="hotlineNumber"
              :disabled="!isMasterDataSelected"
              placeholder="Berisi Hotline Layanan (HP/Telp)"
              readonly
            />
          </ValidationProvider>

          <ValidationProvider
            class="flex flex-col"
            tag="div"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Hotline Layanan (email)
            </label>
            <JdsInputText
              v-model="hotlineMail"
              :disabled="!isMasterDataSelected"
              placeholder="Berisi Layanan (Email)"
              readonly
            />
          </ValidationProvider>
        </div>

        <section
          class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3"
        >
          <div class="flex flex-row gap-x-4">
            <JdsToggle
              v-model="isInfographic"
              @change="resetInfographicError"
            />
            <h3 class="font-roboto font-medium text-blue-gray-800 text-[16px] leading-[28px] pb-7">
              Infografis Terkait Layanan
            </h3>
            <span
              :class="{
                'text-[11px] leading-[28px] h-[32px] rounded-lg px-3 py-[3px] font-bold italic' : true,
                'bg-green-100 text-green-700' : isInfographic,
                'bg-gray-300 text-gray-700' : !isInfographic
              } "
            >
              {{ infographicText }}
            </span>
          </div>
          <section class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3 flex flex-col gap-4">
            <div
              v-for="(_,index) in infographics"
              :key="`infographics-${index}`"
            >
              <ValidationProvider
                ref="infographicImage"
                v-slot="{ errors }"
                :rules="'image|size:2000|maxdimensions:525,525'"
                class="col-span-2"
                tag="div"
              >
                <Dropzone
                  :id="`infographic-${index}`"
                  accept="image/jpeg, image/png, image/jpg"
                  :is-error="errors.length > 0"
                  :disabled="!isInfographic || !!infographics[index].image_file"
                  @change="handleUploadInfographicImage($event, index)"
                >
                  <template #description>
                    <span class="mt-auto text-sm text-blue-gray-300 text-center">
                      Ukuran Maksimal file upload 2 Mb dengan resolusi 525 x 525 Pixel.(.jpg dan.png)
                    </span>
                  </template>
                </Dropzone>
                <span class="font-lato text-[13px] text-red-700 mt-3">{{ errors[0] }}</span>
                <transition name="slide-fade">
                  <DropzoneUploadProgress
                    v-if="!!infographics[index].image_file"
                    :file="infographics[index].image_file"
                    :progress="infographics[index].image_upload_progress"
                    :status="infographics[index].image_upload_status"
                    :image-url="infographics[index].file_download_uri"
                    :image-size="infographics[index].size"
                    class="mt-4"
                    @retry="handleRetryInfographicImage(infographics[index].image_file, index)"
                    @delete="handleDeleteInfographicImage(infographics[index].file_name, index)"
                  />
                </transition>
              </ValidationProvider>
              <div
                v-if="infographics.length > 1"
                class="col-span-2 flex justify-end"
              >
                <BaseButton
                  type="button"
                  class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500 mt-4"
                  :disabled="!isInfographic"
                  @click="removeInfographic(index)"
                >
                  <span>
                    Hapus Infografis
                  </span>
                  <template #icon-right>
                    <JdsIcon
                      name="trash"
                      size="16px"
                      :fill="isInfographic ? '#F44336' : '#757575'"
                    />
                  </template>
                </BaseButton>
              </div>
            </div>
            <div class="flex flex-row justify-end">
              <BaseButton
                type="button"
                class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
                :disabled="!isInfographic"
                @click="addInfographics"
              >
                <template #icon-right>
                  <JdsIcon
                    name="plus-bold"
                    size="16px"
                    :fill="isInfographic ? '#069550' : '#757575'"
                    class="h-4 w-4"
                  />
                </template>
                <span>
                  Tambahkan Infografis
                </span>
              </BaseButton>
            </div>
          </section>
        </section>
      </Collapse>

      <Collapse
        title="Lokasi Pelayanan"
        class="mb-4"
      >
        <div
          v-for="(_,index) in locations"
          :key="`lokasi-pelayanan-${index}`"
          class="grid grid-cols-1 gap-4 mb-4"
        >
          <h3 class="font-roboto font-medium leading-7 text-base text-green-700">
            {{ index + 1 }}. Lokasi Pelayanan
          </h3>

          <ValidationProvider
            class="flex flex-col mb-4"
            tag="div"
          >
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Jenis Lokasi
            </label>
            <JdsInputText
              :disabled="!isMasterDataSelected"
              :value="locations[index].type"
              placeholder="Berisi Jenis Lokasi"
              readonly
              @input="onChangeTypeLocation($event, index)"
            />
          </ValidationProvider>

          <ValidationProvider
            class="flex flex-col mb-4"
            tag="div"
          >
            <label
              for="responsibleLocation"
              class="font-lato text-blue-gray-800 mb-3 text-[15px]"
            >
              Penanggung Jawab Lokasi
            </label>
            <JdsInputText
              :value="locations[index].organization"
              :disabled="!isMasterDataSelected"
              placeholder="Berisi Penanggung Jawab Lokasi"
              readonly
              @input="onChangeOrganization($event, index)"
            />
          </ValidationProvider>

          <ValidationProvider
            class="flex flex-col gap-4 mb-4"
            tag="div"
          >
            <label
              for="locationName"
              class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
            >
              Nama Lokasi
            </label>
            <JdsInputText
              id="locationName"
              :disabled="!isMasterDataSelected"
              :value="locations[index].name"
              placeholder="Berisi nama lokasi"
              readonly
              @input="setLocationName($event, index)"
            />
          </ValidationProvider>

          <ValidationProvider
            class="flex flex-col gap-4 mb-4"
            tag="div"
          >
            <label
              for="address"
              class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
            >
              Alamat Lokasi
            </label>
            <JdsInputText
              id="address"
              :disabled="!isMasterDataSelected"
              :value="locations[index].address"
              placeholder="Berisi alamat lokasi"
              readonly
              @input="setAddress($event, index)"
            />
          </ValidationProvider>

          <ValidationProvider class="flex flex-col">
            <label
              for="phoneNumber"
              class="font-lato text-blue-gray-800 mb-3 text-[15px]"
            >
              Kontak Lokasi (Hp/Telp)
            </label>
            <JdsInputText
              id="phoneNumber"
              :disabled="!isMasterDataSelected"
              :value="locations[index].phone_number"
              placeholder="Berisi kontak lokasi"
              readonly
              @input="setPhoneNumberOfContactLocation($event, index)"
            />
          </ValidationProvider>
        </div>
      </Collapse>

      <Collapse
        v-show="isShowApplicationSection"
        title="Aplikasi"
        class="mb-4 grid grid-cols-1 gap-4"
      >
        <ValidationProvider
          class="flex flex-col gap-4 mb-4"
          tag="div"
        >
          <label
            for="statusApplication"
            class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
          >
            Status Ketersediaan Aplikasi
          </label>
          <JdsInputText
            id="statusApplication"
            v-model="statusApplication"
            :disabled="!isMasterDataSelected"
            placeholder="Berisi status ketersediaan"
            readonly
          />
        </ValidationProvider>

        <ValidationProvider
          class="flex flex-col gap-4 mb-4"
          tag="div"
        >
          <label
            for="applicationName"
            class="font-lato font-normal text-[15px] leading-[23px] text-blue-gray-800"
          >
            Nama Aplikasi
          </label>
          <JdsInputText
            id="applicationName"
            v-model="applicationName"
            :disabled="statusApplication === 'NOT-AVAILABLE' || !isMasterDataSelected"
            placeholder="Nama Aplikasi"
            readonly
          />
        </ValidationProvider>

        <Collapse
          title="Fitur Aplikasi"
          class="mb-4 grid grid-cols-1"
        >
          <template #header>
            <div class="flex flex-row gap-4">
              <h3 class="font-roboto font-medium text-blue-gray-800 text-[16px] leading-[28px] pb-7">
                Fitur Aplikasi
              </h3>
              <span
                :class="{
                  'text-[11px] leading-[28px] h-[32px] rounded-lg px-3 py-[3px] font-bold italic' : true,
                  'bg-green-100 text-green-700' : isApplication,
                  'bg-gray-300 text-gray-700' : !isApplication
                } "
              >
                {{ applicationText }}
              </span>
            </div>
          </template>
          <section class="border border-gray-300 rounded-xl h-full w-full px-[10px] py-3 flex flex-col gap-4">
            <ValidationProvider
              v-slot="{ errors }"
              :rules="isShowApplicationSection ? 'required' : ''"
              class="flex flex-col gap-4 "
              tag="div"
            >
              <JdsInputText
                v-model="applicationTitle"
                :disabled="!isApplication || statusApplication === 'NOT-AVAILABLE'"
                :error-message="errors[0]"
                placeholder="Judul Section"
              />
            </ValidationProvider>
            <div
              v-for="(_,index) in applicationFeatures"
              :key="index"
            >
              <ValidationProvider
                class="flex flex-col mb-4"
                tag="div"
              >
                <div class="col-span-2 flex flex-row gap-x-4">
                  <label class="font-lato text-blue-gray-800 text-[16px] leading-[26px] self-center">
                    {{ index + 1 }}.
                  </label>
                  <JdsInputText
                    :value="applicationFeatures[index].name"
                    :disabled="!isApplication || statusApplication === 'NOT-AVAILABLE' || !isMasterDataSelected"
                    placeholder="Berisi fitur aplikasi"
                    readonly
                    @input="setNameFeature($event, index)"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                class="flex flex-col gap-4 pl-7"
                tag="div"
              >
                <textarea
                  class="w-full border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white
              hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500
              disabled:bg-gray-200 disabled:text-gray-400"
                  :disabled="!isApplication || statusApplication === 'NOT-AVAILABLE' || !isMasterDataSelected"
                  :value="applicationFeatures[index].description"
                  maxlength="255"
                  placeholder="Berisi deskripsi fitur aplikasi"
                  rows="4"
                  readonly
                  @input="setDescriptionFeature($event.target.value, index)"
                />
                <p
                  v-show="applicationFeatures[index].description"
                  class="text-xs text-right text-gray-600"
                >
                  Tersisa {{ applicationFeatures[index].description && 255 - applicationFeatures[index].description.length }} karakter
                </p>
              </ValidationProvider>
            </div>
          </section>
        </Collapse>

        <div
          v-for="(link, index) in links"
          :key="`links-${index}`"
          class="col-span-2 grid grid-cols-2 gap-x-8 gap-y-4 mb-4"
        >
          <ValidationProvider class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Tautan Layanan
            </label>
            <JdsInputText
              class="service-link"
              :disabled="!isMasterDataSelected"
              :value="links[index].tautan"
              :prefix-text="links[index].type"
              :prefix-config="serviceLinkOptions"
              placeholder="https://"
              readonly
              @input="setLinkByIndex($event, index)"
              @change:prefix-text="setLinkTypeByIndex($event, index)"
            />
          </ValidationProvider>

          <ValidationProvider class="flex flex-col">
            <label class="font-lato text-blue-gray-800 mb-3 text-[15px]">
              Label Tautan
            </label>
            <JdsInputText
              :disabled="!isMasterDataSelected"
              :value="links[index].label"
              placeholder="Berisi label tautan"
              readonly
              @input="setLinkLabelByIndex($event, index)"
            />
          </ValidationProvider>
        </div>

        <div class="h-[150px] col-span-2" />
      </Collapse>

      <Collapse
        title="Sosial Media"
        class="mb-5"
      >
        <section class="flex flex-col gap-4">
          <div
            v-for="(_,index) in socialMedias"
            :key="index"
            class="flex flex-col gap-8"
          >
            <h3 class="font-roboto font-medium leading-7 text-base text-green-700">
              {{ index + 1 }}. Sosial Media
            </h3>
            <ValidationProvider
              tag="div"
              class="flex flex-col col-span-2"
            >
              <label
                for="socialMedia"
                class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
              >
                Nama Sosial Media Layanan
              </label>
              <JdsInputText
                id="socialMedia"
                :disabled="!isMasterDataSelected"
                :value="socialMedias[index].name"
                placeholder="Berisi nama sosial media"
                readonly
                @input="setSocialMediaName($event, index)"
              />
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="flex flex-col col-span-2"
            >
              <label
                for="socialMedia"
                class="font-lato text-blue-gray-800 mb-3 text-[15px] leading-[23px]"
              >
                Sosial Media Layanan
              </label>
              <JdsInputText
                id="socialMedia"
                class="social-media"
                :disabled="!isMasterDataSelected"
                :value="socialMedias[index].link"
                :prefix-text="socialMedias[index].type"
                :prefix-config="linkOptions"
                placeholder="https://"
                readonly
                @input="setSocialMediaLink($event, index)"
                @change:prefix-text="changePrefix($event, index)"
              />
            </ValidationProvider>
          </div>
        </section>
        <div class="h-[160px] col-span-2" />
      </Collapse>
    </fieldset>
  </ValidationObserver>
</template>

<script>
import '@/common/helpers/vee-validate.js';
import { DAY_MAP } from '@/common/constants';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import BaseButton from '@/common/components/BaseButton';
import Collapse from '@/common/components/Collapse';
import Dropzone from '@/common/components/Dropzone';
import DropzoneUploadProgress from '@/common/components/DropzoneUploadProgress';
import TimePicker from '@/common/components/TimePicker.vue';

export default {
  components: {
    BaseButton,
    Collapse,
    Dropzone,
    DropzoneUploadProgress,
    TimePicker,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      dayMap: DAY_MAP,
      isApplication: true,
      isDisable: false,
      isYoutubeLink: 'https://google.com',
      isYoutubeLinkChosen: false,
      linkOptions: {
        valueKey: 'value',
        labelKey: 'label',
        options: [
          {
            value: 'FACEBOOK',
            label: 'Facebook',
          },
          {
            value: 'INSTAGRAM',
            label: 'Instagram',
          },
          {
            value: 'TWITTER',
            label: 'Twitter',
          },
          {
            value: 'YOUTUBE',
            label: 'Youtube',
          },
        ],
      },
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
      statusApplicationOptions: [
        {
          label: 'Tersedia',
          value: 'AVAILABLE',
        },
        {
          label: 'Tidak Tersedia',
          value: 'NOT-AVAILABLE',
        },
      ],
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
    };
  },
  computed: {
    masterDataId() {
      return this.$store.state.publicationForm.masterDataId;
    },
    isCreateMode() {
      return this.$route.meta?.mode === 'create';
    },
    isEditMode() {
      return this.$route.meta?.mode === 'edit';
    },
    applicationFeatures() {
      return this.$store.state.publicationForm.stepTwo.service_description.application.features;
    },
    applicationName: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.application.name;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_NAME', value);
      },
    },
    applicationTitle: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.application.title;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_TITLE', value);
      },
    },
    applicationText() {
      return this.isApplication ? 'Konten Aktif' : 'Konten Tidak Aktif';
    },
    contentText() {
      return this.isTermAndCondition ? 'Konten Aktif' : 'Konten Tidak Aktif';
    },
    contentImages() {
      return this.$store.state.publicationForm.stepTwo.service_description.images;
    },
    coverImageValidationRules() {
      if (this.isCreateMode) {
        if (this.isYoutubeLinkChosen) {
          return 'image|size:5000|maxdimensions:816,460';
        }
      }

      if (this.isEditMode) {
        return 'image|size:5000|maxdimensions:816,460';
      }

      return 'required|image|size:5000|maxdimensions:816,460';
    },
    coverImageFile() {
      return this.$store.state.publicationForm.stepTwo.service_description.cover.image.image_file;
    },
    coverImageProgress() {
      return this.$store.state.publicationForm.stepTwo.service_description.cover.image.image_upload_progress;
    },
    coverImageStatus() {
      return this.$store.state.publicationForm.stepTwo.service_description.cover.image.image_upload_status;
    },
    coverImageSize() {
      return this.$store.state.publicationForm.stepTwo.service_description.cover.image.size;
    },
    coverImageUrl() {
      return this.$store.state.publicationForm.stepTwo.service_description.cover.image.file_download_uri;
    },
    hotlineMail: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.hotline_mail;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_HOTLINE_MAIL', value);
      },
    },
    hotlineNumber: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.hotline_number;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_HOTLINE_NUMBER', value);
      },
    },
    isMasterDataSelected() {
      return this.$store.getters['publicationForm/isMasterDataSelected'];
    },
    infographics() {
      return this.$store.state.publicationForm.stepTwo.service_description.infographics.images;
    },
    infographicText() {
      return this.isInfographic ? 'Konten Aktif' : 'Konten Tidak Aktif';
    },
    isInfographic: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.infographics.is_active === 1;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IS_ACTIVE', value);
      },
    },
    isProcedure: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.is_active === 1;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_IS_ACTIVE', value);
      },
    },
    isTermAndCondition: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.is_active === 1;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_IS_ACTIVE', value);
      },
    },
    links() {
      return this.$store.state.publicationForm.stepTwo.service_description.links;
    },
    locations() {
      return this.$store.state.publicationForm.stepTwo.service_description.locations;
    },
    operationalTime() {
      return this.$store.state.publicationForm.stepTwo.service_description.operational_times;
    },
    procedureText() {
      return this.isProcedure ? 'Konten Aktif' : 'Konten Tidak Aktif';
    },
    procedureTitle: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.title;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_TITLE', value);
      },
    },
    procedureItems() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.items;
    },
    procedureImageFile() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.cover.image_file;
    },
    procedureImageProgress() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.cover.image_upload_progress;
    },
    procedureImageStatus() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.cover.image_upload_status;
    },
    procedureImageUri() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.cover.file_download_uri;
    },
    procedureImageSize() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_procedures.cover.size;
    },
    // service fee minimum fee
    minimumFee() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_fee.minimum_fee;
    },
    // service fee maximum fee
    maximumFee() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_fee.maximum_fee;
    },
    // service fee has description
    hasDescription() {
      return !!this.$store.state.publicationForm.stepTwo.service_description.service_fee.has_description;
    },
    // service fee special description
    specialDescription() {
      return this.$store.state.publicationForm.stepTwo.service_description.service_fee.description;
    },
    socialMedias() {
      return this.$store.state.publicationForm.stepTwo.service_description.social_media;
    },
    statusApplication: {
      get() {
        return this.$store.getters['publicationForm/applicationStatus'];
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_STATUS', value);
      },
    },
    termAndContiditionTitle: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.title;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_TITLE', value);
      },
    },
    termAndContiditionItems() {
      return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.items;
    },
    termAndContiditionItemsName: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.items.name;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_IS_ACTIVE', value);
      },
    },
    termAndConditionImageFile() {
      return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.cover.image_file;
    },
    termAndConditionImageProgress() {
      return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.cover.image_upload_progress;
    },
    termAndConditionImageStatus() {
      return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.cover.image_upload_status;
    },
    termAndConditionImageUri() {
      return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.cover.file_download_uri;
    },
    termAndConditionImageSize() {
      return this.$store.state.publicationForm.stepTwo.service_description.terms_and_conditions.cover.size;
    },
    youtubeLink: {
      get() {
        return this.$store.state.publicationForm.stepTwo.service_description.cover.video;
      },
      set(value) {
        this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_COVER_VIDEO_LINK', value);
      },
    },
    isShowApplicationSection() {
      // show section on intial render
      if (this.masterDataId === null) {
        return true;
      }

      if (this.masterDataId && this.isMasterDataSelected) {
        return this.$store.state.publicationForm.stepOne.default_information.technical === 'ONLINE';
      }

      return false;
    },
  },
  deactivated() {
    // Trigger validation message when component deactivated
    this.$refs.formStepTwo.validate();
  },
  methods: {
    addContentImages() {
      this.$store.commit('publicationForm/ADD_STEP_TWO_SERVICE_DESCRIPTION_IMAGES');
    },
    addInfographics() {
      this.$store.commit('publicationForm/ADD_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES');
    },
    changePrefix(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_SOCIAL_MEDIA_TYPE', { value, index });
    },
    closeLinkYoutubeField() {
      this.$store.commit('publicationForm/RESET_FORM_COVER_IMAGE');
      this.isYoutubeLinkChosen = !this.isYoutubeLinkChosen;
      this.isDisable = false;
    },
    handleDeleteUpload(fileName, index) {
      this.$store.dispatch('publicationForm/handleDeleteUpload', { fileName, index });
      // Note: reset input type file value
      document.querySelector(`#contentImage-${index} input`).value = '';
    },
    handleDeleteCoverImage(fileName) {
      this.$store.dispatch('publicationForm/handleDeleteCoverImage', fileName);
      // Note: reset input type file value
      document.querySelector('#coverImage input').value = '';
    },
    handleDeleteTermAndConditionImage(fileName) {
      this.$store.dispatch('publicationForm/handleDeleteTermAndConditionImage', fileName);
      // Note: reset input type file value
      document.querySelector('#termAndConditionImage input').value = '';
    },
    handleDeleteProcedureImage(fileName) {
      this.$store.dispatch('publicationForm/handleDeleteProcedureImage', fileName);
      // Note: reset input type file value
      document.querySelector('#procedureImage input').value = '';
    },
    handleDeleteInfographicImage(fileName, index) {
      this.$store.dispatch('publicationForm/handleDeleteInfographicImage', { fileName, index });
      // Note: reset input type file value
      document.querySelector(`#infographic-${index} input`).value = '';
    },
    handleRetryUpload(file, index) {
      this.$store.dispatch('publicationForm/handleUploadImage', { file, index });
    },
    handleRetryUploadCoverImage(file) {
      this.$store.dispatch('publicationForm/handleUploadCoverImage', file);
    },
    handleRetryUploadTermAndConditionImage(file) {
      this.$store.dispatch('publicationForm/handleUploadTermAndConditionImage', file);
    },
    handleRetryUploadProcedureImage(file) {
      this.$store.dispatch('publicationForm/handleUploadProcedureImage', file);
    },
    handleRetryInfographicImage(file, index) {
      this.$store.dispatch('publicationForm/handleUploadInfographicImage', { file, index });
    },
    async handleUploadImage(file, index) {
      const { valid } = await this.$refs.contentImageUploader[index].validate(file);
      if (valid) {
        this.$store.dispatch('publicationForm/handleUploadImage', { file, index });
      }
    },
    async handleUploadCoverImage(file) {
      const { valid } = await this.$refs.coverImageUploader.validate(file);
      if (valid) {
        this.$store.dispatch('publicationForm/handleUploadCoverImage', file);
      }
    },
    async handleUploadTermAndConditionImage(file) {
      const { valid } = await this.$refs.desktopImageUploader.validate(file);
      if (valid) {
        this.$store.dispatch('publicationForm/handleUploadTermAndConditionImage', file);
      }
    },
    async handleUploadProcedureImage(file) {
      const { valid } = await this.$refs.procedureImageUploader.validate(file);
      if (valid) {
        this.$store.dispatch('publicationForm/handleUploadProcedureImage', file);
      }
    },
    async handleUploadInfographicImage(file, index) {
      const { valid } = await this.$refs.infographicImage[index].validate(file);
      if (valid) {
        this.$store.dispatch('publicationForm/handleUploadInfographicImage', { file, index });
      }
    },
    onChangeTypeLocation(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_TYPE', { value, index });
    },
    onChangeOrganization(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_ORGANIZATION', { value, index });
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
    setAddress(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_ADDRESS', { value, index });
    },
    setDescriptionFeature(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_FEATURES_DESCRIPTION', { value, index });
    },
    setSocialMediaName(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_SOCIAL_MEDIA_NAME', { value, index });
    },
    setSocialMediaLink(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_SOCIAL_MEDIA_LINK', { value, index });
    },
    setLinkByIndex(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LINK', { value, index });
    },
    setLinkLabelByIndex(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LINK_LABEL', { value, index });
    },
    setLinkTypeByIndex(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LINK_TYPE', { value, index });
    },
    setLocationName(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_NAME', { value, index });
    },
    setNameFeature(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_APPLICATION_FEATURES_NAME', { value, index });
    },
    setOperationalStartTimeByIndex(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_OPERATIONAL_TIME_START', { value, index });
    },
    setOperationalEndTimeByIndex(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_OPERATIONAL_TIME_END', { value, index });
    },
    setPhoneNumberOfContactLocation(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_LOCATIONS_PHONE_NUMBER', { value, index });
    },
    setProcedureItemByName(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_ITEM_NAME', { value, index });
    },
    setProcedureItemByLink(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_SERVICE_PROCEDURES_ITEM_LINK', { value, index });
    },
    setTermAndConditienNameByIndex(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_ITEM_NAME', { value, index });
    },
    setTermAndConditienLinkByIndex(value, index) {
      this.$store.commit('publicationForm/SET_STEP_TWO_SERVICE_DESCRIPTION_TERMS_CONDITIONS_ITEM_LINK', { value, index });
    },
    showLinkYoutubeField() {
      this.isYoutubeLinkChosen = !this.isYoutubeLinkChosen;
      this.isDisable = true;

      // Reset error message when user choose youtube field
      this.$refs.coverImageUploader.reset();
    },
    removeContentImage(index) {
      this.$store.commit('publicationForm/REMOVE_STEP_TWO_SERVICE_DESCRIPTION_IMAGES', index);
    },
    removeInfographic(index) {
      this.$store.commit('publicationForm/REMOVE_STEP_TWO_SERVICE_DESCRIPTION_INFOGRAPHICS_IMAGES', index);
    },
    resetTermAndConditionError() {
      // reset Term and condition error message when toggle is false
      this.resetValidation('termAndConditionServiceTitle');
      this.resetValidation('desktopImageUploader');
    },
    resetProcedureError() {
      // reset Procedure error message when toggle is false
      this.resetValidation('procedureServiceTitle');
      this.resetValidation('procedureImageUploader');
    },
    resetInfographicError() {
      // reset Infographic error message when toggle is false
      this.infographics.forEach((item, index) => {
        this.$refs.infographicImage[index].reset();
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

<style>
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.vue__time-picker input.display-time:disabled {
  background-color: #EEEEEE;
}
.timepicker-readonly {
  background-color: #ffffff !important;
}

.service-link .jds-input-text__input-wrapper .jds-input-text-edge,
.social-media .jds-input-text__input-wrapper .jds-input-text-edge {
  pointer-events: none;
}
</style>
