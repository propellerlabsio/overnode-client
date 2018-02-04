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
            Interval
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
            {{ block.interval }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';
import FormattedUnixTime from '../formatters/FormattedUnixTime';

export default {
  name: 'blocks-page',
  components: {
    FormattedHash,
    FormattedUnixTime,
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.latest;
    },
  },
};
</script>
