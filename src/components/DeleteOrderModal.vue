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
            <span>刪除訂單</span>
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
          <strong class="text-danger"></strong>
          該筆訂單(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteOrder">
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
      delOrderModal: "",
    };
  },

  props: ["deleteOrderItem"],
  methods: {
    open() {
      this.delOrderModal.show();
    },
    close() {
      this.delOrderModal.hide();
    },
    //刪除訂單
    deleteOrder() {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.deleteOrderItem.id}`,
        )
        .then(() => {
          this.$emit("get-orders");
          this.close();
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
  mounted() {
    this.delOrderModal = new Modal(this.$refs.delModal, {
      keyboard: false,
    });
  },
};
</script>
