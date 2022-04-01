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
        <div class="row">
          <div
            class="d-flex align-items-center justify-content-center flex-column"
          >
            <span class="display-1"><i class="bi bi-truck"></i></span>
            <h2 class="text-center mb-0 pe-2">
              完成付款，謝謝您的訂購。商品將於5日內送達(含假日)
            </h2>
          </div>
        </div>

        <div class="row justify-content-center py-5">
          <div class="col-md-6">
            <div class="text-center d-flex justify-content-center">
              <router-link to="/" class="btn btn-primary me-3"
                >回首頁</router-link
              >
              <router-link to="/user/products" class="btn btn-warning"
                >繼續購物</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterView></FooterView>
</template>

<script>
import FooterView from "@/components/FooterView.vue";
export default {
  components: {
    FooterView,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    LoadingEffect() {
      this.isLoading = true;
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
