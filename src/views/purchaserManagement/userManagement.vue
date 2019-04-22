<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入用户昵称" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-input v-model="listQuery.phone" placeholder="请输入手机号" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <!-- <el-input v-model="listQuery.restaurantName" placeholder="请输入餐厅名称" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input> -->
      <!-- <el-select v-model="listQuery.states" placeholder="级别" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions2" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
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
      <!-- <el-table-column label="用户编号"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column  label="用户昵称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="手机号"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="注册时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="最后访问时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/purchaserManagement/visitingHistory/'+scope.row.id">
            <el-button type="primary" size="mini" style="width:100px;">访问店铺历史</el-button>
          </router-link>
          <router-link :to="'/purchaserManagement/porderDetails/'+scope.row.id">
            <el-button type="primary" size="mini" style="width:100px;">订单明细</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>    

  </div>
</template>

<script>
/* eslint-disable */
import { fetchList } from '@/api/platform'
import Pagination from '@/components/Pagination' 
// import path from 'path'
// import { deepClone } from '@/utils'
// import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
// import i18n from '@/lang'

const calendarTypeOptions2 = [
  { key: 'all', display_name: '全部' ,selected:false },
  { key: 'menu', display_name: '餐厅' ,selected:true},
  { key: 'submenu', display_name: '个人' ,selected:false },
]
const calendarTypeKeyValue2 = calendarTypeOptions2.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}
// arr to obj ,such as { CN : "China", US : "USA" }
export default {
  name: 'userManagement',
  components: { Pagination },
  data() {
    return {
      msg:'432423',
      tableKey:0,
      listLoading: false,
      textMap: {
        update: '修改平台用户',
        create: '添加平台用户'
      },
      dialogStatus: '',
      role: Object.assign({}, defaultRole),
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      listQuery: {
        page: 1,
        limit: 10,
        phone: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
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
      calendarTypeOptions2,
      list:[
        {
          id:1,
          name:'111',
          phone:'13211111111',
          createtime:'2019-04-15',
          endtime:'2019-04-16',
        },
        {
          id:2,
          name:'222',
          phone:'13222222222',
          createtime:'2019-04-15',
          endtime:'2019-04-16',
        },
        {
          id:3,
          name:'333',
          phone:'13233333333',
          createtime:'2019-04-15',
          endtime:'2019-04-16',
        }
      ],
    }
  },
  created() {
    this.getList()
  },
  methods:{

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
    handleFilter(){
      console.log(543534)
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>