<template>
  <div>
    <!-- Transaction inputs -->
    <table class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>
            <!-- Nav icon -->
          </th>
          <th>
            Transaction
          </th>
          <th>
            Output
          </th>
          <th>
            Value BCH
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="input in inputsPage.pageData"
          v-bind:key="input.input_number"
          @click="navToTransactionOutput(input)">
          <td class="has-text-centered">
            <span v-if="!input.coinbase" class = "icon">
              <i class = "fa fa-chevron-left"></i>
            </span>
          </td>
          <td>
            <span v-if="input.coinbase">
               Coinbase
            </span>
            <formatted-hash
              :hash='input.output_transaction_id'
              :shorten="true"/>
          </td>
          <td>
            {{ input.output_number }}
          </td>
          <td>
            {{ input.output_value }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Inputs paging -->
    <pager
      :disabled="inputsLoading"
      :current-page="inputsPage.current"
      :last-page="inputsPage.last"
      @previous="gotoInputsPage(inputsPage.current - 1)"
      @next="gotoInputsPage(inputsPage.current + 1)"
      @goto="gotoInputsPage"/>

  </div>
</template>

<script>
import Pager from '../../misc/Pager';
import FormattedHash from '../../formatters/FormattedHash';

export default {
  name: 'transaction-inputs',
  data() {
    return {
      inputsLoading: false,
    };
  },
  computed: {
    inputsPage() {
      return this.$store.getters['transaction/inputsPage'];
    },
  },
  components: {
    FormattedHash,
    Pager,
  },
  methods: {
    async gotoInputsPage(pageNumber) {
      this.inputsLoading = true;
      await this.$store.dispatch('transaction/setInputsPage', pageNumber);
      this.inputsLoading = false;
    },
    navToTransactionOutput(input) {
      if (!input.coinbase) {
        this.$router.push({
          name: 'Transaction',
          params: {
            transactionId: input.output_transaction_id,
          },
        });
      }
    },
  },
};
</script>
