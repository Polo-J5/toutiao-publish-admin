<template>
  <div class="loginContainer">
    <div class="logo"></div>
    <el-form
      ref="formlogin"
      :model="user"
      :rules="loginRules"
      class="login-form"
    >
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        />
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="user.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login('formlogin')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/util/request.js'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '手机号必须填写', trigger: 'change' },
          { pattern: /^1[3|5|7|9]\d{9}$/, message: '手机号码格式不正确', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码必须填写', trigger: 'change' },
          { min: 5, message: '请输入正确的验证码', trigger: 'change' }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请确定选择权限'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    Login () {
      const user = this.user
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then((res) => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: '登陆失败',
          type: 'error'
        })
      })
    },
    login (formlogin) {
      /**
       * 点击按钮
       * 1. 获取数据
       * 2. 表单验证
       * 3. 收集数据
       * 4. 发送请求
       * 5. 处理结果
       */
      console.log(this.$refs.formlogin)
      this.$refs.formlogin.validate(valid => {
        if (!valid) {
          return
        }
        this.Login()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.loginContainer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('login_bg.jpg') no-repeat;
  background-size: cover;
  .logo{
    width: 420px;
    height: 80px;
    background: url('logo_index.png') no-repeat;
    background-size: 200px;
    background-position: 100px;
    // margin-top: 50px;
    background-color: #fff;
  }
  .login-form {
    width: 300px;
    background: #fff;
    padding: 0 60px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
