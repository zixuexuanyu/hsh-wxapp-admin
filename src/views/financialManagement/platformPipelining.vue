<template>
  <div class="app-container">
    
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="请输入商品名称" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input> -->
      <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
      <el-date-picker v-model="temp.timestamp2" type="datetime" placeholder="Please pick a date" />
      
      <el-radio-group v-model="temp.status">
        <el-radio  v-for="item in statusOptions2" :key="item" :label="item" >
          {{item}}
        </el-radio>
      </el-radio-group>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-bottom:0;">
        {{ $t('table.search') }}
      </el-button>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">
          {{ scope.row.times }}
        </template>
      </el-table-column>
      <el-table-column label="采购人数"  align="center">
        <template slot-scope="scope">
          {{ scope.row.usernums }}
        </template>
      </el-table-column>
      <el-table-column label="采购笔数"  align="center">
        <template slot-scope="scope">
          {{ scope.row.nums }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="微信支付（元）" >
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" style="margin-top:0;"/>
  </div>
</template>

<script>
/* eslint-disable */
import Pagination from '@/components/Pagination' 
export default {
   data(){
    return {
      msg:'fdsakjlf',
      listQuery: {
        page: 1,
        limit: 20,
        phone: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      statusOptions2:['按天','按月'],
      total:1,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        timestamp2: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      listLoading:false,
      list:[
        {
          times:'2019-04-14',
          usernums:'11',
          nums:'11',
          price:'11.00',
        },
        {
          times:'2019-04-15',
          usernums:'22',
          nums:'22',
          price:'22.00',
        },
        {
          times:'2019-04-16',
          usernums:'33',
          nums:'33',
          price:'33.00',
        },
      ],
    }
  },
  components: { Pagination },
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
        console.log(this.total,'---------this.total--------')

    },
    handleFilter(){
      console.log(543534)
      this.listQuery.page = 1
      this.getList()
    },
  }
}
</script>
 <style scoped>
 
 </style>
 