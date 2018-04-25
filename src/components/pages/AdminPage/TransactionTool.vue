<template>
  <div>
    <p>Transaction Tool</p>
    <a class="button" @click="test">Test</a>
  </div>
</template>

<script>
export default {
  name: 'transaction-tool',
  methods: {
    async test() {
      try {
        const query = `query ($command: String!, $parameters: [String]) {
            rpc(command: $command, parameters: $parameters)
          }      
        `;
        const variables = {
          command: 'getblock',
          parameters: [3],
        };
        const response = await this.$store.dispatch('session/request', { query, variables });
        this.$store.commit('toasts/add', {
          message: response,
          timeoutSecs: 5,
          type: 'success',
        });
      } catch (err) {
        this.$store.commit('toasts/add', {
          message: err.message,
          timeoutSecs: 5,
          type: 'danger',
        });
      }
    },
  },
};
</script>
