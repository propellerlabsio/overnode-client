<template>
  <div id="app">
    <navbar />
    <section class="section app-header container">
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
import UpgradeWatcher from './components/misc/UpgradeWatcher';

export default {
  name: 'App',
  components: {
    HeroBanner,
    Navbar,
    SocketConnection,
    Toasts,
    UpgradeWatcher,
  },
  created() {
    this.$store.dispatch('session/restore');
    this.periodicallyUpdateHumanizedTimes();
    this.periodicallyUpdatePrices();
  },
  methods: {
    async periodicallyUpdatePrices() {
      const fiveMinutes = 1000 * 60 * 5;
      await this.$store.dispatch('currencies/updatePrices');
      window.setTimeout(this.periodicallyUpdatePrices, fiveMinutes);
    },
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

