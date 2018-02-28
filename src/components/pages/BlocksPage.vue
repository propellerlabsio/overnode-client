<template>
  <div>
    <page-title title="Blocks"/>
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
    this.gotoPage(1);
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    page() {
      return this.$store.getters['blocks/blocksPage'];
    },
  },
  methods: {
    async gotoPage(pageNumber) {
      this.loading = true;
      await this.$store.dispatch('blocks/setBlocksPage', pageNumber);
      this.loading = false;
    },
  },
};
</script>
