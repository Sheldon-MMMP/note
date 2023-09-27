<template>
  <el-form-item :label="title" class="font-semibold">
    <el-input v-model="input" :placeholder="placeholder" :type="type" :maxlength="maxlength"
      :show-word-limit="type === 'textarea'" class="form-input">
      <slot slot="repend"></slot>
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    title: {
      type: String,
      default: '请填写信息'
    },
    placeholder: {
      type: String,
      default: '请填写信息'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [Number],
      default: 10
    }
  },
  data() {
    return {
      input: this.value,
    }
  },
  watch: {
    input: {
      deep: true,
      handler: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  }

}

</script>

<style lang='scss' scoped>
.font-semibold{
  ::v-deep .el-form-item__label {
    color: #22172A;
    line-height: 140%;
    letter-spacing: 0px;
    margin-bottom: 8px;
  }



  ::v-deep .el-input__inner,
  ::v-deep .el-textarea__inner {
    background-color: white;
    border: 0;
    border-radius: 16px;
    box-shadow: 0px 2px 20px 0px rgba(117, 34, 119, 0.04);
    height: 56px;
    color: #22172A;
  }
}
</style>
