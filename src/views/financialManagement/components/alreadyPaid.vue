<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="请输入申请店铺" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-input v-model="listQuery.title" placeholder="请输入供应商账号" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-check" @click="handlebatchPass">
       批量通过
      </el-button> -->
      <el-button class="filter-item" :loading="downloadLoading" type="primary" icon="document" @click="handleDownload">
        导出Excel
      </el-button>
    </div>
    <div class="filter-container">
      <span>提现金额总计：</span>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="申请时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.times }}
        </template>
      </el-table-column>
      <el-table-column label="申请店铺"  align="center">
        <template slot-scope="scope">
          {{ scope.row.supplier }}
        </template>
      </el-table-column>
      <el-table-column label="供应商账号" align="center">
        <template slot-scope="scope">
          {{ scope.row.accountNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="可提现金额">
        <template slot-scope="scope">
          <span>{{ scope.row.priceAll }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现金额">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户信息" >
        <template slot-scope="{row}">
          <span class="link-type" @click="handleShow(row)">收款信息</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    <el-dialog title="账户信息" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="收款姓名" prop="name">
          <span>{{temp.name}}</span>
        </el-form-item>
        <el-form-item label="收款银行" prop="binkname">
          <span>{{temp.binkname}}</span>
        </el-form-item>
        <el-form-item label="开户行" prop="realname">
          <span>{{temp.realname}}</span>
        </el-form-item>
        <el-form-item label="收款账户" prop="accountNumber">
          <span>{{temp.accountNumber}}</span>
        </el-form-item>
        <el-form-item label="联系手机" prop="phone">
          <span>{{temp.phone}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
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
      total:1,
      dialogFormVisible:false,
      // dialogFormVisible2:false,
      listLoading:false,
      downloadLoading:false,
      temp: {
        name: '32132',
        binkname: '213213',
        realname: '321321',
        accountNumber: 321,
        phone: '213213',
      },
      list:[
        {
          times:'2019-04-15',
          supplier:'11',
          accountNumber:'11',
          priceAll:'11.00',
          price:'11.00',
        },
        {
          times:'2019-04-16',
          supplier:'22',
          accountNumber:'22',
          priceAll:'22.00',
          price:'22.00',
        },
        {
          times:'2019-04-17',
          supplier:'33',
          accountNumber:'33',
          priceAll:'33.00',
          price:'33.00',
        },
      ],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
    }
  },
  components: { Pagination },
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
        console.log(this.total,'---------this.total--------')

    },
    handleFilter(){
      console.log(543534)
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      // this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      //   const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
      //   const list = this.list
      //   const data = this.formatJson(filterVal, list)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: this.filename,
      //     autoWidth: this.autoWidth,
      //     bookType: this.bookType
      //   })
      //   this.downloadLoading = false
      // })
    },
    formatJson(filterVal, jsonData) {
      // return jsonData.map(v => filterVal.map(j => {
      //   if (j === 'timestamp') {
      //     return parseTime(v[j])
      //   } else {
      //     return v[j]
      //   }
      // }))
    },
    handleShow(row){
      console.log(row,'--------row---------')
      this.dialogFormVisible=true
    },
  }
}
</script>
 <style scoped>
 
 </style>


 