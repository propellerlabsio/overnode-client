<template>
  <svg class="chart-block-times" width="300" height="200" :viewBox="`0 0 ${width} ${height}`"
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
      svg: null,
      width: 300,
      height: 200,
      colors: {
        blockIntervals: null,
        blockMegabytes: null,
      },
      margins: {
        top: 5,
        right: 45,
        bottom: 5,
        left: 35,
      },
      ranges: {
        blockNumbers: null,
        blockMegabytes: null,
        blockIntervals: null,
      },
    };
  },
  computed: {
    blocks() {
      return this.$store.state.blocks.latest
        .slice(0, 10)
        .map(block => ({
          number: block.height,
          interval: block.interval / 60,
          megabytes: block.size / 1000000,
          height: block.height,
        }));
    },
  },
  mounted() {
    // Init graph when we have a dom element for d3 to hook on to
    this.initGraph();
    this.drawAll();
  },
  watch: {
    blocks() {
      // Re-draw graph whenever the data changes
      if (this.svg) {
        this.drawAll();
      }
    },
  },
  methods: {
    initGraph() {
      // Get reference to this svg
      const domElement = this.$refs.svg;
      this.svg = d3.select(domElement);

      // Color scheme
      const color = d3.scaleOrdinal(d3.schemeCategory20);
      this.colors.blockIntervals = color(0);
      this.colors.blockMegabytes = color(1);
    },
    drawAll() {
      // Remove loading message or graph for old data
      this.svg.selectAll('*').remove();

      if (this.blocks.length) {
        // Create ranges to transpose datapoints to graph
        this.ranges.blockIntervals = d3
          .scaleLinear()
          .domain([
            d3.min(this.blocks, block => block.interval - 1),
            d3.max(this.blocks, block => block.interval + 1),
          ])
          .range([this.height - this.margins.top, this.margins.bottom]);

        this.ranges.blockNumbers = d3
          .scaleLinear()
          .domain([
            d3.min(this.blocks, block => block.number - 0.5),
            d3.max(this.blocks, block => block.number + 0.5),
          ])
          .range([this.margins.left, this.width - this.margins.right]);

        this.ranges.blockMegabytes = d3
          .scaleLinear()
          .domain([
            d3.min(this.blocks, block => block.megabytes),
            d3.max(this.blocks, block => block.megabytes),
          ])
          .range([this.height - this.margins.top, this.margins.bottom]);

        // Draw graph elements
        this.drawBlockNumbers();
        this.drawBlockMegabytes();
        this.drawBlockIntervals();

        // Highlight closest block interval on mouse move
        this.addMouseMoveListeners();
      }
    },
    addMouseMoveListeners() {
      // Emphasize closest block interval on mouse move
      const svg = this.svg;
      const range = this.ranges.blockNumbers;
      this.svg
        .on('mousemove', function onMouseMove() {
          const mouse = d3.mouse(this);
          const blockNumber = Math.round(range.invert(mouse[0]));
          svg
            .selectAll('.intervalPipScaler')
            .attr('transform', (d) => {
              let scale = 'scale(0.7)';
              if (d.number === blockNumber) {
                scale = 'scale(1.4)';
              }
              return scale;
            });
        });

      // Deemphasize on on mouse leaving svg area
      this.svg
        .on('mouseout', () => {
          svg
            .selectAll('.intervalPipScaler')
            .attr('transform', 'scale(0.7)');
        });
    },

    addBlockNavigation(selection) {
      selection
        .on('click', (d) => {
          this.$router.push({
            name: 'Block',
            params: {
              height: d.height,
            },
          });
          d3.event.stopPropagation();
        })
        .append('title')
        .text(d => `Block ${d.number}`);
    },

    drawBlockIntervals() {
      const blockIntervalAxis = d3
        .axisLeft(this.ranges.blockIntervals);

      const lineFunc = d3
        .line()
        .x(d => this.ranges.blockNumbers(d.number))
        .y(d => this.ranges.blockIntervals(d.interval));

      const mainGroup = this.svg
        .append('g')
        .attr('id', 'block-intervals')
        .style('stroke', this.colors.blockIntervals)
        .style('fill', 'none');

      const axis = mainGroup.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.margins.left},0)`)
        .call(blockIntervalAxis);

      axis
        .append('text')
        .attr('transform', `rotate(270) translate(-${(this.height - this.margins.bottom) / 2}, -25)`)
        .append('tspan')
        .text('Time (mins)')
        .style('stroke', 'none')
        .attr('fill', this.colors.blockIntervals)
        .style('text-anchor', 'middle');

      // Set tick label colors
      axis.selectAll('text')
        .style('stroke', 'none')
        .attr('fill', this.colors.blockIntervals);

      mainGroup.append('svg:path')
        .attr('d', lineFunc(this.blocks))
        .attr('stroke-width', 2)
        .attr('fill', 'none');

      const intervalPips = mainGroup
        .selectAll('.intervalPip')
        .data(this.blocks)
        .enter()
        .append('g')
        .attr('class', 'intervalPip')
        .attr('transform', (d) => {
          const x = this.ranges.blockNumbers(d.number);
          const y = this.ranges.blockIntervals(d.interval);
          return `translate(${x}, ${y})`;
        });

      const intervalPipScalers = intervalPips
        .append('g')
        .attr('class', 'intervalPipScaler')
        .attr('transform', 'scale(0.7)');

      intervalPipScalers
        .append('circle')
        .attr('class', 'intervalPipBg')
        .attr('r', 5.5)
        .style('fill', 'white')
        .style('stroke', 'none');

      intervalPipScalers
        .append('circle')
        .attr('class', 'intervalPipFg')
        .style('fill', this.colors.blockIntervals)
        .attr('r', 3.0);
    },

    drawBlockNumbers() {
      const blockNumberAxis = d3
        .axisBottom(this.ranges.blockNumbers)
        .tickFormat(() => '')
        .ticks(0);

      this.svg.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${this.height - this.margins.bottom})`)
        .call(blockNumberAxis);
    },

    drawBlockMegabytes() {
      const blockMegabytesAxis = d3
        .axisRight(this.ranges.blockMegabytes);

      const mainGroup = this.svg
        .append('g')
        .attr('id', 'block-megabytes')
        .attr('stroke', this.colors.blockMegabytes)
        .attr('fill', this.colors.blockMegabytes);

      mainGroup
        .selectAll('.block-megabytes-bar')
        .data(this.blocks)
        .enter()
        .append('rect')
        .attr('class', 'block-megabytes-bar')
        .attr('x', d => this.ranges.blockNumbers(d.number) - 10)
        .attr('y', d => this.ranges.blockMegabytes(d.megabytes))
        .attr('height', d => (this.height - this.margins.bottom) - this.ranges.blockMegabytes(d.megabytes))
        .attr('width', 20)
        .call(this.addBlockNavigation);

      const axis = mainGroup.append('svg:g')
        .attr('class', 'megabytes axis')
        .attr('transform', `translate(${this.width - this.margins.right},0)`)
        .call(blockMegabytesAxis);

      axis
        .append('text')
        .attr('transform', `rotate(90) translate(${(this.height - this.margins.bottom) / 2}, -35)`)
        .append('tspan')
        .text('Size (mb)')
        .style('stroke', 'none')
        .attr('fill', this.colors.blockMegabytes)
        .style('text-anchor', 'middle');

      // Set tick label colors
      axis.selectAll('text')
        .style('stroke', 'none')
        .attr('fill', this.colors.blockMegabytes);

      // Create transparent press targets last - these are invisible, full-height columns
      // that are drawn over the top of each block (megabytes bar and time interval).
      // Resolves issue #7
      mainGroup
        .selectAll('.block-press-target')
        .data(this.blocks)
        .enter()
        .append('rect')
        .attr('class', 'block-press-target')
        .attr('x', d => this.ranges.blockNumbers(d.number) - 10)
        .attr('y', 0)
        .attr('height', this.height)
        .attr('width', 20)
        .call(this.addBlockNavigation);
    },
  },
};
</script>

<style>
  .block-press-target {
    fill: transparent;
    stroke: none;
  }

  .block-megabytes-bar, .intervalPipBg, .intervalPipFg {
    cursor: pointer;
  }
</style>

