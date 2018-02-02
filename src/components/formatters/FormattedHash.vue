<template>
  <span>
    <span v-if="short">{{ shortHash }}</span>
    <span v-else>{{ trimmedHash }}</span>
  </span>
</template>

<script>
export default {
  name: 'formatted-hash',
  props: {
    hash: String,
    short: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    trimmedHash() {
      return this.hash ? this.hash.substr(17) : '';
    },
    shortHash() {
      let shortHash = this.trimmedHash;
      if (shortHash) {
        const startChars = shortHash.substr(0, 4);
        const endChars = shortHash.substr(shortHash.length - 4);
        shortHash = `${startChars}...${endChars}`;
      }
      return shortHash;
    },
  },
};
</script>

