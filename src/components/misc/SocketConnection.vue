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
  created() {
    this.startConnection();
    window.setInterval(this.checkConnection, 500);
  },
  methods: {
    checkConnection() {
      const lastState = this.connectionState;
      this.connectionState = this.connection.readyState;
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
      this.connection = new WebSocket('ws://localhost:4010/socket');

      // When the connection is open, send some data to the server
      this.connection.onopen = () => {
        // Send the message 'Ping' to the server every five seconds to test connection
        this.connection.send('Ping');
      };

      // Log errors
      this.connection.onerror = (error) => {
        console.debug('WebSocket Error ', error);
      };

      // Store data given by the server
      this.connection.onmessage = (e) => {
        try {
          if (e.data) {
            const dataJson = JSON.parse(e.data);
            this.$store.commit('stats/setMempool', dataJson.mempool);
          }
        } catch (err) {
          console.error('Error parsing/storing data from websocket server', e.data);
        }
      };
    },
  },
};

</script>
