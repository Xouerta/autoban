<template>
  <div class="login-container">
    <el-card class="login-form">
      <h2>登录</h2>
      <el-form :model="loginForm" ref="loginForm" label-width="100px" @submit.native.prevent="handleLogin">
        <el-form-item label="用户名" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" block @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';  // 引入 Pinia store

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore();

      // 在这里模拟登录成功
      if (this.loginForm.username === 'user' && this.loginForm.password === 'password') {
        authStore.login();  // 登录
        this.$router.push('/home');  // 登录成功后跳转到主页
      } else {
        this.$message.error('用户名或密码错误');
      }
    },
  },
};
</script>
