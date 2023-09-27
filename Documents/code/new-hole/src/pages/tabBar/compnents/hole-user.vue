<template>
  <div class="pt-15 w-full flex flex-col">
    <!-- 头像名字 -->
    <div class="flex flex-col flex items-center relative">
      <div class="h-30 w-30 rounded-full overflow-hidden p-1 borderStyle border-5px border-solid border-primary">
        <el-avatar :size="size" :src="avatarPath"></el-avatar>
      </div>
      <div class="text-3xl mt-4">{{ name }}</div>
      <div class="text-1xl mt-2" style="color:rgba(107, 114, 128) ;">WELCOME HOLE</div>
    </div>
    <!-- 钱包 -->
    <div class="flex justify-between items-center w-full h-16 bg-primary mt-5 px-4 box-border rounded-2xl">;
      <div class="text-white flex flex-row">
        <div class="mr-2">
          <img src="../../../assets/icon/user/wallet.svg" alt="">
        </div>
        我的钱包
      </div>
      <div class="money w-30 h-10 bg-primary-black rounded-full text-white flex justify-center items-center">50元</div>
    </div>
    <!-- 背景变色区 -->
    <div style="background-color: #f9fafb;" class="ribbon flex-1">
      <!-- 订单 -->
      <div class="flex w-full justify-between">
        <div v-for="(item, index) in orderState" :key="index"
          class="orderState flex flex-col justify-center items-center h-18 w-18 shadow-amber-100 rounded-2xl"
          @click="toOrderPage(index)">
          <img :src="item.iconPath" width="24" height="24" />
          <span class="text-primary mt-1 text-xs">{{ item.name }}</span>
        </div>
      </div>
      <!-- 用户功能 -->
      <div class="">
        <div v-for="item in functionList" :key="item.name" class="flexBC px-5 h-18 bg-white mt-5 rounded-2xl">
          <div class="flex">
            <img :src="item.iconPath" width="24" height="24">
            <span class="ml-5">{{ item.name }}</span>
          </div>
          <img src="../../../assets/icon/common/arrow/right-arrow.svg" alt="">
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 h-25 z-99 w-full ribbon" style="background-color: #f9fafb;"></div>
  </div>
</template>

<script>
import { orderListPath, userPath } from '@/router/path'
export default {
  name:userPath,
  data() {
    return {
      name: "Sheldon",
      size: 120,
      avatarPath: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      //订单状态
      orderState: [
        { name: "全部", iconPath: require('@/assets/icon/user/order/dingdan_dingdanliebiao.svg') },
        { name: "未完成", iconPath: require('@/assets/icon/user/order/jinhangzhong.svg') },
        { name: '进行中', iconPath: require('@/assets/icon/user/order/wj-zd.svg') },
        { name: '已完成', iconPath: require('@/assets/icon/user/order/yiwancheng.svg') }
      ],
      // 功能列表
      functionList: [
        { name: "我的账户", iconPath: require('@/assets/icon/tabBar/user_2_line.svg'), isShow: true },
        { name: "店员申请", iconPath: require('@/assets/icon/common/user/shop.svg'), isShow: false }
      ]
    }
  },
  methods: {
    toOrderPage(name) {
      this.$router.push({
        path: orderListPath,
        query: {
          type: name
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.orderState {
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
}

// 半圆圈
.borderStyle {
  width: 139px;
  height: 139px;
  border-radius: 50%;
  /*以下五个属性为水平垂直居中的方法*/
  box-sizing: border-box;
  border-left-color: transparent;
  border-top-color: transparent;
}

.ribbon{
  margin-right: -$pageMargins ;
  margin-left: -$pageMargins ;
  padding: $pageMargins;
  margin-top: $pageMargins;
}
</style>
