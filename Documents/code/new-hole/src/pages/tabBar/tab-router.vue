<template>
  <div class="pageContent flex flex-col" :class="{ 'isHome': current == 0 }">
    <div ref="pageContent">
      <transition leave-from-class="animate__animated animate__fadeIn animate__faster"
      enter-from-class="animate__animated animate__fadeOut animate__faster">
        <keep-alive>
          <router-view class="pb-25 min-h-100vh"></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="fixed bottom-5 z-99999" :style="{ width: widthTabBar }">
      <tabBar-bottom :current="current" ref="tabBar"></tabBar-bottom>
    </div>
  </div>
</template>

<script>
import tabBarBottom from '@/pages/tabBar/compnents/tabBar-bottom.vue';
export default {
  name:"/",
  components: {
    tabBarBottom,
  },
  data() {
    return {
      widthTabBar: "0px",
      current: 0,
      //子元素的宽度
    }
  },
  methods: {
    changeCurrent(newValue) {
      const data = this.$refs.tabBar.PageButton;
      for (let item of data) {
        if (item.to === newValue) {
          return this.current = item.id
        }
      }
    },
    setTabBarWidth() {
      const element = this.$refs.pageContent;
      this.widthTabBar = element.offsetWidth + 'px'
    }
  },
  watch: {
    '$route.path': {
      deep: true,
      handler: function (newValue) {
        this.changeCurrent(newValue)
      }
    },
  },
  mounted() {
    this.setTabBarWidth()
    window.addEventListener('resize', this.setTabBarWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.setTabBarWidth)
  },
}

</script>

<style lang='scss' scoped>
.isHome {
  background-color: #fdf7fd;
}
</style>
