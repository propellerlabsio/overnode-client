<template>
  <div class="navbar-item is-expanded">
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" v-model="term" type="text"
        v-on:keyup.enter="execute"
        placeholder="Find a block or transaction">
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
    };
  },
  computed: {
    results() {
      return this.$store.state.search.results;
    },
  },
  methods: {
    async execute() {
      this.loading = true;
      await this.$store.dispatch('search/execute', this.term);
      this.loading = false;

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
      } else {
        // Nothing found (might be an address but we have no page for that yet)
        this.$store.commit('toasts/add', {
          message: 'Nothing found for that term',
          timeoutSecs: 8,
          type: 'warning',
        });
      }
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
