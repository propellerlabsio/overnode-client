<template>
  <div>
    <div v-if="command">
      <h1 class="title">{{ command.name }}</h1>
      <p>{{ command.description }}</p>
      <br/>
      <h2 v-if="command.args.length" class="subtitle">Arguments</h2>
      <rpc-input @execute="execute"/>
      <br/>
      <rpc-output v-if="output"/>
    </div>
    <loading-message v-else/>
  </div>
</template>

<script>
import LoadingMessage from '../../misc/LoadingMessage';
import RpcInput from './RpcTool/RpcInput';
import RpcOutput from './RpcTool/RpcOutput';

export default {
  name: 'rpc',
  components: {
    LoadingMessage,
    RpcInput,
    RpcOutput,
  },
  computed: {
    command() {
      return this.$store.getters['rpc/selectedCommand'];
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
