<template>
  <ToastMessage />

  <nav class="navbar px-0 navbar-expand-lg navbar-light bg-warning">
    <div
      class="collapse navbar-collapse custom-header-md-open container-fluid"
      id="navbarNav"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link ps-md-0" to="/admin/products"
            >產品</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link ps-md-2" to="/admin/orders"
            >訂單</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link ps-md-2" to="/admin/coupon"
            >優惠券</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link ps-md-2" to="/admin/article"
            >貼文</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link ps-md-5" to="/login">登出</RouterLink>
        </li>
      </ul>
    </div>
  </nav>

  <RouterView v-if="checkSuccess" />
</template>

<script>
// 驗證寫在 Dashboard 統一管理，並由 router-view 控制切換呈現的內容
import ToastMessage from "@/components/ToastMessage.vue";

export default {
  components: {
    ToastMessage,
  },
  data() {
    return {
      checkSuccess: false,
    };
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;

        const api = `${process.env.VUE_APP_API}/api/user/check`;
        this.$http
          .post(api)
          .then(() => {
            // 驗證成功代表 token 沒過期
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },
    logOut() {
      document.cookie = "myToken=;expires=;";
      alert("已登出");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
