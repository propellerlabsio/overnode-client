<template>
  <div>
    <h2 class="subtitle">Script Tool (under construction)</h2>
    <script-loader />
    <br/>
    <div v-if="script.hex">
      <div class="tabs">
        <ul>
          <li :class="{ 'is-active': $route.name === 'ScriptEditor' }">
            <router-link to="/script">Script</router-link>
          </li>
          <li :class="{ 'is-active': $route.name === 'HexEditor' }">
            <router-link to="/script/hex">Hex</router-link>
          </li>
          <li :class="{ 'is-active': $route.name === 'Utf8Viewer' }">
            <router-link to="/script/utf8">UTF-8</router-link>
          </li>
        </ul>
      </div>
      <router-view/>
    </div>
  </div>

</template>

<script>
import ScriptLoader from './ScriptTool/ScriptLoader';

export default {
  name: 'script-tool',
  components: {
    ScriptLoader,
  },
  computed: {
    script() {
      return this.$store.state.script;
    },
  },
};
</script>

<style scoped>
  h2.subtitle {
    margin-bottom: 12px;
  }
</style>
