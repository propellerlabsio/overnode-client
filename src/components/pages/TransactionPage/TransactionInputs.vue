<template>
  <div>
    <!-- Transaction inputs -->
    <table class="table">
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
          v-bind:key="input.input_number">
          <td>
            <transaction-link class="is-hidden-desktop"
              :transaction-id='input.output_transaction_id'
              :shorten="true"/>
            <transaction-link class="is-hidden-touch"
              :transaction-id='input.output_transaction_id'
              :shorten="false"/>
          </td>
          <td>
            {{ input.output_number }}
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
import TransactionLink from '../../links/TransactionLink';

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
    Pager,
    TransactionLink,
  },
  methods: {
    async gotoInputsPage(pageNumber) {
      this.inputsLoading = true;
      await this.$store.dispatch('transaction/setInputsPage', pageNumber);
      this.inputsLoading = false;
    },
  },
};
</script>
