<template>
  <div class="wrap w-50">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-1 text-danger">
          <i class="bi bi-exclamation-circle"></i> 404
        </h1>
        <p class="display-3">此頁面找不到資料</p>
      </div>
      <div class="col-12">
        <div
          class="text-center d-flex justify-content-center flex-column flex-sm-row"
        >
          <RouterLink to="/" class="btn btn-primary me-3 mb-3 mb-sm-0"
            >回首頁</RouterLink
          >
          <RouterLink to="/user/products" class="btn btn-warning"
            >繼續購物</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
}
</style>
