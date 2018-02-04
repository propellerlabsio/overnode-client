<template>
  <div id="app" class="container">
    <section class="section">
      <navbar />
      <socket-connection />
    </section>
    <section class="section">
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
