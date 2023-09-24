<template>
  <nav id="nav-top" class="navbar navbar-expand-lg sticky-top bg-body py-4">
    <div class="container px-sm-0">
      <RouterLink
        class="navbar-brand fs-2 me-0 pt-0"
        style="white-space: normal"
        to="/"
      >
        <i class="bi bi-balloon-heart-fill"></i> SweetHome
        <br class="d-block d-sm-none d-lg-block d-xl-none" />
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
        <span
          v-for="item in 3"
          :key="item"
          class="hamburger-line"
          ref="hamburgerLine"
        ></span>
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
      box: [],
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
      this.switchHamburger();
    },
    closeNav() {
      this.navBarModal.hide();
    },
    switchHamburger() {
      this.$refs.hamburgerLine.forEach((item) => {
        item.classList.toggle("active");
      });
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

<style lang="scss">
// 漢堡選單按鈕
.navbar-toggler {
  width: 40px;
  height: 40px;
  position: relative;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transition: transform 0.5s ease;
}

.hamburger-line:nth-child(1) {
  transform-origin: 50% 50%;
  transform: translate(-50%, -8px);
}
.hamburger-line:nth-child(2) {
  transform: translateX(-50%);
}
.hamburger-line:nth-child(3) {
  transform-origin: 50% 50%;
  transform: translate(-50%, 8px);
}

.hamburger-line:nth-child(1).active {
  transform: translate(-50%, 0px) rotate(45deg);
}
.hamburger-line:nth-child(2).active {
  opacity: 0;
}
.hamburger-line:nth-child(3).active {
  transform: translate(-50%, 0px) rotate(-45deg);
}
</style>
