<template>
  <div id="app" class="container">
    <section class="section">
      <navbar />
    </section>
    <section class="section">
      <socket-connection />
      <router-view/>
    </section>
  </div>
</template>

<script>
import Navbar from './components/misc/Navbar';
import SocketConnection from './components/misc/SocketConnection';

export default {
  name: 'App',
  components: {
    Navbar,
    SocketConnection,
  },
  created() {
    this.$store.dispatch('blocks/getLatest');

    this.$store.dispatch('peers/get');
  },
};
</script>

<style>
  @import 'bulma/css/bulma.css';
  @import 'font-awesome/css/font-awesome.css';

  section.section {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
