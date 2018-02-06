<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous" @click="gotoPreviousPage" :disabled="currentPage === 1">
      Previous
    </a>
    <a class="pagination-next" @click="gotoNextPage" :disabled="currentPage === lastPage">
      Next page
    </a>
    <ul class="pagination-list">
      <li>
        <a class="pagination-link"
          @click="gotoPage(1)"
          v-if="currentPage > 2" aria-label="Goto page 1">1</a>
      </li>
      <li>
        <span class="pagination-ellipsis" v-if="currentPage > 2">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link"
          v-if="currentPage > 1"
          @click="gotoPreviousPage"
          :aria-label="`Goto page ${previousPage}`">{{ previousPage }}</a>
      </li>
      <li>
        <a class="pagination-link is-current" :aria-label="`Page ${currentPage}`"
          aria-current="page">
          {{ currentPage }}
        </a>
      </li>
      <li>
        <a v-if="nextPage"
          class="pagination-link"
          @click="gotoNextPage"
          :aria-label="`Goto page ${nextPage}`">{{ nextPage }}</a>
      </li>
      <li v-if="currentPage !== lastPage && nextPage !== lastPage">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a v-if="currentPage !== lastPage && nextPage !== lastPage"
          class="pagination-link"
          @click="gotoPage(lastPage)"
          :aria-label="`Goto page ${lastPage}`">
          {{ lastPage }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'pager',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    nextPage() {
      return this.currentPage < this.lastPage ? this.currentPage + 1 : null;
    },
    previousPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : null;
    },
  },
  methods: {
    gotoNextPage() {
      if (this.currentPage < this.lastPage) {
        this.$emit('next');
      }
    },
    gotoPreviousPage() {
      if (this.currentPage > 1) {
        this.$emit('previous');
      }
    },
    gotoPage(pageNumber) {
      this.$emit('goto', pageNumber);
    },
  },
};
</script>

