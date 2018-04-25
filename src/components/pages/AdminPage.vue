<template>
  <signin-form v-if="session.status !== statuses.READY "/>
  <not-authorized v-else-if="!session.hasAdmin" />
  <div v-else class="columns">
    <div class="column is-narrow">
      <admin-menu />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminMenu from './AdminPage/AdminMenu';
import SigninForm from '../misc/SigninForm';
import NotAuthorized from './AdminPage/NotAuthorized';

export default {
  name: 'admin-page',
  components: {
    AdminMenu,
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
