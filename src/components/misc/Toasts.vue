<template>
  <div v-if="toasts.length" class="columns toasts">
    <div class="column">
      <div v-for="toast in toasts" v-bind:key="toast.id"
        class="notification"
        :class="`is-${toast.type}`">
        <button class="delete" @click="$store.commit('toasts/remove', toast.id)"></button>
        <span v-html="toast.message"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toasts',
  created() {
    // Clear expired toasts every second
    window.setInterval(() => this.$store.commit('toasts/removeExpired'), 1000);
  },
  computed: {
    toasts() {
      return this.$store.state.toasts.current;
    },
  },
};
</script>

<style>
  .toasts {
    min-width: 350px; /* Set a default minimum width */
    margin-left: -175px; /* Divide value of min-width by 2 */
    text-align: center; /* Centered text */
    position: fixed; /* Sit on top of the screen */
    z-index: 1; /* Add a z-index if needed */
    left: 50%; /* Center the snackbar */
    bottom: 30px; /* 30px from the bottom */
  }
</style>
