<template>
  <div>
    <button class="button"
      @click="$store.dispatch('blocks/getLatest')">Get latest blocks</button><br/>
  </div>
</template>

<script>
export default {
  name: 'debug',
};
</script>
