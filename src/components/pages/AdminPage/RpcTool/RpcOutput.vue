<template>
  <div>
    <h2 class="subtitle">Results</h2>
    <pre class="scroll-x" :class="{ text: typeof rawOutput === 'string' }">
      {{output}}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'rpc-output',
  computed: {
    rawOutput() {
      return this.$store.state.rpc.output;
    },
    output() {
      let formatted;
      if (typeof rawOutput === 'object') {
        formatted = JSON.stringify(this.rawOutput, undefined, 4);
      } else {
        formatted = this.rawOutput;
      }
      return formatted;
    },
  },
};
</script>

<style scoped>
  pre.scroll-x {
    display:block;
    width: 100%;
    overflow-x: scroll;
    overflow-wrap: normal;
  }

  pre.text {
    white-space: pre-wrap;
  }
</style>
