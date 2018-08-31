<template>
  <div>
    <!-- Title bar -->
    <div class="level is-mobile">
      <div class="level-left">
        <page-title class="level-item" :title="`Block ${$route.params.height}`"/>
      </div>
      <div class="level-right">
        <block-nav-buttons
          :previous-disabled="previousDisabled"
          :next-disabled="nextDisabled"
          @previous="gotoPreviousBlock"
          @next="gotoNextBlock"/>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': $route.name === 'Block' }">
          <a @click="navToDetailsTab">
            Details
          </a>
        </li>
        <li :class="{ 'is-active': transactionTabActive }">
          <a @click="navToTransactionsTab">
            Transactions
          </a>
        </li>
      </ul>
    </div>

    <!-- Block header details -->
    <block-header v-if="$route.name === 'Block'" :is-loading="isLoading" :block="block"/>

    <!-- Transactions table -->
    <block-transactions
      v-if="transactionTabActive"
      :is-loading="isLoading"
      @selected="selectTransaction"/>
  </div>
</template>

<script>
import BlockHeader from './BlockPage/BlockHeader';
import BlockNavButtons from './BlockPage/BlockNavButtons';
import BlockTransactions from './BlockPage/BlockTransactions';
import PageTitle from '../misc/PageTitle';

export default {
  name: 'block-page',
  components: {
    BlockHeader,
    BlockNavButtons,
    BlockTransactions,
    PageTitle,
  },
  computed: {
    transactionTabActive() {
      return this.$route.name === 'BlockTransactions' || this.$route.name === 'BlockTransaction';
    },
    previousDisabled() {
      return this.block.height === 0 || this.isLoading;
    },
    nextDisabled() {
      return this.block.height >= this.highestBlockHeight || this.isLoading;
    },
    highestBlockHeight() {
      return this.$store.state.server.status.height.bitcoind;
    },
    block() {
      return this.$store.state.blocks.selected;
    },
  },
  data() {
    return {
      isLoading: true,
      loadedBlockHeight: null,
    };
  },
  watch: {
    $route: 'loadDataForRoute',
  },
  async created() {
    this.loadDataForRoute();
  },
  methods: {
    navToDetailsTab() {
      this.$router.push({
        name: 'Block',
        params: {
          height: this.$route.params.height,
        },
      });
    },
    navToTransactionsTab() {
      this.$router.push({
        name: 'BlockTransactions',
        params: {
          height: this.$route.params.height,
          pageNumber: 1,
        },
      });
    },
    navToBlock(height) {
      if (!this.isLoading && height >= 0 && height <= this.highestBlockHeight) {
        // If currently looking at details, goto to details tab of new block
        if (this.$route.name === 'Block') {
          this.$router.push({
            name: 'Block',
            params: {
              height,
            },
          });
        } else {
          // Currently looking at transactions, goto to transactions tab of new block
          this.$router.push({
            name: 'BlockTransactions',
            params: {
              height,
              pageNumber: 1,
            },
          });
        }
      }
    },
    gotoPreviousBlock() {
      this.navToBlock(this.block.height - 1);
    },
    gotoNextBlock() {
      this.navToBlock(this.block.height + 1);
    },
    selectTransaction(transactionId) {
      this.$router.push({
        name: 'Transaction',
        params: {
          transactionId,
        },
      });
    },
    async loadDataForRoute() {
      this.isLoading = true;
      // If new block, load it
      if (this.$route.params.height !== this.loadedBlockHeight) {
        // Only if we have a new block requested
        this.$store.commit('blocks/setHighlightedTransactionIndex', null);
        await this.$store.dispatch('blocks/setSelected', Number(this.$route.params.height));
        this.loadedBlockHeight = this.$route.params.height;
      }

      // Load transactions for selected block/transactions page
      if (this.$route.name === 'BlockTransactions') {
        await this.$store.dispatch('blocks/setTransactionsPage', Number(this.$route.params.pageNumber));
      } else if (this.$route.name === 'BlockTransaction') {
        const transactionIndex = Number(this.$route.params.transactionIndex);
        const transactionsPerPage = this.$store.state.blocks.transactionsPaging.limit;

        // Calc page number (1 is first page)
        const pageNumber = Math.floor((transactionIndex) / transactionsPerPage) + 1;
        this.$store.commit('blocks/setHighlightedTransactionIndex', transactionIndex);
        await this.$store.dispatch('blocks/setTransactionsPage', pageNumber);
      }

      this.isLoading = false;
    },
  },
};
</script>
