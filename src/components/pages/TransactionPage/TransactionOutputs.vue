<template>
  <div>
    <!-- Transaction outputs -->
    <table class="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>
            Address
          </th>
          <th>
            Value BCH
          </th>
          <th>
            <!-- Nav icon -->
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="output in outputsPage.pageData"
          @click="navToAddress(output.address || output.addresses[0])"
          v-bind:key="output.output_number">
          <td>
            <!-- Single address output -->
            <span v-if="output.address">
              <formatted-address :address='output.address'
                :shorten="true"/>
            </span>

            <!-- Multiple address output -->
            <span v-else v-for="address in output.addresses" v-bind:key="address">
              <address-link :address='address'
                :shorten="true"/>
            </span>
          </td>
          <td>
            {{ output.value }}
          </td>
          <td class="has-text-centered">
            <span class="icon">
              <i class="fa fa-chevron-right"></i>
            </span>
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
import FormattedAddress from '../../formatters/FormattedAddress';
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
    FormattedAddress,
    Pager,
  },
  methods: {
    async gotoOutputsPage(pageNumber) {
      this.outputsLoading = true;
      await this.$store.dispatch('transaction/setOutputsPage', pageNumber);
      this.outputsLoading = false;
    },
    /**
     * Nav to the address nominated
     */
    navToAddress(address) {
      if (address) {
        this.$router.push({
          name: 'Address',
          params: {
            address,
          },
        });
      } else {
        this.$store.commit('toasts/add', {
          message: 'This transaction output has no address.  It may be non-standard.',
          timeoutSecs: 5,
          type: 'warning',
        });
      }
    },
  },
};
</script>
