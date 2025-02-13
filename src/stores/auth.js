import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,  // 默认未登录
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');  // 保存到 localStorage
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');  // 清除 localStorage
    },
    checkAuth() {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    },
  },
});
