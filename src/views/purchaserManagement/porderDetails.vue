<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.timestamp" type="datetime" placeholder="下单时间-开始时间" class="filter-item" />
      <el-date-picker v-model="listQuery.timestamp2" type="datetime" placeholder="下单时间-结束时间" class="filter-item" />
      <el-input v-model="listQuery.supplier" placeholder="请输入下单店铺" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-select v-model="listQuery.payType" placeholder="支付方式" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in payTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.payStates" placeholder="支付状态" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in payStatesOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.orderStates" placeholder="订单状态" clearable class="filter-item select" style="width: 130px">
        <el-option v-for="item in orderStatesOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
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
      <el-table-column  label="下单时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单店铺"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="下单用户"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="订单金额"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="议价"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hagglePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="小计"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.actamount }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="支付方式"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payType }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="支付状态"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payStates }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="订单状态"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderStates }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="{row}">
            <el-button type="primary" size="mini" style="width:100px;" @click="handleCreate(row)">订单明细</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>    

    <el-dialog title="订单明细" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" label-position="left">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content">订单编号：{{temp.id}}</div></el-col>
          <el-col :span="6"><div class="grid-content">下单店铺：{{temp.supplier}}</div></el-col>
          <el-col :span="6"><div class="grid-content">下单用户：{{temp.username}}</div></el-col>
          <el-col :span="6"><div class="grid-content">用户手机号：{{temp.phone}}</div></el-col>
        </el-row>
        <el-row :gutter="20" style="margin:10px -10px;">
          <el-col :span="6"><div class="grid-content">下单时间：{{temp.createtime}}</div></el-col>
          <el-col :span="6"><div class="grid-content">支付时间：xxxx-xx-xx xx:xx</div></el-col>
          <el-col :span="6"><div class="grid-content">接单时间：xxxx-xx-xx xx:xx</div></el-col>
          <el-col :span="6"><div class="grid-content">完成时间：xxxx-xx-xx xx:xx</div></el-col>
        </el-row>
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="temp.items"
          fit
          stripe
          border
          highlight-current-row
          style="width: 100%;"
        >
        <!-- <el-table
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
    > -->
          <el-table-column label="商品名称"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.goodsname }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="规格"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.spec }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="单价"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="数量"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.num }}</span>
            </template>
          </el-table-column>
          <el-table-column  label="合计"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.actamount }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col :span="6"><div class="grid-content">收货方式：{{temp.receivingMethod}}</div></el-col>
          <el-col :span="6"><div class="grid-content">
            <div>配送信息:姓名 + 电话号码</div>
            <div>驿站详细地址</div>
            </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <div>订单金额：{{temp.orderPrice}}</div>
            <div>议价金额：{{temp.hagglePrice}}</div>
            <div>小计金额：{{temp.actamount}}</div>
            </div></el-col>
          <el-col :span="6"><div class="grid-content">
            <div>支付方式：{{temp.payType}}</div>
            <div>支付状态：{{temp.payStates}}</div>
            <div>订单状态：{{temp.orderStates}}</div>
            </div></el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
import Pagination from '@/components/Pagination' 
const payTypeOptions=[
  { key: 'all', display_name: '全部' ,selected:false },
  { key: 'online', display_name: '在线' ,selected:true},
  { key: 'credit', display_name: '信用' ,selected:false },
]
const payTypeKeyValue = payTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const payStatesOptions=[
  { key: '0', display_name: '全部' ,selected:false },
  { key: '1', display_name: '已支付' ,selected:false },
  { key: '2', display_name: '未支付' ,selected:true},
  { key: '3', display_name: '线上支付' ,selected:false },
  { key: '4', display_name: '线下支付' ,selected:false },
]
const payStatesKeyValue = payStatesOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const orderStatesOptions=[
  { key: '0', display_name: '全部' ,selected:false },
  { key: '1', display_name: '待付款' ,selected:true},
  { key: '2', display_name: '待发货' ,selected:false },
  { key: '3', display_name: '待收货' ,selected:false },
  { key: '4', display_name: '已完成' ,selected:false },
  { key: '5', display_name: '支付超过已取消' ,selected:false },
  { key: '6', display_name: '商家退单已取消' ,selected:false },
]
const orderStatesKeyValue = orderStatesOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// arr to obj ,such as { CN : "China", US : "USA" }
export default {
  name: 'porderDetails',
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
      dialogType: 'new',
      checkStrictly: false,
      dialogFormVisible:false,
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
      // calendarTypeOptions2,
      payTypeOptions,
      payStatesOptions,
      orderStatesOptions,
      list:[
        {
          id:1,
          createtime:'2019-04-15',
          supplier:'111',
          username:'11',
          orderPrice:'11.00',
          hagglePrice:'11.00',
          actamount:'11.00',
          payType:1,
          payStates:1,
          orderStates:1,
          phone:11111111111,
          receivingMethod:'自提',
          items:[
            {
              goodsname:'1-1',
              spec:'1-1',
              price:'11.00',
              num:11,
              actamount:'11.00'
            },
            {
              goodsname:'1-2',
              spec:'1-2',
              price:'12.00',
              num:12,
              actamount:'12.00'
            },
          ]
        },
        {
          id:2,
          createtime:'2019-04-15',
          supplier:'222',
          username:'22',
          orderPrice:'22.00',
          hagglePrice:'22.00',
          actamount:'22.00',
          payType:2,
          payStates:2,
          orderStates:2,
          phone:22222222222,
          receivingMethod:'自提',
          items:[
            {
              goodsname:'2-1',
              spec:'2-1',
              price:'21.00',
              num:21,
              actamount:'21.00'
            },
            {
              goodsname:'2-2',
              spec:'2-2',
              price:'22.00',
              num:22,
              actamount:'22.00'
            },
          ]
        },
        {
          id:3,
          createtime:'2019-04-15',
          supplier:'333',
          username:'33',
          orderPrice:'33.00',
          hagglePrice:'33.00',
          actamount:'33.00',
          payType:3,
          payStates:3,
          orderStates:3,
          phone:33333333333,
          receivingMethod:'配送',
          items:[
            {
              goodsname:'3-1',
              spec:'3-1',
              price:'31.00',
              num:31,
              actamount:'31.00'
            },
            {
              goodsname:'3-2',
              spec:'3-2',
              price:'32.00',
              num:32,
              actamount:'32.00'
            },
          ]
        }
      ],
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
    handleCreate(row){
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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