<template>
  <section class="pt-5">
    <div class="container">
      <h3 class="mb-3 text-primary fs-3">購物流程</h3>
      <div class="row row-cols-1 row-cols-lg-3">
        <div class="col">
          <div
            class="shop-state text-center border p-3"
            :class="{ 'bg-warning': step >= 1 }"
          >
            <span>1</span>
            確認購物車內容
          </div>
        </div>
        <div class="col">
          <div
            class="shop-state text-center border p-3"
            :class="{ 'bg-warning': step >= 2 }"
          >
            <span>2</span>
            填寫訂單
          </div>
        </div>
        <div class="col">
          <div
            class="shop-state text-center border p-3"
            :class="{ 'bg-warning': step >= 3 }"
          >
            <span>3</span>
            完成訂單
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
