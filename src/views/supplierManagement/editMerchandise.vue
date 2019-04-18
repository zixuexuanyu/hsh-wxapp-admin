<template>
  <div class="app-container">
    <el-form  ref="formInline" :model="formInline" label-width="160px" >
      <el-row>
        <el-col :span="24">
          <h3>添加商品</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="商品名称" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formInline.user" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </div>
          </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="商品价格">
              <el-input v-model="formInline.user" placeholder="请输入商品价格"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="商品规格">
              <el-input v-model="formInline.user" placeholder="请输入商品规格"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="商品单位" :rules="[{ required: true, message: '不能为空'}]">
              <el-input v-model="formInline.user" placeholder="请输入商品单位" ></el-input>
            </el-form-item>
          </div>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="商品类别" :rules="[{ required: true, message: '不能为空'}]">
              <el-cascader :options="formInline.options" change-on-select style="width:100%"></el-cascader>
            </el-form-item>
          </div>
          </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="库存">
              <el-input v-model="formInline.user" placeholder="请输入库存"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="16">
          <div class="grid-content">
            <el-form-item label="店铺门头">
              <el-upload
                action="https://test.yueyongyueyou.com/page/admin/fastUploadFile/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemove"
                :limit="9">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <div class="grid-content">
            <el-form-item label="商品简介">
              <el-input type="textarea" v-model="formInline.user" placeholder="请输入商品简介"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item label="展示状态">
              <el-input v-model="formInline.user" placeholder="请输入展示状态"></el-input>
            </el-form-item>
          </div>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content">
            <el-form-item>
              <el-button type="info" @click="onCancel" style="width:100px">关闭</el-button>
              <el-button type="primary" @click="onSubmit" style="width:100px">提交</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
/* eslint-disable */
export default {
  data(){
    return {
      names:'修改商品 editMerchandise',
      formInline:{
        user:'213',
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            },  {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods:{
    onCancel(){},
    onSubmit(){
      
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    }
  }
}
</script>
 <style scoped>
 
 </style>


 