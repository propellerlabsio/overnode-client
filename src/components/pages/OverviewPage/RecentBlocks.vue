<template>
  <blocks-table :blocks="blocks" :is-narrow="true"/>
</template>

<script>
import BlocksTable from '../../misc/BlocksTable';

export default {
  name: 'recent-blocks',
  components: {
    BlocksTable,
  },
  created() {
    this.$store.dispatch('blocks/setBlocksPage', 1);
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.pageBlocks.slice(0, 6);
    },
  },
};
</script>
