<template>
  <div class="collapse" ref="myFavRef">
    <ul class="list-group" v-for="item in products" :key="item.id">
      <li
        class="list-group-item list-group-item-action d-flex justify-content-between"
        v-if="favorite.includes(item.id)"
      >
        <RouterLink
          :to="`product/${item.id}`"
          class="text-decoration-none d-block link-primary fw-bold"
          >{{ item.title }}</RouterLink
        >
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="delMyFavorite(item.id)"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </li>
    </ul>
    <p v-if="favorite.length === 0" class="fs-4">目前沒有加入最愛商品</p>
  </div>
</template>

<script>
import Collapse from "bootstrap/js/dist/collapse";

export default {
  data() {
    return {
      myFavModal: {},
      products: [],
      favorite: JSON.parse(localStorage.getItem("favorite")) || [],
    };
  },

  watch: {
    favorite: {
      handler() {
        localStorage.setItem("favorite", JSON.stringify(this.favorite));
      },
      deep: true,
    },
  },
  methods: {
    toggleFav() {
      this.myFavModal.toggle();
    },
    // 取得所有產品
    getAllProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    // 刪除我的最愛
    delMyFavorite(id) {
      const heartIndex = this.favorite.findIndex((item) => item === id);
      this.favorite.splice(heartIndex, 1);
    },
  },
  mounted() {
    this.myFavModal = new Collapse(this.$refs.myFavRef, {
      toggle: false,
    });
    this.getAllProducts();
  },
};
</script>
