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
            <span>刪除產品</span>
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
          <strong class="text-danger">{{ delProductItem.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">
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
      delProductModal: "",
    };
  },
  props: ["delProductItem"],
  methods: {
    open() {
      this.delProductModal.show();
    },
    close() {
      this.delProductModal.hide();
    },
    deleteProduct() {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.delProductItem.id}`,
        )
        .then((res) => {
          this.$emit("get-products");
          this.$httpMessageState(res, "刪除產品");
          this.close();
        })
        .catch((err) => {
          console.log(err.response);
          this.$httpMessageState(err.response, "刪除產品");
        });
    },
  },
  mounted() {
    this.delProductModal = new Modal(this.$refs.delModal, {
      keyboard: false,
    });
  },
};
</script>
