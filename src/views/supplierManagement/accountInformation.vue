<template>
  <div class="app-container">
    
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item prop="name">
          <img src="../../assets/401_images/401.gif" alt="" style="width:50px;">
          <div>34232</div>
          <div>ewrwqeewqr</div>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="temp.name" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" disabled="disabled" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="temp.realname" disabled="disabled" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" disabled="disabled" />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="temp.name" disabled="disabled" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" disabled="disabled" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="temp.realname" disabled="disabled" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" disabled="disabled" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" disabled="disabled" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="temp.realname" disabled="disabled" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" disabled="disabled" />
          
          <router-link :to="'/supplierManagement/detailsBalance/1'">
            <span>余额明细</span>
          </router-link>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data(){
    return {
      names:'用户信息 accountInformation',
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.resetTemp()
  },
  methods:{
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
  }
}
</script>
 <style scoped>
 
 </style>


 