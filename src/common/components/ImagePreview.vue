<template>
  <BaseModal
    :open="open"
    @close="$emit('close')"
  >
    <img
      :src="source"
      alt=""
      class="w-full h-full object-contain"
    >
  </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
  name: 'ImagePreview',
  components: { BaseModal },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      default: '',
    },
  },
};
</script>
