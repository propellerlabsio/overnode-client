<template>
  <signin-form v-if="status !== statuses.READY "/>
</template>

<script>
import SigninForm from '../misc/SigninForm';

export default {
  name: 'signin-page',
  components: {
    SigninForm,
  },
  computed: {
    statuses() {
      return this.$store.getters['session/statuses'];
    },
    status() {
      return this.$store.state.session.status;
    },
  },
  created() {
    this.redirectOnSignedIn();
  },
  watch: {
    $route: 'redirectOnSignedIn',
    status: 'redirectOnSignedIn',
  },
  methods: {
    redirectOnSignedIn() {
      if (this.status === this.statuses.READY) {
        this.$router.push('/');
      }
    },
  },
};
</script>
