<template>
  <router-link :to="{ name: 'Address', params: { address } }">
    <span v-if="shorten">{{ shortAddress }}</span>
    <span v-else>{{ address }}</span>
  </router-link>
  <!-- TODO transaction input link to direct page -->
  <!-- TODO transaction output link to direct page -->
</template>

<script>
export default {
  name: 'formatted-address',
  props: {
    address: String,
    shorten: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    shortAddress() {
      let shortAddress = this.address;
      if (shortAddress) {
        const startChars = shortAddress.substr(0, 6);
        const endChars = shortAddress.substr(shortAddress.length - 6);
        shortAddress = `${startChars}...${endChars}`;
      }
      return shortAddress;
    },
  },
};
</script>

