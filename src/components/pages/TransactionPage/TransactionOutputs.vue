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
          @click="navToAddress(output.addresses[0])"
          v-bind:key="output.output_number">
          <td>
            <span v-for="address in output.addresses" v-bind:key="address">
              <formatted-address class="is-hidden-tablet" :address='address'
                :shorten="true"/>
              <formatted-address class="is-hidden-mobile" :address='address'
                :shorten="false"/>
              <span v-if="output.addresses.length > 1">+</span>
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
      // TODO nav direct to output
      this.$router.push({
        name: 'Address',
        params: {
          address,
        },
      });
    },
  },
};
</script>
