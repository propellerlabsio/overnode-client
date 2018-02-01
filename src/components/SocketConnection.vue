<template>
  <article class="message is-warning"
    :class="{ 'is-hidden': connection.readyState !== READY_STATE.CLOSED }">
    <div class="message-header">
      <p>
        <span class="icon">
          <i class="fa fa-exclamation-triangle"></i>
        </span>
        Unable to connect to live stats server.  Some charts may not be working correctly.
        {{ connection.readyState }}
      </p>
    </div>
  </article>
</template>

<script>
/* Allow console messages from this component:    */
/* eslint-disable no-console                      */
export default {
  name: 'socket-connection',
  data() {
    return {
      connection: null,
      READY_STATE: {
        CONNECTING: 0, // The connection is not yet open.
        OPEN: 1, // The connection is open and ready to communicate.
        CLOSING: 2, // The connection is in the process of closing.
        CLOSED: 3, // The connection is closed or couldn't be opened.
      },
    };
  },
  created() {
    this.startConnection();
  },
  methods: {
    startConnection() {
      this.connection = new WebSocket('ws://localhost:4010/socket');

      // When the connection is open, send some data to the server
      this.connection.onopen = () => {
        // Send the message 'Ping' to the server every five seconds to test connection
        window.setInterval(() => this.connection.send('Ping'), 5000);
      };

      // Log errors
      this.connection.onerror = (error) => {
        console.log('WebSocket Error ', error);
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
