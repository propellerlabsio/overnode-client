<template>
  <div>
    <div v-if="command">
      <h1 class="title">{{ command.name }}</h1>
      <p>{{ command.description }}</p>
      <br/>
      <rpc-arguments @execute="execute"/>
      <br/>
      <div v-if="output">
        <h2 class="subtitle">Response</h2>
        <rpc-response :response="output"/>
      </div>
      <br/>
      <h2 class="subtitle">Help</h2>
      <rpc-response v-if="help" :response="help"/>
    </div>
    <loading-message v-else/>
  </div>
</template>

<script>
import LoadingMessage from '../../misc/LoadingMessage';
import RpcResponse from './RpcTool/RpcResponse';
import RpcArguments from './RpcTool/RpcArguments';

export default {
  name: 'rpc',
  components: {
    LoadingMessage,
    RpcResponse,
    RpcArguments,
  },
  computed: {
    command() {
      return this.$store.getters['rpc/selectedCommand'];
    },
    help() {
      return this.$store.getters['rpc/selectedHelp'];
    },
    output() {
      return this.$store.state.rpc.output;
    },
  },
  created() {
    this.setSelected();
  },
  watch: {
    $route: 'setSelected',
  },
  methods: {
    async execute() {
      try {
        await this.$store.dispatch('rpc/execute');
      } catch (err) {
        this.$store.commit('toasts/add', {
          message: err.message,
          timeoutSecs: 5,
          type: 'danger',
        });
      }
    },
    setSelected() {
      this.$store.dispatch('rpc/setSelected', this.$route.params.commandName);
    },
  },
};
</script>
