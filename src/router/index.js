import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    //登入頁面
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    //前台首頁
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    // 使用者頁面
    path: "/user",
    component: () => import("../views/UserView.vue"),
    children: [
      {
        // 產品列表
        path: "products",
        // name: "products",
        component: () => import("../views/ProductsView.vue"),
      },
      {
        //個別產品資訊
        path: "product/:id",
        // name: "product",
        component: () => import("../views/ProductView.vue"),
      },
      {
        // 顧客購物車
        path: "cart",
        component: () => import("../views/UserCart.vue"),
      },
      {
        // 顧客訂單
        path: "order",
        component: () => import("../views/UserOrder.vue"),
      },
      {
        // 完成訂單
        path: "orderfinish",
        name: "完成訂單",
        component: () => import("../views/UserOrderFinish.vue"),
        // props: (route) => {
        //   console.log("route:", route);
        //   return {
        //     orderId: route.params.orderId,
        //   };
        // },
      },
      {
        // 付款完成
        path: "pay",
        component: () => import("../views/UserOrderPay.vue"),
      },
      {
        // 關於我們
        path: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        // 購物須知
        path: "notice",
        component: () => import("../views/NoticeView.vue"),
      },
    ],
  },
  {
    // 後台
    path: "/admin",
    component: () => import("../views/DashboardView.vue"),
    children: [
      {
        // 產品
        path: "products",
        component: () => import("../views/Dashboard/AdminProducts.vue"),
      },
      {
        // 訂單
        path: "orders",
        component: () => import("../views/Dashboard/AdminOrders.vue"),
      },
      {
        // 優惠券
        path: "coupon",
        component: () => import("../views/Dashboard/AdminCoupon.vue"),
      },
      {
        //貼文
        path: "article",
        component: () => import("../views/Dashboard/AdminArticle.vue"),
      },
    ],
  },
  {
    // 404 頁面
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    // 若到達的路徑符合 newPage 字串，就觸發 if 判斷式
    if (to.fullPath.match("product")) {
      return {
        top: 0,
      };
    }
    return {};
  },
});

export default router;
