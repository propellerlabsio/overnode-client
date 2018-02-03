<template>
  <button class="button is-white" @click="onClick">
    <span class="icon">
      <i class="fa fa-arrow-left"></i>
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

