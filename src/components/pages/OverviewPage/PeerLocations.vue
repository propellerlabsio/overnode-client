<template>
  <svg ref="map" width="374" height="200">
  </svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'peer-locations',
  data() {
    return {
      width: 374,
      height: 200,
      offset: {
        lat: 1,
        lon: -18,
      },
      scale: {
        lat: 1.24,
        lon: 1.04,
      },
      testNodes: [{
        title: 'Unalaska',
        lat: 53.624443,
        lon: -168.0744901,
      }, {
        title: 'New York',
        lat: 40.6976637,
        lon: -74.1197636,
      }, {
        title: 'Sydney',
        lat: -33.867888,
        lon: 151.2012372,
      }, {
        title: 'Singapore',
        lat: 1.2855,
        lon: 103.856,
      }, {
        title: 'London',
        lat: 51.5287718,
        lon: -0.2416801,
      }, {
        title: 'Tasmania',
        lat: -42.216843,
        lon: 146.599746,
      }, {
        title: 'Taiwan',
        lat: 23.751551,
        lon: 120.989970,
      }, {
        title: 'Sth America Tip',
        lat: -54.752021,
        lon: -65.300874,
      }],
    };
  },
  computed: {
    center() {
      return {
        x: this.width / 2,
        y: this.height / 2,
      };
    },
    nodes() {
      return this.$store.state.peers.all;
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    nodes() {
      this.draw();
    },
  },
  methods: {
    convertLatitude({ location }) {
      let y = 10; // Default plot point if no location
      if (location && location.lat) {
        y = ((this.center.y - location.lat) * this.scale.lat) + this.offset.lat;
      }
      return y;
    },
    convertLongitude({ location }) {
      let x = 10; // Default plot point if no location
      if (location && location.lon) {
        x = ((this.center.x + location.lon) * this.scale.lon) + this.offset.lon;
      }
      return x;
    },
    draw() {
      const svg = d3.select(this.$refs.map);
      if (svg.empty()) {
        // No DOM element yet
        return;
      }

      const svgNodes = svg
        .selectAll('.node')
        .data(this.nodes, d => d.id);

      const svgNodesEnter = svgNodes
        .enter()
        .append('circle')
        .merge(svgNodes)
        .attr('class', 'node')
        .style('fill', d => d.color)
        .style('stroke', 'darkslategrey')
        .attr('r', 5)
        .attr('cx', this.convertLongitude)
        .attr('cy', this.convertLatitude)
        .on('click', (d) => {
          this.$router.push({
            name: 'Peer',
            params: {
              peerId: d.id,
            },
          });
        })
        .on('mouseover', function onMouseover() {
          d3.select(this).style('cursor', 'pointer');
        })
        .on('mouseout', function onMouseout() {
          d3.select(this).style('cursor', 'default');
        });

      svgNodesEnter
        .append('title')
        .text(d => d.title);

      svgNodes
        .exit()
        .remove();
    },
  },
};
</script>


<style scoped>
  svg {
    background-image: url('../../../assets/world_map_small.png')
  }
</style>
