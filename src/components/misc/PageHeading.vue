<template>
  <h2 class="subtitle is-4">{{ title }}</h2>
</template>

<script>
export default {
  name: 'page-heading',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

