<template>
  <div>
    <div v-if="command">
      <nav v-if="command.args.length" class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h2 class="subtitle">Arguments</h2>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <a @click="onClickHistory" class="button" :disabled="!history.length">
              <span class="icon">
                <i class="fa fa-history"/>
              </span>
            </a>
          </p>
        </div>
      </nav>

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
    <rpc-history v-if="showHistory" @close="showHistory = false"/>
  </div>
</template>

<script>
import LoadingMessage from '../../../misc/LoadingMessage';
import RpcHistory from './RpcHistory';

export default {
  name: 'rpc-input',
  components: {
    LoadingMessage,
    RpcHistory,
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
    onClickHistory() {
      if (this.history.length) {
        this.showHistory = true;
      }
    },
  },
};
</script>
