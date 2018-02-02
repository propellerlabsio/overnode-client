<template>
  <div class="columns">
    <div class="column">
      <div class="row graph-widget">
        <component :is="componentType"></component>
      </div>
      <div class="row">
        <h2 class="subtitle has-text-centered">
          {{ this.title }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'overview-tile',
  props: ['title', 'componentType'],
};
</script>

<style scoped>
  .graph-widget {
    display: block;
    height: 200px;
    overflow: hidden;
  }
</style>

