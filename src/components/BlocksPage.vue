<template>
  <div>
    <h1 class="title">This is the blocks page</h1>
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
            {{ block.height }}
          </td>
          <td>
            {{ block.hash }}
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
export default {
  name: 'blocks-page',
  computed: {
    blocks() {
      return this.$store.state.blocks;
    },
  },
};
</script>
