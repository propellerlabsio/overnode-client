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
          hash: block.hash,
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
          d3.min(this.blocks, block => block.height - 0.5),
          d3.max(this.blocks, block => block.height + 0.5),
        ])
        .range([this.margins.left, this.width - this.margins.right]);

      const yRange = d3
        .scaleLinear()
        .domain([
          d3.min(this.blocks, block => block.interval - 1),
          d3.max(this.blocks, block => block.interval + 1),
        ])
        .range([this.height - this.margins.top, this.margins.bottom]);

      const xAxis = d3
        .axisBottom(xRange)
        .tickFormat(() => '')
        // .ticks(this.blocks.length);
        .ticks(0);

      const yAxis = d3
        .axisLeft(yRange);

      svg.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${this.height - this.margins.bottom})`)
        .call(xAxis);

      svg.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.margins.left},0)`)
        .call(yAxis);


      svg
        .attr('x', 0)
        .attr('y', 0)
        .style('fill', 'black')
        .attr('width', this.width)
        .attr('height', this.height)
        .on('mousemove', function onMouseOver() {
          const mouse = d3.mouse(this);
          const blockHeight = Math.round(xRange.invert(mouse[0]));
          svg
            .selectAll('.intervalPipScaler')
            .attr('transform', (d) => {
              let scale = 'scale(1)';
              if (d.height === blockHeight) {
                scale = 'scale(1.7)';
              }
              return scale;
            });
        });


      const lineFunc = d3
        .line()
        .x(d => xRange(d.height))
        .y(d => yRange(d.interval));

      svg.append('svg:path')
        .attr('d', lineFunc(this.blocks))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

      const intervalPips = svg
        .selectAll('.intervalPip')
        .data(this.blocks)
        .enter()
        .append('g')
        .attr('class', 'intervalPip')
        .attr('transform', (d) => {
          const x = xRange(d.height);
          const y = yRange(d.interval);
          return `translate(${x}, ${y})`;
        });

      const intervalPipScalers = intervalPips
        .append('g')
        .attr('class', 'intervalPipScaler')
        .attr('transform', 'scale(1)');

      const addBlockNav = (selection) => {
        selection
          .on('click', (d) => {
            this.$router.push({
              name: 'Block',
              params: {
                hash: d.hash,
              },
            });
            d3.event.stopPropagation();
          })
          .append('title')
          .text(d => `Block ${d.height}`);
      };

      intervalPipScalers
        .append('circle')
        .attr('class', 'intervalPipBg')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 5.5)
        .style('fill', 'white')
        .call(addBlockNav);


      intervalPipScalers
        .append('circle')
        .style('fill', 'blue')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('class', 'intervalPipFg')
        .attr('r', 3.5)
        .call(addBlockNav);
    },
  },
};
</script>

<style>
  .intervalPipBg, .intervalPipFg {
    cursor: pointer;
  }
</style>

