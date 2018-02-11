<template>
  <div>
    <a class="button" @click="$emit('back')">
      <span class="icon">
        <i class="fa fa-chevron-left"></i>
      </span>
      <span>
        Back
      </span>
    </a>
    <h2 class="subtitle">Transaction details</h2>
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
            Inputs
          </th>
          <td>
            {{ transaction.inputs.length }}
          </td>
        </tr>
        <tr>
          <th>
            Outputs
          </th>
          <td>
            {{ transaction.outputs.length }}
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
