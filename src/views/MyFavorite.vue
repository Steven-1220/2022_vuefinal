<template>
  <VueLoading :active="isLoading" />
  <div class="container py-5">
    <h2 class="text-center">
      我的最愛甜點<i class="bi bi-heart-fill text-danger"></i>
    </h2>
    <div class="row">
      <div class="col-12 d-flex justify-content-center align-items-center">
        <img
          src="../assets/images/favorite.jpg"
          class="fav-img"
          alt="我的最愛"
          style="height: 70%; object-fit: cover"
        />
      </div>
    </div>
    <template v-if="favorite.length !== 0">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        <div class="col" v-for="item in favProducts" :key="item.id">
          <div class="card h-100 position-relative">
            <div class="card-body text-center">
              <RouterLink :to="`product/${item.id}`" class="d-block">
                <img
                  :src="item.imageUrl"
                  :alt="item.category"
                  class="img-fluid"
                  style="height: 280px; object-fit: cover"
                />
              </RouterLink>
              <div class="text-center text-dark mt-2">
                <RouterLink
                  :to="`product/${item.id}`"
                  class="text-decoration-none d-block"
                  >{{ item.title }}</RouterLink
                >
              </div>
              <div class="d-flex align-items-center justify-content-around">
                <div
                  class="text-center text-muted text-decoration-line-through mt-2"
                >
                  原價 NT$ <span class="fs-5">{{ item.origin_price }}</span>
                </div>
                <div class="text-center text-danger fw-bold mt-2">
                  特價 NT$ <span class="fs-5">{{ item.price }}</span>
                </div>
              </div>
            </div>
            <div class="card-body d-flex justify-content-between">
              <RouterLink
                :to="`product/${item.id}`"
                class="btn btn-outline-primary d-block"
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
              <button
                type="button"
                class="btn btn-danger btn-sm position-absolute del-btn"
                @click="delMyFavorite(item.id)"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="row" v-else>
      <div
        class="col-12 d-flex justify-content-center align-items-center flex-column"
      >
        <p class="fs-4">目前沒有加入最愛的甜點</p>
        <RouterLink to="/user/products" class="btn btn-lg btn-warning"
          >購物去</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/libraries/emitter";

export default {
  data() {
    return {
      products: [],
      favProducts: [],
      favorite: JSON.parse(localStorage.getItem("favorite")) || [],
      loadingState: false,
      isLoading: false,
    };
  },

  watch: {
    favorite: {
      handler() {
        localStorage.setItem("favorite", JSON.stringify(this.favorite));
      },
      deep: true,
    },
  },
  methods: {
    getAllProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.filterMyFav();
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    filterMyFav() {
      this.favProducts = this.products.filter(
        (item) => this.favorite.indexOf(item.id) !== -1,
      );
    },
    delMyFavorite(id) {
      const delHeartIndex = this.favorite.findIndex((item) => item === id);
      const delFavProduct = this.favProducts.filter((item) => {
        return item.id === id;
      });

      this.favorite.splice(delHeartIndex, 1);
      this.getAllProducts();
      setTimeout(() => {
        this.$swal.fire({
          title: `<i class="text-danger bi bi-heartbreak-fill"></i> 已刪除 ${delFavProduct[0].title} `,
          confirmButtonColor: "#3C3F5F",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }, 500);
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
    this.getAllProducts();
    emitter.emit("toggle-menu");
  },
};
</script>

<style lang="scss" scoped>
.del-btn {
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
}
@media (min-width: 768px) {
  .fav-img {
    width: 40%;
  }
}
@media (max-width: 767px) {
  .fav-img {
    width: 80%;
  }
}
</style>
