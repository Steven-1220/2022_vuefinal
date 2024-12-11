<template>
  <section class="pt-5">
    <div class="container">
      <h3 class="mb-3 text-primary fs-3">購物流程</h3>
      <div class="d-block d-sm-none">
        <div class="row row-cols-1 row-cols-lg-3">
          <div class="col">
            <div class="step-mobile">
              <p
                class="text-center border border-primary p-3 clear-overlap"
                :class="{
                  'bg-warning': Number(step) >= 1,
                  completed: Number(step) >= 1,
                }"
              >
                <span>1</span>
                確認購買內容 <i class="bi bi-cart-check fs-5 ms-2"></i>
              </p>
            </div>
          </div>
          <div class="col">
            <div class="step-mobile">
              <p
                class="text-center border border-primary p-3 clear-overlap"
                :class="{
                  'bg-warning': Number(step) >= 2,
                  completed: Number(step) >= 2,
                }"
              >
                <span>2</span>
                填寫訂單資料 <i class="bi bi-pencil-square fs-5 ms-2"></i>
              </p>
            </div>
          </div>
          <div class="col">
            <div class="step-mobile">
              <p
                class="step-mobile text-center border border-primary p-3 clear-overlap"
                :class="{
                  'bg-warning': Number(step) >= 3,
                  completed: Number(step) >= 3,
                }"
              >
                <span>3</span>
                確認付款資訊 <i class="bi bi-file-text fs-5 ms-2"></i>
              </p>
            </div>
          </div>
          <div class="col">
            <div class="step-mobile">
              <p
                class="step-mobile text-center border border-primary p-3"
                :class="{
                  'bg-warning': Number(step) >= 4,
                  completed: Number(step) >= 4,
                }"
              >
                <span>3</span>
                訂單付款完成 <i class="bi bi-credit-card fs-5 ms-2"></i>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="d-none d-sm-block">
        <div class="row">
          <div class="col-12">
            <div class="progress-bar-container">
              <div class="step" :class="{ completed: Number(step) >= 1 }">
                <div class="icon">
                  <i class="bi bi-cart-check"></i>
                </div>
                <p>1. 確認購買內容</p>
              </div>
              <div class="line" :class="{ completed: Number(step) >= 2 }"></div>

              <div class="step" :class="{ completed: Number(step) >= 2 }">
                <div class="icon">
                  <i class="bi bi-pencil-square"></i>
                </div>
                <p>2. 填寫訂單資料</p>
              </div>

              <div class="line" :class="{ completed: Number(step) >= 3 }"></div>

              <div class="step" :class="{ completed: Number(step) >= 3 }">
                <div class="icon">
                  <i class="bi bi-file-text"></i>
                </div>
                <p>3. 確認付款資訊</p>
              </div>

              <div class="line" :class="{ completed: Number(step) >= 4 }"></div>

              <div class="step" :class="{ completed: Number(step) >= 4 }">
                <div class="icon">
                  <i class="bi bi-credit-card"></i>
                </div>
                <p>4. 訂單付款完成</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    step: String,
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 992px) {
  .clear-overlap {
    margin-bottom: -1px;
  }
}

.progress-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 20px 0;
  .line {
    height: 5px;
    background-color: #e9ecef;
    flex: 1;
    transform: translateY(-20px);
    margin: 0 -32px;
    @media (min-width: 992px) {
      margin: 0 -24px;
    }
    &.completed {
      background-color: #ffd34c;
    }
  }
}

.step {
  .icon {
    width: 50px;
    height: 50px;
    @media (min-width: 992px) {
      width: 70px;
      height: 70px;
    }
    margin: 0 auto 10px;
    background-color: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #6c757d;
    z-index: 1;
  }
  &.completed {
    .icon {
      background-color: #ffd34c;
      color: #1c2049;
    }
    p {
      color: #a02e38;
      font-weight: bold;
    }
  }
}

.step-mobile {
  .completed {
    color: #a02e38;
    font-weight: bold;
  }
}
</style>
