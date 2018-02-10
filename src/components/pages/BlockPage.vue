<template>
  <div>
    <div class="level">
      <div class="level-left">
        <back-button class="level-item is-narrow"/>
        <page-heading class="level-item" :title="`Block ${block.height}`"/>
      </div>
      <div class="level-right">
        <a class="button" @click="gotoPreviousBlock"
          :disabled="block.height === 0">
          Previous
        </a>
        <a class="button" @click="gotoNextBlock"
          :disabled="block.height >= highestBlockHeight">
          Next
        </a>
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
      this.$store.dispatch('blocks/setSelected', this.$route.params.height);
    },
    gotoBlock(height) {
      if (height >= 0 && height <= this.highestBlockHeight) {
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

<style scoped>

.block.column {
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  /* margin-top: .25rem; */
  margin-bottom: .25rem;
}
</style>

