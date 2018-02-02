<template>
  <svg class="chart-block-times" width="100%" height="200px" :viewBox="`0 0 ${width} ${height}`"
    ref="svg">
    <text x="10" y="35" font-size="35">Loading d3...</text>
  </svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'blocks-graph',
  data() {
    return {
      width: 400,
      height: 200,
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50,
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
    // console.debug('Mounted');
    // Draw graph when we have a dom element for d3 to hook on to
    this.drawGraph();
  },
  watch: {
    blocks() {
      // console.debug('Data changed');
      // Re-draw graph whenever the data changes
      this.drawGraph();
    },
  },
  methods: {
    drawGraph() {
      // Get reference to this svg
      const domElement = this.$refs.svg;
      const svg = d3.select(domElement);

      // Remove loading message or graph for old data
      svg.selectAll('*').remove();

      // Create functions to normalize our graph with our data
      const xRange = d3
        .scaleLinear()
        .domain([
          d3.min(this.blocks, block => block.height),
          d3.max(this.blocks, block => block.height),
        ])
        .range([this.margins.left, this.width - this.margins.right]);

      const yRange = d3
        .scaleLinear()
        .domain([
          d3.min(this.blocks, block => block.interval),
          d3.max(this.blocks, block => block.interval),
        ])
        .range([this.height - this.margins.top, this.margins.bottom]);

      const xAxis = d3
        .axisBottom(xRange)
        .tickFormat(() => '');
        // .scale(xRange)
        // .tickSize(5)
        // .tickSubdivide(true);

      const yAxis = d3
        .axisLeft(yRange);
        // .scale(yRange)
        // .tickSize(5)
        // .orient('left')
        // .tickSubdivide(true);

      // TOOD
      svg.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${this.height - this.margins.bottom})`)
        .call(xAxis);

      svg.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.margins.left},0)`)
        .call(yAxis);


      const lineFunc = d3
        .line()
        .x(d => xRange(d.height))
        .y(d => yRange(d.interval));
        // .interpolate('linear');
        // .curve(d3.curveBasis);

      svg.append('svg:path')
        .attr('d', lineFunc(this.blocks))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    },
  },
};
</script>
