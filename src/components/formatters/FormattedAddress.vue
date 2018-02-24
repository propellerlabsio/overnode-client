<template>
  <span>
    <span v-if="removePrefix">{{ shortAddress }}</span>
    <span v-else>{{ address }}</span>
  </span>
</template>

<script>
export default {
  name: 'formatted-address',
  props: {
    address: String,
    removePrefix: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    shortAddress() {
      let shortAddress = this.address;
      if (shortAddress) {
        shortAddress = shortAddress.split(':')[1];
        const startChars = shortAddress.substr(0, 6);
        const endChars = shortAddress.substr(shortAddress.length - 6);
        shortAddress = `${startChars}...${endChars}`;
      }
      return shortAddress;
    },
  },
};
</script>

