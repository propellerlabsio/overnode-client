<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/blocks">Blocks</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'side-menu',
};
</script>
