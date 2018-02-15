<template>
  <blocks-table :blocks="blocks"/>
</template>

<script>
import BlocksTable from '../../misc/BlocksTable';

export default {
  name: 'recent-blocks',
  components: {
    BlocksTable,
  },
  created() {
    this.$store.dispatch('blocks/gotoBlocksPage', 1);
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.blocksPage.blocks.slice(0, 6);
    },
  },
};
</script>
