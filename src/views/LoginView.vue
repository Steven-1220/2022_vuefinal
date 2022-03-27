<template>
  <VueLoading :active="isLoading"></VueLoading>
  <div class="container-xl mt-5 w-50">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 text-center font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="user.username"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3 loginBtn"
            type="submit"
            @click.prevent="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isLoading: false,
    };
  },

  methods: {
    login() {
      const url = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          // console.log(res.data);
          const { token, expired } = res.data;
          // 回傳的 token 存到 hexToken
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
          // 轉址到 後台產品列表
          this.$router.push("/admin/products");
        })
        .catch((error) => {
          console.log(error.data);
          alert(error.data.message);
        });
    },
    loadingEffect() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
  },
  mounted() {
    this.loadingEffect();
  },
};
</script>
