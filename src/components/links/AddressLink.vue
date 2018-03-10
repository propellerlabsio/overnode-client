<template>
  <router-link :to="{ name: 'Address', params: { address } }">
    <formatted-address :address="address" :shorten="shorten"/>
  </router-link>
</template>

<script>
import FormattedAddress from '../formatters/FormattedAddress';

export default {
  name: 'address-link',
  props: {
    address: String,
    shorten: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    FormattedAddress,
  },
};
</script>

