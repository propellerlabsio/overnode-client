<template>
  <span class="level-item">
    <a class="button"
      @click="$emit('previous')"
      :disabled="previousDisabled">
      <span class="icon is-hidden-tablet">
        <i class="fas fa fa-chevron-left"></i>
      </span>
      <span class="is-hidden-mobile">Previous</span>
    </a>
    <a class="button"
      @click="$emit('next')"
      :disabled="nextDisabled">
      <span class="icon is-hidden-tablet">
        <i class="fa fa-chevron-right"></i>
      </span>
      <span class="is-hidden-mobile">Next block</span>
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

