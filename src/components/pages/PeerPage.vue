<template>
  <div>
    <!-- Title bar -->
    <page-title :title="`Peer ${$route.params.peerId}`"/>

    <!-- Loading -->
    <loading-message v-if="!peer" />

    <div class="columns">
      <div class="column">
        <table v-if="peer" class="table is-fullwidth">
          <tbody>
            <tr>
              <th>
                Address
              </th>
              <td>
                {{ peer.addr }}
              </td>
            </tr>
            <tr>
              <th>
                Ping
              </th>
              <td>
                {{ peer.pingtime }}
              </td>
            </tr>
            <tr>
              <th>
                Sent
              </th>
              <td>
                <formatted-bytes :bytes="peer.bytessent"
                  :show-megabytes="false" :tx-or-rx="peer.tx"/>
              </td>
            </tr>
            <tr>
              <th>
                Received
              </th>
              <td>
                <formatted-bytes :bytes="peer.bytesrecv"
                  :show-megabytes="false" :tx-or-rx="peer.rx"/>
              </td>
            </tr>
            <tr>
              <th>
                Subversion
              </th>
              <td>
                <formatted-subver :subver="peer.subver" />
              </td>
            </tr>
            <tr>
              <th>
                Inbound
              </th>
              <td>
                {{ peer.inbound }}
              </td>
            </tr>
            <tr>
              <th>
                City
              </th>
              <td>
                {{ peer.location.city }}
              </td>
            </tr>
            <tr>
              <th>
                Region
              </th>
              <td>
                {{ peer.location.region_name }}
              </td>
            </tr>
            <tr>
              <th>
                Country
              </th>
              <td>
                {{ peer.location.country }}
              </td>
            </tr>
            <tr>
              <th>
                AS
              </th>
              <td>
                {{ peer.location.as }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column">
        <div class="map" ref="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import FormattedBytes from '../formatters/FormattedBytes';
import FormattedSubver from '../formatters/FormattedSubver';
import LoadingMessage from '../misc/LoadingMessage';
import PageTitle from '../misc/PageTitle';

export default {
  name: 'peer-page',
  components: {
    FormattedBytes,
    FormattedSubver,
    LoadingMessage,
    PageTitle,
  },
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  created() {
    this.setSelectedPeer();
  },
  watch: {
    $route: 'setSelectedPeer',
    peer: 'initMap',
  },
  computed: {
    peer() {
      return this.$store.getters['peers/selected'];
    },
  },
  methods: {
    setSelectedPeer() {
      this.$store.dispatch('peers/setSelected', this.$route.params.peerId);
    },
    initMap() {
      if (this.peer && this.peer.location) {
        const location = { lat: this.peer.location.lat, lng: this.peer.location.lon };
        if (!this.map) {
          // eslint-disable-next-line no-undef
          this.map = new google.maps.Map(this.$refs.map, {
            zoom: 4,
            center: location,
          });
          // eslint-disable-next-line no-undef
          this.marker = new google.maps.Marker({
            position: location,
            map: this.map,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
  .map {
    height: 400px;
    width: 100%;
  }
</style>

