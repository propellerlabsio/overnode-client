<template>
  <div>
    <div v-if="command">
      <h2 v-if="command.args.length" class="subtitle">Arguments</h2>

      <table class="table is-fullwidth">
        <tbody>
          <tr v-for="argument in command.args" v-bind:key="argument.name">
            <td class="is-narrow">
              {{ argument.name }}
            </td>
            <td>
              <input v-if="argument.type.kind === 'SCALAR' || argument.type.kind === 'NON_NULL'"
                :value="input[argument.name]"
                @input="onInput($event, argument.name)"
                class="input" :type="argumentInputType(argument)"
                :placeholder="argument.description">

              <rpc-list-input v-else-if="argument.type.kind === 'LIST'" :argument="argument"/>

              <p v-else>{{ argument.type.kind }} input not yet supported</p>
            </td>
          </tr>
        </tbody>
      </table>
      <a @click="onClickHistory" class="button" :disabled="!history.length">
        <span class="icon">
          <i class="fa fa-history"/>
        </span>
      </a>
      <a @click="$emit('execute')" class="button is-primary">Execute</a>
    </div>
    <loading-message v-else/>
    <rpc-history v-if="showHistory" @close="showHistory = false"/>
  </div>
</template>

<script>
import LoadingMessage from '../../../misc/LoadingMessage';
import RpcHistory from './RpcHistory';
import RpcListInput from './RpcListInput';

export default {
  name: 'rpc-arguments',
  components: {
    LoadingMessage,
    RpcHistory,
    RpcListInput,
  },
  data() {
    return {
      showHistory: false,
    };
  },
  computed: {
    command() {
      return this.$store.getters['rpc/selectedCommand'];
    },
    history() {
      return this.$store.getters['rpc/selectedHistory'];
    },
    input() {
      return this.$store.state.rpc.input;
    },
    results() {
      return this.$store.state.rpc.results;
    },
  },
  methods: {
    onInput(event, argumentName) {
      const newValue = event.target.type === 'number' ?
        Number(event.target.value) :
        event.target.value;
      this.$store.commit('rpc/setInputValue', {
        argumentName,
        argumentValue: newValue,
      });
    },
    // TODO - move to store - this code is repeated in other components
    argumentInputType(argument) {
      const graphQlType = argument.type.name || argument.type.ofType.name;
      let inputType = 'text';
      if (graphQlType === 'Int') {
        inputType = 'number';
      }
      return inputType;
    },
    onClickHistory() {
      if (this.history.length) {
        this.showHistory = true;
      }
    },
  },
};
</script>
