<template>
  <pre v-if="formatted" class="scroll-x" :class="{ text: typeof response === 'string' }">
    {{ formatted }}
  </pre>
  <loading-message v-else />
</template>

<script>
import LoadingMessage from '../../../misc/LoadingMessage';

export default {
  name: 'formatted-rpc-response',
  props: {
    response: {
      required: true,
    },
  },
  components: {
    LoadingMessage,
  },
  computed: {
    formatted() {
      let formatted;
      if (typeof this.response === 'object') {
        formatted = JSON.stringify(this.response, undefined, 4);
      } else {
        formatted = this.response;
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
