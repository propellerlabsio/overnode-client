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
        <li :class="{ 'is-active': activeTab === 'details' }">
          <a @click="activeTab = 'details'">
            Details
          </a>
        </li>
        <li :class="{ 'is-active': activeTab === 'transactions' }">
          <a @click="activeTab = 'transactions'">
            Transactions
          </a>
        </li>
      </ul>
    </div>

    <!-- Loading message -->
    <loading-message v-if="isBlockLoading"/>

    <!-- Block header details -->
    <block-header v-if="!isBlockLoading && activeTab === 'details'" :block="block"/>


    <!-- Transactions table -->
    <block-transactions
      v-if="!isBlockLoading && activeTab === 'transactions'"
      :transactions="transactions"
      @selected="selectTransaction"/>
  </div>
</template>

<script>
import BlockHeader from './BlockPage/BlockHeader';
import BlockNavButtons from './BlockPage/BlockNavButtons';
import BlockTransactions from './BlockPage/BlockTransactions';
import LoadingMessage from '../misc/LoadingMessage';
import PageTitle from '../misc/PageTitle';

export default {
  name: 'block-page',
  components: {
    BlockHeader,
    BlockNavButtons,
    BlockTransactions,
    LoadingMessage,
    PageTitle,
  },
  data() {
    return {
      activeTab: 'details',
    };
  },
  computed: {
    previousDisabled() {
      return this.block.height === 0 || this.isBlockLoading;
    },
    nextDisabled() {
      return this.block.height >= this.highestBlockHeight || this.isBlockLoading;
    },
    isBlockLoading() {
      return !this.block || this.block.height !== Number(this.$route.params.height);
    },
    highestBlockHeight() {
      return this.$store.state.server.status.height.overnode.to;
    },
    block() {
      return this.$store.state.blocks.selected;
    },
    transactions() {
      return this.$store.state.blocks.transactionsPage.transactions;
    },
  },
  watch: {
    $route: 'setSelectedBlock',
  },
  async created() {
    this.setSelectedBlock();
  },
  methods: {
    setSelectedBlock() {
      this.$store.dispatch('blocks/setSelected', Number(this.$route.params.height));
    },
    gotoBlock(height) {
      if (!this.isBlockLoading && height >= 0 && height <= this.highestBlockHeight) {
        this.$router.push({
          name: 'Block',
          params: {
            height,
          },
        });
      }
    },
    gotoPreviousBlock() {
      this.gotoBlock(this.block.height - 1);
    },
    gotoNextBlock() {
      this.gotoBlock(this.block.height + 1);
    },
    selectTransaction(transactionId) {
      this.$router.push({
        name: 'Transaction',
        params: {
          transactionId,
        },
      });
    },
  },
};
</script>
