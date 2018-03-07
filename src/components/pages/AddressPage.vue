<template>
  <div>
    <div v-if="!isLoading" class="columns is-vcentered is-multiline">
      <div class="column">
        <page-title :title="`Address ${selected.address}`"/>
      </div>
      <div class="column is-narrow has-text-centered">
        <qrcode :address="selected.address" :small="true"/>
      </div>
    </div>
    <loading-message v-if="isLoading"/>
    <div v-else class="columns is-multiline">
      <div class="column">
        <div class="box is-hidden-mobile">
          <page-subtitle title="Received"/>
          <received-table/>
        </div>
        <div class="is-hidden-tablet">
          <page-subtitle title="Received"/>
          <received-table/>
        </div>
      </div>
      <div class="column">
        <div class="box is-hidden-mobile">
          <page-subtitle title="Spent"/>
          <spent-table />
        </div>
        <div class="is-hidden-tablet">
          <page-subtitle title="Spent"/>
          <spent-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingMessage from '../misc/LoadingMessage';
import PageTitle from '../misc/PageTitle';
import PageSubtitle from '../misc/PageSubtitle';
import ReceivedTable from './AddressPage/ReceivedTable';
import SpentTable from './AddressPage/SpentTable';
import Qrcode from '../misc/Qrcode';

export default {
  name: 'address-page',
  components: {
    LoadingMessage,
    PageSubtitle,
    PageTitle,
    ReceivedTable,
    SpentTable,
    Qrcode,
  },
  computed: {
    selected() {
      return this.$store.state.addresses.selected;
    },
    isLoading() {
      return this.$store.state.addresses.control.address.loading;
    },
  },
  created() {
    this.setSelected();
  },
  watch: {
    $route: 'setSelected',
  },
  methods: {
    async setSelected() {
      await this.$store.dispatch('addresses/setSelected', this.$route.params.address);
    },
  },
};
</script>

