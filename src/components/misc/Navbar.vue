<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand-alignment is-hidden-mobile"/>
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="../../assets/logo-navbar.png"
            alt="Overnode logo"/>
        </router-link>

        <div class="navbar-burger" :class="{ 'is-active': menuActive }"
          @click="menuActive = !menuActive">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

      <div class="navbar-menu" :class="{ 'is-active': menuActive }">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Explore
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="navTo('/blocks')">
                Blocks
              </a>
              <a class="navbar-item" @click="navTo('/peers')">
                Peers
              </a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Developers
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item is-hidden-tablet" disabled>
                API / Live Query (Large-screen only)
              </a>
              <a class="navbar-item is-hidden-mobile" @click="navTo('/query')">
                API / Live Query
              </a>
              <a class="navbar-item" @click="navTo('/rpc')">
                JSON-RPC Tool
              </a>
            </div>
          </div>
          <search-tool />
        </div>

        <div class="navbar-end">
          <!-- Donate -->
          <a class="navbar-item" @click="navTo('/donate')">
            Donate
          </a>

          <!-- Github -->
          <a href="https://github.com/propellerlabsio/overnode-client" target="_blank" class="navbar-item">
            <span class="icon is-hidden-mobile">
              <i class="fa fa-github fa-2x"></i>
            </span>
            <span class="is-hidden-tablet">
              Github
            </span>
          </a>

          <!-- Signin  -->
          <a v-if="!isSignedIn" class="navbar-item" @click="navTo('/signin')">
            Sign-in
          </a>

          <!-- User menu -->
          <div v-if="isSignedIn" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <span class="icon">
                <i class="fa fa-user fa-2x"/>
              </span>
            </a>
            <div class="navbar-dropdown is-right">
              <label class="navbar-item label">
                {{ userEmail }}
              </label>
              <a class="navbar-item" @click="navTo('/admin')">
                Admin menu
              </a>
              <a class="navbar-item" @click="signout()">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchTool from './Navbar/SearchTool';

export default {
  name: 'navbar',
  components: {
    SearchTool,
  },
  data() {
    return {
      menuActive: false,
    };
  },
  computed: {
    userEmail() {
      return this.$store.getters['session/email'];
    },
    statuses() {
      return this.$store.getters['session/statuses'];
    },
    isSignedIn() {
      return this.session.status === this.statuses.READY;
    },
    session() {
      return this.$store.state.session;
    },
  },
  methods: {
    navTo(target) {
      this.menuActive = false;
      this.$router.push(target);
    },
    async signout() {
      await this.$store.dispatch('session/end');
      this.$store.commit('toasts/add', {
        message: 'Signed out',
        timeoutSecs: 5,
        type: 'success',
      });
      // Nav out of current page in case they were in admin function
      this.$router.push('/');
    },
  },
};
</script>

<style>
  /* Adjust navbar-start. Needed for full width search field per
  https://github.com/jgthms/bulma/pull/1320#issuecomment-366616688 */
  .navbar-start {
    flex-grow: 1;
    flex-shrink: 1;
  }

  .navbar-brand-alignment {
    padding-left: 1.5rem;
  }

  .navbar-end {
    padding-right: 1.5rem;
  }

  .navbar-burger > span {
      color: #ffffff;
  }

</style>
