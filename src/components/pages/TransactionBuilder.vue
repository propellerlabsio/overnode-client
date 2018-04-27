<template>
  <p>Transaction Builder coming soon...</p>
  <!-- <div>
    <a class="button" @click="load">Load</a>
    <raw-transaction v-if="transaction.raw"/>
  </div> -->
</template>

<script>
import RawTransaction from './TransactionBuilder/RawTransaction';

export default {
  name: 'transaction-builder',
  components: {
    RawTransaction,
  },
  computed: {
    transaction() {
      return this.$store.state.transactionBuilder;
    },
  },
  methods: {
    async load() {
      try {
        await this.$store.dispatch('transactionBuilder/load', 'd8a05d6296c5999379e9b1dba1b75301ba63f21574a6aaeaa95c7a019ddef274');
        this.$store.commit('toasts/add', {
          message: 'Tranasction loaded',
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
