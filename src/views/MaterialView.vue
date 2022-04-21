<template>
  <VueLoading :active="isLoading" />
  <div class="wrap">
    <section class="container py-5">
      <h2 class="text-center text-primary pb-4">甜點基本組成介紹</h2>
      <!-- 第1種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7">
          <div class="pic">
            <img
              src="../assets/images/material01.jpeg"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="派皮"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-7 offset-md-5 d-flex align-items-center txt-block"
        >
          <div class="text-center special-bg p-3">
            <h2>派皮</h2>
            <p>
              使用麵粉、奶油為主，質地酥脆，要講求烘烤時間的控制，我們的產品巴黎蛋塔也有使用到派皮作為基底。
            </p>
          </div>
        </div>
      </div>
      <!-- 第2種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7 offset-md-5">
          <div class="pic">
            <img
              src="../assets/images/material02.jpg"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="夾心餅乾蛋糕"
            />
          </div>
        </div>
        <div class="col-12 col-md-7 d-flex align-items-center txt-block">
          <div class="text-center special-bg p-3">
            <h2>夾心餅乾蛋糕</h2>
            <p>
              在法式甜點中使用頻率很高，常作為蛋糕類的基底或是中間的夾層，知名的歐貝拉蛋糕就有使用，是法式甜點中不可或缺的組合。
            </p>
          </div>
        </div>
      </div>
      <!-- 第3種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7">
          <div class="pic">
            <img
              src="../assets/images/material03.jpg"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="法式戚風蛋糕"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-7 offset-md-5 d-flex align-items-center txt-block"
        >
          <div class="text-center special-bg p-3">
            <h2>法式戚風蛋糕</h2>
            <p>
              蛋打發後加入麵粉、砂糖、發粉混和，常作為蛋糕的主體。亦可當做底層或夾層蛋糕使用，蓬鬆的口感是最大特色。
            </p>
          </div>
        </div>
      </div>
      <!-- 第4種 -->
      <div class="row g-4 mb-3">
        <div class="col-12 col-md-7 offset-md-5">
          <div class="pic">
            <img
              src="../assets/images/material04.jpg"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="奶黃餡"
            />
          </div>
        </div>
        <div class="col-12 col-md-7 d-flex align-items-center txt-block">
          <div class="text-center special-bg p-3">
            <h2>奶黃餡</h2>
            <p>
              最廣為人知的名稱為卡士達醬，組成原料是牛奶、糖、玉米、蛋黃，經典味道的是香草風味，千層派、
              泡芙都有使用。
            </p>
          </div>
        </div>
      </div>
      <!-- 第5種 -->
      <div class="row g-4">
        <div class="col-12 col-md-7">
          <div class="pic">
            <img
              src="../assets/images/material05.jpg"
              style="object-fit: cover; height: 300px; width: 100%"
              alt="巧克力餡"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-7 offset-md-5 d-flex align-items-center txt-block"
        >
          <div class="text-center special-bg p-3">
            <h2>巧克力餡</h2>
            <p>
              使用黑巧克力或牛奶巧克力融合液態鮮奶油混和，當作松露巧克力的主體、蛋糕類夾心，可以在
              甜點製作上使用不同的搭配。
            </p>
          </div>
        </div>
      </div>
    </section>
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

<style lang="scss" scoped>
.special-bg {
  background-color: rgba(248, 184, 8, 0.575);
}
@media (min-width: 768px) {
  .txt-block {
    margin-top: -300px;
  }
}
@media (max-width: 767px) {
  .txt-block {
    margin-top: 0px;
  }
}
</style>
