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
        <li :class="{ 'is-active': $route.name === 'BlockTransactions' }">
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
      v-if="$route.name === 'BlockTransactions'"
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
    previousDisabled() {
      return this.block.height === 0 || this.isLoading;
    },
    nextDisabled() {
      return this.block.height >= this.highestBlockHeight || this.isLoading;
    },
    highestBlockHeight() {
      return this.$store.state.server.status.height.overnode.to;
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
        this.$router.push({
          name: 'Block',
          params: {
            height,
          },
        });
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
        await this.$store.dispatch('blocks/setSelected', Number(this.$route.params.height));
        this.loadedBlockHeight = this.$route.params.height;
      }

      // Load transactions for selected block/transactions page
      if (this.$route.name === 'BlockTransactions') {
        await this.$store.dispatch('blocks/setTransactionsPage', Number(this.$route.params.pageNumber));
      }

      this.isLoading = false;
    },
  },
};
</script>
