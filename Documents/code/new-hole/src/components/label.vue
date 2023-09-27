<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span class="text-size-14px border-solid border-primary-light p-2 border-2 inline-block rounded-full text-purple-900 text-primary-black">
    <i v-if="iconPath"></i>{{ item }}<i v-if="closeable" class="el-icon-close opacity-30 ml-1" @click="close"></i>
  </span>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
      default: ''
    },
    iconPath: {
      type: String,
      default: ''
    },
    closeable: {
      type: Boolean,
      default: false
    },
  },
  methods:{
    close(){
      this.$emit('close',this.item)
    }
  }
}
</script>

<style lang='' scoped>

</style>
