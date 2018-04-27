<template>
  <pre>{{rawTransaction}}</pre>
</template>

<script>
export default {
  name: 'RawTransaction',
  computed: {
    rawTransaction() {
      const raw = this.$store.state.transactionBuilder.raw;
      const formatted = JSON.stringify(raw, undefined, 4);
      return formatted;
    },
  },
};
</script>

<style scoped>
  code {
    display: block;
    width: 100%;
  }
  pre {
    display: block;
    width: 100%;
    overflow-x: scroll;
  }
</style>

