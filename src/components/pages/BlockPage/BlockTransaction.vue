<template>
  <div>
    <!-- Header -->
    <div class="level is-mobile">
      <div class="level-left">
        <a class="level-item button" @click="$emit('back')">
          <span class="icon">
            <i class="fa fa-chevron-left"></i>
          </span>
        </a>
        <h2 class="level-item subtitle">Transaction</h2>
      </div>
    </div>

    <!-- Transaction details -->
    <table class="table">
      <tbody>
        <tr>
          <th>
            No.
          </th>
          <td>
            {{ index }}
          </td>
        </tr>
        <tr>
          <th>
            Id
          </th>
          <td>
            <formatted-hash class="is-hidden-tablet" :hash='transaction.txid' :shorten="true"/>
            <formatted-hash class="is-hidden-mobile" :hash='transaction.txid' :shorten="false"/>
          </td>
        </tr>
        <tr>
          <th>
            Size
          </th>
          <td>
            {{ transaction.size }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tabs -->
    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': activeTab === 'inputs' }">
          <a @click="activeTab = 'inputs'">
            Inputs ({{ transaction.inputs.length }})
          </a>
        </li>
        <li :class="{ 'is-active': activeTab === 'outputs' }">
          <a @click="activeTab = 'outputs'">
            Outputs ({{ transaction.outputs.length }})
          </a>
        </li>
      </ul>
    </div>

    <!-- Transaction inputs -->
    <table v-if="activeTab === 'inputs'" class="table">
      <thead>
        <tr>
          <th>
            Transaction
          </th>
          <th>
            Output
          </th>
          <th>
            Coinbase?
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(input, index) in transaction.inputs"
          v-bind:key="index">
          <td>
            <formatted-hash class="is-hidden-tablet" :hash='input.txid' :shorten="true"/>
            <formatted-hash class="is-hidden-mobile" :hash='input.txid' :shorten="false"/>
          </td>
          <td>
            {{ input.output_number }}
          </td>
          <td>
            <span v-if="input.coinbase" class="icon has-text-success">
              <i class="fa fa-check"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Transaction outputs -->
    <table v-if="activeTab === 'outputs'" class="table">
      <thead>
        <tr>
          <th>
            Address
          </th>
          <th>
            Value BCH
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(output, index) in transaction.outputs"
          v-bind:key="index">
          <td>
            {{ output.addresses.join() }}
          </td>
          <td>
            {{ output.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormattedHash from '../../formatters/FormattedHash';

export default {
  name: 'block-transaction',
  props: {
    transaction: Object,
    index: Number,
  },
  data() {
    return {
      activeTab: 'inputs',
    };
  },
  components: {
    FormattedHash,
  },
};
</script>

<style scoped>
  th {
    width: 100px;
  }
</style>
