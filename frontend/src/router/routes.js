import {isLoggedIn} from "@/middlewares/isLoggedIn";

export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { layout: "AppDefaultLayout" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { layout: "SimpleLayout" },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartView.vue"),
    meta: { layout: "AppDefaultLayout" },
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/views/SuccessView.vue"),
    meta: { layout: "SimpleLayout" },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView.vue"),
    meta: { layout: "AppDefaultLayout", middelwares: [isLoggedIn] },
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
        // meta: { layout: "" },
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import("@/views/OrdersView.vue"),
        // meta: { layout: "" },
      },
    ],
  },

];
