<template>
  <VueLoading :active="isLoading"></VueLoading>
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
            <div class="shop-state text-center border bg-warning p-3">
              <span>2</span>
              填寫訂單
            </div>
          </div>
          <div class="col">
            <div class="shop-state text-center border bg-warning p-3">
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
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>產品名稱</th>
                        <th>數量</th>
                        <th>單價</th>
                      </tr>
                    </thead>
                    <tbody class="text-nowrap">
                      <tr
                        v-for="item in Object.values(products)"
                        :key="item.id"
                      >
                        <td scope="row">{{ item.product.title }}</td>
                        <td width="20%">{{ item.qty }} 個</td>
                        <td width="30%">$ {{ item.product.price }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer bg-primary text-white">
                <p v-if="finalOrderPrice !== 0" class="text-end fs-4">
                  折扣後總價: ${{ finalOrderPrice }}
                </p>
                <p v-else class="text-end fs-4">總價: ${{ order.total }}</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card">
              <div class="card-header fs-4 bg-primary text-white">
                您的收件資訊
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <tbody class="text-nowrap">
                      <tr>
                        <td>訂單時間</td>
                        <td>
                          {{
                            new Date(
                              order.create_at * 1000,
                            ).toLocaleDateString()
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
                        <td>{{ order.message }}</td>
                      </tr>
                      <tr>
                        <td>付款狀態</td>
                        <td v-if="!order.is_paid">尚未付款</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card-footer d-flex justify-content-end bg-primary">
                <RouterLink
                  to="/user/pay"
                  class="btn btn-danger"
                  @click="payOrder()"
                  >確認付款</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import emitter from "@/libraries/emitter";

export default {
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
      finalOrderPrice: 0,
    };
  },

  methods: {
    //取得訂單
    getOrder(orderId) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${orderId}`;
      this.$http
        .get(url)
        .then((res) => {
          this.order = res.data.order;
          this.products = res.data.order.products;
          this.isLoading = false;

          // 若有使用優惠券總價格做以下處理
          let finalPrice = 0;
          Object.values(this.products).forEach((item) => {
            item.total - item.final_total;
            finalPrice += item.total - item.final_total;
          });

          this.finalOrderPrice = finalPrice;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    // 取得購物車列表資訊
    getCartList() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cartData = res.data.data;
          emitter.emit("get-cart");
          emitter.emit("toggle-menu");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    //付款
    payOrder() {
      const orderId = this.$route.query.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${orderId}`;
      this.$http
        .post(url)
        .then(() => {})
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  mounted() {
    this.getCartList();
    this.getOrder(this.$route.query.id);
  },
};
</script>
