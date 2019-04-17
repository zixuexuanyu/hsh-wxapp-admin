<template>
  <div class="app-container">

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="用户昵称"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问店铺"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="业务域名"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.https }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="首次访问时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.starttime }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="最后访问时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endtime }}</span>
        </template>
      </el-table-column>>
      <!-- <el-table-column  label="订单数量"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ordernum }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="订单金额总计"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="订单金额（已支付）"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderpaid }}</span>
        </template>
      </el-table-column>> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>    

  </div>
</template>

<script>
/* eslint-disable */
import Pagination from '@/components/Pagination' 

// arr to obj ,such as { CN : "China", US : "USA" }
export default {
  name: 'VisitingHistory',
  components: { Pagination },
  data() {
    return {
      msg:'432423',
      tableKey:0,
      listLoading: false,
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
      list:[
        {
          id:1,
          name:'111',
          supplier:'11111',
          https:'11111.com',
          starttime:'2019-04-15',
          endtime:'2019-04-16',
        },
        {
          id:2,
          name:'222',
          supplier:'22222',
          https:'22222.com',
          starttime:'2019-04-15',
          endtime:'2019-04-16',
        },
        {
          id:3,
          name:'333',
          supplier:'333333',
          https:'33333.com',
          starttime:'2019-04-15',
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