<template>
  <div>
    <page-title title="Peers"/>
    <table class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th class="has-text-centered">Id</th>
          <th class="has-text-centered is-hidden-mobile">Address</th>
          <th class="has-text-centered is-hidden-mobile">Version</th>
          <th class="has-text-centered">Location</th>
          <th class="has-text-centered is-hidden-touch">Received</th>
          <th class="has-text-centered is-hidden-touch">Sent</th>
          <th class="has-text-centered is-hidden-touch">Ping</th>
          <th class="has-text-centered">Direction</th>
          <th>
            <!-- Nav to peer -->
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="peer in peers" v-bind:key="peer.id">
          <td>{{ peer.id }}</td>
          <td class="is-hidden-mobile">{{ peer.addr }}</td>
          <td class="is-hidden-mobile">{{ peer.subver }}</td>
          <td>
            <span v-if="peer.location.city">
              {{ peer.location.city }},
            </span>
            <span v-if="peer.location.region">
              {{ peer.location.region }},
            </span>
            {{ peer.location.country }}
          </td>
          <td class="has-text-right is-hidden-touch">
            {{ peer.bytesrecv }}
          </td>
          <td class="has-text-right is-hidden-touch">
            {{ peer.bytessent }}
          </td>
          <td class="has-text-right is-hidden-touch">
            {{ pingToMilliseconds(peer.pingtime) }} ms
          </td>
          <td class="has-text-centered">
            {{ inbound ? 'in' : 'out' }}
          </td>
          <td class="has-text-centered">
            <a class="button is-white is-small">
              <span class="icon">
                <i class="fa fa-chevron-right"></i>
              </span>
            </a>
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
  methods: {
    pingToMilliseconds(ping) {
      return Math.round(ping * 1000);
    },
  },
};
</script>
