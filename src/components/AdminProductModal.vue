<template>
  <div
    class="modal fade"
    id="productModal"
    ref="modalRef"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 圖片新增區 -->
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                  <!-- 上傳檔案 -->
                  <div class="mb-3">
                    <label for="formFile" class="form-label">選擇檔案</label>
                    <input
                      class="form-control"
                      type="file"
                      ref="fileRef"
                      @change="uploadMainImg"
                    />
                  </div>
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
              </div>
              <h3>多圖新增</h3>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <template
                  v-for="(img, index) in tempProduct.imagesUrl"
                  :key="index + 123"
                >
                  <div class="my-3">
                    <label for="multiImg" class="form-label">圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="tempProduct.imagesUrl[index]"
                      placeholder="請輸入圖片網址"
                    />
                  </div>
                  <!-- 上傳檔案 -->
                  <div class="mb-3">
                    <label for="formFile" class="form-label">選擇檔案</label>
                    <input
                      class="form-control"
                      type="file"
                      ref="fileRef"
                      @change="uploadMain"
                    />
                  </div>
                  <!-- :src="tempProduct.imagesUrl[index]" 也可以寫成 :src="img" -->
                  <img
                    :src="tempProduct.imagesUrl[index]"
                    class="img-fluid"
                    alt=""
                  />
                </template>
                <!-- v-if="!tempProduct.imagesUrl.length" 指陣列若沒有第一筆資料，要新增(顯示)一個新增按鈕。或是陣列最後一個位置是否有輸入文字，若有則再新增一個按鈕 -->
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <!-- 若陣列有資料，顯示刪除按鈕，反之則不顯示 -->
                <div v-if="tempProduct.imagesUrl.length !== 0">
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>

            <!-- 資料輸入區 -->
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  v-model="tempProduct.title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    v-model.number="tempProduct.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  v-model="tempProduct.content"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    v-model="tempProduct.is_enabled"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      productModal: "",
      tempProduct: {},
    };
  },

  props: {
    productMod: {},
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update-product"],
  watch: {
    productMod() {
      this.tempProduct = this.productMod;
    },
  },
  methods: {
    open() {
      this.productModal.show();
    },
    close() {
      this.productModal.hide();
    },

    //新增圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    //上傳主圖
    uploadMainImg() {
      const file = this.$refs.fileRef.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      let state = "圖片上傳";
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http
        .post(url, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$refs.fileRef.value = "";
          this.$httpMessageState(res, state);
        })
        .catch((err) => {
          console.log(err.response);
          state = "圖片上傳失敗";
          this.$httpMessageState(err.response, state);
        });
    },

    //上傳多圖
    upload(index) {
      let fileInput = document.querySelectorAll("input[type=file]");

      const file = fileInput[index].files[0];

      const formData = new FormData();
      formData.append("file-to-upload", file);
      let state = "圖片上傳";
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http
        .post(url, formData)
        .then((res) => {
          this.tempProduct.imagesUrl.push(res.data.imageUrl);
          this.$httpMessageState(res, state);
        })
        .catch((err) => {
          console.log(err.response);
          state = "圖片上傳失敗";
          this.$httpMessageState(err.response, state);
        });
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.modalRef, {
      keyboard: false,
    });
  },
};
</script>
