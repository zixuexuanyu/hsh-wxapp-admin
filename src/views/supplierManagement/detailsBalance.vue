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
      <el-table-column  label="时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.times }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="变动原因"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.because }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="变动金额"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="变动后余额金额"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.priceed }}</span>
        </template>
      </el-table-column>>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>    

  </div>
</template>

<script>
/* eslint-disable */
import Pagination from '@/components/Pagination' 

// arr to obj ,such as { CN : "China", US : "USA" }
export default {
  name: 'detailsBalance',
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
          times:'2019-04-15',
          because:'111',
          orderNo:'11111',
          price:'11111.00',
          priceed:'11111.00',
        },
        {
          id:2,
          times:'2019-04-15',
          because:'22',
          orderNo:'22222',
          price:'222.00',
          priceed:'22.00',
        },
        {
          id:3,
          times:'2019-04-15',
          because:'333',
          orderNo:'3333',
          price:'333.00',
          priceed:'3333.00',
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