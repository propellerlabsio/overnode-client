<template>
  <div>
    <table class="table">
      <tbody>
        <tr v-for="rowNumber in rowCount" v-bind:key="rowNumber">
          <td class="has-text-right">
            <strong>
              <small>
                {{ cellIndex(rowNumber, 1) }}
              </small>
            </strong>
          </td>
          <td v-for="colNumber in BYTES_PER_ROW" v-bind:key="colNumber">
            {{ hexByteString(rowNumber, colNumber) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'hex-editor',
  data() {
    return {
      BYTES_PER_ROW: 16,
    };
  },
  computed: {
    bytes() {
      return this.$store.state.script.hex.buffer;
    },
    data() {
      return this.$store.state.script.hex.view;
    },
    rowCount() {
      return Math.ceil(this.bytes.byteLength / this.BYTES_PER_ROW);
    },
  },
  methods: {
    hexByteString(rowNumber, colNumber) {
      let result = '';
      const cellIndex = this.cellIndex(rowNumber, colNumber);
      const cellValue = this.data[cellIndex];
      if (cellValue != null) {
        result = cellValue.toString(16);
      }
      return this.zeroPadString(result).toUpperCase();
    },
    zeroPadString(string) {
      let result = string;
      if (string.length === 1) {
        result = `0${result}`;
      }
      return result;
    },
    cellIndex(rowNumber, colNumber) {
      const rowIndex = rowNumber - 1;
      const colIndex = colNumber - 1;
      return (rowIndex * this.BYTES_PER_ROW) + colIndex;
    },
  },
};
</script>

