<template>
  <div class="columns is-centered">
    <div class="column">

      <article class="message is-info">
        <div class="message-header">
          <p>Not authorized</p>
        </div>
        <div class="message-body">
          You haven't been granted Admin access to this Overnode server.
          If you believe you should have access, please contact your
          server administrator.
          <br/>
          <br/>
          <a class="button" @click="signOut" :class="{ 'is-loading': busy }">Sign-out</a>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-authorized',
  data() {
    return {
      busy: false,
    };
  },
  methods: {
    async signOut() {
      this.busy = true;
      await this.$store.dispatch('session/end', {
        email: this.email,
        password: this.password,
      });
      this.busy = false;
    },
  },
};
</script>

