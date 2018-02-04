<template>
  <span>{{ formattedTime }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'formatted-unix-time-stamp',
  props: {
    time: Number,
    humanized: Boolean,
  },
  computed: {
    formattedTime() {
      const timeMoment = moment.unix(this.time);
      return this.humanized ?
        timeMoment.fromNow() :
        timeMoment.format('lll');
    },
  },
};
</script>
