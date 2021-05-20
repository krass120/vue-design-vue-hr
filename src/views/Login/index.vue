<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="reqParams"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      :rules="rules"
    >
      <a-form-model-item label="账号：" prop="mobile">
        <a-input
          v-model="reqParams.mobile"
        />
      </a-form-model-item>
      <a-form-model-item label="密码：" prop="code">
        <a-input v-model="reqParams.code" type="password" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          登录
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { login } from '@/api/login'

export default {
  name: 'Login',
  data () {
    return {
      reqParams: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      const res = await login(this.reqParams)
      this.$router.push({
        path: '/content'
      })
      this.$message.success('登录成功！')
      // console.log(res)
      window.localStorage.setItem('mytoken', res.data.data.token)
    }
  }
}
</script>
