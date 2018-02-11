<template>
  <div>
    <!-- Selected Transaction -->
    <block-transaction
      v-if="selectedTransaction"
      :transaction="selectedTransaction"
      :index="selectedIndex"
      @back="selectedTransaction = null"/>

    <!-- Transactions table -->
    <div v-else>
      <table class="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>
              No.
            </th>
            <th>
              Id
            </th>
            <th>
              Inputs
            </th>
            <th>
              Outputs
            </th>
            <th>
              Size
            </th>
            <th>
              <!-- Nav to tx -->
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="transaction.txid"
            @click="selectTransaction(index)">
            <td>
              {{ getTransactionIndex(index) }}
            </td>
            <td>
              <formatted-hash class="is-hidden-tablet" :hash='transaction.txid' :shorten="true"/>
              <formatted-hash class="is-hidden-mobile" :hash='transaction.txid' :shorten="false"/>
            </td>
            <td class="has-text-right">
              {{ transaction.inputs.length }}
            </td>
            <td class="has-text-right">
              {{ transaction.outputs.length }}
            </td>
            <td class="has-text-right">
              {{ transaction.size }}
            </td>
            <td class="has-text-centered">
              <a class="button is-white">
                <span class="icon">
                  <i class="fa fa-chevron-right"></i>
                </span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <pager
        :disabled="loading"
        :current-page="page.current"
        :last-page="page.last"
        @previous="gotoPage(page.current - 1)"
        @next="gotoPage(page.current + 1)"
        @goto="gotoPage"/>
    </div>
  </div>
</template>

<script>
import BlockTransaction from './BlockTransaction';
import FormattedHash from '../../formatters/FormattedHash';
import Pager from '../../misc/Pager';

export default {
  name: 'block-transactions',
  components: {
    BlockTransaction,
    FormattedHash,
    Pager,
  },
  created() {
    this.gotoPage(1);
  },
  data() {
    return {
      loading: true,
      selectedTransaction: null,
      selectedIndex: null,
    };
  },
  computed: {
    page() {
      return this.$store.getters['blocks/transactionsPage'];
    },
    transactions() {
      return this.$store.state.blocks.transactionsPage.transactions;
    },
  },
  methods: {
    getTransactionIndex(indexOnPage) {
      return indexOnPage + (this.page.limit * (this.page.current - 1));
    },
    selectTransaction(indexOnPage) {
      this.selectedTransaction = this.transactions[indexOnPage];
      this.selectedIndex = this.getTransactionIndex(indexOnPage);
    },
    async gotoPage(pageNumber) {
      this.loading = true;
      await this.$store.dispatch('blocks/gotoTransactionsPage', pageNumber);
      this.loading = false;
    },
  },
};
</script>
