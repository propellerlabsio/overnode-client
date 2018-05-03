<template>
  <table class="table is-fullwidth no-margin-bottom">
    <tbody>
      <tr v-for="(value, index) in values" v-bind:key="index">
        <td>
          <div class="field has-addons">
            <div class="control is-expanded">
              <rpc-input
                :argument="argument"
                :value="value"
                :array-index="index"/>
            </div>
            <div class="control">
              <a @click="removeArgument(index)" class="button has-text-grey-dark"
                :disabled="values.length === 1 && value === null">
                <span class="icon">
                  <i class="fa fa-minus"/>
                </span>
              </a>
            </div>
            <div class="control">
              <a @click="addArgument(index + 1)" class="button has-text-grey-dark">
                <span class="icon">
                  <i class="fa fa-plus"/>
                </span>
              </a>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import RpcInput from './RpcInput';

export default {
  name: 'rpc-list-input',
  props: {
    argument: {
      type: Object,
      required: true,
    },
  },
  components: {
    RpcInput,
  },
  computed: {
    values() {
      return this.$store.state.rpc.input[this.argument.name];
    },
  },
  methods: {
    addArgument(arrayIndex) {
      this.$store.commit('rpc/addInputArrayItem', {
        argumentName: this.argument.name,
        argumentValue: null,
        arrayIndex,
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

    removeArgument(arrayIndex) {
      if (this.values.length === 1) {
        // Don't remove last item or user can't enter anything - clear it
        this.$store.commit('rpc/setInputValue', {
          argumentName: this.argument.name,
          argumentValue: null,
          arrayIndex,
        });
      } else {
        this.$store.commit('rpc/removeInputArrayItem', {
          argumentName: this.argument.name,
          arrayIndex,
        });
      }
    },

  },
};
</script>

<style scoped>
  table.table.no-margin-bottom {
    margin-bottom: 0px;
  }

  td {
    padding-left: 0px;
    padding-right: 0px;
    border: 0px;
  }
</style>
