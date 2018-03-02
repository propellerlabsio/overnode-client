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
      <p>
        Error syncing {{ syncInErrorCount }} blocks.  Run query 'sync_error' for details.
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
    };
  },
  computed: {
    syncInErrorCount() {
      return this.$store.state.server.status.syncInErrorCount;
    },
  },
};

</script>
