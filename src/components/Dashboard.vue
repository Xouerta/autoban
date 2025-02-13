<template>
  <div>
    <h1>欢迎来到主页</h1>
    <el-button @click="logout">退出登录</el-button>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
          <el-menu-item index="/dashboard">主页</el-menu-item>
          <el-menu-item index="/profile">资料</el-menu-item>
          <el-menu-item index="/settings">设置</el-menu-item>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';  // 引入 Pinia store

export default {
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();  // 退出登录
      this.$router.push('/login');  // 跳转到登录页面
    },
  },
};
</script>
