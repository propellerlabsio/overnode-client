<template>
  <div v-if="selected">
    <div class="level">
      <div class="level-left">
        <span class="detail-label has-text-weight-bold">
          Balance
        </span>
        {{ balance }}
        <currency-selector />
      </div>
    </div>
  </div>
</template>

<script>
import locale2 from 'locale2';

import CurrencySelector from '../../misc/CurrencySelector';

export default {
  name: 'address-details',
  components: {
    CurrencySelector,
  },
  computed: {
    selected() {
      return this.$store.state.addresses.selected;
    },
    currency() {
      return this.$store.getters['currencies/selected'];
    },
    balance() {
      const balance = (this.selected.totals.received -
        this.selected.totals.spent);
      const balanceDisplayCurrency = balance *
        this.currency.bch_rate;
      return balanceDisplayCurrency
        .toLocaleString(locale2, {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: this.currency.decimal_places,
        });
    },
  },
};
</script>

<style scoped>
  .detail-label {
    width: 80px;
  }
</style>

