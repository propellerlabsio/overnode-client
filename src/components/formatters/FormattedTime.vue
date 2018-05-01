<template>
  <span>{{ formattedTime }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'formatted-time',
  props: {
    time: Date,
    humanized: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    formattedTime() {
      let formatted;
      const timeMoment = moment(this.time);
      if (this.humanized) {
        formatted = timeMoment.fromNow();
      } else {
        formatted = timeMoment.format('lll');
      }

      return formatted;
    },
  },
};
</script>
