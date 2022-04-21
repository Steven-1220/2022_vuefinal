<template>
  <VueLoading :active="isLoading" />
  <div class="wrap">
    <div class="container mt-5">
      <h2 class="text-center">購物須知</h2>
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <img
            src="../assets/images/notice.jpg"
            alt="購物須知"
            style="width: 50%; height: 70%; object-fit: cover"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h4>
            <span class="text-primary"><i class="bi bi-circle-fill"></i></span
            >有鑑賞期嗎?可以退貨嗎?
          </h4>
          <p class="fs-5">
            商品皆為新鮮無添加防腐劑的食品，故無7天鑑賞期。若需退貨，請先告知原因，如包裝不完整、破損，並與客服聯絡。
          </p>
        </div>
        <div class="col-12">
          <h4>
            <span class="text-primary"><i class="bi bi-circle-fill"></i></span
            >商品到貨時間
          </h4>
          <p class="fs-5">
            訂單完成並成功付款後，商品將於5日內(含假日)送到您的指定地點
          </p>
        </div>
        <div class="col-12">
          <h4>
            <span class="text-primary"><i class="bi bi-circle-fill"></i></span
            >有哪些付款方式呢?
          </h4>
          <p class="fs-5">
            我們提供信用卡付款、ATM
            轉帳、超商取貨付款，可以依據您的付款習慣做選擇。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/libraries/emitter";

export default {
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
    emitter.emit("toggle-menu");
  },
};
</script>
