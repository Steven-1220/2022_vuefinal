<template>
  <nav id="nav-top" class="navbar navbar-expand-lg pt-4">
    <div class="container-md">
      <router-link class="navbar-brand fs-2" to="/">
        <i class="bi bi-balloon-heart-fill"></i> SweetHome 經典法式甜點
      </router-link>
      <button
        class="navbar-toggler bg-primary text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"><i class="bi bi-list fs-2"></i></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto fs-5">
          <li class="nav-item mx-2">
            <router-link
              class="nav-link active underline-effect"
              aria-current="page"
              to="/user/about"
              >關於我們</router-link
            >
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link underline-effect" to="/user/products"
              >相關產品</router-link
            >
          </li>
          <li class="nav-item mx-2">
            <router-link class="nav-link underline-effect" to="/user/notice"
              >購物須知</router-link
            >
          </li>
          <li class="nav-item mx-2">
            <router-link
              class="nav-link underline-effect position-relative"
              to="/user/cart"
              ><i class="bi bi-cart2"></i>
              <span
                class="position-absolute start-lg-100 top-lg-0 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartData.carts.length }}
                <span class="visually-hidden">unread messages</span>
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from "@/libraries/emitter";
export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },
  methods: {
    // 取得購物車資訊
    getCartList() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log("getCart", res);
          this.cartData = res.data.data;
          console.log(this.cartData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCartList();
    // 監聽點擊加入購物車，更新購物車的數字
    emitter.on("get-cart", () => {
      this.getCartList();
    });
  },
};
</script>
