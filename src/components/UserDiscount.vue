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
  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/steven1220/1649859352176.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=eBT8R3shwZJi86wTkElJl2MvTc58Io1KzBGI6sxPRUjS1JldLp6pb36XFbgPF0ZfVsirNLOBc%2BiCs1UHgt7Isw7k7ouIw1lsYWavBFiPZS%2FewoiwiZn621FP0RjAS08gDFIZ1kjjFZ3WphsMUQabADGhbMIcQJd4gjdkAbqURv2g64PP6rgL1B%2FSXe3EvTI7bGoG9ZepkmlXpJe45%2B%2BguPSFUyLdP0SK%2BqcJEw4B%2FBFOHcZ7fB%2FdSeX4kTswKXrdpGfjiWDhp6muZHnW5f%2FhVkr5gufcnIomYosgXH2S9HbSFkyTEx6JqV20TFXkYkmIr5hYAFUbcl9aV1VqL4E85w%3D%3D);
  background-position: 50% 50%;
  background-size: cover;
}
</style>
