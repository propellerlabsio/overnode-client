<template>
  <svg class="chart-block-times" width="200px" height="200px" :viewBox="`0 0 ${width} ${height}`"
    ref="svg">
    <text class="loading-message" x="10" y="35" font-size="12">
      Loading d3...
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
      width: 160,
      height: 160,
    };
  },
  computed: {
    mempool() {
      return this.$store.state.stats.mempool;
    },
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
    mempool() {
      // console.debug('Data changed');
      // Re-draw graph whenever the data changes
      this.drawValues();
    },
  },
  methods: {
    drawValues() {
      let roundedTps;
      if (this.mempool.txPerSecond >= 10) {
        // Round to 1 decimal place
        roundedTps = Math.round(this.mempool.txPerSecond * 10) / 10;
      } else {
        // Round to 1 decimal place
        roundedTps = Math.round(this.mempool.txPerSecond * 100) / 100;
      }
      if (this.svg) {
        this.svg
          .select('#tps')
          .text(roundedTps);
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
            this.svg.select('.loading-message').text('Unable to load graphics file');
          } else {
            // Copy speedo from xml to dom
            this.svg.select('.loading-message').remove();
            domElement.appendChild(xml.querySelector('#speedo'));

            // Change colors (may need TODO again after theme is reworked)
            this.svg.select('#background')
              .style('stroke', 'lightgrey')
              .style('fill', 'white');

            // Append text for values
            this.svg
              .append('text')
              .attr('id', 'tps')
              .style('fill', '#1b1ef8')
              .style('font-family', 'digital_7')
              .style('font-size', '45px')
              .style('text-anchor', 'middle')
              .attr('width', this.width)
              .attr('x', this.width / 2)
              .attr('y', 90);
          }
        });
    },
  },
};
</script>

<style scoped>

@font-face {
  font-family: digital_7;
  src: url('../../assets/fonts/digital_7/digital_7.ttf');
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
