<template>
  <article class="message is-danger" v-if="jobsInErrorCount">
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
        <b>Error in job '{{ error.function_name }}'</b><br/>
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
    jobsInErrorCount() {
      return this.$store.state.server.status.jobsInErrorCount;
    },
  },
  watch: {
    async jobsInErrorCount() {
      if (this.jobsInErrorCount) {
        const query = `{
          jobs(onlyJobsInError: true) {
            function_name
            error_message
          }
        }`;
        const response = await this.$store.dispatch('session/request', { query });
        this.errorDetails = response.jobs;
      } else {
        this.showDetails = false;
        this.errorDetails = [];
      }
    },
  },
};

</script>
