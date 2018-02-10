<template>
  <div>
    <!-- Title bar -->
    <div class="level">
      <div class="level-left">
        <page-heading class="level-item" :title="`Block ${$route.params.height}`"/>
      </div>
      <div class="level-right">
        <a class="button" @click="gotoPreviousBlock"
          :disabled="block.height === 0 || isLoading">
          Previous
        </a>
        <a class="button" @click="gotoNextBlock"
          :disabled="block.height >= highestBlockHeight || isLoading">
          Next block
        </a>
      </div>
    </div>

    <!-- Block details -->
    <loading-message v-if="isLoading"/>
    <block-header v-else :block="block"/>
  </div>
</template>

<script>
import BlockHeader from './BlockPage/BlockHeader';
import LoadingMessage from '../misc/LoadingMessage';
import PageHeading from '../misc/PageHeading';

export default {
  name: 'block-page',
  components: {
    BlockHeader,
    LoadingMessage,
    PageHeading,
  },
  computed: {
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

