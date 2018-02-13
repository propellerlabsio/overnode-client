<template>
  <div>
    <!-- Title bar -->
    <page-title class="level-item" :title="`Peer ${$route.params.peerId}`"/>

    <div class="notification is-info">
      This page is under construction.  Please check back soon.
    </div>

  </div>
</template>

<script>
import PageTitle from '../misc/PageTitle';

export default {
  name: 'peer-page',
  components: {
    PageTitle,
  },
};
</script>
