<template>
  <div id="app" class="container">
    <section class="section">
      <navbar />
      <server-error />
      <socket-connection />
    </section>
    <section class="section">
      <router-view/>
      <toasts/>
      <!-- <debug/> -->
    </section>
  </div>
</template>

<script>
import Navbar from './components/misc/Navbar';
import SocketConnection from './components/misc/SocketConnection';
import Toasts from './components/misc/Toasts';
import ServerError from './components/misc/ServerError';
// import Debug from './components/misc/Debug';

export default {
  name: 'App',
  components: {
    Navbar,
    SocketConnection,
    Toasts,
    ServerError,
    // Debug,
  },
  created() {
    this.$store.dispatch('peers/get');
  },
};
</script>

<style lang="scss">
// Customize bulma per https://bulma.io/documentation/overview/customize/
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/functions';


// Our customizations
$navbar-background-color:#1f77b4;
$navbar-item-color: $white;
$navbar-item-hover-color: #98df8a;
$navbar-item-hover-background-color: #1f77b4;
$navbar-dropdown-background-color: #1f77b4;
$navbar-item-active-color: #1f77b4;
$navbar-item-active-background-color: #1f77b4;

@import '~bulma/bulma.sass';
</style>

<style>
  @import 'font-awesome/css/font-awesome.css';

  section.section {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
