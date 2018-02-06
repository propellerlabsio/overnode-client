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
      const duration = moment.duration(this.interval, 'seconds');
      return duration.humanize();
    },
  },
};
</script>
