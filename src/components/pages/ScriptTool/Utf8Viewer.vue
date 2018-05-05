<template>
  <p>{{ utf8 }}</p>
</template>

<script>
export default {
  name: 'utf8-viewer',
  computed: {
    utf8() {
      const bytes = this.$store.state.script.hex.view;
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes);
    },
  },
};
</script>
