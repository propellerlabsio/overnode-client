<template>
  <div>
    <page-title title="Blocks"/>
    <table class="table is-striped is-bordered is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th class="has-text-centered">
            Height
          </th>
          <th class="has-text-centered is-hidden-mobile">
            Hash
          </th>
          <th class="has-text-centered">
            Mined
          </th>
          <th class="is-hidden-mobile has-text-centered">
            Interval
          </th>
          <th class="has-text-centered">
            # Tx
          </th>
          <th class="has-text-centered">
            Size (mb)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="block in page.blocks" v-bind:key="block.hash"
          @click="$router.push(`/block/${block.height}`)">
          <td class="has-text-centered">
            <router-link :to="`/block/${block.height}`">
              {{ block.height }}
            </router-link>
          </td>
          <td class="is-hidden-mobile has-text-centered">
            <formatted-hash :hash="block.hash"/>
          </td>
          <td class="is-hidden-tablet has-text-centered">
            {{ block.humanizedTime }}
          </td>
          <td class="is-hidden-mobile has-text-centered">
            <formatted-unix-time :time="block.time"/>
            (<span class="is-size-7">{{ block.humanizedTime }}</span>)
          </td>
          <td class="is-hidden-mobile has-text-centered">
            <formatted-block-interval :interval="block.interval"/>
          </td>
          <td class="has-text-right">
            {{ block.tx_count }}
          </td>
          <td class="has-text-right">
            {{ (block.size / 1000000).toFixed(3) }}
          </td>
        </tr>
      </tbody>
    </table>
    <pager
      :disabled="loading"
      :current-page="page.current"
      :last-page="page.last"
      @previous="gotoPage(page.current - 1)"
      @next="gotoPage(page.current + 1)"
      @goto="gotoPage"/>
  </div>
</template>

<script>
import FormattedHash from '../formatters/FormattedHash';
import FormattedUnixTime from '../formatters/FormattedUnixTime';
import FormattedBlockInterval from '../formatters/FormattedBlockInterval';
import PageTitle from '../misc/PageTitle';
import Pager from '../misc/Pager';

export default {
  name: 'blocks-page',
  components: {
    FormattedHash,
    FormattedUnixTime,
    FormattedBlockInterval,
    PageTitle,
    Pager,
  },
  async created() {
    this.gotoPage(1);
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    page() {
      return this.$store.getters['blocks/page'];
    },
  },
  methods: {
    async gotoPage(pageNumber) {
      this.loading = true;
      await this.$store.dispatch('blocks/gotoPage', pageNumber);
      this.loading = false;
    },
  },
};
</script>
