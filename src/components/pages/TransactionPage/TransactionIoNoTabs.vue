<template>
  <div v-if="transaction" class="columns">
    <div class="column">
      <div class="box">
        <page-subtitle :title="`Inputs (${transaction.input_count})`"/>
        <transaction-inputs/>
      </div>
    </div>
    <div class="column">
      <div class="box">
        <page-subtitle :title="`Outputs (${transaction.output_count})`"/>
        <transaction-outputs/>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionInputs from './TransactionInputs';
import TransactionOutputs from './TransactionOutputs';
import PageSubtitle from '../../misc/PageSubtitle';

export default {
  name: 'transaction-io-no-tabs',
  computed: {
    transaction() {
      return this.$store.state.transaction.selected;
    },
  },
  components: {
    TransactionInputs,
    TransactionOutputs,
    PageSubtitle,
  },
};
</script>
