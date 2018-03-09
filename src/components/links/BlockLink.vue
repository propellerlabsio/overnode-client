<template>
  <router-link v-if="transactionIndex === undefined"
    :to="{ name: 'Block', params: { height, } }">
    {{ height }}
  </router-link>
  <router-link v-else
    :to="{ name: 'BlockTransaction', params: { height, transactionIndex, } }">
    {{ height }} [{{ transactionIndex }}]
  </router-link>
</template>

<script>

export default {
  name: 'block-link',
  props: {
    height: {
      type: Number,
      required: true,
    },
    transactionIndex: {
      type: Number,
      required: false,
    },
  },
};
</script>

