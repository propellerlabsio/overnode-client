<template>
  <div id="app" class="container">
    <section class="section">
      <div class="columns is-mobile is-variable is-6">
        <div class="column is-narrow">
          <!-- <p>Menu menu menu.</p> -->
          <side-menu />
        </div>
        <div class="column">
          <router-view/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu';

export default {
  name: 'App',
  components: {
    SideMenu,
  },
};
</script>

<style>
  @import 'bulma/css/bulma.css';
  @import 'font-awesome/css/font-awesome.css';

</style>
