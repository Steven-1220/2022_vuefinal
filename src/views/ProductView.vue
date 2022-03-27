<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-md-6">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none"
                >首頁</router-link
              >
            </li>
            <li class="breadcrumb-item">
              <router-link to="/user/products" class="text-decoration-none"
                >全部商品</router-link
              >
            </li>
            <li class="breadcrumb-item">{{ product.category }}</li>
          </ol>
        </nav>
        <div
          :style="{ backgroundImage: `url(${product.imageUrl})` }"
          style="
            height: 350px;
            background-size: cover;
            background-position: center;
          "
        ></div>
        <!-- <img
          :src="product.imageUrl"
          class="img-fluid"
          :alt="product.category"
          style="height: 300px width: 100%; object-fit: cover"
        /> -->
      </div>
      <div class="col-md-6">
        <div class="d-flex">
          <h2 class="fs-2 pt-2">{{ product.title }}</h2>
          <div class="btn-group btn-group">
            <button type="button" class="btn" @click="switchFavorite">
              點個愛心吧
              <span v-if="favorite.includes(this.$route.params.id)"
                ><i class="bi bi-heart-fill text-danger"></i
              ></span>
              <span v-else><i class="bi bi-heart-fill"></i></span>
            </button>
          </div>
        </div>

        <span class="badge rounded-pill bg-primary">{{
          product.category
        }}</span>
        <p class="fs-5">
          {{ product.description }}
        </p>
        <p>尺寸 : {{ product.content }}</p>
        <div class="h4" v-if="product.price === product.origin_price">
          {{ product.origin_price }} / {{ product.unit }}
        </div>
        <div v-else>
          <p class="text-decoration-line-through h5">
            原價: {{ product.origin_price }} / {{ product.unit }}
          </p>
          <p class="h4">特價: {{ product.price }} / {{ product.unit }}</p>
        </div>

        <div class="row g-sm-2">
          <div class="col-md-9">
            <input
              type="number"
              min="1"
              class="form-control"
              v-model.number="quantity"
            />
          </div>
          <div class="col-md-3">
            <button
              type="button"
              class="btn btn-primary text-nowrap"
              :disabled="loadingState === product.id"
              @click="addToCart(product.id)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="bg-warning">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="align-items-center lh-lg py-5">
            <h3 class="fs-3">食用與保存方式</h3>
            <p class="mb-4">
              所有產品皆為天然嚴選食材，為保有最佳風味，請以冷藏或是冷凍的方式保存並在以下時間內食用完畢
            </p>
            <ul class="list-unstyled">
              <li>
                <i class="bi bi-shop-window"></i>
                蛋糕類 : 冷藏保存3天，冷凍保存5天
              </li>
              <li>
                <i class="bi bi-shop-window"></i>
                酥皮類 : 冷藏保存3天，冷凍保存6天
              </li>
              <li>
                <i class="bi bi-shop-window"></i>
                巧克力類 : 冷藏保存2天，冷凍保存30天
              </li>
              <li><i class="bi bi-shop-window"></i> 布丁類 : 冷藏保存3天</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="https://images.pexels.com/photos/6479588/pexels-photo-6479588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            class="img-fluid d-none d-md-block"
            style="height: 400px object-fit: cover"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>

  <section class="py-5">
    <div class="container">
      <h3 class="fw-bold pb-3">其他推薦商品</h3>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card h-100">
            <div class="card-body text-center">
              <a href="#">
                <img
                  src="https://images.unsplash.com/photo-1616534900864-45d0da88d9bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt=""
                  class="img-fluid"
                  style="height: 280px; object-fit: cover"
                />
              </a>
              <div class="text-center text-dark mt-2">
                <a href="#" class="text-decoration-none">閃電泡芙</a>
              </div>
              <div class="d-flex align-items-center justify-content-around">
                <div
                  class="text-center text-muted text-decoration-line-through mt-2"
                >
                  原價 NT$ <span class="fs-5">70</span>
                </div>
                <div class="text-center text-dark mt-2">
                  特價 NT$ <span class="fs-5">60</span>
                </div>
              </div>
            </div>
            <div class="card-body d-flex justify-content-between">
              <a href="#" class="btn btn-outline-primary"> 查看產品 </a>

              <button type="button" class="btn btn-primary">加入購物車</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body text-center">
              <a href="#">
                <img
                  src="https://images.unsplash.com/photo-1616534900864-45d0da88d9bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt=""
                  class="img-fluid"
                  style="height: 280px"
                />
              </a>
              <div class="text-center text-dark mt-2">
                <a href="#" class="text-decoration-none">閃電泡芙</a>
              </div>
              <div class="d-flex align-items-center justify-content-around">
                <div
                  class="text-center text-muted text-decoration-line-through mt-2"
                >
                  原價 NT$ <span class="fs-5">70</span>
                </div>
                <div class="text-center text-dark mt-2">
                  特價 NT$ <span class="fs-5">60</span>
                </div>
              </div>
            </div>
            <div class="card-body d-flex justify-content-between">
              <a href="#" class="btn btn-outline-primary"> 查看產品 </a>

              <button type="button" class="btn btn-primary">加入購物車</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <div class="card-body text-center">
              <a href="#">
                <img
                  src="https://images.unsplash.com/photo-1616534900864-45d0da88d9bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt=""
                  class="img-fluid"
                  style="height: 280px"
                />
              </a>
              <div class="text-center text-dark mt-2">
                <a href="#" class="text-decoration-none">閃電泡芙</a>
              </div>
              <div class="d-flex align-items-center justify-content-around">
                <div
                  class="text-center text-muted text-decoration-line-through mt-2"
                >
                  原價 NT$ <span class="fs-5">70</span>
                </div>
                <div class="text-center text-dark mt-2">
                  特價 NT$ <span class="fs-5">60</span>
                </div>
              </div>
            </div>
            <div class="card-body d-flex justify-content-between">
              <a href="#" class="btn btn-outline-primary"> 查看產品 </a>
              <button type="button" class="btn btn-primary">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterView></FooterView>
</template>

<script>
import emitter from "@/libraries/emitter";
import FooterView from "@/components/FooterView.vue";
export default {
  components: {
    FooterView,
  },
  data() {
    return {
      product: {},
      quantity: 1,
      loadingState: "",
      favorite: JSON.parse(localStorage.getItem("favorite")) || [],
    };
  },
  methods: {
    // 取得特定產品資訊
    getProductInfo() {
      // $router -> 方法 ，$route -> 物件
      // console.log(this.$route);
      const id = this.$route.params.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.product = res.data.product;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 加入購物車
    addToCart(id) {
      const data = {
        product_id: id,
        qty: this.quantity,
      };
      this.loadingState = id;
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data },
        )
        .then((res) => {
          console.log(res);
          this.loadingState = "";
          // 觸發監聽
          emitter.emit("get-cart");
          // 加入購物車後重置數量
          setTimeout(() => {
            this.quantity = 1;
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    switchFavorite() {
      const id = this.$route.params.id;
      // console.log(id);
      const heartIndex = this.favorite.findIndex((item) => item === id);
      // console.log(heartIndex);

      // 若沒有 heartId，就新增一個，反之則移除
      if (heartIndex === -1) {
        this.favorite.push(id);
      } else {
        this.favorite.splice(heartIndex, 1);
      }
      console.log(this.favorite);
    },
  },
  // favorite  是陣列，使用深層監聽，當 favorite 有變動則寫入
  watch: {
    favorite: {
      handler() {
        localStorage.setItem("favorite", JSON.stringify(this.favorite));
      },
      deep: true,
    },
  },
  mounted() {
    this.getProductInfo();
    console.log(this.favorite);
  },
};
</script>
