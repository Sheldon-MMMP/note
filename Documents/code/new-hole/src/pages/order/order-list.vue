<template>
  <div class="pageContent">
    <!-- 导航栏 -->
    <go-back :color="'black'"></go-back>
    <!-- 标题 -->
    <div class="mt-5 flexBC h-20">
      <h2 class="text-24px">订单</h2>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          {{ orderType[type] }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="index" v-for="(item, index) in orderType" :key="index">{{ item }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 列表 -->
    <require-none v-if="isRequire" :msg="errorMsg"></require-none>
    <div v-else>
      <div class="bg-primary-light h-88px w-full rounded-xl mt-4 flexBC px-10px" v-for="item in orderList" :key="item.id">
        <div class="flex">
          <img :src="item.avatar" alt="" class="w-68px h-68px rounded-xl">
          <div class="ml-10px">
            <span>{{ item.name }}</span>
            <div class="text-sm">
              <span v-if="item.firstOrder" class="bg-primary rounded-md p-1px text-white">首单</span>
              <span v-if="item.orderAppoint" class="rounded-md p-1px text-white"
                style="background-color: rgb(141, 141, 63);">指定单</span>
              <span v-if="item.orderAppoint" class="rounded-md p-1px text-white"
                style="background-color: rgb(117, 24, 97);">{{ item.orderType }}</span>
            </div>
            <div class="text-primary text-sm"><span v-if="item.orderType">{{ item.orderType }}</span>-{{ item.orderTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ORDER_STATUS } from '@/services/api'
import goBack from "@/components/go-back.vue";
import requireNone from '@/components/require-none.vue';
export default {
  async mounted() {
    this.getOrderList()
  },
  components: {
    goBack,
    requireNone
  },
  data() {
    return {
      isRequire: false,
      errorMsg: "没有数据",
      type: 0,
      orderType: ['全部', '未完成', '进行中', '已完成'],
      orderList: []
    }
  },
  beforeMounted() {
    this.type = this.$route.query.type
  },
  watch:{
    type:{
      handler:function() {
        this.getOrderList()
      }
    }
  },
  methods: {
    handleCommand(value) {
      this.type = value
    },
    async getOrderList() {
      const [val, err] = await ORDER_STATUS(5)
      if (err || !val.data.length) {
        this.isRequire = true
        return
      }
      this.orderList = val?.data ? val.data : [];
    }
  }
}

</script>

<style lang='' scoped>

</style>
