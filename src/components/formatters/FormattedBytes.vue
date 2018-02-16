<template>
  <span :class="{ 'has-text-success': txOrRx }">
    {{ formattedBytes }}
  </span>
</template>

<script>
export default {
  name: 'formatted-bytes',
  props: {
    bytes: Number,
    txOrRx: Boolean,
    showMegabytes: {
      type: Boolean,
      default: true,
    },
    mbDecimals: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    formattedBytes() {
      let result = this.bytes;
      if (result) {
        if (this.showMegabytes) {
          result = (result / 1000000).toFixed(this.mbDecimals);
        }
        result = result.toLocaleString();
      }
      return result;
    },
  },
};
</script>

