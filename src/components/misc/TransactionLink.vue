<template>
  <router-link v-if="transactionId && !inputNumber && !outputNumber"
    :to="{ name: 'Transaction', params: { transactionId, } }">
    <formatted-hash :hash="transactionId" :shorten="shorten"/>
  </router-link>
  <!-- TODO transaction input link to direct page -->
  <!-- TODO transaction output link to direct page -->
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';

export default {
  name: 'transaction-link',
  props: {
    transactionId: {
      type: String,
      required: false,
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

