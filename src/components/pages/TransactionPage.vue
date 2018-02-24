<template>
  <div>
    <!-- Header -->
    <div class="level is-mobile">
      <div class="level-left">
        <h2 class="level-item subtitle">Transaction&nbsp;
            <formatted-hash v-if="transaction" class="is-hidden-tablet"
              :hash='transaction.transaction_id'
              :shorten="true"/>
            <formatted-hash v-if="transaction"
              class="is-hidden-mobile" :hash='transaction.transaction_id'
              :shorten="false"/>
        </h2>
      </div>
    </div>

    <!-- Transaction details -->
    <table v-if="transaction" class="table">
      <tbody>
        <tr>
          <th>
            Size
          </th>
          <td>
            {{ transaction.size }}
          </td>
        </tr>
      </tbody>
    </table>

    <loading-message v-if="!transaction"/>

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
    <table v-if="transaction && activeTab === 'inputs'" class="table">
      <thead>
        <tr>
          <th>
            Transaction
          </th>
          <th>
            Output
          </th>
          <th>
            Coinbase?
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(input, index) in transaction.inputs"
          v-bind:key="index">
          <td>
            <formatted-hash class="is-hidden-tablet" :hash='input.output_transaction_id'
              :shorten="true"/>
            <formatted-hash class="is-hidden-mobile" :hash='input.output_transaction_id'
              :shorten="false"/>
          </td>
          <td>
            {{ input.output_index }}
          </td>
          <td>
            <span v-if="input.coinbase" class="icon has-text-success">
              <i class="fa fa-check"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Transaction outputs -->
    <table v-if="transaction && activeTab === 'outputs'" class="table">
      <thead>
        <tr>
          <th>
            Address
          </th>
          <th>
            Value BCH
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(output, index) in transaction.outputs"
          v-bind:key="index">
          <td>
            <span v-for="address in output.addresses" v-bind:key="address">
              <formatted-address class="is-hidden-tablet" :address='address'
                :shorten="false"/>
              <formatted-address class="is-hidden-mobile" :address='address'
                :shorten="false"/>
              <span v-if="output.addresses.length > 1">+</span>
            </span>
          </td>
          <td>
            {{ output.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormattedAddress from '../formatters/FormattedAddress';
import FormattedHash from '../formatters/FormattedHash';
import LoadingMessage from '../misc/LoadingMessage';

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
    FormattedAddress,
    FormattedHash,
    LoadingMessage,
  },
  methods: {
    setSelectedTransaction() {
      this.$store.dispatch('transaction/setSelected', this.$route.params.transactionId);
    },
  },
};
</script>

<style scoped>
  /* th {
    width: 100px;
  } */
</style>
