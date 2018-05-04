<template>
  <div class="modal is-active">
    <div @click="$emit('close')" class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">History</p>
          <button @click="$emit('close')" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <table class="table is-fullwidth is-striped is-hoverable">
            <tbody>
              <tr v-for="(item, index) in history" v-bind:key="index"
                 @click="loadItem(item)">
                <td class="is-narrow">
                  <strong>
                    <formatted-time :time="item.time"/>
                  </strong>
                </td>
                <td class="word-break-all">
                  {{ item.input }}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
  </div>
</template>

<script>
import FormattedTime from '@/components/formatters/FormattedTime';

export default {
  name: 'rpc-history',
  components: {
    FormattedTime,
  },
  computed: {
    history() {
      return this.$store.getters['rpc/selectedHistory']
        .map(item => ({
          command: item.command,
          time: item.time,
          input: JSON
            .stringify(item.input, undefined, 2)
            .replace(/['"]+/g, '') // regex all double quotes
            .replace('{', '')
            .replace('}', ''),
        }));
    },
  },
  methods: {
    loadItem(item) {
      this.$store.commit('rpc/reloadHistoricalItem', {
        command: item.command,
        time: item.time,
      });
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
  .word-break-all {
    word-break:break-all
  }
</style>
