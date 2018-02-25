<template>
  <article class="message is-danger" v-if="syncInErrorCount">
    <div class="message-header">
      <p>
        <span class="icon">
          <i class="fa fa-exclamation-circle"></i>
        </span>
        The server is having a problem. Results may be unreliable.
      </p>
      <button class="button is-small is-danger is-pulled-right" aria-label="details"
        @click="showDetails = !showDetails">
        <span class="icon">
          <i class="fa" :class="{ 'fa-chevron-down': !showDetails,
            'fa-chevron-up': showDetails }"></i>
        </span>
      </button>
    </div>
    <div v-if="showDetails" class="message-body">
      <p v-for="error in errorDetails" v-bind:key="error.function_name">
        <b>Error in sync job '{{ error.name }}'</b><br/>
        Message: {{ error.error_message }}
      </p>
    </div>
  </article>
</template>

<script>

export default {
  name: 'server-error',
  data() {
    return {
      showDetails: false,
      errorDetails: [],
    };
  },
  computed: {
    syncInErrorCount() {
      return this.$store.state.server.status.syncInErrorCount;
    },
  },
  watch: {
    async syncInErrorCount() {
      if (this.syncInErrorCount) {
        const query = `{
          sync(onlyJobsInError: true) {
            name
            error_message
          }
        }`;
        const response = await this.$store.dispatch('session/request', { query });
        this.errorDetails = response.sync;
      } else {
        this.showDetails = false;
        this.errorDetails = [];
      }
    },
  },
};

</script>
