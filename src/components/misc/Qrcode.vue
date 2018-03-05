<template>
  <canvas ref="qrcode" :width="sideLength" :height="sideLength"/>
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
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sideLength() {
      let length = 250;
      if (this.small) {
        length /= 2;
      }
      return length;
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
            width: this.sideLength,
            height: this.sideLength,
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
