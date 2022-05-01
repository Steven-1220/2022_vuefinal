<template>
  <VueLoading :active="isLoading" />

  <div class="wrap">
    <header
      class="container-fluid main-header px-5 py-5 d-flex justify-content-center align-items-md-center bg-p1"
      style="background-attachment: fixed"
    >
      <div class="text-white text-center d-flex align-items-center">
        <div class="special-bg position-relative p-4">
          <p class="fs-2">
            在優閒的午後<br />
            或豐盛的晚餐<br />
          </p>
          <h1 class="fw-bold">配上法式甜點</h1>
          <p class="fs-2">讓一天充滿幸福的滋味!</p>
          <RouterLink
            to="/user/products"
            class="stretched-link btn btn-primary link-light btn-lg"
            >探索甜點</RouterLink
          >
        </div>
      </div>
    </header>

    <UserDiscount />

    <section class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <div class="search">
            <div class="input-group justify-content-center fs-6 fs-sm-5">
              <input
                type="search"
                class="border border-1 w-50 p-2"
                placeholder="搜尋甜點"
                v-model="search"
                @keyup.enter="searchProduct"
              />
              <button
                type="button"
                class="btn btn-warning"
                @click="searchProduct"
              >
                <span><i class="bi bi-search"></i></span>
              </button>
            </div>

            <div
              :class="{ active: isActive }"
              class="search-list d-flex justify-content-center"
              style="max-height: 80px"
            >
              <ul class="list-unstyled flex-column w-51 overflow-auto">
                <li v-for="item in filterProducts" :key="item.id">
                  <RouterLink
                    :to="`/user/product/${item.id}`"
                    class="text-decoration-none d-block"
                    >{{ item.title }}</RouterLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-4">
      <div class="container px-sm-0">
        <div class="row mb-4 g-0">
          <div class="col-md-6">
            <img
              src="../assets/images/home03.jpg"
              class="w-100"
              alt="首頁產品特色圖片"
            />
          </div>
          <div
            class="col-md-6 d-flex justify-content-center align-items-center home-special"
          >
            <div class="pt-3 position-relative">
              <h2 class="text-primary text-center fw-bold">新鮮天然</h2>
              <p class="lh-lg fs-4 text-lg-light p-md-3">
                使用高級的食材、健康的原物料，
                <br class="d-block d-md-none d-lg-block" />
                無添加人工香料、色素、防腐劑，
                <br class="d-block d-md-none d-lg-block" />
                甜點也可以健康的吃。
              </p>
              <div class="d-flex justify-content-center pb-3 pb-md-3">
                <RouterLink
                  to="/user/material"
                  class="btn btn-primary w-50 stretched-link fs-4"
                  >認識原料</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0 flex-md-row-reverse">
          <div class="col-md-6">
            <img
              src="../assets/images/home04.jpg"
              class="w-100"
              alt="首頁產品特色圖片"
            />
          </div>
          <div
            class="col-md-6 d-flex justify-content-center align-items-center home-special"
          >
            <div class="pt-3 position-relative">
              <h2 class="text-primary text-center fw-bold">精心製作</h2>
              <p class="lh-lg fs-4 text-lg-light p-md-3">
                師傅長年累積的經驗， <br />
                獨創的手藝和訣竅， <br />
                製作出層次豐富紮實的甜點。
              </p>
              <div class="d-flex justify-content-center pb-3 pb-md-3">
                <RouterLink
                  to="/user/about"
                  class="btn btn-primary w-50 stretched-link fs-4"
                  >關於我們</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="py-5 bg-primary bg-p2"
      style="
        background-position: center center;
        background-size: cover;
        background-attachment: fixed;
      "
    >
      <div class="container px-sm-0">
        <h2 class="text-center text-primary py-3">我們的甜點種類</h2>
        <div class="row g-1">
          <div class="col-md-3">
            <div
              class="card h-100 bg-transparent category border border-2 border-primary"
            >
              <div class="card-body text-center">
                <h3 class="fw-bold">蛋糕</h3>
                <p>種類繁多，任君選擇</p>
                <button
                  type="button"
                  class="btn btn-primary w-50 stretched-link"
                  @click="lookProductCategory('蛋糕')"
                >
                  查看
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card h-100 bg-transparent category border border-2 border-primary"
            >
              <div class="card-body text-center">
                <h3 class="fw-bold">酥皮</h3>
                <p>口感紮實，甜而不膩</p>
                <button
                  type="button"
                  class="btn btn-primary w-50 stretched-link"
                  @click="lookProductCategory('酥皮')"
                >
                  查看
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card h-100 bg-transparent category border border-2 border-primary"
            >
              <div class="card-body text-center">
                <h3 class="fw-bold">布丁</h3>
                <p>Q 彈軟嫩，入口即化</p>
                <button
                  type="button"
                  class="btn btn-primary w-50 stretched-link"
                  @click="lookProductCategory('布丁')"
                >
                  查看
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card h-100 bg-transparent category border border-2 border-primary"
            >
              <div class="card-body text-center">
                <h3 class="fw-bold">巧克力</h3>
                <p>精選可可，擄獲您心</p>
                <button
                  type="button"
                  class="btn btn-primary w-50 stretched-link"
                  @click="lookProductCategory('巧克力')"
                >
                  查看
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5">
      <div class="container px-sm-0">
        <h2 class="text-center text-primary py-3">熱門甜點</h2>

        <Swiper
          :slides-per-view="1"
          :space-between="50"
          :modules="modules"
          :autoplay="{ delay: 2000 }"
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
                <div class="card border-0 h-100 bg-warning position-relative">
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
      class="bg-p3"
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
    lookProductCategory(category) {
      this.$router.push({
        name: "產品列表",
        query: { category: category },
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
.home-special {
  background-color: rgba(248, 184, 8, 0.575);
}

@media (min-width: 992px) {
  .home-special {
    transition: 0.5s;
    transform: scale(0.9);
  }
  .home-special:hover {
    transform: scale(1);
  }
  .category:hover {
    background-color: #3c3f5f !important;
    color: white;
    button {
      background-color: #ffd34c;
      color: black;
    }
  }
}

.special-bg {
  background-color: rgba(0, 0, 0, 0.3);
}

.search-list {
  margin-left: -30px;
}

.search-list li:hover {
  background: #efefef;
}

.search-list > ul {
  padding-left: 5px;
}

.search-list > ul > li {
  display: none;
}

.search-list.active > ul > li {
  display: block;
}

.w-51 {
  width: 51%;
}

.bg-p1 {
  background-image: url(../assets/images/home01.jpg);
}

.bg-p2 {
  background-image: url(../assets/images/home05.jpg);
}

.bg-p3 {
  background-image: url(../assets/images/home06.jpg);
}

.tag {
  top: 0;
  left: 0;
  writing-mode: vertical-lr;
}
</style>
