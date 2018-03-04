<template>
  <div>
    <!-- Header -->
    <div class="level is-mobile is-clipped">
      <div class="level-left is-clipped">
        <h2 class="level-item subtitle is-4 is-clipped">Transaction&nbsp;
            <formatted-hash v-if="transaction" class="is-hidden-tablet"
              :hash='transaction.transaction_id'
              :shorten="true"/>
            <formatted-hash v-if="transaction"
              class="is-hidden-mobile is-clipped" :hash='transaction.transaction_id'
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
          <th>
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="input in inputsPage.pageData"
          v-bind:key="input.input_index">
          <td>
            <formatted-hash class="is-hidden-desktop" :hash='input.output_transaction_id'
              :shorten="true"/>
            <formatted-hash class="is-hidden-touch" :hash='input.output_transaction_id'
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
          <td>
            {{ input.output_value }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Inputs paging -->
    <pager
      v-if="transaction && activeTab === 'inputs'"
      :disabled="inputsLoading"
      :current-page="inputsPage.current"
      :last-page="inputsPage.last"
      @previous="gotoInputsPage(inputsPage.current - 1)"
      @next="gotoInputsPage(inputsPage.current + 1)"
      @goto="gotoInputsPage"/>

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
        <tr v-for="output in outputsPage.pageData"
          v-bind:key="output.output_index">
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

    <!-- Outputs paging -->
    <pager
      v-if="transaction && activeTab === 'outputs'"
      :disabled="outputsLoading"
      :current-page="outputsPage.current"
      :last-page="outputsPage.last"
      @previous="gotoOutputsPage(outputsPage.current - 1)"
      @next="gotoOutputsPage(outputsPage.current + 1)"
      @goto="gotoOutputsPage"/>

  </div>
</template>

<script>
import FormattedAddress from '../formatters/FormattedAddress';
import FormattedHash from '../formatters/FormattedHash';
import LoadingMessage from '../misc/LoadingMessage';
import Pager from '../misc/Pager';
import PageTitle from '../misc/PageTitle';

export default {
  name: 'transaction-page',
  data() {
    return {
      activeTab: 'inputs',
      inputsLoading: false,
      outputsLoading: false,
    };
  },
  computed: {
    transaction() {
      return this.$store.state.transaction.selected;
    },
    inputsPage() {
      return this.$store.getters['transaction/inputsPage'];
    },
    outputsPage() {
      return this.$store.getters['transaction/outputsPage'];
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
    Pager,
    PageTitle,
  },
  methods: {
    async gotoInputsPage(pageNumber) {
      this.inputsLoading = true;
      await this.$store.dispatch('transaction/setInputsPage', pageNumber);
      this.inputsLoading = false;
    },
    async gotoOutputsPage(pageNumber) {
      this.outputsLoading = true;
      await this.$store.dispatch('transaction/setOutputsPage', pageNumber);
      this.outputsLoading = false;
    },
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
