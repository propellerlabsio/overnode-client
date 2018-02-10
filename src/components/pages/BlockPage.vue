<template>
  <div>
    <div class="level">
      <div class="level-left">
        <back-button class="level-item is-narrow"/>
        <page-heading class="level-item" :title="`Block ${block.height}`"/>
      </div>
    </div>
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
        Mined on
      </div>
      <div :class="dataClasses">
        <formatted-unix-time :time="block.time" />
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
  </div>
</template>

<script>
import BackButton from '../misc/BackButton';
import FormattedHash from '../formatters/FormattedHash';
import FormattedUnixTime from '../formatters/FormattedUnixTime';
import PageHeading from '../misc/PageHeading';

export default {
  name: 'block-page',
  components: {
    BackButton,
    FormattedHash,
    FormattedUnixTime,
    PageHeading,
  },
  data() {
    return {
      dataClasses: [
        'block',
        'column',
        'is-clipped',
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
    this.$store.dispatch('blocks/setSelected', this.$route.params.height);
  },
};
</script>

<style scoped>

.block.column {
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  /* margin-top: .25rem; */
  margin-bottom: .25rem;
}
</style>

