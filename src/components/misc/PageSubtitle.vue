<template>
  <h2 class="subtitle is-5">
    {{ title }}
    <small v-if="count">
      ({{count}})
    </small>
  </h2>
</template>

<script>
export default {
  name: 'page-subtitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: false,
    },
  },
};
</script>

