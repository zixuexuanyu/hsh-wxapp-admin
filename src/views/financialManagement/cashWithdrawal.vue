<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin:10px 20px;" >
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <to-pay v-if="activeName==0" :type="item.key"  />
          <already-paid v-if="activeName==1" :type="item.key"  />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import toPay from './components/toPay.vue'
import alreadyPaid from './components/alreadyPaid.vue'
export default {
  data(){
    return {
      tabMapOptions: [
        { label: '待打款', key: '0' },
        { label: '已打款', key: '1' },
      ],
      activeName: '0',
      createdTimes: 0
    }
  },
  components: { toPay,alreadyPaid },
  methods:{
    
  }
}
</script>
 <style scoped>
 
 </style>


 