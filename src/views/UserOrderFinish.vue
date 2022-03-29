<template>
  <div class="wrap">
    <section class="pt-5">
      <div class="container">
        <h3 class="mb-3">購物狀態</h3>

        <div class="row row-cols-1 row-cols-lg-3">
          <div class="col">
            <div class="shop-state text-center border bg-warning p-3">
              <span>1</span>
              確認購物車內容
            </div>
          </div>
          <div class="col">
            <div class="shop-state text-center border p-3">
              <span>2</span>
              填寫訂單
            </div>
          </div>
          <div class="col">
            <div class="shop-state text-center border p-3">
              <span>3</span>
              完成訂單
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-md-5">
      <div class="container py-5">
        <div class="row py-5">
          <div class="col-md-6 pb-4">
            <div class="card">
              <div class="card-header fs-4 bg-primary text-white">訂單內容</div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th>產品名稱</th>
                      <th>數量</th>
                      <th>單價</th>
                    </tr>
                  </thead>
                  <tbody class="text-nowrap">
                    <tr v-for="item in Object.values(products)" :key="item.id">
                      <td scope="row">{{ item.product.title }}</td>
                      <td width="20%">{{ item.qty }} 個</td>
                      <td width="30%">$ {{ item.product.price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div class="card-footer">
              <p class="text-end fs-4">總價: ${{ item.total }}</p>
            </div> -->
            </div>
          </div>

          <div class="col">
            <div class="card">
              <div class="card-header fs-4 bg-primary text-white">
                您的收件資訊
              </div>
              <div class="card-body">
                <table class="table">
                  <tbody class="text-nowrap">
                    <tr>
                      <td>訂單時間</td>
                      <td>
                        {{
                          new Date(order.create_at * 1000).toLocaleDateString()
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>訂單編號</td>
                      <td>{{ order.id }}</td>
                    </tr>
                    <tr>
                      <td>收件人</td>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <td>電話</td>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <td>email</td>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <td>取貨地點</td>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <td>付款方式</td>
                      <td>{{ order.user.payment }}</td>
                    </tr>
                    <tr>
                      <td>備註</td>
                      <td>good</td>
                    </tr>
                    <tr>
                      <td>付款狀態</td>
                      <td v-if="!order.is_paid">尚未付款</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="card-footer d-flex justify-content-end">
                <router-link
                  to="/user/pay"
                  class="btn btn-danger"
                  @click="payOrder(orderId)"
                  >確認付款</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
      cartData: {
        carts: [],
      },

      order: {
        user: {},
      },
      products: {},
      isLoading: false,
      orderId: "",
    };
  },

  methods: {
    //取得訂單
    getOrder(orderId) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${orderId}`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          this.order = res.data.order;
          // console.log(this.order);
          this.products = res.data.order.products;
          console.log("products", this.products);
          // console.log("values", Object.values(this.products));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 取得購物車列表資訊
    getCartList() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.cartData = res.data.data;
          emitter.emit("get-cart");
          // console.log(this.cartData);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    //付款
    payOrder(orderId) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${orderId}`;
      this.$http
        .post(url)
        .then((res) => {
          console.log(res);
          emitter.emit("get-cart");
          // console.log(this.cartData);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mounted() {
    this.getCartList();
    emitter.on("getOrderId", (data) => {
      console.log("orderId", data);
      this.orderId = data;
      this.getOrder(this.orderId);
      return this.orderId;
    });
  },
};
</script>
