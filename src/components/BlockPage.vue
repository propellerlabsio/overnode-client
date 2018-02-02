<template>
  <div>
    <h1 class="title">Block</h1>
    {{ block.height }}
    {{ block.hash }}
    {{ block.nonce }}
  </div>
</template>

<script>
export default {
  name: 'block-page',
  computed: {
    block() {
      return this.$store.state.blocks.activeBlock;
    },
  },
  created() {
    this.$store.dispatch('blocks/setActiveBlock', this.$route.params.hash);
  },
};
</script>
