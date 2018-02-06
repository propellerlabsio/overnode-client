<template>
  <button class="button is-white" @click="onClick">
    <span class="icon is-medium">
      <i class="fa fa-chevron-left fa-lg"></i>
    </span>
  </button>
</template>

<script>
export default {
  name: 'back-button',
  methods: {
    onClick() {
      this.$router.go(-1);
    },
  },
};
</script>

