<template>
  <ul class="w-full flex gap-[6px]">
    <li
      v-for="(tab, index) in tabs"
      :key="tab.key"
      class="w-[180px] min-h-[84px] px-[14px] py-[10px] rounded-t-lg cursor-pointer"
      :class="currentTab === tab.key ? 'bg-white' : 'bg-green-700'"
      :title="tab.label"
      @click="onTabChange(index)"
    >
      <div class="grid grid-cols-[28px,_1fr] items-center gap-2">
        <div
          class="w-[28px] h-[28px] flex items-center justify-center  rounded-full"
          :class="currentTab === tab.key ? 'bg-gray-200' : 'bg-green-800'"
        >
          <component
            :is="getIcon(index)"
            :class="currentTab === tab.key ? 'fill-green-700' : 'fill-white'"
          />
        </div>
        <p
          class="font-lato text-sm  whitespace-nowrap line-clamp-1"
          :class="currentTab === tab.key ? 'text-gray-700' : 'text-green-100'"
        >
          {{ tab.label }}
        </p>
        <div
          v-if="tab.count === null"
          class="col-start-2 w-[70px] h-[24px] rounded-md animate-pulse"
          :class="currentTab === tab.key ? 'bg-gray-200' : 'bg-green-800'"
        />
        <p
          v-else
          class="col-start-2 font-roboto font-medium text-xl"
          :class="currentTab === tab.key ? 'text-blue-gray-800' : 'text-white'"
        >
          {{ tab.count }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import DocumentIcon from '@/assets/icons/document.svg?inline';
import ArchiveIcon from '@/assets/icons/archive.svg?inline';
import DraftIcon from '@/assets/icons/draft.svg?inline';
import PublishIcon from '@/assets/icons/publish.svg?inline';

export default {
  name: 'PublicationTabBar',
  components: {
    DocumentIcon,
    ArchiveIcon,
    DraftIcon,
    PublishIcon,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    currentTab: {
      type: String,
      default: '',
    },
  },
  methods: {
    onTabChange(index) {
      this.$emit('update:currentTab', this.tabs[index].key);
    },
    getIcon(index) {
      return this.tabs[index].icon;
    },
  },
};
</script>
