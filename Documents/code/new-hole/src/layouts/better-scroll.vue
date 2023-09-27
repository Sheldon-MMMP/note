
<template>
  <div class='flexStyle'>
    <avatar-model @click.native="onClerk(item.clerkId)" class="contentStyle" v-for="item in clerkList" :key="item.id"
    :online="item.onlineStatus" :name="item.clerkName" :avatarPath="item.avatar"></avatar-model>
  </div>
</template>

<script>
import { clerkDetailPath } from '@/router/path';
import avatarModel from '@/layouts/components/avatar-model.vue';
export default {
  components: {
    avatarModel
  },
  props: {
    clerkList: {
      typeof: [Array],
      default: []
    }
  },
  methods: {
    onClerk(clerkId) {
      this.$router.push({
        path:clerkDetailPath,
        query:{
          clerkId,
        }
      })
    }
  },

}
</script>

<style scoped>
.flexStyle {
  height: 7rem;
  display: flex;
  /* 设置超出滚动 */
  overflow-x: auto;
}

.contentStyle {
  display: inline-block;
  margin-right: 1.2rem;
  /* 超出滚动的关键，没有它元素会自动缩小，不会滚动 */
  flex-shrink: 0;
}

::-webkit-scrollbar {
  display: none;
}
</style>
