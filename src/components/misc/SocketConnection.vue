<template>
  <span>
    <article class="message is-info"
      v-if="connectionState === CONNECTION_STATE.CONNECTING">
      <div class="message-header">
        <p>
          <span class="icon">
            <i class="fa fa-info-circle"></i>
          </span>
          Connecting to server...
        </p>
      </div>
    </article>
    <article class="message is-warning"
      v-if="connectionState === CONNECTION_STATE.CLOSING ||
      connectionState === CONNECTION_STATE.CLOSED">
      <div class="message-header">
        <p>
          <span class="icon">
            <i class="fa fa-exclamation-triangle"></i>
          </span>
          Connection to server lost. Attempting to reconnect...
        </p>
      </div>
    </article>
  </span>
</template>

<script>

/* Allow console messages from this component:    */
/* eslint-disable no-console                      */
export default {
  name: 'socket-connection',
  data() {
    return {
      reconnectInSecs: 0,
      latestBlockRequested: 0, // Latest block height we've already requested from server
      connection: null,
      connectionState: 0,
      CONNECTION_STATE: {
        CONNECTING: 0, // The connection is not yet open.
        OPEN: 1, // The connection is open and ready to communicate.
        CLOSING: 2, // The connection is in the process of closing.
        CLOSED: 3, // The connection is closed or couldn't be opened.
      },
    };
  },
  computed: {
    connectedPeerIds() {
      return this.$store.state.server.status.peerIds;
    },
  },
  watch: {
    connectedPeerIds() {
      // Get peers if connected peers has changed
      this.$store.dispatch('peers/getAll');
    },
  },
  created() {
    this.startConnection();
    window.setInterval(this.checkConnection, 500);
  },
  methods: {
    checkConnection() {
      const lastState = this.connectionState;
      this.connectionState = this.connection ?
        this.connection.readyState : this.CONNECTION_STATE.CLOSED;
      if (lastState !== this.connectionState &&
        this.connectionState === this.CONNECTION_STATE.CLOSED &&
        !this.reconnectInSecs) {
        // Attempt reconnection in 5 seconds
        this.reconnectInSecs = 5;
        console.debug('Reconnecting in ', this.reconnectInSecs);
        window.setTimeout(this.reconnectCountdown, 1000);
      }
    },
    reconnectCountdown() {
      if (this.reconnectInSecs > 0) {
        this.reconnectInSecs -= 1;
      }

      console.debug('Reconnecting in ', this.reconnectInSecs);

      if (this.reconnectInSecs === 0) {
        this.startConnection();
      } else {
        window.setTimeout(this.reconnectCountdown, 1000);
      }
    },
    startConnection() {
      try {
        const protocol = location.protocol.includes('https') ?
          'wss' :
          'ws';
        this.connection = new WebSocket(`${protocol}://${location.host}/socket`);
      } catch (err) {
        // Can't even create WebSocket.  Just exit and allow reconnection logic to
        // try again later
        console.error('Error creating websocket: ', err.message);
        return;
      }

      // When the connection is open, load initial static data
      this.connection.onopen = () => {
        this.$store.dispatch('server/getHost');
        this.$store.dispatch('server/getNode');
      };

      // Log errors
      this.connection.onerror = (error) => {
        console.error('WebSocket Error', error.message);
      };

      // Store data given by the server
      this.connection.onmessage = async (e) => {
        try {
          if (e.data) {
            const dataJson = JSON.parse(e.data);

            // Store server provided live data
            this.$store.commit('server/setStatus', dataJson.liveData);

            // Update peers data values
            this.$store.commit('peers/updateTxRx', dataJson.liveData.peers);

            // Request latest blocks new ones are available (new block mined etc)
            // if we aren't currently prioritySyncing
            if (!this.$store.state.server.status.prioritySyncing) {
              const latestAvailableBlock = dataJson.liveData.height.overnode.to;
              const latestBlockRetrieved = this.$store.state.blocks.height;
              if (latestBlockRetrieved < latestAvailableBlock &&
                this.latestBlockRequested < latestAvailableBlock) {
                // Request latest blocks
                this.latestBlockRequested = latestAvailableBlock;
                await this.$store.dispatch('blocks/getLatest');
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
    },
  },
};

</script>
