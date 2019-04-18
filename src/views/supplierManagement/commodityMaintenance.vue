<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.goodsname" placeholder="请输入商品名称" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-select v-model="listQuery.menuType" placeholder="一级类别" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in menuTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.submenuType" placeholder="二级类别" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in submenuTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.states" placeholder="是否在线" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in onlineStatesOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <router-link :to="'/supplierManagement/addMerchandise/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" >
          添加商品
        </el-button>
      </router-link>
      <router-link :to="'/supplierManagement/addToWarehouse/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" >
          在商品库添加
        </el-button>
      </router-link>
      
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
      <el-table-column  label="商品名称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="单位"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="规格"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="一级分类"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.menuType }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="二级分类"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.submenuType }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="在线"  align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.states==1">
            在线
          </el-tag>
          <el-tag type="danger" v-else>
            下线
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          
            <router-link :to="'/supplierManagement/editMerchandise/'+row.id">
              <el-button type="success" size="mini" @click="handleCreate(row)">修改</el-button>
            </router-link>
            
            <el-button type="primary" size="mini" @click="handleCreate(row)" v-if="row.states==1">下线</el-button>
            <el-button type="primary" size="mini" @click="handleCreate(row)" v-else>上线</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
  </div>
</template>

<script>
/* eslint-disable */
import Pagination from '@/components/Pagination' 
const menuTypeOptions=[
  { key: 'all', display_name: '全部' ,selected:false },
  { key: 'online', display_name: '在线' ,selected:true},
  { key: 'credit', display_name: '信用' ,selected:false },
]
const menuTypeKeyValue = menuTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const submenuTypeOptions=[
  { key: '0', display_name: '全部' ,selected:false },
  { key: '1', display_name: '已支付' ,selected:false },
  { key: '2', display_name: '未支付' ,selected:true},
  { key: '3', display_name: '线上支付' ,selected:false },
  { key: '4', display_name: '线下支付' ,selected:false },
]
const submenuTypeKeyValue = submenuTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const onlineStatesOptions=[
  { key: '0', display_name: '全部' ,selected:false },
  { key: '1', display_name: '待付款' ,selected:true},
  { key: '2', display_name: '待发货' ,selected:false },
  { key: '3', display_name: '待收货' ,selected:false },
  { key: '4', display_name: '已完成' ,selected:false },
  { key: '5', display_name: '支付超过已取消' ,selected:false },
  { key: '6', display_name: '商家退单已取消' ,selected:false },
]
const onlineStatesKeyValue = onlineStatesOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  name: 'commodityMaintenance',
  components: { Pagination },
  data() {
    return {
      msg:'432423',
      tableKey:0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        phone: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      total:1,
      menuTypeOptions,
      submenuTypeOptions,
      onlineStatesOptions,
      list:[
        {
          id:1,
          goodsname:'111',
          price:'11.00',
          company:'11',
          unit:'11',
          menuType:1,
          submenuType:1,
          states:1,
        },
        {
          id:2,
          goodsname:'222',
          price:'22.00',
          company:'22',
          unit:'22',
          menuType:2,
          submenuType:2,
          states:2,
        },
        {
          id:3,
          goodsname:'333',
          price:'33.00',
          company:'33',
          unit:'33',
          menuType:3,
          submenuType:3,
          states:2,
        }
      ],
      multipleSelection:[],
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
    handleCreate(row){
    //   this.temp = Object.assign({}, row)
    //   this.dialogFormVisible = true
    //   // this.$nextTick(() => {
    //   //   this.$refs['dataForm'].clearValidate()
    //   // })
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

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
  .grid-content{
    div{
      margin-bottom: 10px;
    }
  }
}
</style>