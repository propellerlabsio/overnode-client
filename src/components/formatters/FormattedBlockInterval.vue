<template>
  <span>{{ formattedInterval }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'formatted-block-interval',
  props: {
    interval: Number,
    humanize: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    formattedInterval() {
      let formatted;
      if (this.interval) {
        const duration = moment.duration(this.interval, 'seconds');
        if (this.humanize) {
          formatted = duration.humanize();
        } else {
          formatted = `${Math.round(duration.asMinutes())} minutes`;
        }
      }
      return formatted;
    },
  },
};
</script>
