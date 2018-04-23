<template>
  <div>
    <!-- Heading -->
    <page-title :title="`Transaction ${ transaction ? transaction.transaction_id : '' }`"/>

    <!-- Transaction details -->
    <transaction-details v-if="transaction"/>
    <loading-message v-else/>

    <!-- Tabs -->
    <transaction-io-tabs class="is-hidden-desktop"/>
    <transaction-io-no-tabs class="is-hidden-touch"/>
  </div>
</template>

<script>
import AddressLink from '../links/AddressLink';
import LoadingMessage from '../misc/LoadingMessage';
import PageTitle from '../misc/PageTitle';
import TransactionDetails from './TransactionPage/TransactionDetails';
import TransactionIoTabs from './TransactionPage/TransactionIoTabs';
import TransactionIoNoTabs from './TransactionPage/TransactionIoNoTabs';
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
    TransactionIoTabs,
    TransactionIoNoTabs,
    TransactionLink,
  },
  methods: {
    setSelectedTransaction() {
      this.$store.dispatch('transaction/setSelected', this.$route.params.transactionId);
    },
  },
};
</script>
