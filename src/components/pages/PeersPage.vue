<template>
  <div>
    <page-title title="Peers"/>
    <table class="table">
      <thead>
        <tr>
          <th class="has-text-centered">Id</th>
          <th class="has-text-centered">Address</th>
          <th class="has-text-centered">Location</th>
          <th class="has-text-centered">Received</th>
          <th class="has-text-centered">Sent</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="peer in peers" v-bind:key="peer.id">
          <td>{{ peer.id }}</td>
          <td>{{ peer.addr }}</td>
          <td>
            <span v-if="peer.location.city">
              {{ peer.location.city }},
            </span>
            <span v-if="peer.location.region">
              {{ peer.location.region }},
            </span>
            {{ peer.location.country }}
          </td>
          <td class="has-text-right">
            {{ peer.bytesrecv }}
          </td>
          <td class="has-text-right">
            {{ peer.bytessent }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PageTitle from '../misc/PageTitle';

export default {
  name: 'peers-page',
  components: {
    PageTitle,
  },
  created() {
    // Refresh full peers data
    this.$store.dispatch('peers/get');
  },
  computed: {
    peers() {
      return this.$store.state.peers.current;
    },
  },
};
</script>
