<template>
  <div>
    <h1 class="title">Blocks</h1>
    <table class="table is-striped is-bordered">
      <thead>
        <tr>
          <th>
            Height
          </th>
          <th>
            Hash
          </th>
          <th>
            Mined
          </th>
          <th class="is-hidden-mobile">
            Wait time
          </th>
          <th>
            # Tx
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="block in blocks" v-bind:key="block.hash">
          <td>
            <router-link :to="`/block/${block.hash}`">
              {{ block.height }}
            </router-link>
          </td>
          <td>
            <formatted-hash :hash="block.hash"/>
          </td>
          <td>
            <formatted-unix-time class="is-hidden-mobile" :time="block.time"/>
            <formatted-unix-time class="is-hidden-tablet" :time="block.time" :humanized="true"/>
          </td>
          <td class="is-hidden-mobile">
            <formatted-block-interval :interval="block.interval"/>
          </td>
          <td>
            {{ block.tx_count }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pager /> -->
  </div>
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';
import FormattedUnixTime from '../formatters/FormattedUnixTime';
import FormattedBlockInterval from '../formatters/FormattedBlockInterval';
// import Pager from '../misc/Pager';

export default {
  name: 'blocks-page',
  components: {
    FormattedHash,
    FormattedUnixTime,
    FormattedBlockInterval,
    // Pager,
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.latest;
    },
  },
};
</script>
