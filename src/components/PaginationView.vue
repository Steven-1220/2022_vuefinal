<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          @click.prevent="emitChangePage(pages.current_page - 1)"
          >前一頁</a
        >
      </li>

      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="page + '123'"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="emitChangePage(page)">{{
          page
        }}</a>
      </li>

      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a
          class="page-link"
          href="#"
          @click.prevent="emitChangePage(pages.current_page + 1)"
          >下一頁</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pages"],
  methods: {
    emitChangePage(item) {
      this.$emit("emit-get-page", item);
    },
  },
};
</script>
