<template>
  <BaseModal
    ref="agenda-preview"
    :open="open"
    @close="$emit('close')"
  >
    <div class="w-full h-full">
      <h1
        ref="agenda-preview-title"
        class="font-roboto text-xl leading-8 font-medium text-green-700 mb-4"
        data-cy="agenda-preview__title"
      >
        {{ event.title || '-' }}
      </h1>
      <section
        ref="agenda-preview-body"
        class="w-full grid grid-cols-2"
        data-cy="agenda-preview__body"
      >
        <div
          ref="agenda-preview-category"
          class="flex gap-2 mb-6"
          data-cy="agenda-preview__category-container"
        >
          <CategoryIcon class="w-4 h-4 fill-green-700" />
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Kategori Event
            </h2>
            <div
              class="w-fit py-1 px-4 bg-green-50 rounded-lg text-sm text-green-700 line-clamp-1"
              :title="event.category"
              data-cy="agenda-preview__category"
            >
              {{ event.category || '-' }}
            </div>
          </div>
        </div>

        <div
          ref="agenda-preview-event-type"
          class="mb-6"
          data-cy="agenda-preview__type-container"
        >
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tipe Event
            </h2>
            <div
              class="w-fit py-1 px-4 rounded-lg text-sm line-clamp-1 capitalize"
              :class="{
                'text-green-700 bg-green-50': event.type === 'online',
                'text-pink-700 bg-pink-50': event.type === 'offline',
              }"
              :title="event.type"
              data-cy="agenda-preview__type"
            >
              {{ event.type || '-' }}
            </div>
          </div>
        </div>

        <div
          ref="agenda-preview-date"
          class="flex gap-2 mb-6"
          data-cy="agenda-preview__date-container"
        >
          <CalendarIcon class="w-4 h-4 fill-green-700" />
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tanggal
            </h2>
            <p
              class="text-sm text-gray-800 line-clamp-1 capitalize"
              data-cy="agenda-preview__date"
            >
              {{ date }}
            </p>
          </div>
        </div>

        <div
          ref="agenda-preview-time"
          class="mb-6"
          data-cy="agenda-preview__time-container"
        >
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Waktu
            </h2>
            <p
              class="text-sm text-gray-800 line-clamp-1"
              data-cy="agenda-preview__time"
            >
              {{ time }}
            </p>
          </div>
        </div>

        <div
          v-if="event.type === 'online'"
          ref="agenda-preview-link"
          class="flex gap-2 col-span-2 mb-6"
          data-cy="agenda-preview__type-online-container"
        >
          <LinkIcon class="w-4 h-4 fill-green-700" />
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Link Kegiatan
            </h2>
            <a
              :href="event.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:text-blue-400 underline"
              data-cy="agenda-preview__link"
            >
              {{ event.url || '-' }}
            </a>
          </div>
        </div>

        <div
          v-else
          ref="agenda-preview-address"
          class="flex gap-2 col-span-2 mb-6"
          data-cy="agenda-preview__type-offline-container"
        >
          <LocationIcon class="w-4 h-4 fill-green-700" />
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tempat Pelaksanaan
            </h2>
            <p
              class="text-sm text-gray-800 line-clamp-1 capitalize"
              data-cy="agenda-preview__location"
            >
              {{ event.address || '-' }}
            </p>
          </div>
        </div>

        <div
          v-if="hasTags"
          ref="agenda-preview-tags"
          class="flex gap-2 col-span-2"
          data-cy="agenda-preview__tags-container"
        >
          <TagIcon class="w-4 h-4 fill-green-700" />
          <div class="flex flex-col gap-1">
            <h2 class="text-xs text-blue-gray-200">
              Tags
            </h2>
            <div
              class="min-w-0 flex gap-2 flex-wrap items-center"
            >
              <span
                v-for="(tag, index) in event.tags"
                :key="tag.id"
                class="px-[10px] py-[6px] rounded-full bg-gray-200 text-gray-700 text-sm"
                :data-cy="`agenda-preview__tag-item-${index + 1}`"
              >
                {{ tag.tag_name }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import CategoryIcon from '@/assets/icons/category.svg?inline';
import CalendarIcon from '@/assets/icons/calendar.svg?inline';
import LinkIcon from '@/assets/icons/link.svg?inline';
import LocationIcon from '@/assets/icons/marker.svg?inline';
import TagIcon from '@/assets/icons/tag.svg?inline';
import { formatDate } from '@/common/helpers/date';

export default {
  name: 'AgendaPreview',
  components: {
    BaseModal,
    CategoryIcon,
    CalendarIcon,
    LinkIcon,
    LocationIcon,
    TagIcon,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
    event: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    time() {
      const startTime = this.event?.start_hour || null;
      const endTime = this.event?.end_hour || null;

      if (startTime && endTime) {
        return `${startTime.substring(0, 5)} sampai ${endTime.substring(0, 5)} WIB`;
      }

      return '-';
    },
    date() {
      if (this.event?.date) {
        const { date } = this.event;
        /**
         * `this.event.date` is already formatted to dd/MM/YYYY (id-ID locale)
         *  so we need to convert it back to YYYY/MM/dd before reformatting it
         */
        const reversedDate = date.split('/').reverse().join('/');
        return formatDate(reversedDate, 'EEEE, dd MMM yyyy');
      }

      return '-';
    },
    hasTags() {
      return this.event?.tags && !!this.event?.tags.length;
    },
  },
};
</script>
