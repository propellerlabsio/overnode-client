<template>
  <div>
    <div v-if="!isLoading" class="columns is-vcentered is-multiline">
      <div class="column">
        <page-title :title="`Address ${selected.address}`"/>
        <address-details/>
      </div>
      <div class="column is-narrow has-text-centered">
        <qrcode :address="`bitcoincash:${selected.address}`" :small="true"/>
      </div>
    </div>
    <loading-message v-if="isLoading"/>
    <div v-else class="columns is-multiline">
      <div class="column">
        <div class="box is-hidden-mobile">
          <page-subtitle :title="`Received ${selected.totals.received}`"/>
          <received-table/>
        </div>
        <div class="is-hidden-tablet">
          <page-subtitle :title="`Received ${selected.totals.received}`"/>
          <received-table/>
        </div>
      </div>
      <div class="column">
        <div class="box is-hidden-mobile">
          <page-subtitle :title="`Spent ${selected.totals.spent}`"/>
          <spent-table />
        </div>
        <div class="is-hidden-tablet">
          <page-subtitle :title="`Spent ${selected.totals.spent}`"/>
          <spent-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressDetails from './AddressPage/AddressDetails';
import LoadingMessage from '../misc/LoadingMessage';
import PageTitle from '../misc/PageTitle';
import PageSubtitle from '../misc/PageSubtitle';
import ReceivedTable from './AddressPage/ReceivedTable';
import SpentTable from './AddressPage/SpentTable';
import Qrcode from '../misc/Qrcode';

export default {
  name: 'address-page',
  components: {
    AddressDetails,
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

