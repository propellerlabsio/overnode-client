<template>
  <section class="">
    <div class="columns body is-centered">
      <div class="column is-half">
        <div class="tabs">
          <ul>
            <li :class="activeTab === 0 ? 'is-active' : ''">
              <a @click="activeTab = 0">Sign-in</a>
            </li>
            <li :class="activeTab === 1 ? 'is-active' : ''">
              <a @click="activeTab = 1">Create account</a>
            </li>
          </ul>
        </div>
        <form>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" v-model="email" type="email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" v-model="password" type="password">
            </div>
          </div>
          <div class="field" v-if="activeTab === 0">
            <div class="control">
              <label class="label">
                <input v-model="permanent" type="checkbox">
                Keep me signed in on this device?
              </label>
            </div>
          </div>
          <a v-if="activeTab === 0" class="button" :class="{ 'is-loading': this.loading }"
            href="#" @click.prevent="signIn">
            Sign in
          </a>
          <a v-else class="button" :class="{ 'is-loading': this.loading }"
            href="#" @click.prevent="createAccount">
            Create account
          </a>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'signing-form',
  data() {
    return {
      loading: false,
      activeTab: 0,
      email: '',
      password: '',
      permanent: false,
    };
  },
  methods: {
    async createAccount() {
      try {
        await this.$store.dispatch('user/create', {
          email: this.email,
          password: this.password,
        });
        this.activeTab = 0;
        this.password = '';
        this.$store.commit('toasts/add', {
          message: 'Account created! Please sign-in to your new account',
          timeoutSecs: 5,
          type: 'success',
        });
      } catch (err) {
        this.$store.commit('toasts/add', {
          message: err.message,
          timeoutSecs: 8,
          type: 'danger',
        });
      }
    },
    async signIn() {
      try {
        this.loading = true;
        const accessToken = await this.$store.dispatch('user/requestAccessToken', {
          email: this.email,
          password: this.password,
          permanent: this.permanent,
        });

        await this.$store.dispatch('session/start', { accessToken, keep: this.permanent });
        this.loading = false;
        this.$store.commit('toasts/add', {
          message: 'Signed in',
          timeoutSecs: 5,
          type: 'success',
        });
      } catch (err) {
        this.loading = false;
        this.$store.commit('toasts/add', {
          message: err.message,
          timeoutSecs: 8,
          type: 'danger',
        });
      }
    },
  },
};
</script>

<style>
#coinvis-hero-image {
  border-radius: 5px;
}
</style>
