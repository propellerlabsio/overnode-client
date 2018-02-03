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

const SEGMENT_COLOR = {
  good: '#1b1ef8',
  warning: '#ffbf00',
  bad: '#ff0000',
};

const BLOCK_SIZE_LIMT_MB = 8;
const BTC_TX_PER_SEC_1_MB = 2.7;
const BCH_TX_PER_SEC_LIMIT = BLOCK_SIZE_LIMT_MB * BTC_TX_PER_SEC_1_MB;

export default {
  name: 'mempool-speedo',
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
      return this.$store.state.blocks.latest
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
        // Update mempool size bytes reading
        this.svg
          .select('#size')
          .text(this.mempool.bytes);

        // Update transactions per second reading
        this.svg
          .select('#tps')
          .text(roundedTps);

        // Update highlighted segment lights
        // There are 18 segements representing the rough limit on
        // how many tx's will fit in a BCH block so work out what
        // each segment represents
        const txPerSegment = BCH_TX_PER_SEC_LIMIT / 18;

        // Determine how many segments are lit (may be more than 18)
        const numLitSegments = Math.floor(this.mempool.txPerSecond / txPerSegment) + 1;

        // Light or dim segments
        this.svg.select('g#speedo')
          .selectAll('path')
          .each(function eachSegment() {
            const segment = d3.select(this);
            const segmentNo = Number(segment.attr('id').substr(7));
            let fill;
            if (segmentNo <= numLitSegments) {
              if (segmentNo < 15) {
                fill = SEGMENT_COLOR.good;
              } else if (segmentNo < 19) {
                fill = SEGMENT_COLOR.warning;
              } else {
                fill = SEGMENT_COLOR.bad;
              }
            } else {
              // Don't light segment but show a paler version of the color
              // eslint-disable-next-line no-lonely-if
              if (segmentNo < 15) {
                fill = d3.color(SEGMENT_COLOR.good);
              } else if (segmentNo < 19) {
                fill = d3.color(SEGMENT_COLOR.warning);
              } else {
                fill = d3.color(SEGMENT_COLOR.bad);
              }
              fill.opacity = 0.05;
            }
            segment.style('fill', fill);
            segment.style('stroke', 'darkslategrey');
          });
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
              .style('stroke', '#EEEEEE')
              .style('fill', 'white');

            // Append text for tx per second value
            this.svg
              .append('text')
              .text('0.00')
              .attr('class', 'is-unselectable')
              .attr('id', 'tps')
              .style('fill', '#1b1ef8')
              .style('font-family', 'digital_7')
              .style('font-size', '45px')
              .style('text-anchor', 'middle')
              .attr('width', this.width)
              .attr('x', this.width / 2)
              .attr('y', 90);

            // append text for tx per second label
            this.svg
              .append('text')
              .text('tx/sec')
              .attr('id', 'tps_label')
              .attr('class', 'is-unselectable')
              // .style('fill', '#1b1ef8')
              .style('fill', 'darkslategrey')
              .style('font-family', 'digital_7')
              .style('font-size', '10px')
              .style('text-anchor', 'middle')
              .attr('width', this.width)
              .attr('x', this.width / 2)
              .attr('y', 105);

            // Append background for mempool size bytes value
            this.svg
              .append('rect')
              .attr('x', (this.width / 2) - 35)
              .attr('y', 120)
              .attr('width', '70')
              .attr('height', '16')
              .style('fill', 'lightgrey')
              .style('stroke', 'darkslategrey')
              .style('stroke-width', '.3')
              .attr('rx', 5)
              .attr('ry', 5)
              .append('svg:title')
              .text('bytes');

            // Append text for mempool size bytes value
            this.svg
              .append('text')
              .text('32000000')
              .attr('id', 'size')
              .attr('class', 'is-unselectable')
              .style('fill', '#000000')
              .style('font-family', 'digital_7_mono')
              .style('font-size', '14px')
              .style('text-anchor', 'end')
              .style('letter-spacing', '1.5')
              .attr('width', this.width)
              .attr('x', (this.width / 2) + 30)
              .attr('y', 132)
              .append('svg:title')
              .text('bytes');
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

@font-face {
  font-family: digital_7_mono;
  src: url('../../assets/fonts/digital_7/digital_7_(mono).ttf');
}

text {
  font-family: 'digital_7';
}

</style>
