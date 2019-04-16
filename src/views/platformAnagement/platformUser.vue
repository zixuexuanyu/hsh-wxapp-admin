<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="请输入用户名" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-input v-model="listQuery.phone" placeholder="请输入手机号" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-select v-model="listQuery.type" placeholder="全部" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" >
        <template slot-scope="scope">
          <span >{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名"  >
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="手机号" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名" >
        <template slot-scope="scope">
          <span>{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endtime  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="95">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.states | statesFilter">
            {{ scope.row.states | statesShow }}
          </el-tag> -->
          <el-tag type="success" v-if="scope.row.states==1">
            开启
          </el-tag>
          <el-tag type="danger" v-else>
            关闭
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="handleUpdate(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" style="margin-top:0;"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="temp.realname" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="角色" prop="rolename">
          <el-select v-model="temp.rolename" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态" prop="states">
          <el-radio-group v-model="temp.status">
            <el-radio  v-for="item in statusOptions2" :key="item" :label="item" >
              {{item}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
import { fetchList } from '@/api/platform'
import Pagination from '@/components/Pagination' 
const calendarTypeOptions = [
  { key: 'all', display_name: '全部' ,selected:false },
  { key: 'open', display_name: '开启' ,selected:true},
  { key: 'close', display_name: '关闭' ,selected:false },
]
// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'PlatformUser',
  components: { Pagination },
  filters: {
    statesFilter(states) {
      const statesMap = {
        draft: 'info',
        published: 'success',
        deleted: 'danger'
      }
      return statesMap[states]
    },
    statesShow(states){
      const statesMaps={
        name:'开启',
        name2:'关闭'
      }
      return statesMaps[states-1]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      msg:'432423',
      tableKey:0,
      listLoading: false,
      statusOptions: ['published', 'draft', 'deleted'],
      statusOptions2:['开启','关闭'],
      textMap: {
        update: '修改平台用户',
        create: '添加平台用户'
      },
      dialogStatus: '',
      listQuery: {
        page: 1,
        limit: 20,
        phone: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      dialogFormVisible:false,
      total:1,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      list:[
        {
          id:1,
          name:'111',
          realname:'111',
          phone:'13211111111',
          rolename:'111',
          createtime:'2019-04-15',
          endtime:'2019-04-16',
          states:1,
        },
        {
          id:2,
          name:'222',
          realname:'222',
          phone:'13222222222',
          rolename:'222',
          createtime:'2019-04-15',
          endtime:'2019-04-16',
          states:2,
        },
        {
          id:3,
          name:'333',
          realname:'333',
          phone:'13233333333',
          rolename:'333',
          createtime:'2019-04-15',
          endtime:'2019-04-16',
          states:2,
        }
      ],
      // listLoading: true,
      calendarTypeOptions,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getList()
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
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getList() {
      // this.listLoading = true
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
        this.total = this.list.length

    },
    handleFilter(){
      console.log(543534)
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate(){
      console.log(11111)
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          // createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          // })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          // })
        }
      })
    },
    handleUpdate(row){
      console.log(22222)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
  }
}
</script>

<style scoped>

</style>
