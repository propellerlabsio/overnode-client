<template>
  <div>
    <!-- Transaction outputs -->
    <table class="table">
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
        <tr v-for="output in outputsPage.pageData"
          v-bind:key="output.output_number">
          <td>
            <span v-for="address in output.addresses" v-bind:key="address">
              <address-link class="is-hidden-tablet" :address='address'
                :shorten="true"/>
              <address-link class="is-hidden-mobile" :address='address'
                :shorten="false"/>
              <span v-if="output.addresses.length > 1">+</span>
            </span>
          </td>
          <td>
            {{ output.value }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Outputs paging -->
    <pager
      :disabled="outputsLoading"
      :current-page="outputsPage.current"
      :last-page="outputsPage.last"
      @previous="gotoOutputsPage(outputsPage.current - 1)"
      @next="gotoOutputsPage(outputsPage.current + 1)"
      @goto="gotoOutputsPage"/>

  </div>
</template>

<script>
import AddressLink from '../../links/AddressLink';
import Pager from '../../misc/Pager';

export default {
  name: 'transaction-outputs',
  data() {
    return {
      outputsLoading: false,
    };
  },
  computed: {
    outputsPage() {
      return this.$store.getters['transaction/outputsPage'];
    },
  },
  components: {
    AddressLink,
    Pager,
  },
  methods: {
    async gotoOutputsPage(pageNumber) {
      this.outputsLoading = true;
      await this.$store.dispatch('transaction/setOutputsPage', pageNumber);
      this.outputsLoading = false;
    },
  },
};
</script>
