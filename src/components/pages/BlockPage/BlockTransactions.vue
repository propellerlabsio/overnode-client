<template>
  <div>
    <table class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>
            No.
          </th>
          <th>
            Id
          </th>
          <th class="is-hidden-mobile">
            Inputs
          </th>
          <th class="is-hidden-mobile">
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
          @click="$emit('selected', index)">
          <td>
            {{ getTransactionIndex(index) }}
          </td>
          <td>
            <formatted-hash class="is-hidden-tablet" :hash='transaction.txid' :shorten="true"/>
            <formatted-hash class="is-hidden-mobile" :hash='transaction.txid' :shorten="false"/>
          </td>
          <td class="is-hidden-mobile has-text-right">
            {{ transaction.inputs.length }}
          </td>
          <td class="is-hidden-mobile has-text-right">
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
      :disabled="isPageLoading"
      :current-page="page.current"
      :last-page="page.last"
      @previous="gotoTransactionsPage(page.current - 1)"
      @next="gotoTransactionsPage(page.current + 1)"
      @goto="gotoTransactionsPage"/>
  </div>
</template>

<script>
import FormattedHash from '../../formatters/FormattedHash';
import Pager from '../../misc/Pager';

export default {
  name: 'block-transactions',
  props: ['transactions'],
  components: {
    FormattedHash,
    Pager,
  },
  data() {
    return {
      isPageLoading: false,
    };
  },
  created() {
    this.gotoTransactionsPage(1);
  },
  computed: {
    page() {
      return this.$store.getters['blocks/transactionsPage'];
    },
  },
  methods: {
    getTransactionIndex(indexOnPage) {
      return indexOnPage + (this.page.limit * (this.page.current - 1));
    },
    async gotoTransactionsPage(pageNumber) {
      this.isPageLoading = true;
      await this.$store.dispatch('blocks/gotoTransactionsPage', pageNumber);
      this.isPageLoading = false;
    },
  },
};
</script>
