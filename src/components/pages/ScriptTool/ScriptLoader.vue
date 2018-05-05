<template>
  <div>
    <div class="field has-addons">
      <div class="control is-expanded">
        <textarea :value="hexString"
          class="textarea"
          rows=2
          @input="onInput"
          placeholder="Enter script hexstring"></textarea>
      </div>
      <div class="control">
        <a @click="load" class="button is-primary">
          OK
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'script-loader',
  data() {
    return {
      input: '',
    };
  },
  computed: {
    hexString() {
      return this.$store.state.script.hexString;
    },
  },
  methods: {
    onInput(evt) {
      this.input = evt.target.value;
      if (this.hexString) {
        // Stored script no longer matches input, reset it
        this.$store.dispatch('script/reset');
      }
    },
    async load() {
      try {
        await this.$store.dispatch('script/load', {
          hexString: this.input,
        });
      } catch (err) {
        this.$store.commit('toasts/add', {
          message: err.message,
          timeoutSecs: 5,
          type: 'danger',
        });
      }
    },
  },
};
</script>
