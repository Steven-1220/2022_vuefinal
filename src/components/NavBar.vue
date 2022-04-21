<template>
  <nav id="nav-top" class="navbar navbar-expand-lg py-4">
    <div class="container">
      <RouterLink
        class="navbar-brand fs-2 me-0 pt-0"
        style="white-space: normal"
        to="/"
      >
        <i class="bi bi-balloon-heart-fill"></i> SweetHome
        <br class="d-block d-sm-none" />
        經典法式甜點
      </RouterLink>

      <button
        class="navbar-toggler bg-primary text-white"
        type="button"
        @click="toggleNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"><i class="bi bi-list fs-2"></i></span>
      </button>

      <div class="collapse navbar-collapse" ref="myNavBarRef">
        <ul class="navbar-nav ms-auto fs-5 text-nowrap">
          <li class="nav-item mx-2">
            <RouterLink
              class="nav-link active underline-effect"
              aria-current="page"
              to="/user/about"
              >關於我們</RouterLink
            >
          </li>
          <li class="nav-item mx-2">
            <RouterLink
              class="nav-link active underline-effect"
              aria-current="page"
              to="/user/material"
              >原料與組成</RouterLink
            >
          </li>
          <li class="nav-item mx-2">
            <RouterLink class="nav-link underline-effect" to="/user/products"
              >相關產品</RouterLink
            >
          </li>
          <li class="nav-item mx-2">
            <RouterLink class="nav-link underline-effect" to="/user/notice"
              >購物須知</RouterLink
            >
          </li>
          <li class="nav-item mx-2">
            <RouterLink class="nav-link underline-effect" to="/user/favorite"
              >我的最愛</RouterLink
            >
          </li>
          <li class="nav-item mx-2">
            <RouterLink
              class="nav-link underline-effect position-relative"
              to="/user/cart"
              ><i class="bi bi-cart2"></i>
              <span
                v-if="cartData.carts.length !== 0"
                class="position-absolute start-lg-100 top-lg-0 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartData.carts.length }}
                <span class="visually-hidden">unread messages</span>
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "@/libraries/emitter";
import Collapse from "bootstrap/js/dist/collapse";

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      navBarModal: {},
    };
  },
  methods: {
    getCartList() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleNav() {
      this.navBarModal.toggle();
    },
    closeNav() {
      this.navBarModal.hide();
    },
  },
  mounted() {
    this.navBarModal = new Collapse(this.$refs.myNavBarRef, {
      toggle: false,
    });
    this.getCartList();
    // 監聽點擊加入購物車，更新購物車的數字
    emitter.on("get-cart", () => {
      this.getCartList();
    });
    // 監聽關閉漢堡選單
    emitter.on("toggle-menu", () => {
      this.closeNav();
    });
  },
};
</script>
