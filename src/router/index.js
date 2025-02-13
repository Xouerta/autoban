import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';  // 引入 Pinia store
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Home from '../components/Dashboard.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',  // 默认跳转到登录页面
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/Dashboard',
    component: Home,
    meta: { requiresAuth: true },  // 需要登录权限才能访问
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();  // 使用 Pinia 获取登录状态
  authStore.checkAuth();  // 检查是否已登录

  // 如果目标路由需要权限，并且用户未登录，则跳转到登录页面
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');  // 跳转到登录页面
  } else {
    next();  // 否则继续访问目标页面
  }
});

export default router;
