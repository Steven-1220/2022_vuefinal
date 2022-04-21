<template>
  <section class="container discount mt-3 mt-md-5">
    <div class="row justify-content-center">
      <div class="col p-3 p-md-5">
        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <h2 class="fs-1">限時優惠</h2>
          <p class="fs-3 text-danger">立刻領取折價券</p>
          <button
            type="button"
            class="btn btn-warning btn-lg"
            @click="getCoupon"
          >
            點我領取
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    getCoupon() {
      this.$swal
        .fire({
          title: "折價券代碼 d123",
          text: "請複製代碼",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#A02E38",
          cancelButtonColor: "#3C3F5F",
          confirmButtonText: "前往購物",
          cancelButtonText: "暫時不要",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ name: "產品列表" });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.discount {
  background-image: url(../assets/images/home02.jpg);
  background-position: 50% 50%;
  background-size: cover;
}
</style>
