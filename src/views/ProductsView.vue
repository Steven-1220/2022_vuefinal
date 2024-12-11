<template>
  <VueLoading :active="isLoading" />

  <header
    class="container-fluid main-header px-5 py-5 mb-5 d-flex justify-content-center align-items-md-center bg-header"
  >
    <div
      class="text-white text-center special-bg p-4 d-flex flex-column justify-content-center text-wrap"
    >
      <h2 class="fw-bold text-warning mb-3">選擇您的幸褔甜點</h2>
      <p class="mb-0">
        每道甜點都是經典 <br />觸動您的味蕾 <br />傳遞法式幸福的氣息
      </p>
    </div>
  </header>

  <section class="container">
    <div class="row">
      <div class="col-md-3 pt-3 mb-5 mb-md-0 text-center">
        <h4 class="fs-4 bg-warning text-dark py-3 mb-0">甜點種類</h4>
        <div class="list-group">
          <button
            type="button"
            class="list-group-item btn-hover-primary"
            :class="{ active: categoryName === '全部' }"
            @click="
              getProduct(1);
              changeCategoryStatus('全部');
            "
          >
            全部
          </button>
          <button
            type="button"
            class="list-group-item btn-hover-primary"
            :class="{ active: categoryName === '蛋糕' }"
            @click="
              getProduct(1, '蛋糕');
              changeCategoryStatus('蛋糕');
            "
          >
            蛋糕
          </button>
          <button
            type="button"
            class="list-group-item btn-hover-primary"
            :class="{ active: categoryName === '酥皮' }"
            @click="
              getProduct(1, '酥皮');
              changeCategoryStatus('酥皮');
            "
          >
            酥皮
          </button>
          <button
            type="button"
            class="list-group-item btn-hover-primary"
            :class="{ active: categoryName === '布丁' }"
            @click="
              getProduct(1, '布丁');
              changeCategoryStatus('布丁');
            "
          >
            布丁
          </button>
          <button
            type="button"
            class="list-group-item btn-hover-primary"
            :class="{ active: categoryName === '巧克力' }"
            @click="
              getProduct(1, '巧克力');
              changeCategoryStatus('巧克力');
            "
          >
            巧克力
          </button>
        </div>
      </div>
      <div class="col-md-9 pb-4">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          <div
            class="col d-flex justify-content-center"
            v-for="item in products"
            :key="item.id"
          >
            <div class="card card-product border-0 h-100 move">
              <div class="card-body text-center position-relative px-0">
                <RouterLink :to="`product/${item.id}`">
                  <img
                    :src="item.imageUrl"
                    :alt="item.category"
                    class="img-fluid"
                    style="height: 280px; width: 100%; object-fit: cover"
                  />
                </RouterLink>

                <div class="text-center text-dark mt-2">
                  <RouterLink
                    :to="`product/${item.id}`"
                    class="text-decoration-none stretched-link"
                    >{{ item.title }}</RouterLink
                  >
                </div>
                <div class="d-flex align-items-center justify-content-around">
                  <div
                    class="text-center text-muted text-decoration-line-through mt-2"
                  >
                    原價 NT$ <span class="fs-5">{{ item.origin_price }}</span>
                  </div>
                  <div class="text-center text-danger mt-2">
                    特價 NT$
                    <span class="fs-5 fw-bold">{{ item.price }}</span>
                  </div>
                </div>
              </div>
              <div
                class="card-body d-flex justify-content-between text-wrap text-sm-nowrap px-0"
              >
                <RouterLink
                  :to="`product/${item.id}`"
                  class="btn btn-outline-primary"
                >
                  查看產品
                </RouterLink>

                <button
                  type="button"
                  class="btn btn-primary"
                  :disabled="loadingState"
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

  <PaginationView :pages="pagination" @emit-get-page="getProduct" />
</template>

<script>
import emitter from "@/libraries/emitter";
import PaginationView from "@/components/PaginationView.vue";

export default {
  components: {
    PaginationView,
  },
  data() {
    return {
      products: [],
      isLoading: false,
      loadingState: false,
      categoryName: "",
      pagination: {},
      favorite: JSON.parse(localStorage.getItem("favorite")) || [],
    };
  },
  methods: {
    getProduct(page = 1, category) {
      this.isLoading = true;

      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}`;
      if (category) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`;
      }
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          emitter.emit("get-cart");
          emitter.emit("toggle-menu");
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    changeCategoryStatus(category) {
      this.categoryName = category;
    },
    addToCart(id) {
      const data = {
        product_id: id,
        qty: 1,
      };
      this.loadingState = true;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then(() => {
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "成功加入購物車",
          });

          emitter.emit("get-cart");
          this.loadingState = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mounted() {
    if (this.$route.query.category) {
      this.getProduct(1, this.$route.query.category);
      this.changeCategoryStatus(this.$route.query.category);
    } else {
      this.getProduct();
      this.changeCategoryStatus("全部");
    }
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  height: 300px;
  h2 {
    font-size: 24px;
  }

  @media (min-width: 768px) {
    height: 400px;
    h2 {
      font-size: 32px;
    }
    p {
      font-size: 20px;
    }
  }
}

.special-bg {
  background-color: rgba(0, 0, 0, 0.4);
}

.bg-header {
  background-image: url(../assets/images/products-2.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.card-product {
  max-width: 360px;
}

@media (min-width: 1024px) {
  .move {
    transform: translateY(0px);
    transition: 0.8s;
  }

  .move:hover {
    transform: translateY(-20px);
  }
  .btn-hover-primary:hover {
    color: white;
    background-color: #1c2049;
  }
}
</style>
