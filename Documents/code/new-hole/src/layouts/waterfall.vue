<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-masonry transition-duration="0.3s" i tem-selector=".item" :gutter="20">
    <div ref="clerkInfo" v-masonry-tile class="box" style="width:47%;" v-for="(item, index) in clerkList" :key="index" @click="onClerk(item.clerkId)">
      <clerk-info :clerk="item"></clerk-info>
    </div>
  </div>
</template>

<script>
import { clerkDetailPath } from '@/router/path';
import clerkInfo from '@/layouts/components/clerk-info.vue';
export default {
  components: {
    clerkInfo
  },
  props: {
    clerkList: {
      type:Array,
      default(){
        return []
      },
    },
  },
  data() {
    return {
    }
  },
  methods:{
    onClerk(clerkId){
      this.$router.push({
        path:clerkDetailPath,
        query:{
          clerkId,
        }
      })
    }
  }
}

</script>

<style lang='scss' scoped>
.box {
  margin-bottom: 8px
}
.gutter-block-selector{
  margin-right: 20px;
}
</style>

