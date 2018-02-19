<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="notification is-info">
        Overnode has been upgraded and needs to be reloaded. Press F5 or click the
        Refresh button in your browser to run the latest version.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upgrade-watcher',
  data() {
    return {
      showModal: false,
      lastVersion: null,
    };
  },
  computed: {
    overnodeVersion() {
      return this.$store.state.server.host.overnode_version;
    },
  },
  watch: {
    overnodeVersion() {
      if (this.lastVersion && this.overnodeVersion !== this.lastVersion) {
        this.showModal = true;
      }
      this.lastVersion = this.overnodeVersion;
    },
  },
};
</script>
