<template>
  <span>
    <a class="button" @click="$emit('previous')"
      :disabled="previousDisabled">
      Previous
    </a>
    <a class="button" @click="$emit('next')"
      :disabled="nextDisabled">
      Next block
    </a>
  </span>
</template>

<script>

export default {
  name: 'block-nav-buttons',
  props: {
    previousDisabled: Boolean,
    nextDisabled: Boolean,
  },
};
</script>

