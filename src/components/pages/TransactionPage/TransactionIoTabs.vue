<template>
  <div>
    <!-- Tabs -->
    <div v-if="transaction" class="tabs">
      <ul>
        <li :class="{ 'is-active': activeTab === 'inputs' }">
          <a @click="activeTab = 'inputs'">
            Inputs ({{ transaction.input_count }})
          </a>
        </li>
        <li :class="{ 'is-active': activeTab === 'outputs' }">
          <a @click="activeTab = 'outputs'">
            Outputs ({{ transaction.output_count }})
          </a>
        </li>
      </ul>
    </div>

    <!-- Transaction inputs -->
    <transaction-inputs v-if="transaction && activeTab === 'inputs'"/>

    <!-- Transaction outputs -->
    <transaction-outputs v-if="transaction && activeTab === 'outputs'"/>
  </div>
</template>

<script>
import TransactionInputs from './TransactionInputs';
import TransactionOutputs from './TransactionOutputs';

export default {
  name: 'transaction-io-tabs',
  data() {
    return {
      activeTab: 'inputs',
    };
  },
  computed: {
    transaction() {
      return this.$store.state.transaction.selected;
    },
  },
  components: {
    TransactionInputs,
    TransactionOutputs,
  },
};
</script>
