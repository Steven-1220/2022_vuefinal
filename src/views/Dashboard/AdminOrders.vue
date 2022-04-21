<template>
  <VueLoading :active="isLoading" />
  <h2 class="text-center pt-4">訂單</h2>
  <div class="container">
    <div class="row py-3">
      <div class="col">
        <div class="text-end mt-4">
          <button class="btn btn-warning" @click="openModal('deleteAllOrder')">
            刪除所有訂單
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">購買時間</th>
              <th width="120">Email</th>
              <th width="120">購買款項</th>
              <th width="120">應付金額</th>
              <th width="120">是否付款</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody id="productList">
            <tr v-for="item in orders" :key="item.id">
              <td>
                {{ new Date(item.create_at * 1000).toLocaleDateString() }}
              </td>
              <td>{{ item.user.email }}</td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, index) in item.products" :key="index">
                    <span class="text-secondary">{{
                      product.product.title
                    }}</span>
                    數量 : {{ product.qty }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td>{{ item.total }}</td>
              <td>
                <span class="text-success" v-if="item.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm"
                    @click="openModal('edit', item)"
                  >
                    檢視
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
          本頁面有 <span id="productCount"> {{ orders.length }} </span> 筆訂單
        </p>
      </div>
    </div>
    <!-- 分頁元件 -->
    <PaginationView :pages="pagination" @emit-get-page="getAllOrders" />
    <!-- 訂單元件 -->
    <OrderModal
      :order-mod="tempOrder"
      @update-order="updateOrderState"
      ref="orderModalRef"
    />
    <!-- 刪除訂單元件 -->
    <DeleteOrderModal
      :delete-order-item="tempOrder"
      :is-all-orders="isAllOrders"
      @get-orders="getAllOrders"
      ref="delModalRef"
    />
  </div>
</template>

<script>
import PaginationView from "@/components/PaginationView.vue";
import OrderModal from "@/components/OrderModal.vue";
import DeleteOrderModal from "@/components/DeleteOrderModal.vue";

export default {
  components: {
    PaginationView,
    OrderModal,
    DeleteOrderModal,
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isNew: false,
      isLoading: false,
      isAllOrders: false,
    };
  },
  methods: {
    getAllOrders(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    openModal(state, item) {
      console.log(state, item);
      if (state == "edit") {
        // 使用深拷貝
        this.tempOrder = JSON.parse(JSON.stringify(item));
        this.$refs.orderModalRef.open();
        this.isNew = false;
      } else if (state == "delete") {
        this.tempOrder = JSON.parse(JSON.stringify(item));
        this.isAllOrders = false;
        this.$refs.delModalRef.open();
      } else if (state == "deleteAllOrder") {
        this.isAllOrders = true;
        this.$refs.delModalRef.open();
      }
    },

    updateOrderState(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paidState = { is_paid: item.is_paid };
      this.$http
        .put(url, { data: paidState })
        .then((res) => {
          this.getAllOrders();
          this.$httpMessageState(res, "已更新付款狀態");
          this.$refs.orderModalRef.close();
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
  mounted() {
    this.getAllOrders();
  },
};
</script>
