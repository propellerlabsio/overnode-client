<template>
  <div>
    <div v-if="command">
      <table class="table is-fullwidth">
        <tbody>
          <tr v-for="argument in command.args" v-bind:key="argument.name">
            <td class="is-narrow">
              {{ argument.name }}
            </td>
            <td>
              <input
                :value="input[argument.name]"
                @input="onInput($event, argument.name)"
                class="input" :type="argumentInputType(argument)"
                :placeholder="argument.description">
            </td>
          </tr>
        </tbody>
      </table>
      <a @click="$emit('execute')" class="button is-primary">Execute</a>
    </div>
    <loading-message v-else/>
  </div>
</template>

<script>
import LoadingMessage from '../../../misc/LoadingMessage';

export default {
  name: 'rpc-input',
  components: {
    LoadingMessage,
  },
  computed: {
    command() {
      return this.$store.getters['rpc/selectedCommand'];
    },
    input() {
      return this.$store.state.rpc.input;
    },
    results() {
      return this.$store.state.rpc.results;
    },
  },
  methods: {
    // eslint-disable-next-line
    onInput(event, argumentName) {
      const newValue = event.target.type === 'number' ?
        Number(event.target.value) :
        event.target.value;
      this.$store.commit('rpc/setInputValue', {
        argumentName,
        argumentValue: newValue,
      });
    },
    argumentInputType(argument) {
      const graphQlType = argument.type.name || argument.type.ofType.name;
      let inputType = 'text';
      if (graphQlType === 'Int') {
        inputType = 'number';
      }
      return inputType;
    },
  },
};
</script>
