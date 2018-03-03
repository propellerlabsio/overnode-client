<template>
  <signin-form v-if="session.status !== statuses.READY "/>
  <not-authorized v-else-if="!session.hasAdmin" />
  <p v-else>Admin access is granted!</p>
</template>

<script>
import SigninForm from '../misc/SigninForm';
import NotAuthorized from './AdminPage/NotAuthorized';

export default {
  name: 'admin-page',
  components: {
    NotAuthorized,
    SigninForm,
  },
  computed: {
    statuses() {
      return this.$store.getters['session/statuses'];
    },
    session() {
      return this.$store.state.session;
    },
  },
};
</script>
