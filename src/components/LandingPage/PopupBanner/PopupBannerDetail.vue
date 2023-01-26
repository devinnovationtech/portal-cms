<template>
  <main>
    <HeaderMenu>
      <div class="flex gap-3">
        <!-- Delete Button -->

        <BaseButton
          class="border-red-500 hover:bg-red-50 font-lato text-sm text-red-500"
        >
          <template #icon-left>
            <JdsIcon
              name="trash"
              size="16px"
              class="text-red-500"
            />
          </template>
          Hapus
        </BaseButton>

        <!-- Update Button -->

        <BaseButton
          class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
        >
          <template #icon-left>
            <JdsIcon
              name="pencil"
              size="16"
              class="h-4 text-green-700"
            />
          </template>
          <p>
            Ubah Data
          </p>
        </BaseButton>
      </div>
    </HeaderMenu>

    <section class="px-6 py-4 rounded-lg bg-white mb-4 flex flex-col gap-6">
      <!-- Title Section -->

      <div class="flex flex-row justify-between">
        <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-bule-gray-600">
          Detail Banner Pop-up
        </h1>
        <div class="flex flex-row gap-[15px]">
          <BaseButton
            v-for="item in previewButtonData"
            :key="item.id"
            class="border-0 font-lato text-[14px] leading-[18px] font-medium text-gray-600 cursor-pointer"
            :class="{
              'bg-gray-300 text-gray-800 transition duration-150 ease-linear': selectedPreview === item.id
            }"
            @click="showPreviewImage(item)"
          >
            <template #icon-left>
              <img
                :src="item.image"
                alt=""
                :width="item.width"
                :height="item.height"
              >
            </template>
            {{ item.name }}
          </BaseButton>
        </div>
      </div>

      <!-- Image Preview -->

      <div class="bg-gray-50 w-full h-full overflow-hidden rounded-[8px]">
        <transition-group name="iphone">
          <div
            v-if="isShowDesktopPreview"
            :key="1"
          >
            <img
              class="object-cover w-full"
              :src="imageDesktop"
              width="1082"
              height="444"
              alt=""
            >
          </div>
          <div
            v-if="isShowMobilePreview"
            :key="2"
            class="iphone-frame relative m-auto border-solid border-black border-[10px] rounded-[30px] w-[195px] h-[414px] shadow-lg shadow-gray-800"
          >
            <div class="iphone-screen absolute z-10 w-full h-full rounded-[20px] bg-[url('https://picsum.photos/200/300')] bg-no-repeat bg-cover">
              <div class="iphone-notch z-20 absolute top-0 left-[36px] w-[100px] h-[20px] bg-black rounded-[0px_0px_10px_10px]" />
              <div class="iphone-content mt-6 top-[36px] w-full h-fit ">
                <div class="iphone-apps flex flex-row p-2">
                  <button @click="showContentMobile">
                    <img
                      src="@/assets/icons/chrome.svg"
                      width="36"
                      height="36"
                      alt=""
                    >
                  </button>
                </div>
              </div>
              <div
                :class="{
                  'iphone-modal w-full h-full absolute inset-0 bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm overflow-hidden': isShowContentMobile
                }"
              >
                <transition name="content">
                  <div
                    v-if="isShowContentMobile"
                    class="absolute w-full h-[calc(100%-20px)] top-4"
                  >
                    <div class="flex py-1 px-2 w-full justify-end">
                      <button
                        class="h-8 w-8 bg-green-600 rounded-full hover:bg-green-700 transition-colors ease-brand duration-250 text-white"
                        @click="showContentMobile"
                      >
                        <JdsIcon
                          name="times"
                          size="16px"
                          class="text-white"
                        />
                      </button>
                    </div>
                    <div class="bg-gray-50 p-1 rounded-[10px] min-h-[335px]">
                      <div class="flex justify-center overflow-y-auto min-w-full max-h-full">
                        <img
                          class="w-auto h-auto object-contain"
                          :src="imageMobile"
                          alt=""
                          width="255"
                          height="443"
                        >
                      </div>
                      <div class="w-full bg-gray-50 flex items-center justify-center pt-2">
                        <a
                          class="rounded-md bg-green-700 p-2 w-full text-[12px] leading-[20px] text-white text-center font-lato"
                          :class="{
                            'pointer-events-none' : link === '-'
                          }"
                          :href="link === '-' ? '' : link"
                          target="_blank"
                        >
                          {{ titleButton }}
                        </a>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Data Preview -->

      <div class="rounded-lg overflow-hidden border border-gray-200">
        <JdsSimpleTable class="!table-auto">
          <thead>
            <tr>
              <th
                colspan="2"
                class="!font-roboto !text-sm"
              >
                Info Detail
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                Judul
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                <div
                  v-if="loading"
                  class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                />
                <div v-else>
                  {{ title }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                Judul Button
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                <div
                  v-if="loading"
                  class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                />
                <div v-else>
                  {{ titleButton }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                Link Redirect
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                <div
                  v-if="loading"
                  class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                />
                <a
                  v-else
                  class="font-lato text-[12px] leading-[23px]"
                  :class="{
                    'underline text-blue-gray-500 font-bold' : link !== '-',
                    'pointer-events-none' : link === '-'
                  }"
                  :href="link === '-' ? '' : link"
                  target="_blank"
                  disabled
                >
                  {{ link }}
                </a>
              </td>
            </tr>
            <tr>
              <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-[12px] leading-[23px]">
                Status
              </td>
              <td class="w-full">
                <div
                  v-if="loading"
                  class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                />
                <div
                  v-else
                  class="w-fit font-lato text-[12px] leading-[23px]"
                  :class="{
                    'bg-green-50 text-green-700 px-[10px] rounded-[5px] font-bold ' : status === 'aktif',
                    'bg-red-50 text-red-700 px-[10px] rounded-[5px] font-bold ' : status === 'non-aktif'
                  }"
                >
                  {{ status }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                Durasi Penayangan
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                <div
                  v-if="loading"
                  class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                />
                <div v-else>
                  {{ duration }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="min-w-[228px] font-lato text-blue-gray-500 font-bold text-sm">
                Waktu Penayangan
              </td>
              <td class="w-full font-lato text-blue-gray-500 text-sm">
                <div
                  v-if="loading"
                  class="h-4 w-1/5 rounded-lg animate-pulse bg-gray-200"
                />
                <div v-else>
                  {{ broadcastTime }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="font-lato text-blue-gray-500 font-bold text-sm">
                Update terakhir
              </td>
              <td class="font-lato text-blue-gray-500 text-sm">
                <div
                  v-if="loading"
                  class="h-4 w-1/4 rounded-lg animate-pulse bg-gray-200"
                />
                <div v-else>
                  {{ lastUpdate }}
                </div>
              </td>
            </tr>
          </tbody>
        </JdsSimpleTable>
      </div>
    </section>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import { formatDate, addDay, getHour, getMinute } from '@/common/helpers/date';

export default {
  name: 'PopupBannerDetail',
  components: {
    BaseButton, HeaderMenu,
  },
  props: {
    banners: {
      type: Object,
      default: () => {},
    },
    selectedPreview: {
      type: Number,
      default: 1,
    },
    isShowMobilePreview: {
      type: Boolean,
      default: false,
    },
    isShowContentMobile: {
      type: Boolean,
      default: true,
    },
    isShowDesktopPreview: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      previewButtonData: [
        {
          id: 1,
          name: 'Desktop',
          image: require('@/assets/icons/desktop.svg'),
          width: '16',
          height: '18',
        },
        {
          id: 2,
          name: 'Mobile',
          image: require('@/assets/icons/mobile.svg'),
          width: '11',
          height: '18',
        },
      ],
      defaultImageDesktop: 'https://picsum.photos/1000/400',
      defaultImageMobile: 'https://picsum.photos/200/300',
    };
  },
  computed: {
    title() {
      return this.banners?.title || '-';
    },
    imageDesktop() {
      return this.banners?.image.desktop || this.defaultImageDesktop;
    },
    imageMobile() {
      return this.banners?.image.mobile || this.defaultImageMobile;
    },
    titleButton() {
      const title = 'Kunjungi Link';
      return title || '-';
    },
    link() {
      return this.banners?.link || '-';
    },
    status() {
      let bannerStatus;
      switch (this.banners?.status) {
        case ('ACTIVE'):
          bannerStatus = 'aktif';
          break;
        case ('NON-ACTIVE'):
          bannerStatus = 'non-aktif';
          break;
        default:
          bannerStatus = '-';
      }
      return bannerStatus;
    },
    duration() {
      const duration = this.banners?.duration || null;
      if (duration) {
        return `${duration} hari`;
      }

      return '-';
    },
    broadcastTime() {
      const startDate = formatDate(this.banners?.start_date);
      const endDate = formatDate(addDay(this.banners?.start_date, this.banners?.duration));

      if (this.banners?.start_date) {
        return `${startDate} - ${endDate}`;
      }
      return '-';
    },
    lastUpdate() {
      const updateDate = formatDate(this.banners?.updated_at);
      const hour = getHour(this.banners?.updated_at);
      const minute = getMinute(this.banners?.updated_at);
      if (this.banners?.updated_at) {
        return `Terakhir disimpan pada: ${updateDate} - ${hour}:${minute}`;
      }
      return '-';
    },
  },
  methods: {
    showPreviewImage(item) {
      this.$emit('showPreviewImage', item);
    },
    showContentMobile() {
      this.$emit('showContentMobile');
    },
  },
};
</script>

<style>
.iphone-enter-active, .content-enter-active {
  transition: all .8s cubic-bezier(0.175, 0.885, 0.32, 1.3);
}
.content-leave-active {
  transition: all .8s ease-out;
}
.iphone-enter, .iphone-leave-to {
  transform: translateY(600px);
}

.content-enter, .content-leave-to {
  transform: translateY(500px);
}
</style>
