<template>
  <VueLoading :active="isLoading" />
  <h2 class="text-center pt-4">優惠券</h2>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('new')">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ new Date(item.due_date * 1000).toLocaleDateString() }}</td>
          <td>
            <span v-if="item.is_enabled">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal
    :coupon="tempCoupon"
    :is-new="isNew"
    @update-coupon="updateCoupon"
    ref="couponModalRef"
  />
  <DeleteCouponModal
    :delete-coupon-item="tempCoupon"
    @get-coupons="getCoupon"
    ref="delCouponModalRef"
  />
</template>

<script>
import CouponModal from "@/components/CouponModal.vue";
import DeleteCouponModal from "@/components/DeleteCouponModal.vue";

export default {
  components: {
    CouponModal,
    DeleteCouponModal,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 50,
        code: "",
      },
      isNew: false,
      isLoading: false,
    };
  },
  methods: {
    getCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http
        .get(url, this.tempProduct)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },

    openModal(state, item) {
      console.log(state, item);
      if (state == "new") {
        // due_date 須為 10 碼
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };

        this.$refs.couponModalRef.open();
        this.isNew = true;
      } else if (state == "edit") {
        // 使用深拷貝
        this.tempCoupon = JSON.parse(JSON.stringify(item));
        this.$refs.couponModalRef.open();
        this.isNew = false;
      } else if (state == "delete") {
        this.tempCoupon = JSON.parse(JSON.stringify(item));
        this.$refs.delCouponModalRef.open();
      }
    },

    //新增 coupon 或修改 coupon
    updateCoupon() {
      // 新增
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let methods = "post";
      let state = "新增優惠券";
      //根據 isNew 來判斷要串接 post 或是 put API，當 isNew 是  false 才進入編輯
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        methods = "put";
        state = "更新優惠券";
      }
      this.$http[methods](url, { data: this.tempCoupon })
        .then((res) => {
          this.getCoupon();
          this.$httpMessageState(res, state);
          this.$refs.couponModalRef.close();
        })
        .catch((err) => {
          console.log(err.response);
          this.$httpMessageState(err.response, state);
        });
    },
  },
  mounted() {
    this.getCoupon();
  },
};
</script>
