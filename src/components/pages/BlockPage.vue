<template>
  <div>
    <h1 class="title">
      <back-button/>
      Block {{ block.height }}
    </h1>
    <formatted-hash :hash='block.hash' :short='false'/>
    {{ block.nonce }}
  </div>
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';
import BackButton from '../misc/BackButton';

export default {
  name: 'block-page',
  components: {
    FormattedHash,
    BackButton,
  },
  computed: {
    block() {
      return this.$store.state.blocks.selected;
    },
  },
  created() {
    this.$store.dispatch('blocks/setSelected', this.$route.params.hash);
  },
};
</script>
