<template>
  <div class="pageContent py-5">
    <go-back :color="'black'" isCenter>
      <span>搜索</span>
    </go-back>
    <div
      class="border-solid border-2 rounded-full w-full h-12 flex justify-between px-2 items-center border-primary-black">
      <el-input v-model="input" placeholder="输入你想搜索的店员" @blur="getClerkInfo"></el-input>
      <img src="@/assets/icon/common/search.svg">
    </div>

    <div class="list mt-4">
      <el-empty :image-size="200" v-if="!clerkList.length"></el-empty>
      <waterfall :clerkList="clerkList" v-else></waterfall>
    </div>
  </div>
</template>

<script>
import {GET_CLERK_INFO} from '@/services/api'
import waterfall from '@/layouts/waterfall.vue'
import goBack from '@/components/go-back.vue'
export default {
  components: {
    waterfall,
    goBack
  },
  data() {
    return {
      input: '',
      clerkList:[]
    }
  },
  methods: {
    handleCommand() {
      console.log(1)
    },
    // 获取店员列表
    async getClerkInfo() {
      const [val,error] = await GET_CLERK_INFO(this.input)
      if (error) {
        console.log(error)
      } else {
        this.clerkList = val.data
      }
    }
  },
}

</script>

<style lang='scss' scoped>
::v-deep .el-input__inner {
  background-color: white;
  border: 0;
  border-radius: 16px;
  box-shadow: 0px 2px 20px 0px rgba(117, 34, 119, 0.04);
  height: 2.5rem;
  color: #22172A;
}
</style>

