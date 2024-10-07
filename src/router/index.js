/** @format */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/components/Header.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "/cat/:catid",
          name: "cat",
          component: () => import("@/views/Category.vue"),
        },
      ],
    },
  ],
});

export default router;
