<template>
  <ul class="pagination">
    <li class="pagination-item">
      <div
        @click="onClickFirstPage"
        v-bind:class="{ disabled: isInFirstPage }"
        aria-label="Go to first page"
      >
        First
      </div>
    </li>

    <li class="pagination-item">
      <div
        @click="onClickPreviousPage"
        v-bind:class="{ disabled: isInFirstPage }"
        aria-label="Go to previous page"
      >
        «
      </div>
    </li>

    <li v-for="page in pages" class="pagination-item" v-bind:key="page">
      <div
        @click="onClickPage(page.name)"
        v-bind:class="{
          active: isPageActive(page.name),
        }"
        :aria-label="`Go to page number ${page.name}`"
      >
        {{ page.name }}
      </div>
    </li>

    <li class="pagination-item">
      <div
        @click="onClickNextPage"
        v-bind:class="{ disabled: isInLastPage }"
        aria-label="Go to next page"
      >
        »
      </div>
    </li>

    <li class="pagination-item">
      <div
        @click="onClickLastPage"
        v-bind:class="{ disabled: isInLastPage }"
        aria-label="Go to last page"
      >
        Last
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1, this.$store.state.searchedMovie);
    },
    onClickPreviousPage() {
      this.$emit(
        "pagechanged",
        this.currentPage - 1,
        this.$store.state.searchedMovie
      );
    },
    onClickPage(page) {
      this.$emit("pagechanged", page, this.$store.state.searchedMovie);
    },
    onClickNextPage() {
      this.$emit(
        "pagechanged",
        this.currentPage + 1,
        this.$store.state.searchedMovie
      );
    },
    onClickLastPage() {
      this.$emit(
        "pagechanged",
        this.totalPages,
        this.$store.state.searchedMovie
      );
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: none;
  margin: 0;
  padding: 15px;
  text-align: center;
  background: black;
  .pagination-item {
    display: inline;
    padding: 5px 10px;
    div {
      display: inline-block;
      text-decoration: none;
      padding: 5px 10px;
      color: rgb(224, 220, 220);
      border-radius: 5px;
      transition: background-color 0.3s;
      background: rgb(0, 0, 0);
      cursor: pointer;
      &.active {
        background-color: #f03636;
        color: white;
        pointer-events: none;
      }
      &.disabled {
        display: none;
      }
      &:hover:not(.active) {
        background-color: rgb(103, 96, 96);
      }
    }
  }
}
</style>
