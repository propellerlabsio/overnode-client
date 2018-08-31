<template>
  <div>
    <page-title title="Blocks" :count="blocksCount"/>
    <blocks-table :blocks="page.pageData" :loading="loading"/>
    <pager v-if="page.pageData"
      :disabled="loading"
      :current-page="page.current"
      :last-page="page.last"
      @previous="gotoPage(page.current - 1)"
      @next="gotoPage(page.current + 1)"
      @goto="gotoPage"/>
  </div>
</template>

<script>
import BlocksTable from '../misc/BlocksTable';
import FormattedHash from '../formatters/FormattedHash';
import FormattedUnixTime from '../formatters/FormattedUnixTime';
import FormattedBlockInterval from '../formatters/FormattedBlockInterval';
import PageTitle from '../misc/PageTitle';
import Pager from '../misc/Pager';

export default {
  name: 'blocks-page',
  components: {
    BlocksTable,
    FormattedHash,
    FormattedUnixTime,
    FormattedBlockInterval,
    PageTitle,
    Pager,
  },
  created() {
    this.loadBlocks();
  },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    $route() {
      this.loadBlocks();
    },
  },
  computed: {
    page() {
      return this.$store.getters['blocks/blocksPage'];
    },
    blocksCount() {
      return this.$store.state.server.status.height.bitcoind;
    },
  },
  methods: {
    async loadBlocks() {
      const pageNumber = this.$route.params.pageNumber || 1;
      this.loading = true;
      await this.$store.dispatch('blocks/setBlocksPage', pageNumber);
      this.loading = false;
    },
    async gotoPage(pageNumber) {
      this.$router.push({
        name: 'BlocksPage',
        params: {
          pageNumber,
        },
      });
    },
  },
};
</script>
