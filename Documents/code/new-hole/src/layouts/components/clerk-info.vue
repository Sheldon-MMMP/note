<template>
  <div class="content border-solid border-primary border-4 rounded-3xl overflow-hidden flex justify-center items-center"
    v-if="clerk.avatar">
    <div class="grade bg-primary text-center text-sm">{{ clerk.level }}</div>
    <div class="image bg-primary-black absolute"></div>
    <img :src="$Url(clerk.avatar)" alt="" class="h-full">
    <div class="absolute bottom-4 text-xl font-medium flex flex-col items-center justify-between"
      style="color:white">
      <clerk-audio v-if="clerk.voicePath" :voicePath="$Url(clerk.voicePath)"></clerk-audio>
      <div class="flex items-center justify-center">
        <div class="flex items-center justify-center">
          <span class="max-w-16 inline-block whitespace-nowrap text-16px">{{ clerk.clerkName }}</span>
          <span class="nowrap max-w-16 inline-block text-center" v-if="clerk.position">,{{ clerk.position }}</span>
        </div>
        <span class="bg-[#15de97] h-2 w-2 inline-block rounded-1 ml-1" v-if="clerk.onlineStatus"></span>
      </div>
      <div class="text-sm text-center">
        <span class="label text-10px" v-for="(itemLabel, index) in clerk.label" :key="index">{{ itemLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import clerkAudio from '@/components/clerk-audio.vue'
export default {
  components: { clerkAudio },
  props: {
    clerk: {
      type: Object,
      default() {
        return {
          clerkName: "未知",
          voicePath: undefined,
          address: "中国",
          onlineStatus: 0,
          label: [],
          avatarPath: ''
        }
      }
    }
  },
}

</script>

<style lang='scss' scoped>
.content {
  position: relative;
  max-height: 18rem;
  min-height: 13rem;
  width: 100%;

  .grade {
    position: absolute;
    left: 50%;
    margin-left: -49.5px;
    top: 0px;
    width: 99px;
    height: 25px;
    border-radius: 0px 0px 1.5rem 1.5rem;
    color: white;
  }

  .image {
    height: 100%;
    width: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(var(--primary-black-color), 1))
  }

  .label::after {
    content: " | ";
  }

  .label:nth-child(2)::after,
  .label:nth-child(4)::after {
    content: "\A";
    white-space: pre;
    /*必须有*/
  }

  /*单行超出*/
  .nowrap {
    /*让长段文本不换行*/
    white-space: nowrap;
    /*设置文本超出元素宽度部分隐藏*/
    overflow-x: hidden;
    /*设置文本超出部分用省略号显示*/
    text-overflow: ellipsis;
    font-size: 16px;
  }
}
</style>
