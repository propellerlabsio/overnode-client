<template>
  <div>
    <!-- Title bar -->
    <div class="level">
      <div class="level-left">
        <page-heading class="level-item" :title="`Block ${$route.params.height}`"/>
      </div>
      <div class="level-right is-hidden-mobile">
        <!-- Nav buttons on right (non-mobile) -->
        <block-nav-buttons
          :previous-disabled="previousDisabled"
          :next-disabled="nextDisabled"
          @previous="gotoPreviousBlock"
          @next="gotoNextBlock"/>
      </div>
    </div>

    <!-- Nav buttons centered (mobile only) -->
    <div class="columns is-mobile is-hidden-tablet is-centered">
      <div class="column is-narrow">
        <div class="field is-grouped ">
          <block-nav-buttons
            :previous-disabled="previousDisabled"
            :next-disabled="nextDisabled"
            @previous="gotoPreviousBlock"
            @next="gotoNextBlock"/>
          </div>
      </div>
    </div>

    <!-- Block details -->
    <loading-message v-if="isLoading"/>
    <block-header v-else :block="block"/>
  </div>
</template>

<script>
import BlockHeader from './BlockPage/BlockHeader';
import BlockNavButtons from './BlockPage/BlockNavButtons';
import LoadingMessage from '../misc/LoadingMessage';
import PageHeading from '../misc/PageHeading';

export default {
  name: 'block-page',
  components: {
    BlockHeader,
    BlockNavButtons,
    LoadingMessage,
    PageHeading,
  },
  computed: {
    previousDisabled() {
      return this.block.height === 0 || this.isLoading;
    },
    nextDisabled() {
      return this.block.height >= this.highestBlockHeight || this.isLoading;
    },
    isLoading() {
      return !this.block || this.block.height !== Number(this.$route.params.height);
    },
    highestBlockHeight() {
      return this.$store.state.server.status.height.overnode;
    },
    block() {
      return this.$store.state.blocks.selected;
    },
  },
  watch: {
    $route: 'setSelectedBlock',
  },
  created() {
    this.setSelectedBlock();
  },
  methods: {
    setSelectedBlock() {
      this.$store.dispatch('blocks/setSelected', Number(this.$route.params.height));
    },
    gotoBlock(height) {
      if (!this.loading && height >= 0 && height <= this.highestBlockHeight) {
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
  },
};
</script>

