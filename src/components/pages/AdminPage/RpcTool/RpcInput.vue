<template>
  <input
    :value="value"
    @input="onInput($event, argument.name)"
    class="input" :type="argumentInputType(argument)"
    :placeholder="argument.description">
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
  methods: {
    argumentInputType(argument) {
      const graphQlType = argument.type.name || argument.type.ofType.name;
      let inputType = 'text';
      if (graphQlType === 'Int' || graphQlType === 'Float') {
        inputType = 'number';
      }
      return inputType;
    },

    onInput(event, argumentName) {
      const newValue = event.target.type === 'number' ?
        Number(event.target.value) :
        event.target.value;
      this.$store.commit('rpc/setInputValue', {
        argumentName,
        argumentValue: newValue,
        arrayIndex: this.arrayIndex,
      });
    },
  },
};
</script>
