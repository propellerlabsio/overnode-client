<template>
  <span :class="{ 'has-text-success': txOrRx }">
    {{ bytes }}
  </span>
</template>

<script>
export default {
  name: 'formatted-bytes',
  props: {
    bytes: Number,
    txOrRx: Boolean,
  },
};
</script>

