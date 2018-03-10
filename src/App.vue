<template>
  <div id="app">
    <navbar />
    <section class="section app-header container">
      <server-sync-status />
      <socket-connection />
      <upgrade-watcher />
      <hero-banner v-if="$route.name === 'Home'" />
    </section>
    <section class="section page container">
      <router-view/>
      <toasts/>
    </section>
  </div>
</template>

<script>
import HeroBanner from './components/pages/OverviewPage/HeroBanner';
import Navbar from './components/misc/Navbar';
import SocketConnection from './components/misc/SocketConnection';
import Toasts from './components/misc/Toasts';
import ServerSyncStatus from './components/misc/ServerSyncStatus';
import UpgradeWatcher from './components/misc/UpgradeWatcher';

export default {
  name: 'App',
  components: {
    HeroBanner,
    Navbar,
    SocketConnection,
    Toasts,
    ServerSyncStatus,
    UpgradeWatcher,
  },
  computed: {
    prioritySyncing() {
      return this.$store.state.server.status.prioritySyncing;
    },
  },
  watch: {
    prioritySyncing() {
      if (this.prioritySyncing) {
        this.$router.push({ name: 'PrioritySyncing' });
      } else {
        this.$router.push({ name: 'Home' });
      }
    },
  },
  created() {
    this.periodicallyUpdateHumanizedTimes();
  },
  methods: {
    periodicallyUpdateHumanizedTimes() {
      this.$store.commit('blocks/humanizeTimes');
      window.setTimeout(this.periodicallyUpdateHumanizedTimes, 30000);
    },
  },
};
</script>

<style lang="scss">
// Customize bulma per https://bulma.io/documentation/overview/customize/
@import '~bulma/sass/utilities/initial-variables';
@import '~bulma/sass/utilities/functions';


// Our customizations of standard bulma classes
$navbar-background-color:#1f77b4;
$navbar-item-color: $white;
$navbar-item-hover-color: #98df8a;
$navbar-item-hover-background-color: #1f77b4;
$navbar-dropdown-background-color: #1f77b4;
$navbar-item-active-color: #1f77b4;
$navbar-item-active-background-color: #1f77b4;

// Setup our Custom Colors
$overnode-dark: #1f77b4;
$overnode-dark-invert: findColorInvert($overnode-dark);

// Add new color variables to the color map.
@import "~bulma/sass/utilities/derived-variables.sass";
$addColors: (
  "overnode-dark":($overnode-dark, $overnode-dark-invert),
);
$colors: map-merge($colors, $addColors);

@import '~bulma/bulma.sass';
</style>

<style>
  @import 'font-awesome/css/font-awesome.css';

  section.section {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  section.section.app-header > article.message {
    margin-bottom: 0;
  }

  section.section.app-header > section.hero {
    margin-bottom: 0;
  }

  html, body, div#app, section.section.page {
    height: 100%;
  }

  section.section.page {
    height: calc(100% - 100px);
  }

</style>

