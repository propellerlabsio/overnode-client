<template>
  <aside>
      <div class="tile is-ancestor is-vertical">
        <div class="tile link-tile">
          <router-link to="/" class="tile is-child">
            <span class="icon is-large">
              <i class="fa fa-tachometer fa-3x" :class="{'fa-border': $route.name === 'Home'}"></i>
            </span>
          </router-link>
        </div>
        <div class="tile link-tile">
          <router-link to="/blocks" class="tile is-child">
            <span class="icon is-large">
              <i class="fa fa-link fa-3x" :class="{'fa-border': $route.name === 'Blocks'}"></i>
            </span>
          </router-link>
        </div>
        <div class="tile link-tile">
          <router-link to="/wallet" class="tile is-child">
            <span class="icon is-large">
              <i class="fa fa-bitcoin fa-3x" :class="{'fa-border': $route.name === 'Wallet'}"></i>
            </span>
          </router-link>
        </div>
        <div class="tile link-tile">
          <router-link to="/donate" class="tile is-child">
            <span class="icon is-large">
              <i class="fa fa-qrcode fa-3x" :class="{'fa-border': $route.name === 'Donate'}"></i>
            </span>
          </router-link>
        </div>
        <div class="tile link-tile">
          <a href="https://github.com/propellerlabsio/overnode" target="_blank" class="tile is-child">
            <span class="icon is-large">
              <i class="fa fa-github fa-3x"></i>
            </span>
          </a>
        </div>
      </div>
  </aside>
</template>

<script>
export default {
  name: 'side-menu',
};
</script>

<style>
a.tile.is-child {
  margin-bottom: 20px !important;
};
</style>
