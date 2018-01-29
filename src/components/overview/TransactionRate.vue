<template>
  <svg class="chart-block-times" width="200px" height="200px" :viewBox="`0 0 ${width} ${height}`"
    ref="svg">
    <text class="loading-message" x="10" y="35" font-size="18">
      Loading d3...
    </text>
    <text class="error-message" x="10" y="35" font-size="18" visibility="hidden">
      Error loading graphics
    </text>
  </svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'transaction-rate',
  data() {
    return {
      svg: null,
      width: 157,
      height: 157,
      stats: {
        tx_sec: 15,
        height: 532592,
      },
    };
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.cached
        .map(block => ({
          height: block.height,
          interval: block.interval / 60,
        }));
    },
  },
  mounted() {
    // Draw image when we have a dom element for d3 to hook on to
    this.initImage();
  },
  watch: {
    stats() {
      // console.debug('Data changed');
      // Re-draw graph whenever the data changes
      this.drawValues();
    },
  },
  methods: {
    drawValues() {
      if (this.svg) {
        // this.svg
        this.svg
          .append('text')
          .text(this.stats.tx_sec)
          .style('fill', '#1b1ef8')
          .style('font-family', 'digital_7')
          .style('font-size', '45px')
          .style('text-anchor', 'middle')
          .attr('width', this.width)
          .attr('x', this.width / 2)
          .attr('y', 90);
      }
    },
    initImage() {
      // Get reference to this svg
      const domElement = this.$refs.svg;
      this.svg = d3.select(domElement);


      // Import svg file as xml.
      d3.xml('/static/drawings/speedo.svg')
        .mimeType('image/svg+xml')
        .get((error, xml) => {
          if (error) {
            this.svg.select('.loading-message').remove();
            this.svg.select('.error-message').attr('visibility', 'visibile');
          } else {
            // Copy speedo from xml to dom
            this.svg.select('.loading-message').remove();
            domElement.append(xml.querySelector('#speedo'));

            // Draw values
            this.drawValues();
          }
        });
    },
  },
};
</script>

<style scoped>

@font-face {
  font-family: digital_7;
  src: url('../../assets/fonts/digital_7/digital_7_(mono).ttf');
}

text {
  font-family: 'digital_7';
}

svg {
  margin-left:auto;
  margin-right:auto;
  display:block;
}
</style>
