<template>
  <VueLoading :active="isLoading"></VueLoading>
  <Navbar></Navbar>
  <div class="wrap">
    <header
      class="container-fluid main-header px-5 py-5 d-flex justify-content-center align-items-md-center"
      style="
        background-image: url(https://images.unsplash.com/photo-1587306433556-18d035a3ed97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
        background-attachment: fixed;
      "
    >
      <div class="text-white text-center d-flex align-items-center">
        <div class="special-bg p-4">
          <p class="fs-2">
            在優閒的午後<br />
            或豐盛的晚餐<br />
          </p>
          <h1 class="fw-bold">配上法式甜點</h1>
          <p class="fs-2">讓一天充滿幸福的滋味!</p>
        </div>
      </div>
    </header>

    <section class="py-4">
      <div class="container">
        <div class="row mb-4 g-md-0">
          <div class="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1604514813549-92e26bbae4f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              class="w-100"
              alt=""
            />
          </div>
          <div
            class="col-md-6 d-flex justify-content-center align-items-center home-special"
          >
            <div class="pt-3">
              <h2 class="text-warning text-center">新鮮天然</h2>
              <p class="lh-lg fs-4 text-lg-light">
                使用高級的食材、健康的原物料 <br />
                無添加人工香料、色素、防腐劑 <br />
                甜點也可以健康的吃
              </p>
            </div>
          </div>
        </div>
        <div class="row g-md-0 flex-md-row-reverse">
          <div class="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1519733870-f96bef9bc85f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
              class="w-100"
              alt=""
            />
          </div>
          <div
            class="col-md-6 d-flex justify-content-center align-items-center home-special"
          >
            <div class="pt-3">
              <h2 class="text-warning text-center">精心製作</h2>
              <p class="lh-lg fs-4 text-lg-light">
                師傅長年累積的經驗 <br />
                獨創的手藝和訣竅 <br />
                製作出層次豐富紮實的甜點
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-warning">
      <div class="container">
        <h2 class="text-center text-primary py-3">熱門甜點</h2>

        <swiper
          :slides-per-view="1"
          :space-between="50"
          :autoplay="{ delay: 2000 }"
          :modules="modules"
          navigation
          :pagination="{ clickable: true }"
          :breakpoints="{
            '576': {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '1024': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }"
        >
          <swiper-slide v-for="item in products" :key="item.id">
            <div class="row">
              <div class="col">
                <div class="card border-0 h-100">
                  <div class="card-body text-center">
                    <img
                      :src="item.imageUrl"
                      :alt="item.category"
                      class="img-fluid"
                      style="height: 280px; object-fit: cover"
                    />
                    <div class="text-center text-dark mt-2">
                      {{ item.title }}
                    </div>
                    <div class="text-center text-dark mt-2">
                      NT$ <span class="fs-3">{{ item.price }}</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <router-link
                      :to="`/user/product/${item.id}`"
                      class="btn btn-outline-primary w-100 stretched-link"
                    >
                      查看產品
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </div>
  <FooterView></FooterView>
</template>

<script>
// @ is an alias to /src
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Navbar from "@/components/NavBar.vue";
import FooterView from "@/components/FooterView.vue";
export default {
  components: {
    Navbar,
    FooterView,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      products: [],
      modules: [Navigation, Pagination, Autoplay],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.home-special {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  transition: 0.5s;
  transform: scale(0.9);
}

.home-special:hover {
  opacity: 1;
  transform: scale(1);
}

.special-bg {
  background-color: rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .home-special {
    background-color: white;
    color: #000;
    opacity: 1;
  }
}
</style>
