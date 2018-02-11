<template>
  <div>
    <table class="table">
      <thead>
        <tr>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.txid">
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
</template>

<script>
import FormattedHash from '../../formatters/FormattedHash';
import Pager from '../../misc/Pager';

export default {
  name: 'block-transactions',
  components: {
    FormattedHash,
    Pager,
  },
  created() {
    this.gotoPage(1);
  },
  data() {
    return {
      loading: true,
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
    async gotoPage(pageNumber) {
      this.loading = true;
      await this.$store.dispatch('blocks/gotoTransactionsPage', pageNumber);
      this.loading = false;
    },
  },
};
</script>
