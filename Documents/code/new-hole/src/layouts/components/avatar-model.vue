<template>
  <div class="flex flex-col items-center"> 
    <div class="avatar border-primary rounded-full p-3px box-border h-16 w-16 relative overflow-hidden" :class="{'border-3':online}">
      <el-avatar :size="size" :src="$Url(avatarPath)" :class="{'onlineAni':online}"></el-avatar>
    </div>  
    <div class="mt-2 size text-base text-center">{{name}}</div>
  </div>
</template>

<script>
export default {
  props:{
    name:[String],
    size: [Number,String],
    online:{
      type:[Number],
      default:0
    },
    avatarPath:{
      type:String,
      default:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    }
  },
}

</script>

<style lang='scss' scoped>
.el-avatar ::v-deep{
  width: 100%;
  height: 100%;
}
.onlineAni{
  animation: pulse; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
</style>

