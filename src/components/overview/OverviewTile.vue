<template>
  <div class="card">
    <div class="card-content is-paddingless is-borderless">
      <div class="content">
        <component :is="componentType"></component>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-header-title">
        {{ this.title }}
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'overview-tile',
  props: ['title', 'componentType'],
};
</script>

<style scoped>
  .content {
    display: block;
    height: 200px;
    overflow: hidden;
  }
</style>

