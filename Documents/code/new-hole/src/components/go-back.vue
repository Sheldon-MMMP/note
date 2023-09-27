<template>
  <div class="py-3 w-full box-border z-999 flex justify-between">
    <div class="border-solid border-1 w-8 h-8 flexCC rounded-full" :class="`${borderColor}`" @click="goBack">
      <img :src="iconPath">
    </div>
    <slot></slot>
    <div class="w-8 h-8" v-if="isCenter"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      iconPath: require("@/assets/icon/common/arrow/goBank_white.svg")
    }
  },
  props: {
    color: {
      type: String,
      default: "white"
    },
    isCenter:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    borderColor() {
      switch (this.color) {
        case 'black':
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.iconPath = require("@/assets/icon/common/arrow/goBank_black.svg")
          return 'border-[rgba(0,0,0,0.4)]';
        case 'white':
        default: 
          return 'border-[rgba(255,255,255,0.4)]';
      }
    }
  }
}

</script>

<style lang='' scoped>

</style>
