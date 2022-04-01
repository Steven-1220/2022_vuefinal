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
            <div class="shop-state text-center border bg-warning p-3">
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

    <!-- 訂單資訊 -->

    <section class="py-md-5">
      <VueLoading :active="isLoading"></VueLoading>
      <div class="container py-5">
        <div class="row">
          <div class="col-md-6 pb-3">
            <div class="card">
              <div class="card-header fs-4 bg-primary text-white">訂單內容</div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>產品名稱</th>
                        <th>數量</th>
                        <th>價格</th>
                      </tr>
                    </thead>
                    <tbody class="text-nowrap">
                      <tr v-for="item in cartData.carts" :key="item.id">
                        <td scope="row">{{ item.product.title }}</td>
                        <td width="20%">
                          {{ item.qty }}
                        </td>
                        <td width="30%">
                          $ {{ item.product.price }}/ {{ item.product.unit }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer bg-primary text-white">
                <p class="text-end">總價 : ${{ cartData.total }}</p>
                <div v-if="cartData.total !== cartData.final_total">
                  <p class="text-end fs-4">
                    折扣後總價 : ${{ cartData.total - cartData.final_total }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="row justify-content-center g-4">
              <div class="col-md-10 pb-5">
                <VForm
                  ref="form"
                  class="col-md-6 w-100"
                  v-slot="{ errors }"
                  @submit="sendOrder"
                >
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <VField
                      id="email"
                      name="email"
                      type="email"
                      class="form-control"
                      rules="email|required"
                      :class="{ 'is-invalid': errors['email'] }"
                      placeholder="請輸入 Email"
                      v-model="form.user.email"
                    ></VField>
                    <ErrorMessage
                      name="email"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>

                  <div class="mb-3">
                    <label for="name" class="form-label">收件人姓名</label>
                    <VField
                      id="name"
                      name="姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名"
                      rules="required"
                      v-model="form.user.name"
                    ></VField>
                    <ErrorMessage
                      name="姓名"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>

                  <div class="mb-3">
                    <label for="tel" class="form-label">收件人電話</label>
                    <VField
                      id="tel"
                      name="電話"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['電話'] }"
                      placeholder="請輸入電話"
                      :rules="isPhone"
                      v-model="form.user.tel"
                    ></VField>
                    <ErrorMessage
                      name="電話"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>

                  <div class="mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <VField
                      id="address"
                      name="地址"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['地址'] }"
                      placeholder="請輸入地址"
                      rules="required"
                      v-model="form.user.address"
                    ></VField>
                    <ErrorMessage
                      name="地址"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>

                  <div class="mb-3">
                    <label for="payment" class="form-label">付款方式</label>
                    <VField
                      class="form-select mb-3"
                      id="payment"
                      name="付款方式"
                      rules="required"
                      as="select"
                      :class="{ 'is-invalid': errors['付款方式'] }"
                      v-model="form.user.payment"
                    >
                      <option value="">請選擇付款方式</option>
                      <option value="信用卡付款">信用卡付款</option>
                      <option value="ATM 轉帳">ATM 轉帳</option>
                      <option value="超商取貨付款">超商取貨付款</option>
                    </VField>
                    <ErrorMessage
                      name="付款方式"
                      class="invalid-feedback"
                    ></ErrorMessage>
                  </div>

                  <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea
                      id="message"
                      class="form-control"
                      cols="30"
                      rows="10"
                      v-model="form.message"
                    ></textarea>
                  </div>
                  <div class="text-end">
                    <!-- 驗證沒過時無法 click -->
                    <button
                      type="submit"
                      class="btn btn-danger"
                      :disabled="Object.keys(errors).length > 0"
                    >
                      送出訂單
                    </button>
                  </div>
                </VForm>
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
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
          payment: "",
        },
        message: "",
      },
      isLoading: false,
      orderId: "",
    };
  },

  methods: {
    //送出訂單
    sendOrder() {
      const order = this.form;
      // console.log(order);
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, { data: order })
        .then((res) => {
          this.orderId = res.data.orderId;
          // console.log(this.orderId);
          // this.$refs.form.resetForm();
          this.form.message = "";
          this.$router.push({ name: "完成訂單", query: { id: this.orderId } });
          emitter.emit("get-cart");
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
          // console.log(res);
          this.cartData = res.data.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    // 電話驗證
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "請輸入正確的電話號碼";
    },
    LoadingEffect() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
  mounted() {
    this.LoadingEffect();
    this.getCartList();
  },
};
</script>
