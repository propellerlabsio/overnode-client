<template>
  <canvas ref="qrcode" width="300" height="300"/>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: 'qrcode',
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.generateQrcode();
  },
  watch: {
    address() {
      this.generateQrcode();
    },
  },
  methods: {
    generateQrcode() {
      if (this.address) {
        QRCode.toDataURL(
          this.$refs.qrcode,
          this.address,
          {
            width: 250,
            height: 250,
          },
          (error) => {
            if (error) {
              // Fail silently - address text will still be displayed
              // eslint-disable-next-line no-console
              console.error(error);
            }
          });
      }
    },
  },
};
</script>
