<template>
  <div>
    <h1 class="title">
      <back-button/>
      Block {{ block.height }}
    </h1>
    <div class="columns">
      <div :class="labelClasses">
        Hash
      </div>
      <div :class="dataClasses">
        <formatted-hash :hash='block.hash' :short='false'/>
      </div>
    </div>
    <div class="columns">
      <div :class="labelClasses">
        Nonce
      </div>
      <div :class="dataClasses">
        {{ block.nonce }}
      </div>
    </div>
    <div class="columns">
      <div :class="labelClasses">
        Mined on
      </div>
      <div :class="dataClasses">
        <formatted-unix-time :time="block.time" />
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '../misc/BackButton';
import FormattedHash from '../formatters/FormattedHash';
import FormattedUnixTime from '../formatters/FormattedUnixTime';

export default {
  name: 'block-page',
  components: {
    BackButton,
    FormattedHash,
    FormattedUnixTime,
  },
  data() {
    return {
      dataClasses: [
        'block',
        'column',
      ],
      labelClasses: [
        'block',
        'column',
        'is-one-quarter',
        'has-text-right-tablet',
        'label',
      ],
    };
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

<style scoped>

.block.column {
  padding-bottom: 0;
  padding-top: 0;
  margin-bottom: .75rem;
}
</style>

