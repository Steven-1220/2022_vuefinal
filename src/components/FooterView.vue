<template>
  <footer class="bg-primary text-white py-4">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="text-center">本網站僅供個人作品使用</p>
          <ul
            class="list-unstyled d-flex justify-content-center align-items-center"
          >
            <li class="fs-3 px-3">
              <a href="#" class="link-light"><i class="bi bi-instagram"></i></a>
            </li>
            <li class="fs-3 px-3">
              <a href="#" class="link-light"><i class="bi bi-facebook"></i></a>
            </li>
            <li class="fs-3 px-3">
              <a href="#" class="link-light"><i class="bi bi-github"></i></a>
            </li>
          </ul>
          <div class="text-center">
            <RouterLink class="link-light text-decoration-none" to="/login"
              >後台登入</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </footer>

  <div id="go-top" @click="goTop()">
    <i class="bi bi-caret-up-fill fs-4"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollNum: 0, //滾動距離
    };
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      this.scrollNum = top;
    });
  },
};
</script>

<style lang="scss" scoped>
#go-top {
  position: fixed;
  right: 10px;
  bottom: 20px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #222;
  color: #000;
  background: #ffd34c;
  padding: 10px;
  cursor: pointer;
}
</style>
