<template>
  <article class="message is-warning" :class="{ 'is-hidden': connection.readyState !== 'CLOSED' }">
    <div class="message-header">
      <p>Connection lost.</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'socket-connection',
  data() {
    return {
      connection: null,
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
        this.connection.send('Ping'); // Send the message 'Ping' to the server
      };

      // Log errors
      this.connection.onerror = (error) => {
        // eslint-disable-next-line
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
