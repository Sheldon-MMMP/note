<template>
  <div id="app" class="relative">
    <Transition 
      name="overflow-hidden absolute h-100vh w-100vw v"
      :enter-active-class="`${pageAnimate.animate} ${pageAnimate.enter}`"
      :leave-active-class="`${pageAnimate.animate} ${pageAnimate.leave}`">
      <KeepAlive :include="include" :max="10">
        <router-view></router-view>
      </KeepAlive>
    </Transition>
  </div>
</template>

<script>
import { CLERK_LEVEL_LIST } from '@/services/api'
import { errPath } from './router/path';
export default {
  name: 'App',
  async created() {
    const [val, err] = await CLERK_LEVEL_LIST();
    if (err) return console.error(err);
    this.$store.dispatch('setClerkLevel', val?.data)
  },
  data() {
    return {
      include: ['/'],
      pageAnimate: { enter: 'animate__slideInRight', leave: 'animate__slideOutLeft',animate:"animate__animated" },
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === errPath || from.name === errPath) this.pageAnimate.animate = "";
      else if (to.matched.length < from.matched.length)
        this.pageAnimate = { enter: 'animate__slideInRight', leave: 'animate__slideOutLeft',animate:"animate__animated" }
      else
        this.pageAnimate = { enter: 'animate__slideInLeft', leave: 'animate__slideOutRight',animate:"animate__animated" }
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta?.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
}
</script>

<style lang="scss">
.pageContent {
  padding: 0 $pageMargins;
  min-height: 100vh;
}

input:focus {
  outline: none;
}

button {
  /* 清除默认边框 */
  border: 0;
  outline: none;
  /*清除默认背景 */
  background-color: transparent;
}
</style>
