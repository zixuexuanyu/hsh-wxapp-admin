<template>
  <div class="app-container">
    
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="请输入商品名称" style="width:200px;" class="filter-item" @keyup.enter.native="handleFilter"></el-input>
      
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-check" @click="handlebatchPass">
       批量通过
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-close" @click="handlebatchDismissal">
       批量驳回
      </el-button>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="商品名称" width="95">
        <template slot-scope="scope">
          {{ scope.row.goodsname }}
        </template>
      </el-table-column>
      <el-table-column label="店铺来源" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.supplier }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="规格" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.spec }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分类" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.classify }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单位" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.imgs }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="简介">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="{row}">
          <el-button type="success" size="mini" @click="handleUpdate(row)">通过审核</el-button>
          <el-button type="danger" size="mini" @click="handleUpdate(row)">驳回审核</el-button>
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
      total:1,
      listLoading:false,
      list:[
        {
          goodsname:'1111111',
          supplier:'11',
          spec:'11/11',
          classify:'1<11',
          unit:'g',
          price:'11.00',
          imgs:'',
          desc:'复苏的速度',
        },
        {
          goodsname:'222222',
          supplier:'22',
          spec:'22/22',
          classify:'2<22',
          unit:'个',
          price:'22.00',
          imgs:'',
          desc:'dfada 反倒是',
        },
        {
          goodsname:'333333',
          supplier:'33',
          spec:'33/33',
          classify:'3<33',
          unit:'kg',
          price:'33.00',
          imgs:'',
          desc:'环境和发挥',
        },
      ],
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
    handleSelectionChange(){
      this.multipleSelection = val
    },
    handlebatchPass(){
      console.log(this.multipleSelection,'----------this.multipleSelection------------')
      if (this.multipleSelection.length) {
        // this.downloadLoading = true
        // import('@/vendor/Export2Excel').then(excel => {
        //   const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        //   const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        //   const list = this.multipleSelection
        //   const data = this.formatJson(filterVal, list)
        //   excel.export_json_to_excel({
        //     header: tHeader,
        //     data,
        //     filename: this.filename
        //   })
        //   this.$refs.multipleTable.clearSelection()
        //   this.downloadLoading = false
        // })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    handlebatchDismissal(){
      console.log(this.multipleSelection,'----------this.multipleSelection------------')
      if (this.multipleSelection.length) {
        // this.downloadLoading = true
        // import('@/vendor/Export2Excel').then(excel => {
        //   const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        //   const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        //   const list = this.multipleSelection
        //   const data = this.formatJson(filterVal, list)
        //   excel.export_json_to_excel({
        //     header: tHeader,
        //     data,
        //     filename: this.filename
        //   })
        //   this.$refs.multipleTable.clearSelection()
        //   this.downloadLoading = false
        // })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    handlePass(row){
      console.log(row,'-----row-----')
    },
    handleDismissal(row){
      console.log(row,'-----row-----')
    },
  }
}
</script>
 <style scoped>
 
 </style>
 