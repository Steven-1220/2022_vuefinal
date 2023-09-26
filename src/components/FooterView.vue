<template>
  <footer class="bg-primary text-white py-4">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-md-6">
              <ul class="list-unstyled fs-5 mb-0 h-100">
                <li class="pb-2">
                  <a
                    href="tel:+55-888-800-123"
                    class="text-decoration-none link-light"
                    ><i class="bi bi-telephone-fill"></i> +55 888 800 123</a
                  >
                </li>
                <li class="pb-2">
                  <a
                    href="mailto:sweethome@gmail.com"
                    class="text-decoration-none link-light"
                    ><i class="bi bi-envelope-fill"></i> sweethome@gmail.com</a
                  >
                </li>
                <li>
                  <i class="bi bi-geo-alt-fill"></i>台中市南屯區大墩路500號
                </li>
              </ul>
            </div>
            <div class="col-md-6 pt-4 pt-md-0">
              <div
                class="txt d-flex justify-content-md-end align-items-center fs-4 h-100"
              >
                <p>邀請您一同品嘗令人難以忘懷的幸福滋味 !</p>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-4">
            <p class="text-center">本網站僅供個人作品使用</p>
            <ul
              class="list-unstyled d-flex justify-content-center align-items-center"
            >
              <li class="fs-3 px-3">
                <a href="#" class="link-light"
                  ><i class="bi bi-instagram"></i
                ></a>
              </li>
              <li class="fs-3 px-3">
                <a href="#" class="link-light"
                  ><i class="bi bi-facebook"></i
                ></a>
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
    </div>
  </footer>

  <div id="go-top" @click="goTop()" v-show="isShow">
    <i class="bi bi-caret-up-fill fs-4"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elementToTop: 0, // 初始捲軸距離視窗頂部的距離
      isShow: false,
    };
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = 0;
    },
    scrollStatus() {
      const scrollToTop = window.scrollY; // 從視窗頂部開始捲軸已捲動的長度
      this.elementToTop = scrollToTop;

      if (this.elementToTop < 650) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollStatus);
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
  z-index: 50;
}
</style>
