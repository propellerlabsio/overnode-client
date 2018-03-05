<template>
  <div>
    <div class="columns is-vcentered is-multiline">
      <div class="column">
        <page-title :title="`Address ${selected.address}`"/>
      </div>
      <div class="column is-narrow has-text-centered">
        <qrcode :address="selected.address" :small="true"/>
      </div>
    </div>
    <div class="columns is-multiline">
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
import FormattedAddress from '../formatters/FormattedAddress';
import FormattedHash from '../formatters/FormattedHash';
import PageTitle from '../misc/PageTitle';
import PageSubtitle from '../misc/PageSubtitle';
import ReceivedTable from './AddressPage/ReceivedTable';
import SpentTable from './AddressPage/SpentTable';
import Qrcode from '../misc/Qrcode';

export default {
  name: 'address-page',
  components: {
    FormattedAddress,
    FormattedHash,
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
  },
  created() {
    this.setSelected();
  },
  data() {
    return {
      isLoading: true,
    };
  },
  watch: {
    $route: 'setSelected',
  },
  methods: {
    async setSelected() {
      this.isLoading = true;
      await this.$store.dispatch('addresses/setSelected', this.$route.params.address);
      this.isLoading = true;
    },
  },
};
</script>

