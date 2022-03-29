<template>
  <VueLoading :active="isLoading"></VueLoading>

  <header
    class="main-header px-5 py-5 mb-5 d-flex justify-content-center align-items-md-center"
    style="
      background-image: url(https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?cs=srgb&dl=pexels-pixabay-45202.jpg&fm=jpg);
      height: 450px;
      background-attachment: fixed;
    "
  >
    <div class="text-white text-center">
      <h2 class="fs-1 fw-bold">選擇您的幸褔甜點</h2>
    </div>
  </header>

  <section class="container">
    <div class="row">
      <div class="col-md-3 pt-3">
        <div class="list-group">
          <button
            class="list-group-item list-group-item-action btn-hover-primary"
            @click="getProduct(1)"
          >
            全部
          </button>
          <button
            class="list-group-item list-group-item-action btn-hover-primary"
            @click="getProduct(1, '蛋糕')"
          >
            蛋糕
          </button>
          <button
            class="list-group-item list-group-item-action btn-hover-primary"
            @click="getProduct(1, '酥皮')"
          >
            酥皮
          </button>
          <button
            class="list-group-item list-group-item-action btn-hover-primary"
            @click="getProduct(1, '布丁')"
          >
            布丁
          </button>
          <button
            class="list-group-item list-group-item-action btn-hover-primary"
            @click="getProduct(1, '巧克力')"
          >
            巧克力
          </button>
        </div>
      </div>
      <div class="col-md-9 pb-4">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col" v-for="item in products" :key="item.id">
            <div class="card border-0 h-100 move">
              <div class="card-body text-center position-relative">
                <!-- <div
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  style="
                    height: 280px;
                    background-size: cover;
                    background-position: center;
                  "
                >
                  <router-link :to="`product/${item.id}`"></router-link>
                </div> -->
                <span
                  v-if="favorite.includes(item.id)"
                  class="position-absolute top-0 end-0"
                  ><i class="bi bi-heart-fill text-danger"></i
                ></span>
                <router-link :to="`product/${item.id}`">
                  <img
                    :src="item.imageUrl"
                    :alt="item.category"
                    class="img-fluid"
                    style="height: 280px; width: 100%; object-fit: cover"
                  />
                </router-link>

                <div class="text-center text-dark mt-2">
                  <router-link
                    :to="`product/${item.id}`"
                    class="text-decoration-none"
                    >{{ item.title }}</router-link
                  >
                </div>
                <div class="d-flex align-items-center justify-content-around">
                  <div
                    class="text-center text-muted text-decoration-line-through mt-2"
                  >
                    原價 NT$ <span class="fs-5">{{ item.origin_price }}</span>
                  </div>
                  <div class="text-center text-dark mt-2">
                    特價 NT$ <span class="fs-5">{{ item.price }}</span>
                  </div>
                </div>
              </div>
              <div class="card-body d-flex justify-content-between text-nowrap">
                <router-link
                  :to="`product/${item.id}`"
                  class="btn btn-outline-primary"
                >
                  查看產品
                </router-link>

                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addToCart(item.id)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <PaginationView
    :pages="pagination"
    @emit-get-page="getProduct"
  ></PaginationView>
  <FooterView></FooterView>
</template>

<script>
import emitter from "@/libraries/emitter";
import FooterView from "@/components/FooterView.vue";
import PaginationView from "@/components/PaginationView.vue";
export default {
  components: {
    FooterView,
    PaginationView,
  },
  data() {
    return {
      products: [],
      isLoading: false,
      pagination: {},
      favorite: JSON.parse(localStorage.getItem("favorite")) || [],
    };
  },
  methods: {
    // 取得單一產品
    getProduct(page = 1, category) {
      this.isLoading = true;

      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      if (category) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`;
      }
      this.$http
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          emitter.emit("get-cart");
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    // getProducts() {
    //   this.isLoading = true;
    //   const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
    //   this.$http
    //     .get(url)
    //     .then((res) => {
    //       console.log(res);
    //       this.products = res.data.products;
    //       emitter.emit("get-cart");
    //       this.isLoading = false;
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //     });
    // },

    // 加入購物車
    addToCart(id) {
      this.isLoading = true;
      const data = {
        product_id: id,
        qty: 1,
      };

      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          // 觸發監聽
          emitter.emit("get-cart");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.move {
  transform: translateY(0px);
  transition: 0.7s;
}

.move:hover {
  transform: translateY(-30px);
}
</style>
