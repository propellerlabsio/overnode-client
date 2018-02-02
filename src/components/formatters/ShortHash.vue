<template>
  <span>
    {{ shortHash }}
  </span>
</template>

<script>
export default {
  name: 'short-hash',
  props: ['hash'],
  computed: {
    shortHash() {
      let shortHash = this.hash ? this.hash.substr(17) : '';
      if (shortHash) {
        const startChars = shortHash.substr(0, 4);
        const endChars = shortHash.substr(shortHash.length - 4);
        shortHash = `${startChars}...${endChars}`;
      }
      return shortHash;
    }
  },
};
</script>

