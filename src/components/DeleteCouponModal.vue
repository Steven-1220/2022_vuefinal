<template>
  <div
    id="delProductModal"
    ref="delModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ deleteCouponItem.title }}</strong>
          優惠券(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteCoupon">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  data() {
    return {
      delCouponModal: {},
    };
  },
  props: ["deleteCouponItem"],
  methods: {
    open() {
      this.delCouponModal.show();
    },
    close() {
      this.delCouponModal.hide();
    },
    //刪除優惠券
    deleteCoupon() {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.deleteCouponItem.id}`,
        )
        .then((res) => {
          this.$emit("get-coupons");
          this.$httpMessageState(res, "刪除優惠券");
          this.close();
        })
        .catch((err) => {
          console.log(err.data);
          this.$httpMessageState(err.response, "刪除優惠券");
        });
    },
  },
  mounted() {
    this.delCouponModal = new Modal(this.$refs.delModal, {
      keyboard: false,
    });
  },
};
</script>
