<template>
  <div>
    <el-form :model="$attrs.clerkInfo">
      <input-form v-for="item in requiredInformation" v-model="clerkInfo[item.name]" :key="item.name" :title="item.title"
        :placeholder="item.placeholder" :maxlength="item.maxlength" :type="item.type"></input-form>
    </el-form>
    <!-- 年龄和性别 -->
    <el-form :model="$attrs.clerkInfo">
      <div class="flex justify-between items-center">
        <input-form title="年龄" placeholder="请输入你当前年龄" v-model="clerkInfo['age']" :maxlength="2"
          type="number"></input-form>
        <div class="flex flex-col">
          <el-form-item label="性别" class="font-semibold">
            <el-radio-group v-model="clerkInfo.sex">
              <el-radio-button :label="0">女</el-radio-button>
              <el-radio-button :label="1">男</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import InputForm from '@/components/input-form.vue'
export default {
  components: {
    InputForm
  },
  data() {
    return {
      clerkInfo: this.$attrs.clerkInfo,
      requiredInformation: [
        { title: '姓名', placeholder: '请填写姓名', type: 'text', maxlength: 5, name: "clerkName" },
        { title: "个人简介", placeholder: "请填写个人简介", type: "textarea", maxlength: 120, name: "motto" },
      ]
    }
  },
}

</script>

<style lang='scss' scoped>
::v-deep .el-radio-group {
  border-radius: 16px !important;
  overflow: hidden;

  .el-radio-button__inner {
    width: 60px; 
    border:0;
    height: 56px;
    line-height: 28px;
    font-size: 16px;
  }
}

::v-deep .el-form-item__label {
  color: #22172A;
  line-height: 140%;
  letter-spacing: 0px;
  margin-bottom: 8px;
}
</style>
