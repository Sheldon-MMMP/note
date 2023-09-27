<template>
  <div>
    <h2 class="h-8 text-14px font-semibold" style="color: #606266;">添加自己的个性标签</h2>
    <label-component v-for="(item, index) in label" :key="index" :item="item" :closeable="true" @close="handleClose"
      class="mr-3 mb-3"></label-component>
    <el-input class="input-new-tag mr-3 mb-3" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
      @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    <div class="mt-5">
      <el-form :model="$attrs.clerkInfo">
        <input-form title="请填写你的地址" placeholder="输入你所在的市 例:成都市" v-model="$attrs.clerkInfo.position"></input-form>
      </el-form>
    </div>
  </div>
</template>

<script>
import inputForm from '@/components/input-form.vue';
import labelComponent from '@/components/label.vue'
export default {
  components: {
    labelComponent,
    inputForm
  },
  data() {
    return {
      label: this.$attrs.clerkInfo.label,
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClose(tag) {
      this.label.splice(this.label.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      this.inputVisible = false;
      let inputValue = this.inputValue;
      if (this.label.length >= 4) {
        this.$message({
          message: '标签数量不能超过4个',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      if (inputValue && this.label.indexOf(inputValue) === -1) {
        if (inputValue.length > 5) {
          this.$message({
            message: '标签长度不能超过5个字符',
            type: 'warning',
            showClose: true,
          });
          return;
        }
        this.label.push(inputValue);
      } else {
        this.$message({
          message: '标签已存在或为空',
          type: 'warning',
          showClose: true,
        });
      }
      this.inputValue = '';
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

::v-deep .input-new-tag {
  width: 90px;
  vertical-align: bottom;
}
</style>
