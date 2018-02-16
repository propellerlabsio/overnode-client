<template>
  <span>
    {{ pingMs }}
  </span>
</template>

<script>
export default {
  name: 'formatted-ping',
  props: {
    ping: Number,
  },
  computed: {
    pingMs() {
      return this.ping ?
        Math.round(this.ping * 1000) :
        '';
    },
  },
};
</script>

