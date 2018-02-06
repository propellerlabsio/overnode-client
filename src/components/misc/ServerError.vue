<template>
  <article class="message is-danger" v-if="jobsInErrorCount">
    <div class="message-header">
      <p>
        <span class="icon">
          <i class="fa fa-info-circle"></i>
        </span>
        The server is having a problem. Results may be unreliable.
        <a v-if="!showDetails" @click="onClickDetails">Details</a>
      </p>
    </div>
    <div v-if="showDetails" class="message-body">
      <p v-for="error in errorDetails" v-bind:key="error.function_name">
        {{ error }}
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
        this.errorDetails = response
          .jobs
          .map(job =>
            `${job.function_name}: ${job.error_message}`);
      } else {
        this.showDetails = false;
        this.errorDetails = [];
      }
    },
  },
  methods: {
    onClickDetails() {
      this.showDetails = true;
    },
  },
};

</script>
