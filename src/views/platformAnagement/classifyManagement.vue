<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
        添加一级分类
      </el-button>
      <el-input v-model="listQuery.classifyName" placeholder="分类名称" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-select v-model="listQuery.states" placeholder="级别" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions2" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.level" placeholder="是否在线" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-check" @click="handleBothShow">
        批量展示
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-close" @click="handleBothHide">
        批量隐藏
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"/>
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" align="center" >
        <template slot-scope="scope">
          <span >{{ scope.row.classifyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="级别"  align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.level==1">一级</span>
          <span v-if="scope.row.level==2">二级</span>
        </template>
      </el-table-column>
      <el-table-column  label="上线" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.states=='上线'">
            上线
          </el-tag>
          <el-tag type="danger" v-else>
            下线
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sortNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)" v-if="row.level==1">修改</el-button>
          <el-button type="primary" size="mini" @click="handlesubmenuUpdate(row)" v-if="row.level==2">修改</el-button>
          <el-button type="primary" size="mini" @click="handleAddSubmenu(row)" v-if="row.level==1" style="width:100px;">添加子菜单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item label="一级菜单名称" prop="name">
          <el-input v-model="temp.classifyName" />
        </el-form-item>
        <el-form-item label="展示状态" prop="states">
          <el-radio-group v-model="temp.states">
            <el-radio  v-for="item in statusOptions2" :key="item" :label="item" >
              {{item}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sortNum">
          <el-input v-model="temp.sortNum" />
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

    
    <el-dialog :title="textMap2[dialogStatus2]" :visible.sync="dialogFormVisible2">
      <el-form ref="dataForm2" :rules="rules" :model="temp2" label-position="left" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item label="一级菜单名称" prop="name">
          <el-input v-model="temp2.classifyName" disabled="disabled"/>
        </el-form-item>
        <el-form-item label="子菜单名称" prop="name">
          <el-input v-model="temp2.submenuname" />
        </el-form-item>
        <el-form-item label="展示状态" prop="states">
          <el-radio-group v-model="temp2.states">
            <el-radio  v-for="item in statusOptions2" :key="item" :label="item" >
              {{item}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sortnum">
          <el-input v-model="temp2.sortnum" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus2==='create'?createSubmenuData():updateSubmenuData()">
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
  { key: 'open', display_name: '上线' ,selected:true},
  { key: 'close', display_name: '下线' ,selected:false },
]
const calendarTypeOptions2 = [
  { key: 'all', display_name: '全部' ,selected:false },
  { key: 'menu', display_name: '一级' ,selected:true},
  { key: 'submenu', display_name: '二级' ,selected:false },
]
// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const calendarTypeKeyValue2 = calendarTypeOptions2.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'ClassifyManagement',
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
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // },
    // typeFilter2(type) {
    //   return calendarTypeKeyValue2[type]
    // }
  },
  data() {
    return {
      msg:'432423',
      tableKey:0,
      listLoading: false,
      statusOptions: ['published', 'draft', 'deleted'],
      statusOptions2:['上线','下线'],
      textMap: {
        update: '修改一级菜单',
        create: '添加一级菜单'
      },
      dialogStatus: '',
      textMap2: {
        update: '修改子菜单',
        create: '添加子菜单'
      },
      dialogStatus2: '',
      listQuery: {
        page: 1,
        limit: 20,
        phone: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      dialogFormVisible:false,
      dialogFormVisible2:false,
      total:1,
      temp: {
        classifyName: 1,
        states: '上线',
        sortNum: 11,
      },
      temp2: {
        classifyName: 1,
        submenuname: 1,
        states: '上线',
        sortNum: 11,
      },
      list:[
        {
          id:1,
          classifyName:'111',
          level:1,
          states:'上线',
          sortNum:'111',
        },
        {
          id:2,
          classifyName:'222',
          level:2,
          states:'下线',
          sortNum:'222',
        },
        {
          id:1,
          classifyName:'333',
          level:2,
          states:'上线',
          sortNum:'333',
        }
      ],
      multipleSelection:[],
      // listLoading: true,
      calendarTypeOptions,
      calendarTypeOptions2,
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
        classifyName: undefined,
        states: undefined,
        sortNum: undefined,
      }
      this.temp2 = {
        classifyName: undefined,
        submenuname: undefined,
        states: undefined,
        sortNum: undefined,
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
    handleAddSubmenu(row){
      console.log(row,'--------handleAddSubmenu---添加子菜单-------')
      this.resetTemp()
      this.dialogStatus2 = 'create'
      this.dialogFormVisible2 = true
    },
    createSubmenuData() {
      this.$refs['dataForm2'].validate((valid) => {
        if (valid) {
          this.temp2.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp2.author = 'vue-element-admin'
          // createArticle(this.temp).then(() => {
            this.list.unshift(this.temp2)
            this.dialogFormVisible2 = false
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
    updateSubmenuData() {
      this.$refs['dataForm2'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp2)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp2.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp2)
                break
              }
            }
            this.dialogFormVisible2 = false
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
    handlesubmenuUpdate(row){
      console.log('--------handlesubmenuUpdate-----修改子菜单-----')
      this.temp2 = Object.assign({}, row) // copy obj
      this.temp2.timestamp = new Date(this.temp2.timestamp)
      this.dialogStatus2 = 'update'
      this.dialogFormVisible2 = true
      this.$nextTick(() => {
        this.$refs['dataForm2'].clearValidate()
      })
    },
    handleBothShow(){
      console.log('--------handleBothShow-----批量显示-----')
    },
    handleBothHide(){
      console.log('--------handleBothHide-----批量隐藏-----')
    },
    handleSelectionChange(){
      this.multipleSelection = val
    },
  }
}
</script>

<style scoped>

</style>
