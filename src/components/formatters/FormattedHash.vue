<template>
  <span>
    <span v-if="shorten">{{ shortHash }}</span>
    <span v-else>{{ trimmedHash }}</span>
  </span>
</template>

<script>
export default {
  name: 'formatted-hash',
  props: {
    hash: String,
    shorten: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    trimmedHash() {
      let trimmed = this.hash;
      if (trimmed && this.hash.substr(0, 17) === '00000000000000000') {
        trimmed = this.hash.substr(17);
      }
      return trimmed;
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

