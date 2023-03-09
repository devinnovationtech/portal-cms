<template>
  <VueTimepicker
    v-model="inputVal"
    v-bind="$attrs"
  />
</template>

<script>
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';

export default {
  name: 'TimePicker',
  components: {
    VueTimepicker,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.vue__time-picker {
  min-width: 10em;
  width: 100%;
}

.vue__time-picker::v-deep input.display-time {
  color: #424242;
  min-width: 10em;
  width: 100%;
  border: 1px solid #9E9E9E;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  background: #FAFAFA;

  &:hover {
    background: white;
    border: 1px solid #16A75C;
  }

  &:focus {
    outline: 2px solid transparent;
    outline-width: 1px;
    outline-offset: -2px;
    outline-color: #EAB308;
    border: 1px solid #1FB767;
  }

  &::placeholder {
  color: #757575;
  opacity: 1;
  }
}
</style>
