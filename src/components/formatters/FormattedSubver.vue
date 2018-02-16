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
  },
  computed: {
    /**
     * Return node peer subver main value which is the first text between
     * two forward strokes /<value>/
     */
    formattedSubver() {
      const components = this.subver.split('/');
      return `${components[1]} ${components[2]}`;
    },
  },
};
</script>

