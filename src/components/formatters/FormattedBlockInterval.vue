<template>
  <span>{{ formattedInterval }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'formatted-block-interval',
  props: {
    interval: Number,
  },
  computed: {
    formattedInterval() {
      let formatted;
      if (this.interval) {
        const duration = moment.duration(this.interval, 'seconds');
        formatted = duration.humanize();
      }
      return formatted;
    },
  },
};
</script>
