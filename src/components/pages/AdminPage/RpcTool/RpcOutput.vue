<template>
  <div>
    <h2 class="subtitle">Results</h2>
    <pre class="scroll-x">{{output}}</pre>
  </div>
</template>

<script>
export default {
  name: 'rpc-output',
  computed: {
    output() {
      const raw = this.$store.state.rpc.output;
      const formatted = JSON.stringify(raw, undefined, 4);
      return formatted;
    },
  },
};
</script>

<style>
  pre.scroll-x {
    display:block;
    width: 100%;
    overflow-x: scroll;
    overflow-wrap: normal;
  }
</style>
