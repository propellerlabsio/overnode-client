<template>
  <svg class="chart-block-times" width="100%" height="100%" :viewBox="`0 0 ${width} ${height}`"
    ref="peersGraph">
    <defs>
      <marker id="arrow" markerWidth="25" markerHeight="25"
        refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill="grey" />
      </marker>
    </defs>
    <g class="links"></g>
    <g class="nodes"></g>
  </svg>
</template>

<script>

/* Disable eslint rules that don't work well with d3 */
/* eslint-disable no-param-reassign                  */
import * as d3 from 'd3';

const OUR_NODE_ID = 'Overnode';

export default {
  name: 'peers-graph',
  data() {
    return {
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
    colors() {
      return this.$store.state.peers.colors;
    },
    peers() {
      return this.$store.state.peers.all;
    },
  },
  mounted() {
    // Draw graph when we have a dom element for d3 to hook on to
    this.drawGraph();
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
        fx: this.width / 2,
        fy: this.height / 2,
        location,
        color: this.colors.BUCash,
        title: 'Bitcoin Unlimited; Overnode',
      }]);
    },

    getLinks() {
      const links = this.peers
        .map(peer => ({
          id: peer.id,
          source: peer.inbound ? peer.id : OUR_NODE_ID,
          target: peer.inbound ? OUR_NODE_ID : peer.id,
          distance: peer.pingtime,
          inbound: peer.inbound,
        }));
      return links;
    },

    drawGraph() {
      // Check we have reference to DOM element
      const svg = d3.select(this.$refs.peersGraph);
      if (!svg) {
        // No dom element yet
        return;
      }

      const nodes = this.getNodes();
      const links = this.getLinks();

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

      const svgLinks = svg
        .select('g.links')
        .selectAll('.link')
        .data(links, d => d.id);

      const svgLinksEnter = svgLinks
        .enter()
        .append('polyline')
        .merge(svgLinks)
        .attr('class', 'link')
        .attr('points', '0 0 0 0 0 0')
        .style('stroke', 'lightgrey')
        .style('fill', 'none')
        .attr('stroke-width', '0.5')
        .attr('marker-mid', 'url(#arrow)');

      svgLinks
        .exit()
        .remove();

      const svgNodes = svg
        .select('g.nodes')
        .selectAll('.node')
        .data(nodes, d => d.id);

      const svgNodesEnter = svgNodes
        .enter()
        .append('circle')
        .merge(svgNodes)
        .attr('class', 'node')
        .attr('r', 5)
        .attr('fill', d => d.color)
        .on('click', (d) => {
          if (d.id !== OUR_NODE_ID) {
            this.$router.push({
              name: 'Peer',
              params: {
                peerId: d.id,
              },
            });
          }
        })
        .on('mouseover', function onMouseover(d) {
          if (d.id !== OUR_NODE_ID) {
            d3.select(this).style('cursor', 'pointer');
          }
        })
        .on('mouseout', function onMouseout() {
          d3.select(this).style('cursor', 'default');
        });

      svgNodesEnter.call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

      svgNodes
        .exit()
        .transition()
        .duration(100)
        .attr('r', 10)
        .remove();

      svgNodesEnter.append('title')
        .text(d => d.title);

      function ticked() {
        svgLinksEnter
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

        svgNodesEnter
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
