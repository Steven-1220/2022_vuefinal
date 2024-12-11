<template>
  <VueLoading :active="isLoading" />
  <div class="container-md py-5">
    <h2 class="text-center mb-3 mb-md-4">
      我的最愛甜點<i class="bi bi-heart-fill text-danger"></i>
    </h2>
    <div class="row justify-content-center mb-4 mb-md-5">
      <div class="col-10 d-flex justify-content-center">
        <img
          src="../assets/images/favorite.jpg"
          class="fav-img"
          alt="我的最愛"
        />
      </div>
    </div>

    <template v-if="favorite.length !== 0">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item d-flex justify-content-between align-items-center overflow-auto"
              v-for="item in favProducts"
              :key="item.id"
            >
              <RouterLink
                class="d-flex text-decoration-none"
                :to="`product/${item.id}`"
              >
                <img :src="item.imageUrl" :alt="item.category" />
                <div
                  class="product-infos d-flex flex-md-row flex-column align-items-md-center ms-3 ms-lg-5"
                >
                  <h2 class="name mb-0 fw-bold">{{ item.title }}</h2>
                  <div
                    class="price d-flex flex-md-row flex-column align-items-md-center ms-md-4"
                  >
                    <div
                      class="text-muted text-decoration-line-through fs-6 me-lg-3 me-2"
                    >
                      原價 NT$ <span class="fs-6">{{ item.origin_price }}</span>
                    </div>
                    <div class="text-danger fw-bold fs-6">
                      特價 NT$ <span class="fs-5">{{ item.price }}</span>
                    </div>
                  </div>
                </div>
              </RouterLink>
              <div class="d-flex">
                <button
                  type="button"
                  class="btn btn-primary text-nowrap"
                  :disabled="loadingState"
                  @click="addToCart(item.id)"
                >
                  加入購物車
                </button>
                <button
                  type="button"
                  class="btn btn-danger ms-2 ms-lg-3"
                  @click="delMyFavorite(item.id)"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </li>
          </ul>
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
.list-group-item {
  &:hover {
    background-color: #ffd34c;
  }
  img {
    max-width: 50px;
    max-height: 50px;
    object-fit: cover;
  }
  button {
    font-size: 14px;
    padding: 4px 6px;
  }
  @media (min-width: 768px) {
    img {
      max-width: 90px;
      max-height: 90px;
    }
    button {
      font-size: 16px;
      padding: 6px 12px;
    }
  }
  @media (min-width: 992px) {
    img {
      max-width: 120px;
      max-height: 120px;
    }
  }
}

.product-infos {
  .name {
    font-size: 16px;
  }
  @media (min-width: 992px) {
    .name {
      font-size: 20px;
    }
  }
}

.fav-img {
  width: 70%;
  @media (min-width: 768px) {
    width: 40%;
  }

  @media (min-width: 992px) {
    width: 30%;
  }
}
</style>
