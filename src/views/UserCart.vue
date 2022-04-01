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

    <section class="pt-5">
      <div class="container">
        <div class="row py-5">
          <div class="col">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <div class="text-end">
                  <button
                    class="btn btn-outline-warning"
                    type="button"
                    @click="confirmDeleteAllCart"
                    :disabled="cartData.carts.length === 0"
                  >
                    清空購物車
                  </button>
                </div>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr class="align-middle">
                      <th scope="col"></th>
                      <th scope="col" class="text-wrap" style="width: 25%">
                        產品名稱
                      </th>
                      <th scope="col" style="width: 25%">數量</th>
                      <th scope="col">單位</th>
                      <th class="text-center" scope="col">價格</th>
                    </tr>
                  </thead>
                  <tbody class="text-nowrap">
                    <tr v-for="item in cartData.carts" :key="item.id">
                      <td>
                        <!-- 刪除特定購物車產品按鈕 -->
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          :disabled="loadingState === item.id"
                          @click="removeCartItem(item.id)"
                        >
                          <i class="bi bi-x-lg"></i>
                        </button>
                      </td>
                      <td scope="row">
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                          已套用優惠券
                        </div>
                      </td>

                      <td>
                        <input
                          min="1"
                          type="number"
                          class="form-control"
                          v-model.number="item.qty"
                          :disabled="loadingState === item.id"
                          @change="updateCartNumber(item)"
                        />
                      </td>
                      <td>
                        <span>{{ item.product.unit }}</span>
                      </td>
                      <td class="text-center">
                        <div v-if="item.final_total !== item.total">
                          <small class="text-success">折扣價：</small>
                          {{ item.total - item.final_total }}
                        </div>
                        <div v-else>
                          {{ item.final_total }}
                        </div>
                      </td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colspan="4" class="text-end">總計</td>
                      <td class="text-end">{{ cartData.total }}</td>
                    </tr>
                    <tr v-if="cartData.final_total !== cartData.total">
                      <td colspan="4" class="text-end">折扣後價格</td>
                      <td class="text-end text-danger">
                        {{ cartData.total - cartData.final_total }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-between pb-3">
          <div class="col-md-5">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                v-model="discountCode"
                placeholder="請輸入優惠碼 d123"
              />

              <button
                class="btn btn-outline-secondary text-primary"
                type="button"
                @click="addCoupon"
              >
                套用優惠碼
              </button>
            </div>
          </div>

          <div class="col-md-3" v-if="cartData.carts.length !== 0">
            <router-link to="/user/order" class="btn btn-lg btn-primary"
              >結帳去</router-link
            >
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
      discountCode: "",
      loadingState: "",
      isLoading: false,
    };
  },
  methods: {
    // 取得購物車列表資訊
    getCartList() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          // console.log(res);
          this.cartData = res.data.data;
          console.log(this.cartData);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    //更改購物車數量
    updateCartNumber(item) {
      // 判斷是否為 0 或是負數
      if (item.qty == 0 || item.qty < 0) {
        alert("數量至少為1個");
        this.getCartList();
        return;
      }
      // 賦予 disabled 狀態
      this.loadingState = item.id;
      const data = {
        product_id: item.id,
        qty: item.qty,
      };

      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, { data })
        .then(() => {
          // console.log(res);
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
            title: "已產品變更數量",
          });
          // 再取得購物車列表
          this.getCartList();
          this.loadingState = "";
          emitter.emit("get-cart");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    // 刪除購物車特定產品
    removeCartItem(id) {
      // 賦予 disabled 狀態
      this.loadingState = id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then(() => {
          // console.log(res);
          // 再取得購物車列表
          this.getCartList();
          this.loadingState = "";
          emitter.emit("get-cart");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    // 確認是否要刪除購物車全部產品
    confirmDeleteAllCart() {
      this.$swal
        .fire({
          title: "確定是否刪除購物車全部商品",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3C3F5F",
          cancelButtonColor: "#d33",
          confirmButtonText: "確定",
          cancelButtonText: "取消",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteAllCartItem();
            this.$swal.fire("已全部刪除購物車商品", "", "success");
          }
        });
    },

    //清空全部購物車產品
    deleteAllCartItem() {
      // this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then(() => {
          // console.log(res);
          // 再取得購物車列表
          this.getCartList();
          emitter.emit("get-cart");

          // this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    //加入優惠券
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const couponCode = {
        code: this.discountCode,
      };
      this.$http
        .post(url, { data: couponCode })
        .then(() => {
          this.getCartList();
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          alert("折扣碼失效");
        });
    },
    LoadingEffect() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },

  mounted() {
    this.getCartList();
    this.LoadingEffect();
  },
};
</script>
