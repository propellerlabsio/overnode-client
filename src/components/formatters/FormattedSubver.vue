<template>
  <span>
    {{ formattedSubver }}
  </span>
</template>

<script>
export default {
  name: 'formatted-subver',
  props: {
    subver: String,
    shorten: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    /**
     * Return node peer subver main value which is the first text between
     * two forward strokes /<value>/
     */
    formattedSubver() {
      return this.subver.split('/')[1];
    },
  },
};
</script>

