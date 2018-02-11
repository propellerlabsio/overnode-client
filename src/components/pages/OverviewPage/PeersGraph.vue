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

const OUR_NODE_ID = 'Overnode';

const color = d3.scaleOrdinal(d3.schemeCategory20);

const CLIENT_COLOR = {
  Unknown: color(1),
  ABC: color(2),
  BUCash: color(3),
  XT: color(4),
};

export default {
  name: 'peers-graph',
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
    getNodes() {
      return this.peers.concat([{
        // Add our node
        id: OUR_NODE_ID,
        addr: OUR_NODE_ID,
        pingtime: 0,
        minping: 0,
        subver: 'BUCash', // TODO get actual
      }]).map((node) => {
        let clientColor;
        let clientSoftware;
        if (!node.subver) {
          clientColor = CLIENT_COLOR.Unknown;
          clientSoftware = 'Unknown client';
        } else if (node.subver.includes('BUCash')) {
          clientColor = CLIENT_COLOR.BUCash;
          clientSoftware = 'Bitcoin Unlimited';
        } else if (node.subver.includes('ABC')) {
          clientColor = CLIENT_COLOR.ABC;
          clientSoftware = 'Bitcoin ABC';
        } else if (node.subver.includes('XT')) {
          clientColor = CLIENT_COLOR.XT;
          clientSoftware = 'Bitcoin XT';
        } else {
          clientColor = CLIENT_COLOR.Unknown;
          clientSoftware = node.subver;
        }
        return Object.assign({
          color: clientColor,
          clientSoftware,
          clientAddress: node.addr.split(':')[0],
        }, node);
      });
    },

    getLinks() {
      const links = this.peers
        .map(peer => ({
          source: peer.inbound ? peer.id : OUR_NODE_ID,
          target: peer.inbound ? OUR_NODE_ID : peer.id,
          distance: peer.pingtime,
          inbound: peer.inbound,
        }));
      return links;
    },

    initGraph() {
      this.drawGraph();
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

      const nodes = this.getNodes();
      const links = this.getLinks();

      // Remove loading message and graph for old data
      this.svg.selectAll('text').remove();
      this.svg.selectAll('g').remove();


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
        .data(links)
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
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('fill', d => d.color)
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      node.append('title')
        .text(d => `${d.clientSoftware}; ${d.clientAddress}`);

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
        .nodes(nodes)
        .on('tick', ticked);

      simulation.force('link')
        .links(links);
    },
  },
};
</script>
