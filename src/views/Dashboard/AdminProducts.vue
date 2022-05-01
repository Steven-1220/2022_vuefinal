<template>
  <VueLoading :active="isLoading" />
  <h2 class="text-center pt-4">產品列表</h2>
  <div class="container">
    <div class="row py-3">
      <div class="col">
        <div class="text-end mt-4">
          <button class="btn btn-warning" @click="openModal('new')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th width="120">產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="120">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody id="productList">
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price }}</td>
              <td>{{ item.price }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm"
                    @click="openModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          本頁面有 <span id="productCount"> {{ products.length }} </span> 項產品
        </p>
      </div>
    </div>

    <PaginationView :pages="pagination" @emit-get-page="getAllProducts" />

    <AdminProductModal
      :product-mod="tempProduct"
      :is-new="isNew"
      @update-product="updateProduct"
      ref="productModalRef"
    />

    <DeleteModal
      :del-product-item="tempProduct"
      @get-products="getAllProducts"
      ref="delProductModalRef"
    />
  </div>
</template>

<script>
import PaginationView from "@/components/PaginationView.vue";
import AdminProductModal from "@/components/AdminProductModal.vue";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  components: {
    PaginationView,
    AdminProductModal,
    DeleteModal,
  },
  data() {
    return {
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      productId: "",
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getAllProducts(page = 1) {
      this.isLoading = true;
      // query 屬於參數(API 文件)，會以 ? 為開頭，問號後方代表 query
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    openModal(state, item) {
      console.log(state, item);
      if (state == "new") {
        // 若是要新增一個新的 modal，需要做清空物件的動作
        this.tempProduct = {
          imagesUrl: [],
        };
        this.$refs.productModalRef.open();
        this.isNew = true;
      } else if (state == "edit") {
        // 使用深拷貝
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.$refs.productModalRef.open();
        this.isNew = false;
      } else if (state == "delete") {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.$refs.delProductModalRef.open();
      }
    },
    //新增產品或修改產品
    updateProduct() {
      // 新增
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let methods = "post";
      let state = "新增產品";
      //根據 isNew 來判斷要串接 post 或是 put API，當 isNew 是  false 才進入編輯
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        methods = "put";
        state = "更新產品";
      }
      this.$http[methods](url, { data: this.tempProduct })
        .then((res) => {
          this.getAllProducts();
          this.$httpMessageState(res, state);
          this.$refs.productModalRef.close();
        })
        .catch((err) => {
          console.log(err.response);
          this.$httpMessageState(err.response, state);
        });
    },
  },
  mounted() {
    this.getAllProducts();
  },
};
</script>
