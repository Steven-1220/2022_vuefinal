import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },

  {
    //前台頁面
    path: "/",
    name: "index",
    component: () => import("../views/IndexView.vue"),
    children: [
      {
        //首頁
        path: "",
        name: "home",
        component: () => import("../views/HomeMainContent.vue"),
      },
      {
        // 使用者頁面
        path: "/user",
        component: () => import("../views/UserView.vue"),
        children: [
          {
            path: "products",
            name: "產品列表",
            component: () => import("../views/ProductsView.vue"),
          },
          {
            path: "product/:id",
            name: "個別產品",
            component: () => import("../views/ProductView.vue"),
          },
          {
            path: "cart",
            component: () => import("../views/UserCart.vue"),
          },
          {
            path: "order",
            component: () => import("../views/UserOrder.vue"),
          },
          {
            path: "orderfinish",
            name: "完成訂單",
            component: () => import("../views/UserOrderFinish.vue"),
          },
          {
            path: "pay",
            component: () => import("../views/UserOrderPay.vue"),
          },
          {
            path: "favorite",
            component: () => import("../views/MyFavorite.vue"),
          },
          {
            path: "about",
            component: () => import("../views/AboutView.vue"),
          },
          {
            path: "material",
            component: () => import("../views/MaterialView.vue"),
          },
          {
            path: "notice",
            component: () => import("../views/ShopInfo.vue"),
          },
        ],
      },
    ],
  },
  {
    // 後台
    path: "/admin",
    component: () => import("../views/Dashboard/DashboardView.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/Dashboard/AdminProducts.vue"),
      },
      {
        path: "orders",
        component: () => import("../views/Dashboard/AdminOrders.vue"),
      },
      {
        path: "coupon",
        component: () => import("../views/Dashboard/AdminCoupon.vue"),
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
  scrollBehavior(to) {
    if (to.name === "home") {
      return {
        top: 0,
      };
    } else if (to.fullPath.match("about")) {
      return {
        top: 0,
      };
    } else if (to.fullPath.match("material")) {
      return {
        top: 0,
      };
    } else if (to.fullPath.match("product")) {
      return {
        top: 0,
      };
    }
  },
});

export default router;
