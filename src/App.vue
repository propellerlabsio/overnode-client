<template>
  <div id="app" class="container">
    <section class="section">
      <div class="columns is-mobile is-variable is-6">
        <div class="column is-narrow">
          <!-- <p>Menu menu menu.</p> -->
          <side-menu />
        </div>
        <div class="column">
          <socket-connection />
          <router-view/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SocketConnection from './components/misc/SocketConnection';
import SideMenu from './components/misc/SideMenu';

export default {
  name: 'App',
  components: {
    SideMenu,
    SocketConnection,
  },
  created() {
    // Get latest blocks (TODO parametize)
    this.$store.dispatch('blocks/getLatest');

    this.$store.dispatch('peers/get');
  },
};
</script>

<style>
  @import 'bulma/css/bulma.css';
  @import 'font-awesome/css/font-awesome.css';

</style>
