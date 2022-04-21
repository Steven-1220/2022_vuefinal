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
            <span v-if="isAllOrders">刪除所有訂單</span>
            <span v-else>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="isAllOrders" class="modal-body">
          <strong class="text-danger">是否刪除</strong>
          所有訂單(刪除後將無法恢復)。
        </div>
        <div v-else class="modal-body">
          <strong class="text-danger">是否刪除</strong>
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

          <div v-if="isAllOrders">
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteAllOrder"
            >
              刪除所有訂單
            </button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-danger" @click="deleteOrder">
              確認刪除
            </button>
          </div>
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

  // props: ["deleteOrderItem"],
  props: {
    deleteOrderItem: {},
    isAllOrders: {
      type: Boolean,
      default: false,
    },
  },
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
          console.log(err.response.data);
        });
    },
    // 刪除所有訂單
    deleteAllOrder() {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`,
        )
        .then((res) => {
          console.log(res.data);
          this.$emit("get-orders");
          this.close();
        })
        .catch((err) => {
          console.log(err.response.data);
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
