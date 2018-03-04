<template>
  <div>
    <page-title title="Peers" :count="peersCount"/>
    <table class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th class="has-text-centered">Id</th>
          <th class="has-text-centered is-hidden-mobile">Address</th>
          <th class="has-text-centered is-hidden-mobile">Version</th>
          <th class="has-text-centered">Location</th>
          <th class="has-text-centered is-hidden-touch">Received (mb)</th>
          <th class="has-text-centered is-hidden-touch">Sent (mb)</th>
          <th class="has-text-centered is-hidden-touch">Ping (ms)</th>
          <th class="has-text-centered">Direction</th>
          <th>
            <!-- Nav to peer -->
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="peer in peers" v-bind:key="peer.id"
          @click="$router.push(`/peer/${peer.id}`)">
          <td>{{ peer.id }}</td>
          <td class="is-hidden-mobile">{{ peer.addr }}</td>
          <td class="is-hidden-mobile"><formatted-subver :subver="peer.subver" /></td>
          <td>
            <span v-if="peer.location">
              <span v-if="peer.location.city">
                {{ peer.location.city }},
              </span>
              <span v-if="peer.location.region">
                {{ peer.location.region }},
              </span>
              {{ peer.location.country }}
            </span>
          </td>
          <td class="has-text-right is-hidden-touch">
            <formatted-bytes :bytes="peer.bytesrecv" :tx-or-rx="peer.rx"/>
          </td>
          <td class="has-text-right is-hidden-touch">
            <formatted-bytes :bytes="peer.bytessent" :tx-or-rx="peer.tx"/>
          </td>
          <td class="has-text-right is-hidden-touch">
            <formatted-ping :ping="peer.pingtime"/>
          </td>
          <td class="has-text-centered">
            {{ peer.inbound ? 'in' : 'out' }}
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
import FormattedBytes from '../formatters/FormattedBytes';
import FormattedPing from '../formatters/FormattedPing';
import FormattedSubver from '../formatters/FormattedSubver';
import PageTitle from '../misc/PageTitle';

export default {
  name: 'peers-page',
  components: {
    FormattedBytes,
    FormattedPing,
    FormattedSubver,
    PageTitle,
  },
  created() {
    // Refresh full peers data
    this.$store.dispatch('peers/getAll');
  },
  computed: {
    peersCount() {
      return this.$store.state.peers.all.length;
    },
    peers() {
      return this.$store.getters['peers/peers'];
    },
  },
};
</script>
