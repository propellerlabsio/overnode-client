<template>
  <div class="modal is-active">
    <div @click="$emit('close')" class="modal-background"></div>
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
      <table class="table is-fullwidth is-striped">
        <tbody>
          <tr v-for="(item, index) in history" v-bind:key="index">
            <td>
              <formatted-time :time="item.time"/>
            </td>
            <td>
              {{ item.input }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="$emit('close')" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import FormattedTime from '../../../formatters/FormattedTime';

export default {
  name: 'rpc-history',
  components: {
    FormattedTime,
  },
  computed: {
    history() {
      return this.$store.getters['rpc/selectedHistory']
        .map(item => ({
          time: item.time,
          input: JSON
            .stringify(item.input, undefined, 2)
            .replace(/['"]+/g, '') // regex all double quotes
            .replace('{', '')
            .replace('}', ''),
        }));
    },
  },
};
</script>

