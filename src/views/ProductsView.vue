<template>
  <VueLoading :active="isLoading"></VueLoading>

  <header
    class="container-fluid main-header px-5 py-5 mb-5 d-flex justify-content-center align-items-md-center"
    style="
      background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649561649225.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Qh4NFJmtFKwbUAdgHldCXqtgsW4YrO0eoGEaK%2FVNVzHT6ghQZecDUmHQ2ek5%2FdnRL2JZlHG6zBujkxC4WB1hCh8hv4JoeHXmBP0ySk%2FsdVAth2Zl83Ry7iLM25CosbJQ7IuJH96eLLq4MBgWttfgkJTwieoZdEAgk%2B48Kv4%2B816yl0XxLUUiwv7%2FGebKRuN8%2Fj8t3I5EWDrHZXrpqeYe5yw0uRh8M%2FLVTp%2FMXtMgZNjVbWnh3O0Wfvv6PV2KcDxpHNCisk2gvZmOIphKvcc%2B%2BsCYBj0U9SQ3ztbPZznGw0e89rDosCsiSndV%2B7%2Bz64qbzaHxQX7pZPeafgOI9%2B6MNA%3D%3D);
      height: 400px;
      background-attachment: fixed;
    "
  >
    <div
      class="text-white text-center special-bg p-4 d-flex flex-column justify-content-center text-wrap"
    >
      <h2 class="fs-2 fs-sm-1 fw-bold">選擇您的幸褔甜點</h2>
      <p class="fs-4 fs-sm-3">
        每一種甜點都值得品嘗 <br />觸動您的味蕾 <br />感受到法式幸福的滋味
      </p>
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
                <span
                  v-if="favorite.includes(item.id)"
                  class="position-absolute heart"
                  ><i class="bi bi-heart-fill text-danger"></i
                ></span>
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
                  <div class="text-center text-dark mt-2">
                    特價 NT$ <span class="fs-5">{{ item.price }}</span>
                  </div>
                </div>
              </div>
              <div class="card-body d-flex justify-content-between text-nowrap">
                <RouterLink
                  :to="`product/${item.id}`"
                  class="btn btn-outline-primary"
                >
                  查看產品
                </RouterLink>

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

    // 加入購物車
    addToCart(id) {
      const data = {
        product_id: id,
        qty: 1,
      };

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

          // 觸發監聽
          emitter.emit("get-cart");
        })
        .catch((err) => {
          console.log(err.response.data);
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
  transition: 0.8s;
}

.move:hover {
  transform: translateY(-20px);
}

.special-bg {
  background-color: rgba(0, 0, 0, 0.3);
}

.heart {
  right: 20px;
  top: 20px;
}
</style>
