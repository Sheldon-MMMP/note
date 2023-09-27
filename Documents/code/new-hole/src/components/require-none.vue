<template>
  <div class="px-5 h-100% flexCC flex-col">
    <img src="@/assets/illustrations/null-data.svg" alt="" class="max-w-80%">
    <div class="text-primary-black text-2xl text-center mt-10 tracking-0.5em">{{ msg }}</div>
    <div class="flexCC mt-10">
      <button class="w-30 h-10 rounded-full bg-primary text-white" @click="refresh">重新刷新</button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    msg:{
      type:String,
      default:"未知错误"
    }
  },
  methods:{
    refresh(){
      location.reload();
    }
  }
}

</script>

<style lang='' scoped>

</style>
