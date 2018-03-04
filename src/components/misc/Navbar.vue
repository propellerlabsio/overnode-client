<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="../../assets/logo-navbar.png"
          alt="Overnode logo"/>
      </router-link>

      <button class="button navbar-burger" :class="{ 'is-active': menuActive }"
        @click="menuActive = !menuActive">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>

    <div class="navbar-menu" :class="{ 'is-active': menuActive }">
      <div class="navbar-start">
        <a class="navbar-item" @click="navTo('/blocks')">
          Blocks
        </a>
        <a class="navbar-item" @click="navTo('/peers')">
          Peers
        </a>
        <a class="navbar-item is-hidden-mobile" @click="navTo('/query')">
          Query
        </a>
        <a class="navbar-item" @click="navTo('/admin')">
          Admin
        </a>
      </div>

      <div class="navbar-end">
        <a class="navbar-item" @click="navTo('/donate')">
          Donate
        </a>
        <a href="https://github.com/propellerlabsio/overnode-client" target="_blank" class="navbar-item">
          <span class="icon is-hidden-mobile">
            <i class="fa fa-github fa-2x"></i>
          </span>
          <span class="is-hidden-tablet">
            Github
          </span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    navTo(target) {
      this.menuActive = false;
      this.$router.push(target);
    },
  },
};
</script>

