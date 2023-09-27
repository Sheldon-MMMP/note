<template>
  <div ref="tabBar" class="h-16 w-full bg-white rounded-full flex items-center tabBar">
     <div v-for="item in PageButton" :key="item.id" class="flex-1 flex justify-center">
      <router-link v-show="!isSelection(item.id)" :to="item.to"  class="w-full flex justify-center">
        <img :src="item.unActiveIconPath" width="24" height="24" class="mx-auto my-0">
      </router-link>
      <div class="active w-10 h-10 bg-primary rounded-full flex justify-center items-center animate__bounceIn animate__animated" v-show="isSelection(item.id)">
        <img :src="item.ActiveIconPath" width="24" height="24">
      </div>
    </div>
  </div>
</template>

<script>
import { homePath,giftPath,userPath } from '@/router/path';
export default {
  props:{
    current:{
      typeof:[Number],
      default:0
    }
  },
  data() {
    return {
      leftValue:0,
      PageButton:[
        {
          id:0,
          name:"首页",
          unActiveIconPath:require("@/assets/icon/tabBar/home_4_line.svg"),
          ActiveIconPath:require("@/assets/icon/tabBar/home_4_fill.svg"),
          to:homePath
        },
        {
          id:1,
          name:"盲盒",
          unActiveIconPath:require("@/assets/icon/tabBar/gift_line.svg"),
          ActiveIconPath:require("@/assets/icon/tabBar/gift_fill.svg"),
          to:giftPath
        },
        {
          id:2,
          name:"用户",
          unActiveIconPath:require("@/assets/icon/tabBar/user_2_line.svg"),
          ActiveIconPath:require("@/assets/icon/tabBar/user_3_fill.svg"),
          to:userPath
        },
      ]
    }
  },
  computed:{
    isSelection(){
      return index=>this.current=== index;
    }
  },
  mounted(){
    //在刷新时，更新按钮位置
    this.$parent?.changeCurrent(this.$route.path)
  }
}

</script>

<style lang='scss' scoped>
.tabBar{
  box-shadow: 0px 4px 12px 0px rgba(var(--primary-color), 0.1);
}
</style>
