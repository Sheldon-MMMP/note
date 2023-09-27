<template>
  <div class="content">
    <img alt="" height="300" src="@/assets/illustrations/404.svg" width="300" />
    <div class="promptText">{{ setMsg }}</div>
    <el-button type="primary" class="mt-5 w-[80%]" @click="reload">重新加载</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    setMsg() {
      return this.$route.params.msg??this.$store.state.params.params.msg??'未知错误';
    },
  },
  methods: {
    reload() {
      this.$router.go(-1);
      setTimeout(() => {
        location.reload()
      }, 500);
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .promptText {
    font-size: 1.5rem;
    margin-top: 5rem;
    color: #999;
  }
}
</style>
