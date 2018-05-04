<template>
  <input v-if="graphQlType !== 'JSON'"
    :value="value"
    @input="onInput($event, argument.name)"
    class="input" :type="htmlInputType"
    :placeholder="graphQlType">
  <textarea v-else
    :value="value"
    @input="onInput($event, argument.name)"
    class="textarea"
    :placeholder="graphQlType"></textarea>
</template>

<script>
export default {
  name: 'rpc-list-input',
  props: {
    argument: {
      type: Object,
      required: true,
    },
    value: {
      required: true,
    },
    arrayIndex: {
      type: Number,
    },
  },
  computed: {
    graphQlType() {
      return this.argument.type.name || this.argument.type.ofType.name;
    },
    htmlInputType() {
      let inputType = 'text';
      if (this.graphQlType === 'Int' || this.graphQlType === 'Float') {
        inputType = 'number';
      }
      return inputType;
    },
  },
  methods: {
    onInput(event, argumentName) {
      try {
        let newValue;
        switch (event.target.type) {
          case 'number':
            newValue = Number(event.target.value);
            break;
          default:
            newValue = event.target.value;
        }
        this.$store.commit('rpc/setInputValue', {
          argumentName,
          argumentValue: newValue,
          arrayIndex: this.arrayIndex,
        });
      } catch (err) {
        if (err.message.includes('JSON')) {
          this.jsonError = true;
        } else {
          this.$store.commit('toasts/add', {
            message: err.message,
            timeoutSecs: 8,
            type: 'danger',
          });
        }
      }
    },
  },
};
</script>
