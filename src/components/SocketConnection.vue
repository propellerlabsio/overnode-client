<template>
  <article class="message is-warning" :class="{ 'is-hidden': reconnectInSeconds ? false : true }">
    <div class="message-header">
      <p>Connection lost.  Attempting to reconnect in {{ reconnectInSeconds }} seconds.</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'socket-connection',
  data() {
    return {
      reconnectInSeconds: 5,
    };
  },
  created() {
    this.startConnection();
  },
  methods: {
    startConnection() {
      const connection = new WebSocket('ws://localhost:4010/socket');

      // When the connection is open, send some data to the server
      connection.onopen = () => {
        connection.send('Ping'); // Send the message 'Ping' to the server
      };

      // Log errors
      connection.onerror = (error) => {
        // eslint-disable-next-line
        console.log('WebSocket Error ', error);
      };

      // Store data given by the server
      connection.onmessage = (e) => {
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
