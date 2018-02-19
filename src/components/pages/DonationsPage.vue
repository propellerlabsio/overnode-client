<template>
  <div>
    <page-title title="Donations"/>
    <p>Thank you for your interest in supporting this service.
      <span v-if="donationAddress"> You may send donations to:</span>
      <span v-else>Please contact the site admin for donation address details.</span>
    </p>
    <br/>
    <div v-if="donationAddress" class="has-text-centered">
      <p>
        <qrcode :address="donationAddress"/>
      </p>
      <p>
        <span class="tag is-large is-success is-hidden-mobile">
          {{ donationAddress }}
        </span>
        <span class="tag is-success is-hidden-tablet">
          {{ donationAddress }}
        </span>
      </p>
    </div>
    <br/>
    <p>
        Thanks!
    </p>
  </div>
</template>

<script>
import PageTitle from '../misc/PageTitle';
import Qrcode from './DonationsPage/Qrcode';

export default {
  name: 'donations-page',
  components: {
    PageTitle,
    Qrcode,
  },
  computed: {
    donationAddress() {
      return this.$store.state.server.host.donation_address;
    },
  },
};
</script>

