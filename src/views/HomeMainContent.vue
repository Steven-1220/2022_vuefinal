<template>
  <VueLoading :active="isLoading"></VueLoading>

  <div class="wrap">
    <header
      class="container-fluid main-header px-5 py-5 d-flex justify-content-center align-items-md-center"
      style="
        background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649560317156.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZJErPHPODvaqvpeC2aa6WdoTcFAiMYub6KeXDhGpYAkN5YUTOj4ojA5taOGytKZPTe6S20PgAqUlFo0sDyugLhK3FYL%2BXu%2Bqoxr37roFa9zxAalRJ%2BhZ6xvlh2KoWtaoir9NcwZa7DFbbCEU%2B6RvSPp2WjLtz4nEpoDXgMSDeTFXi2oezdTBkuUkhf2tX7vqa9L7e0SyTPr6V4FzrpblgyNkK4selXWZtyK899lmIKpqrZqT616Sl1dQsIw964COhh%2B0KU0S2Rqh5LRrWZv7cyAMwwDPMFOwvo7Uau2kDmGR5GQA3cPpKL8ui9FR%2BZoborJuGxmtMybBMyiu%2F6NSgw%3D%3D);
        background-attachment: fixed;
      "
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

    <UserDiscount></UserDiscount>

    <section class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6">
          <div class="search">
            <div class="input-group justify-content-center fs-6 fs-sm-5">
              <input
                type="search"
                list="flavors"
                class="border border-1 w-50 p-2"
                placeholder="搜尋甜點"
                v-model="search"
              />
              <button class="btn btn-warning">
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
      <div class="container">
        <div class="row mb-4 g-md-0">
          <div class="col-md-6">
            <img
              src="https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649560740112.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=j44L56X%2Bl56GVpquTyF9XW6F96HtfLf5WuTfkoFf5XxG%2BjodKA4wEt5umKThm%2BP1FJo%2ByZe84cUFvHfIrmvHAEV8%2BIr2m05Rhkbe5x1ffqJ6Ltnqyxaz%2FgXNBMCgVOn%2FomwtuNhHp7NLiYKlcXXVKjIyvfdQH9usKhsM4KkvFh1SnOhyy9ttZreT3iGsw5tqpCw00NwFEBpVEa5EsWUcsNJTm50sSJN8RnppIDFK6XuPCvMwgAvhks7FlR4SHFBJbBadiFkxDlp9x1uVS%2BEGcLjhhjO8%2Bx%2Fw1r6zlMPVR%2FVx7HOKqoIusVX%2FoNGzmztgTxmqFXp66XZmVfqSrTBAlg%3D%3D"
              class="w-100"
              alt="首頁產品特色圖片"
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
              src="https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649561397946.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=PaO0js1rO2L2%2BiAXEBr78%2BX2aTDLoFu7Te7Sq7IX3TFbL7DBI33ACX5b48V79jbNYEojZDeWL%2FJfIyS2CSP6itz7LGiEvNqy3VWDnSHNfWpm4ZZqzpf%2BzOSBPHpLJRJlpJXerxk7yjcgxHbJniyR7bYo%2FgPTjbRzRpdv9eoW8%2Bu9329tKkU06S8ovGw%2FLVv7KgpdeUvOVjaGHxKlFA3F%2B4oHDzl0wGm0W9TNRvsWMtXXTK%2BZHp2ECssSOlelqWuYv9nmIoMqiFDxSg7x0a9e0D%2Bqji522N4EQIUmlaR%2FcQX1Jz9l0S8bPqdE5c4q05HeZbLZ9sn2ikmJnaX9b5Vj7A%3D%3D"
              class="w-100"
              alt="首頁產品特色圖片"
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

    <section class="py-5">
      <div class="container">
        <h2 class="text-center text-primary py-3">熱門甜點</h2>

        <Swiper
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
          <SwiperSlide v-for="item in products" :key="item.id">
            <div class="row">
              <div class="col">
                <div class="card border-0 h-100 bg-warning">
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
      style="
        background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649647580466.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QKQnB3R2qf16YVsXYH4VCvK5OhVqd%2BcXX5KopdcPtOKk4exOeKWnFTn7E%2BM%2B6YVsV7w5DUrSSeqV5%2BLPWgVvChQDiFnt2vfFunr57AQoRSR%2B%2Bpn1GMs52j51%2BfdZq7z%2Fni%2F4AtPiUcN%2B2IRJWCljrTUubpnx4oxIYAZ8a%2BhgnzUljGlVugSnBFapkG2ZcnrdevA5EqViQASmuEADf9gsc5WSoO7Q6x9SFYlZ1U4%2FGSywrCVvs8p%2FYlL%2FAQoz7d%2F8nEBLG45yjpyuddG39VokFHtKQxvoK4L%2BlyVzR87LbGhe9KbqTwabcqBlxDs3oYibBBY0zMBIkXoZ6Za4cTfI%2BA%3D%3D);
        background-size: cover;
        background-attachment: fixed;
      "
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
                ></VField>
                <ErrorMessage
                  name="email"
                  class="invalid-feedback fw-bold text-warning"
                ></ErrorMessage>
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
// @ is an alias to /src
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";
// Import Swiper styles
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
  },
  mounted() {
    this.getProducts();
    emitter.emit("toggle-menu");
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

@media (max-width: 768px) {
  .home-special {
    background-color: white;
    color: #000;
    opacity: 1;
  }
}
</style>
