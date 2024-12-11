<template>
  <VueLoading :active="isLoading" />
  <div class="wrap">
    <ProgressView step="4" />
    <section class="py-md-5">
      <div class="container py-5">
        <div class="row">
          <div
            class="d-flex align-items-center justify-content-center flex-column"
          >
            <span class="display-1 text-danger"
              ><i class="bi bi-truck"></i
            ></span>
            <h2 class="text-center mb-0 pe-2">
              完成付款，謝謝您的訂購。商品將於5日內送達(含假日)
            </h2>
          </div>
        </div>

        <div class="row justify-content-center py-5">
          <div class="col-md-6">
            <div class="text-center d-flex justify-content-center">
              <RouterLink to="/" class="btn btn-primary me-3"
                >回首頁</RouterLink
              >
              <RouterLink to="/user/products" class="btn btn-warning"
                >繼續購物</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import emitter from "@/libraries/emitter";
import ProgressView from "@/components/ProgressView.vue";

export default {
  components: {
    ProgressView,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    LoadingEffect() {
      this.isLoading = true;
      emitter.emit("toggle-menu");
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
  mounted() {
    this.LoadingEffect();
  },
};
</script>
