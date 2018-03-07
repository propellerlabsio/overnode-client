<template>
  <router-link v-if="!inputNumber && !outputNumber"
    :to="{ name: 'Transaction', params: { transactionId, } }">
    <formatted-hash :hash="transactionId" :shorten="shorten"/>
  </router-link>
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';

export default {
  name: 'transaction-link',
  props: {
    transactionId: {
      type: String,
      required: true,
    },
    inputNumber: {
      type: Number,
      required: false,
    },
    outputNumber: {
      type: Number,
      required: false,
    },
    shorten: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    FormattedHash,
  },
};
</script>

