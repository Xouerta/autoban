<template>
  <div class="register-container">
    <el-card class="register-form">
      <h2>注册</h2>
      <el-form :model="registerForm" ref="registerForm" label-width="100px" @submit.native.prevent="handleRegister">
        <el-form-item label="用户名" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }, { validator: validatePassword, trigger: 'blur' }]">
          <el-input
            v-model="registerForm.password"
            type="password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :rules="[{ required: true, message: '请确认密码', trigger: 'blur' }, { validator: validateConfirmPassword, trigger: 'blur' }]">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]">
          <el-input v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" block @click="handleRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
      },
    };
  },
  methods: {
    // 密码验证
    validatePassword(rule, value, callback) {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(value)) {
        return callback(new Error('密码必须包含大写字母、小写字母、数字和特殊符号，且长度不少于8位'));
      }
      callback();
    },
    // 确认密码验证
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        return callback(new Error('两次输入的密码不一致'));
      }
      callback();
    },
    async handleRegister() {
      try {
        const res = await this.$axios.post('/register', this.registerForm);
        if (res.status === 200) {
          this.$message.success('注册成功，跳转到登录页面');
          this.$router.push('/login');
        } else {
          this.$message.error('注册失败');
        }
      } catch (error) {
        this.$message.error('注册失败');
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register-form {
  width: 400px;
  padding: 20px;
}
</style>
