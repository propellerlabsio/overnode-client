<template>
  <div>
    <!-- Heading -->
    <page-title :title="`Transaction ${ transaction ? transaction.transaction_id : '' }`"/>

    <!-- Transaction details -->
    <transaction-details v-if="transaction"/>
    <loading-message v-else/>

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
import AddressLink from '../links/AddressLink';
import LoadingMessage from '../misc/LoadingMessage';
import PageTitle from '../misc/PageTitle';
import TransactionDetails from './TransactionPage/TransactionDetails';
import TransactionInputs from './TransactionPage/TransactionInputs';
import TransactionOutputs from './TransactionPage/TransactionOutputs';
import TransactionLink from '../links/TransactionLink';

export default {
  name: 'transaction-page',
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
  watch: {
    $route() {
      this.setSelectedTransaction();
    },
  },
  async created() {
    this.setSelectedTransaction();
  },
  components: {
    AddressLink,
    LoadingMessage,
    PageTitle,
    TransactionDetails,
    TransactionInputs,
    TransactionOutputs,
    TransactionLink,
  },
  methods: {
    setSelectedTransaction() {
      this.$store.dispatch('transaction/setSelected', this.$route.params.transactionId);
    },
  },
};
</script>
