<template>
  <span>{{ formattedTime }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'formatted-unix-time',
  props: {
    time: Number,
  },
  computed: {
    formattedTime() {
      const timeMoment = moment.unix(this.time);
      return timeMoment.format('lll');
    },
  },
};
</script>
