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
          <th class="is-hidden-touch">
            Inputs
          </th>
          <th class="is-hidden-touch">
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
        <tr v-for="transaction in page.pageData" :key="transaction.txid"
          @click="$emit('selected', transaction.transaction_id)">
          <td>
            {{ transaction.transaction_index }}
          </td>
          <td>
            <transaction-link class="is-hidden-tablet"
              :transaction-id='transaction.transaction_id' :shorten="true"/>
            <transaction-link class="is-hidden-mobile"
              :transaction-id='transaction.transaction_id' :shorten="false"/>
          </td>
          <td class="is-hidden-touch has-text-right">
            {{ transaction.input_count }}
          </td>
          <td class="is-hidden-touch has-text-right">
            {{ transaction.output_count }}
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
      v-if="page.pageData"
      :disabled="isLoading"
      :current-page="page.current"
      :last-page="page.last"
      @previous="navToTransactionsPage(page.current - 1)"
      @next="navToTransactionsPage(page.current + 1)"
      @goto="navToTransactionsPage"/>
  </div>
</template>

<script>
import Pager from '../../misc/Pager';
import TransactionLink from '../../links/TransactionLink';

export default {
  name: 'block-transactions',
  components: {
    Pager,
    TransactionLink,
  },
  props: {
    isLoading: false,
  },
  computed: {
    page() {
      return this.$store.getters['blocks/transactionsPage'];
    },
  },
  methods: {
    navToTransactionsPage(pageNumber) {
      this.$router.push({
        name: 'BlockTransactions',
        params: {
          height: this.$route.params.height,
          pageNumber,
        },
      });
    },
  },
};
</script>
