<template>
  <div v-if="selected">
    <a class="button is-white" v-if="all.length" @click="modalActive = true">
      <span>{{ selected.code }}</span>
      <span class = "icon is-small has-text-grey-lighter">
        <i class = "fa fa-chevron-down"></i>
      </span>
    </a>
    <div class="modal" :class="{ 'is-active': modalActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Select display currency...</p>
          </div>
          <div class="card-content">
            <table class="table is-hoverable is-fullwidth">
              <tbody>
                <tr v-for="currency in all" v-bind:key="currency.code"
                  :class="{ 'is-selected': currency.code === selected.code }"
                  @click="selectCurrency(currency)">
                  <td>
                    {{ currency.code }}
                  </td>
                  <td>
                    {{ currency.label }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="modalActive=false"></button>
    </div>
  </div>
  <span v-else>
    BCH
  </span>
</template>

<script>
export default {
  name: 'currency-selector',
  data() {
    return {
      modalActive: false,
    };
  },
  computed: {
    selected() {
      return this.$store.getters['currencies/selected'];
    },
    all() {
      return this.$store.state.currencies.all;
    },
  },
  methods: {
    selectCurrency(currency) {
      this.$store.commit('currencies/setSelected', currency.code);
      this.modalActive = false;
    },
  },
};
</script>

<style scoped>
  table {
    margin-bottom: 0px;
  }
</style>

