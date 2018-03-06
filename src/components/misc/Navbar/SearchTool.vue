<template>
  <div class="navbar-item is-expanded">
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input"
        :class="{ 'has-text-danger': notFound, 'is-white': !notFound, 'is-danger': notFound }"
        v-model="term" type="text"
        v-on:keyup.enter="execute"
        placeholder="Block, transaction or address">
    </div>
    <div class="control">
      <button v-if="term" class="button is-white" @click="clear">
        <span class="icon">
          <i class="fa fa-times"></i>
        </span>
      </button>
    </div>
    <div class="control">
      <a class="button is-white" @click="execute" :class="{ 'is-loading': loading }">
        <span class="icon">
          <i class="fa fa-search"></i>
        </span>
      </a>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'search-tool',
  data() {
    return {
      term: '',
      loading: false,
      notFound: false,
    };
  },
  watch: {
    term() {
      this.notFound = false;
    },
  },
  computed: {
    results() {
      return this.$store.state.search.results;
    },
  },
  methods: {
    clear() {
      this.term = '';
    },
    cleanSearchTerm(term) {
      let cleaned = term;
      // Dump cash address prefix
      const cashaddrPrefix = 'bitcoincash:';
      if (cleaned.substring(0, cashaddrPrefix.length) === cashaddrPrefix) {
        cleaned = cleaned.substr(cashaddrPrefix.length);
      }
      return cleaned;
    },
    async execute() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      const cleanedTerm = this.cleanSearchTerm(this.term);
      await this.$store.dispatch('search/execute', cleanedTerm);

      // Nav to result
      if (this.results.block) {
        // Block found
        this.term = '';
        this.$router.push({
          name: 'Block',
          params: {
            height: this.results.block.height,
          },
        });
      } else if (this.results.transaction) {
        // Transaction found
        this.term = '';
        this.$router.push({
          name: 'Transaction',
          params: {
            transactionId: this.results.transaction.transaction_id,
          },
        });
      } else if (this.results.address) {
        // Address found
        this.term = '';
        this.$router.push({
          name: 'Address',
          params: {
            address: this.results.address.address,
          },
        });
      } else {
        // Nothing found (might be an address but we have no page for that yet)
        this.notFound = true;
        this.$store.commit('toasts/add', {
          message: 'Nothing found for that search term',
          timeoutSecs: 5,
          type: 'danger',
          position: 'top',
        });
      }

      this.loading = false;
    },
  },
};
</script>


<style scoped>
  .field {
    flex-grow: 1;
    flex-shrink: 1;
  }
</style>
