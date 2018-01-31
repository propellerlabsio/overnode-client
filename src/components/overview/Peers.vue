<template>
  <svg class="chart-block-times" width="100%" height="100%" :viewBox="`0 0 ${width} ${height}`"
    ref="svg">
    <text x="10" y="35" font-size="35">Loading d3...</text>
  </svg>
</template>

<script>

/* Disable eslint rules that don't work well with d3 */
/* eslint-disable no-param-reassign                  */
import * as d3 from 'd3';

const CLIENT_COLOR = {
  Unknown: 1,
  BUCash: 2,
  ABC: 3,
  XT: 4,
};

export default {
  name: 'peers',
  data() {
    return {
      svg: null,
      width: 100,
      height: 100,
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50,
      },
    };
  },
  computed: {
    peers() {
      return this.$store.state.peers.current;
    },
    nodes() {
      return this.peers.concat([{
        // Add our node
        id: 'home',
        addr: 'Our Node',
        pingtime: 0,
        minping: 0,
        subver: 'BUCash', // TODO get actual
      }]).map((node) => {
        let group;
        if (!node.subver) {
          group = CLIENT_COLOR.Unknown;
        } else if (node.subver.includes('BUCash')) {
          group = CLIENT_COLOR.BUCash;
        } else if (node.subver.includes('ABC')) {
          group = CLIENT_COLOR.ABC;
        } else if (node.subver.includes('XT')) {
          group = CLIENT_COLOR.XT;
        } else {
          group = CLIENT_COLOR.Unknown;
        }
        return Object.assign({ group }, node);
      });
    },

    links() {
      const links = this.nodes
        .filter(node => node.id !== -1)
        .map(node => ({
          source: 'home',
          target: node.id,
          value: node.pingtime,
        }));
      return links;
    },
  },
  mounted() {
    // Draw graph when we have a dom element for d3 to hook on to
    this.initGraph();
  },
  watch: {
    peers() {
      // Re-draw graph whenever the data changes
      this.drawGraph();
    },
  },
  methods: {
    initGraph() {
      // Get reference to this svg
      const domElement = this.$refs.svg;
      this.svg = d3.select(domElement);

      this.drawGraph();
    },

    drawGraph() {
      // Check we have reference to DOM element
      if (!this.svg) {
        return;
      }

      // Remove loading message or graph for old data
      this.svg.selectAll('*').remove();

      const color = d3.scaleOrdinal(d3.schemeCategory20);

      const simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.width / 2, this.height / 2));

      function dragstarted(d) {
        if (!d3.event.active) {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      const link = this.svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(this.links)
        .enter()
        .append('line')
        .style('stroke', 'lightgrey')
        .attr('stroke-width', '0.5');

      const node = this.svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('fill', d => color(d.group))
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      node.append('title')
        .text(d => d.id);

      function ticked() {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      }

      simulation
        .nodes(this.nodes)
        .on('tick', ticked);

      simulation.force('link')
        .links(this.links);
    },
  },
};
</script>
