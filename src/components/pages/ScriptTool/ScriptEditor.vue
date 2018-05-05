<template>
  <p>
    {{ script }}
  </p>
</template>

<script>
export default {
  name: 'script-editor',
  computed: {
    script() {
      return this.$store.state.script;
    },
  },
};
</script>
