<template>
  <div>
    <h1 class="title">Block {{ block.height }}</h1>
    <formatted-hash :hash='block.hash' :short='false'/>
    {{ block.nonce }}
  </div>
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';

export default {
  name: 'block-page',
  components: {
    FormattedHash,
  },
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
