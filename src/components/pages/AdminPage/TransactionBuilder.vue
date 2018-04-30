<template>
  <div class="max-parent-width">
    <p>Under construction</p>
    <!-- <a class="button" @click="showTransactionIdDialog = true">
      <span>Blockchain</span>
      <span class="icon">
        <i class="fa fa-download"/>
      </span>
    </a>
    <raw-transaction v-if="transaction.raw"/>
    <transaction-id-dialog
      :show="showTransactionIdDialog"
      @close="showTransactionIdDialog = false"/> -->
  </div>
</template>

<script>
/* eslint-disable */
import RawTransaction from './TransactionBuilder/RawTransaction';
import TransactionIdDialog from './TransactionBuilder/TransactionIdDialog';

export default {
  name: 'transaction-builder',
  components: {
    RawTransaction,
    TransactionIdDialog,
  },
  data() {
    return {
      showTransactionIdDialog: false,
    };
  },
  computed: {
    transaction() {
      return this.$store.state.transactionBuilder;
    },
  },
  methods: {
  },
};
</script>

<style>
  .max-parent-width {
    max-width: 100%;
  }
</style>
