<template>
  <svg class="chart-block-times" width="100%" height="100%" :viewBox="`0 0 ${width} ${height}`"
    ref="svg">
    <defs>
      <marker id="arrow" markerWidth="25" markerHeight="25"
        refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="grey" />
      </marker>
    </defs>
    <text x="10" y="35" font-size="35">Loading d3...</text>
  </svg>
</template>

<script>

/* Disable eslint rules that don't work well with d3 */
/* eslint-disable no-param-reassign                  */
import * as d3 from 'd3';

const OUR_NODE_ID = 'Our node';

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
        id: OUR_NODE_ID,
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
          source: node.inbound ? node.id : OUR_NODE_ID,
          target: node.inbound ? OUR_NODE_ID : node.id,
          distance: node.pingtime,
          inbound: node.inbound,
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
      this.svg.selectAll('text').remove();

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
        .append('polyline')
        .attr('points', '0 0 0 0 0 0')
        .style('stroke', 'lightgrey')
        .style('fill', 'none')
        .attr('stroke-width', '0.5')
        .attr('marker-mid', 'url(#arrow)');

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
          .attr('points', (d) => {
            // New points
            const points = {
              x1: d.source.x,
              y1: d.source.y,
              x3: d.target.x,
              y3: d.target.y,
            };

            // Calc midpoint for marker
            points.x2 = (points.x3 + points.x1) / 2;
            points.y2 = (points.y3 + points.y1) / 2;

            return `${points.x1},${points.y1} ${points.x2},${points.y2} ${points.x3},${points.y3} `;
          });

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
