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
            <short-hash :hash='block.hash'/>
          </td>
          <td>
            {{ block.interval }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ShortHash from './formatters/ShortHash';

export default {
  name: 'blocks-page',
  components: {
    ShortHash,
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.cached;
    },
  },
};
</script>
