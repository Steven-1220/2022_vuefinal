<template>
  <VueLoading :active="isLoading" />

  <div class="wrap">
    <header
      class="container-fluid main-header px-5 py-5 d-flex justify-content-center align-items-md-center bg-p1 position-relative"
      style="background-attachment: fixed"
    >
      <div class="text-white text-center d-flex align-items-center">
        <div class="special-bg position-relative p-4">
          <RouterLink
            to="/user/products"
            class="link-light text-decoration-none"
          >
            <h1 class="fw-bold text-md-center text-start">
              品味法式浪漫給予的甜點藝術饗宴
            </h1>
            <p class="mb-0 text-md-center text-start">
              無時無刻充滿幸福的滋味!
            </p>
          </RouterLink>
        </div>
      </div>

      <div class="search-container">
        <div class="input-group flex-nowrap">
          <input
            type="search"
            v-model="search"
            class="border border-2 border-danger px-2 fs-6 w-100"
            placeholder="巧克力、蛋糕、布丁"
            @keyup.enter="searchProduct"
          />
          <button type="button" class="btn btn-danger" @click="searchProduct">
            <span><i class="bi bi-search"></i></span>
          </button>
        </div>

        <ul
          class="list-unstyled search-suggestions"
          :class="{ active: isActive }"
        >
          <li v-for="item in filterProducts" :key="item.id">
            <RouterLink
              :to="`/user/product/${item.id}`"
              class="text-decoration-none d-block"
              >{{ item.title }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </header>

    <UserDiscount />

    <section class="py-5">
      <div class="container">
        <div class="row mb-4 g-4">
          <div class="col-md-6">
            <div class="row gx-3 h-100">
              <div class="col-6 col-md-8">
                <img
                  src="../assets/images/home03.jpg"
                  class="img-home-intro"
                  alt="首頁產品原料1"
                />
              </div>
              <div class="col-6 col-md-4">
                <div class="d-flex flex-sm-column h-100 gap-3">
                  <img
                    src="../assets/images/material01.jpeg"
                    class="img-home-intro"
                    alt="首頁產品原料2"
                  />
                  <img
                    src="../assets/images/material02.jpg"
                    class="img-home-intro d-none d-sm-block"
                    alt="首頁產品原料3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div
              class="d-flex justify-content-center align-items-center home-intro bg-primary"
            >
              <div class="pt-3 pt-sm-4 position-relative">
                <h2 class="text-light text-center fw-bold mb-0">嚴選食材</h2>
                <p class="lh-lg text-light p-2 px-sm-3">
                  嚴選高品質天然原料，
                  <br class="d-block d-md-none d-lg-block" />
                  拒絕人工香料、色素與防腐劑，
                  <br class="d-block d-md-none d-lg-block" />
                  讓甜點成為健康享受。
                </p>
                <div class="d-flex justify-content-center pb-3 pb-md-3">
                  <RouterLink
                    to="/user/material"
                    class="btn btn-warning stretched-link"
                    >認識原料 <i class="bi bi-arrow-right"></i
                  ></RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row g-4 flex-md-row-reverse">
          <div class="col-md-6">
            <div class="row gx-3 h-100">
              <div class="col-6 col-md-8">
                <img
                  src="../assets/images/home-make-intro01.jpg"
                  class="img-home-intro"
                  alt="首頁產品製作1"
                />
              </div>
              <div class="col-6 col-md-4">
                <div class="d-flex flex-sm-column h-100 gap-3">
                  <img
                    src="../assets/images/home-make-intro02.jpg"
                    class="img-home-intro"
                    alt="首頁產品製作2"
                  />
                  <img
                    src="../assets/images/home-make-intro03.jpg"
                    class="img-home-intro d-none d-sm-block"
                    alt="首頁產品製作3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div
              class="d-flex justify-content-center align-items-center home-intro bg-primary"
            >
              <div class="pt-3 pt-sm-4 position-relative">
                <h2 class="text-light text-center fw-bold mb-0">匠心手作</h2>
                <p class="lh-lg text-light p-2 px-sm-3">
                  多年累積的專業技術，<br />
                  獨特的手法與秘訣 <br />
                  打造口感豐富的精緻甜點。
                </p>
                <div class="d-flex justify-content-center pb-3 pb-md-3">
                  <RouterLink
                    to="/user/about"
                    class="btn btn-warning stretched-link"
                    >關於我們 <i class="bi bi-arrow-right"></i
                  ></RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 categories">
      <div class="container-fluid px-0">
        <h2 class="text-center text-primary mb-5 mb-lg-6">
          解鎖法式甜點的美味
        </h2>
        <div class="row g-0">
          <RouterLink
            :to="{
              name: '產品列表',
              query: {
                category: '蛋糕',
              },
            }"
            class="col-sm-6 col-lg-3 card-category text-decoration-none link-light"
            :style="{
              backgroundImage: `url(${require('@/assets/images/category-cake.jpg')})`,
            }"
          >
            <div class="card-category-content px-3 py-2">
              <h3 class="fw-bold text-center mb-md-3">蛋糕</h3>
              <p class="text-warning fw-bold">種類繁多，任君選擇</p>
            </div>
          </RouterLink>
          <RouterLink
            :to="{
              name: '產品列表',
              query: {
                category: '酥皮',
              },
            }"
            class="col-sm-6 col-lg-3 card-category text-decoration-none link-light"
            :style="{
              backgroundImage: `url(${require('@/assets/images/category-pastry.jpg')})`,
            }"
          >
            <div class="card-category-content px-3 py-2">
              <h3 class="fw-bold text-center mb-md-3">酥皮</h3>
              <p class="text-warning fw-bold">口感紮實，甜而不膩</p>
            </div>
          </RouterLink>
          <RouterLink
            :to="{
              name: '產品列表',
              query: {
                category: '布丁',
              },
            }"
            class="col-sm-6 col-lg-3 card-category text-decoration-none link-light"
            :style="{
              backgroundImage: `url(${require('@/assets/images/category-pudding.jpg')})`,
            }"
          >
            <div class="card-category-content px-3 py-2">
              <h3 class="fw-bold text-center mb-md-3">布丁</h3>
              <p class="text-warning fw-bold">Q 彈軟嫩，入口即化</p>
            </div>
          </RouterLink>
          <RouterLink
            :to="{
              name: '產品列表',
              query: {
                category: '巧克力',
              },
            }"
            class="col-sm-6 col-lg-3 card-category text-decoration-none link-light"
            :style="{
              backgroundImage: `url(${require('@/assets/images/category-chocolate.jpg')})`,
            }"
          >
            <div class="card-category-content px-3 py-2">
              <h3 class="fw-bold text-center mb-md-3">巧克力</h3>
              <p class="text-warning fw-bold">精選可可，擄獲您心</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="pt-5 pb-6">
      <div class="container position-relative px-sm-0">
        <h2 class="text-center text-primary mb-5 mb-lg-6">人氣甜點精選</h2>

        <Swiper
          :slides-per-view="1"
          :space-between="50"
          :modules="modules"
          :loop="true"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
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
          <SwiperSlide v-for="item in products" :key="item.id">
            <div class="row">
              <div class="col">
                <div
                  class="card card-hot border-0 h-100 bg-warning position-relative"
                >
                  <div class="card-body text-center">
                    <div class="tag position-absolute bg-danger text-light p-2">
                      優惠中
                    </div>
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
                    <RouterLink
                      :to="`/user/product/${item.id}`"
                      class="btn btn-outline-primary w-100 stretched-link"
                    >
                      查看產品
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
    <section
      class="bg-p2"
      style="background-size: cover; background-attachment: fixed"
    >
      <div class="container special-bg p-5">
        <h3 class="text-center text-white fs-5 fw-bold pb-3">
          訂閱取得產品訊息或優惠
        </h3>
        <div class="row justify-content-center">
          <VForm v-slot="{ errors }" class="col-md-6" @submit="subscribeInfo">
            <div class="row justify-content-center">
              <div class="w-50">
                <VField
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  rules="email"
                  :class="{ 'is-invalid': errors['email'] }"
                  v-model="email"
                  placeholder="請輸入 Email"
                />
                <ErrorMessage
                  name="email"
                  class="invalid-feedback fw-bold text-warning"
                />
              </div>
              <div class="w-25 text-nowrap">
                <button
                  type="submit"
                  class="text-center btn btn-primary link-light"
                  :disabled="Object.keys(errors).length > 0"
                >
                  訂閱
                </button>
              </div>
            </div>
          </VForm>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import UserDiscount from "@/components/UserDiscount.vue";
import emitter from "@/libraries/emitter";

export default {
  components: {
    Swiper,
    SwiperSlide,
    UserDiscount,
  },

  data() {
    return {
      products: [],
      modules: [Navigation, Pagination, Autoplay],
      isLoading: false,
      search: "",
      isActive: false,
      email: "",
    };
  },
  computed: {
    filterProducts() {
      let regWord = new RegExp(this.search, "g");
      return this.products.filter((item) => {
        return item.title.match(regWord);
      });
    },
  },

  watch: {
    search() {
      if (this.search == "") {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
  },

  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    subscribeInfo() {
      if (this.email == "") {
        this.$swal.fire({
          icon: "error",
          title: "請填入 email",
        });
        return;
      }
      this.$swal.fire({
        icon: "success",
        title: "已成功訂閱電子報",
        text: "若有最新產品或優惠我們將通知您",
      });
      this.email = "";
    },
    // 類別或是單一產品搜尋
    searchProduct() {
      if (this.search == "") {
        this.$swal.fire({
          icon: "warning",
          title: "不能輸入空的內容",
        });
        return;
      }
      const filterWord = this.products.filter((item) => {
        return (
          item.title.match(this.search) || item.category.match(this.search)
        );
      });
      if (filterWord.length == 0) {
        this.$swal.fire({
          icon: "error",
          title: "沒有相關甜點喔",
        });
        return;
      }

      filterWord.forEach((item) => {
        if (this.search == item.category) {
          this.$router.push({
            name: "產品列表",
            query: { category: this.search },
          });
        } else if (this.search == item.title) {
          this.$router.push({
            name: "個別產品",
            params: { id: item.id },
          });
        }
      });
    },
  },
  mounted() {
    this.getProducts();
    emitter.emit("toggle-menu");
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  h1 {
    font-size: 30px;
  }
  p {
    font-size: 20px;
  }
  @media (min-width: 768px) {
    h1 {
      font-size: 32px;
    }
    p {
      font-size: 24px;
    }
  }
}

.home-intro {
  p {
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 24px;
    }
  }
  a {
    @media (min-width: 768px) {
      font-size: 20px;
      width: 50%;
    }
  }
}

.img-home-intro {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}

.special-bg {
  background-color: rgba(0, 0, 0, 0.3);
}

.search-container {
  position: absolute;
  bottom: -18px;
  width: 80%;
  max-width: 350px;
}

.search-suggestions {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  background: #fff;
  display: none;
  &.active {
    display: block;
    li {
      a {
        width: 100%;
        color: #ccc;
        padding: 6px 8px;
        text-decoration: none;
        display: block;
        &:hover {
          color: #fff;
          background-color: #a02e38;
        }
      }
    }
  }
}

.card-category {
  border: 0;
  min-height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (min-width: 768px) {
    min-height: 300px;
  }
  @media (min-width: 992px) {
    min-height: 500px;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.45;
      background: #1c1c1c;
      transition: opacity 0.5s;
    }
    &:hover {
      &::after {
        opacity: 0;
      }
    }
  }
}

.card-category-content {
  @media (min-width: 768px) {
    p {
      font-size: 20px;
    }
  }
}

.card-hot {
  @media (max-width: 768px) {
    max-width: 360px;
  }
}

.bg-p1 {
  background-image: url(../assets/images/home01-2.jpg);
}

.bg-p2 {
  background-image: url(../assets/images/home06.jpg);
}

.tag {
  top: 0;
  left: 0;
  writing-mode: vertical-lr;
}
</style>
