<template>
  <!-- eslint-disable max-len -->
  <svg class="chart-block-times" width="200px" height="200px" :viewBox="`0 0 ${width} ${height}`"
    ref="svg">
    <g
      transform="translate(-26.458328)"
      id="speedo">
      <circle
        style="fill:#000000;fill-opacity:1;stroke:#ffffff;stroke-width:1.28420913;stroke-miterlimit:4;stroke-dasharray:none"
        id="background"
        cx="105.83333"
        cy="79.375"
        r="78.440346" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 106.22492,10.828604 v 18.84477 c 2.86613,0.02217 5.6752,0.283608 8.40629,0.77141 l 3.91953,-18.439145 c -3.9973,-0.749962 -8.11635,-1.153427 -12.32582,-1.177035 z"
        id="segment12" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 104.4141,10.84128 c -4.20671,0.0855 -8.321177,0.547484 -12.309062,1.358117 l 3.919524,18.439145 c 2.722922,-0.545038 5.525668,-0.868545 8.389538,-0.94887 z"
        id="segment11" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 120.32579,12.363729 -3.91861,18.435976 c 2.78527,0.603503 5.4833,1.439627 8.07309,2.488522 l 7.67019,-17.227253 c -3.78216,-1.573907 -7.73567,-2.81708 -11.82467,-3.697245 z"
        id="segment13" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 90.335414,12.583291 c -4.075009,0.94174 -8.008512,2.250887 -11.769436,3.883307 l 7.666113,17.218653 c 2.569989,-1.104014 5.251869,-1.996481 8.023751,-2.657835 z"
        id="segment10" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 133.81415,16.778512 -7.66612,17.219103 c 2.58991,1.16126 5.06277,2.537124 7.39495,4.10604 l 11.08087,-15.251646 c -3.39541,-2.334666 -7.01034,-4.372563 -10.8097,-6.073497 z"
        id="segment14" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 76.914509,17.20994 c -3.773662,1.758509 -7.363143,3.846186 -10.725498,6.233754 l 11.079512,15.249837 c 2.301797,-1.619222 4.74732,-3.047139 7.313456,-4.262676 z"
        id="segment9" />
      <path
        style="fill:#bcbd22;fill-opacity:1;stroke:#bcbd22;stroke-width:0.21327116"
        d="m 146.10284,23.898211 -11.07725,15.245761 c 2.29131,1.665511 4.43474,3.521592 6.40714,5.545642 l 14.01486,-12.618712 c -2.85824,-2.996944 -5.98765,-5.731622 -9.34475,-8.172691 z"
        id="segment15" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 64.726771,24.512079 c -3.321343,2.492527 -6.406042,5.281928 -9.221156,8.3248 l 14.005348,12.610563 c 1.932183,-2.067692 4.038115,-3.970607 6.295775,-5.684621 z"
        id="segment8" />
      <path
        style="fill:#bcbd22;fill-opacity:1;stroke:#bcbd22;stroke-width:0.21327116"
        d="m 156.67939,33.399139 -14.00398,12.609205 c 1.90099,2.097704 3.62443,4.358994 5.14862,6.759345 l 16.33089,-9.428496 c -2.19215,-3.540291 -4.69542,-6.867358 -7.47553,-9.940054 z"
        id="segment16" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 54.29191,34.18232 c -2.73449,3.116139 -5.190615,6.482056 -7.330205,10.059568 l 16.322294,9.423969 c 1.475171,-2.436214 3.153613,-4.735356 5.011902,-6.874332 z"
        id="segment7" />
      <path
        style="fill:#bcbd22;fill-opacity:1;stroke:#bcbd22;stroke-width:0.21327116"
        d="m 165.08886,44.89152 -16.3223,9.423516 c 1.4285,2.442033 2.65441,5.016355 3.65515,7.700973 l 17.93799,-5.82813 c -1.41815,-3.945874 -3.18721,-7.723664 -5.27084,-11.296359 z"
        id="segment17" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 46.053577,45.8087 c -2.029402,3.606462 -3.743686,7.41342 -5.101537,11.386448 l 17.931211,5.826319 c 0.944144,-2.710821 2.116113,-5.314264 3.493526,-7.788343 z"
        id="segment6" />
      <path
        style="fill:#bcbd22;fill-opacity:1;stroke:#bcbd22;stroke-width:0.21327116"
        d="m 170.94912,57.900011 -17.92578,5.824509 c 0.8883,2.679722 1.55464,5.460507 1.97742,8.320724 l 18.75332,-1.971077 c -0.56848,-4.190329 -1.51478,-8.260022 -2.80496,-12.174156 z"
        id="segment18" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 40.387968,58.916336 c -1.229115,3.935861 -2.109412,8.02501 -2.612562,12.230289 l 18.742459,1.970174 c 0.361246,-2.875395 0.968692,-5.67418 1.799503,-8.37505 z"
        id="segment5" />
      <path
        style="fill:#d62728;fill-opacity:1;stroke:#d62728;stroke-width:0.21327116"
        d="m 173.9741,71.872764 -18.74246,1.969722 c 0.20126,1.816855 0.30829,3.662 0.3083,5.532513 -8.8e-4,1.38389 -0.0635,2.761359 -0.17882,4.130032 l 18.74155,1.969722 c 0.18224,-2.020355 0.28023,-4.054952 0.28204,-6.099754 -1e-5,-2.535753 -0.14231,-5.037863 -0.41061,-7.502235 z"
        id="segment19" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 37.584364,72.947487 c -0.196862,2.116547 -0.302406,4.259539 -0.302407,6.427512 0.0014,1.681828 0.06541,3.357274 0.189231,5.023221 l 18.755587,-1.971533 c -0.0632,-1.013229 -0.09914,-2.030634 -0.100048,-3.051688 7e-6,-1.502675 0.07043,-2.988608 0.201001,-4.457338 z"
        id="segment4" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 56.36983,84.23298 -18.740196,1.969722 c 0.423457,4.194195 1.235197,8.319327 2.406584,12.329429 L 57.961089,92.70808 C 57.18936,89.946643 56.655021,87.111574 56.36983,84.23298 Z"
        id="segment3" />
      <path
        style="fill:#d62728;fill-opacity:1;stroke:#d62728;stroke-width:0.21327116"
        d="m 155.17732,85.3068 c -0.3471,2.866373 -0.94077,5.685771 -1.77098,8.427563 l 17.91898,5.821796 c 1.233,-3.988978 2.10196,-8.098733 2.59083,-12.280092 z"
        id="segment20" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 58.483057,94.441943 -17.916269,5.821797 c 1.284999,4.00298 2.933128,7.88084 4.929055,11.58292 l 16.323655,-9.42488 c -1.341966,-2.558123 -2.458201,-5.228146 -3.336441,-7.979837 z"
        id="segment2" />
      <path
        style="fill:#d62728;fill-opacity:1;stroke:#d62728;stroke-width:0.21327116"
        d="m 152.8477,95.456003 c -0.93561,2.727605 -2.10714,5.370017 -3.50213,7.896997 l 16.3155,9.41989 c 2.05175,-3.66901 3.76002,-7.51685 5.10561,-11.49464 z"
        id="segment21" />
      <path
        style="fill:#2ca02c;fill-opacity:1;stroke:#2ca02c;stroke-width:0.21327116"
        d="m 62.689145,104.01214 -16.31143,9.41718 c 2.086249,3.63615 4.511979,7.09074 7.256415,10.31488 l 14.003539,-12.60829 c -1.862315,-2.23639 -3.516655,-4.6206 -4.948524,-7.12377 z"
        id="segment1" />
      <path
        style="fill:#d62728;fill-opacity:1;stroke:#d62728;stroke-width:0.21327116"
        d="m 148.44378,104.92434 c -1.48251,2.46833 -3.18498,4.8148 -5.09294,7.01014 l 13.99584,12.60196 c 2.79243,-3.1807 5.2706,-6.59395 7.41034,-10.19357 z"
        id="segment22" />
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3';

const SEGMENT_COLOR = {
  good: '#2ca02c',
  warning: '#bcbd22',
  bad: '#d62728',
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
      return this.$store.state.server.status.mempool;
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

        // Change color tx per second to match warning state
        this.svg.select('#tps')
          .style('fill', () => {
            let fill;
            if (numLitSegments < 15) {
              fill = SEGMENT_COLOR.good;
            } else if (numLitSegments < 19) {
              fill = SEGMENT_COLOR.warning;
            } else {
              fill = SEGMENT_COLOR.bad;
            }
            return fill;
          });

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
        .style('fill', 'grey')
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
        .text('999999999')
        .attr('id', 'size')
        .attr('class', 'is-unselectable')
        .style('fill', '#000000')
        .style('font-family', 'digital_7_mono')
        .style('font-size', '14px')
        .style('text-anchor', 'end')
        .attr('width', this.width)
        .attr('x', (this.width / 2) + 29)
        .attr('y', 132)
        .append('svg:title')
        .text('bytes');
    },
  },
};
</script>

<style scoped>

@font-face {
  font-family: digital_7;
  src: url('../../../assets/fonts/digital_7/digital_7.ttf');
}

@font-face {
  font-family: digital_7_mono;
  src: url('../../../assets/fonts/digital_7/digital_7_(mono).ttf');
}

text {
  font-family: 'digital_7';
}

</style>
