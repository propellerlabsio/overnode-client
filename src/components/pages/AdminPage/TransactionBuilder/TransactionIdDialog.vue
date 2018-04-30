<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="box">
        <div class="field">
          <label class="label">Load existing transaction from blockchain</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input class="input"
                :class="{
                  'has-text-danger': notFound,
                  'is-danger': notFound
                }"
                v-model="txId" type="text"
                v-on:keyup.enter="load"
                placeholder="Enter transaction id/hash">
            </div>
            <div class="control">
              <button class="button" @click="close">
                Cancel
              </button>
            </div>
            <div class="control">
              <a class="button is-primary" @click="load" :class="{ 'is-loading': loading }">
                <span>
                  OK
                </span>
              </a>
            </div>
          </div>
          <div v-if="error" class="notification is-danger">
            <button class="delete" @click="error = ''"></button>
            {{ error }}
          </div>
        </div>
      </form>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<script>
export default {
  name: 'transaction-id-dialog',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      txId: '',
      error: '',
      notFound: false,
      loading: false,
    };
  },
  methods: {
    close() {
      this.txId = '';
      this.error = '';
      this.$emit('close');
    },
    async load() {
      this.notFound = false;
      this.error = '';
      try {
        await this.$store.dispatch('transactionBuilder/load', this.txId);
        this.close();
        this.$store.commit('toasts/add', {
          message: 'Transaction loaded',
          timeoutSecs: 5,
          type: 'success',
        });
      } catch (err) {
        this.notFound = true;
        this.error = err.message;
      }
    },
  },
};
</script>
