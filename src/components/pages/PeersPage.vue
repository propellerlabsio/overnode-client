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
          <th class="has-text-centered is-hidden-touch">Ping (ms)</th>
          <th class="has-text-centered">Direction</th>
          <!-- <th> -->
            <!-- Nav to peer -->
          <!-- </th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="peer in peers" v-bind:key="peer.id">
          <!-- @click="$router.push(`/peer/${peer.id}`)"> -->
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
          <td class="has-text-right is-hidden-touch"
            :class="{ 'has-text-info': peer.changed.bytesrecv }">
            {{ peer.bytesrecv }}
          </td>
          <td class="has-text-right is-hidden-touch"
            :class="{ 'has-text-info': peer.changed.bytessent }">
            {{ peer.bytessent }}
          </td>
          <td class="has-text-right is-hidden-touch">
            {{ pingToMilliseconds(peer.pingtime) }}
          </td>
          <td class="has-text-centered">
            {{ peer.inbound ? 'in' : 'out' }}
          </td>
          <!-- <td class="has-text-centered">
            <a class="button is-white is-small">
              <span class="icon">
                <i class="fa fa-chevron-right"></i>
              </span>
            </a>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormattedSubver from '../formatters/FormattedSubver';
import PageTitle from '../misc/PageTitle';

export default {
  name: 'peers-page',
  components: {
    FormattedSubver,
    PageTitle,
  },
  created() {
    // Refresh full peers data
    this.$store.dispatch('peers/getAll');
  },
  computed: {
    peers() {
      return this.$store.state.peers.all;
    },
  },
  methods: {
    /**
     * Convert ping to milliseconds
     */
    pingToMilliseconds(ping) {
      return Math.round(ping * 1000);
    },
  },
};
</script>
