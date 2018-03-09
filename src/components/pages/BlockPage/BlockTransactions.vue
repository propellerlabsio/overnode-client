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
          @click="$emit('selected', transaction.transaction_id)"
          :class="{
            'is-selected': transaction.transaction_index === highlightedIndex,
          }">
          <td>
            {{ transaction.transaction_index }}
          </td>
          <td>
            <formatted-hash class="is-hidden-tablet"
              :hash='transaction.transaction_id' :shorten="true"/>
            <formatted-hash class="is-hidden-mobile"
              :hash='transaction.transaction_id' :shorten="false"/>
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
            <span class="icon">
              <i class="fa fa-chevron-right"></i>
            </span>
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
import FormattedHash from '../../formatters/FormattedHash';
import Pager from '../../misc/Pager';

export default {
  name: 'block-transactions',
  components: {
    FormattedHash,
    Pager,
  },
  props: {
    isLoading: false,
  },
  computed: {
    highlightedIndex() {
      return this.$store.state.blocks.highlightedTransactionIndex;
    },
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
