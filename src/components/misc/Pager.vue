<template>
  <nav v-if="lastPage > 1" class="pagination" role="navigation" aria-label="pagination">
    <a class="pagination-previous"
      @click="gotoPreviousPage"
      :disabled="currentPage === 1 || disabled">
      Previous
    </a>
    <a class="pagination-next" @click="gotoNextPage"
      :disabled="currentPage === lastPage || disabled">
      Next page
    </a>
    <ul class="pagination-list">
      <li>
        <a class="pagination-link"
          @click="gotoPage(1)"
          :disabled="disabled"
          v-if="currentPage > 2" aria-label="Goto page 1">1</a>
      </li>
      <li>
        <span class="pagination-ellipsis" v-if="currentPage > 3">&hellip;</span>
      </li>
      <li>
        <a class="pagination-link"
          v-if="currentPage > 1"
          @click="gotoPreviousPage"
          :disabled="disabled"
          :aria-label="`Goto page ${previousPage}`">{{ previousPage }}</a>
      </li>
      <li>
        <a class="pagination-link is-current" :aria-label="`Page ${currentPage}`"
          :disabled="disabled"
          aria-current="page">
          {{ currentPage }}
        </a>
      </li>
      <li>
        <a v-if="nextPage"
          class="pagination-link"
          :disabled="disabled"
          @click="gotoNextPage"
          :aria-label="`Goto page ${nextPage}`">{{ nextPage }}</a>
      </li>
      <li v-if="(lastPage - currentPage) > 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li>
        <a v-if="currentPage !== lastPage && nextPage !== lastPage"
          class="pagination-link"
          :disabled="disabled"
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
    disabled: {
      type: Boolean,
      required: false,
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
      if (this.currentPage < this.lastPage && !this.disabled) {
        this.$emit('next');
      }
    },
    gotoPreviousPage() {
      if (this.currentPage > 1 && !this.disabled) {
        this.$emit('previous');
      }
    },
    gotoPage(pageNumber) {
      if (!this.disabled) {
        this.$emit('goto', pageNumber);
      }
    },
  },
};
</script>

