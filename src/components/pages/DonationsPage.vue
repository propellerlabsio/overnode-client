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
      <p class="break-word-wrap">
        <a :href="donationAddress">{{ donationAddress }}</a>
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
import Qrcode from '../misc/Qrcode';

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

<style>
  .break-word-wrap {
    word-wrap: break-word;
    max-width: 100%;
  }
</style>

