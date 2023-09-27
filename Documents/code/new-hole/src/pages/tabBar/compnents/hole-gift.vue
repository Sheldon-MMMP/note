<template>
  <div class="overflow-hidden">
    <!-- 选择性别 -->
    <div>
      <h2 class="text-center text-primary-black font-normal text-xl font-semibold">想要匹配到什么性别的</h2>
      <div class="flex justify-around mt-8">
        <div class="sex flex flex-col justify-around items-center py-5 border-2 border-solid relative "
          :class="{ '!border-primary': isSelectGender(item.id) }" @click="selectGenderFun(item.id)" v-for="item in gender"
          :key="item.id">
          <div class="absolute top-3 right-3">
            <img src="@/assets/icon/gift/select/select.svg" v-show="!isSelectGender(item.id)">
            <img src="@/assets/icon/gift/select/selectAction.svg" v-show="isSelectGender(item.id)">
          </div>
          <div class="h-16 w-16 bg-primary rounded-full flex justify-center items-center">
            <img :src="item.iconPath" width="28" height="28" />
          </div>
          <span class="text-primary-black text-xl">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <!-- 想要她陪你能做什么 -->
    <div class="mt-10">
      <h2 class="text-center text-primary-black font-normal text-xl font-semibold   ">想要她能陪你做些什么</h2>
      <div class="flex flex-wrap items-center justify-center">
        <div v-for="(item, index) in label" :key="index" class="flex items-center px-3 h-10 label m-2"
          :class="{'bg-primary text-white !border-primary':isSelectLabel(item.id)}" 
          @click="selectLabelFun(item.id)">
          <img :src="item.iconPath" width="24" height="24" class="m-2">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <span class="my-3 inline-block">其他要求</span>
      <div class="w-full">
        <input type="text" v-model="otherLabel"
          class="border-solid border-2 border-primary rounded-2xl h-13 text-base px-4 box-border w-full"
          placeholder="以上没有你想要的，可以在这里添加">
      </div>
    </div>
    <!-- 用户信息 -->
    <span class="my-3 inline-block">微信号</span>
    <div class="w-full overflow-hidden">
      <input type="text" v-model="wechat"
        class="border-solid border-2 border-primary rounded-2xl h-13 text-base px-4 box-border w-full"
        placeholder="请你填写你的微信号或者手机号">
    </div>
    <button type="submit"
      class="mt-10 box-border bg-primary text-white w-full h-15 rounded-2xl button text-base font-semibold"
      style="font-family: HarmonyOS;">随机匹配</button>
  </div>
</template>

<script>
import { giftPath } from '@/router/path';
export default {
  name:giftPath,
  data() {
    return {
      //微信
      wechat: '',
      // 标签
      otherLabel: "",
      label: [
        { id: 1, name: "Gaming", iconPath: "https://imgapi.cn/api.php" },
        { id: 2, name: "Gaming", iconPath: "https://imgapi.cn/api.php" },
        { id: 3, name: "Gaming", iconPath: "https://imgapi.cn/api.php" },
        { id: 4, name: "Gam", iconPath: "https://imgapi.cn/api.php" },
        { id: 5, name: "12", iconPath: "https://imgapi.cn/api.php" },
        { id: 6, name: "Gaming", iconPath: "https://imgapi.cn/api.php" },
        { id: 7, name: "Gag", iconPath: "https://imgapi.cn/api.php" },
        { id: 8, name: "Gaming", iconPath: "https://imgapi.cn/api.php" },
        { id: 9, name: "Gamdfsajhlk1g", iconPath: "https://imgapi.cn/api.php" },
        { id: 10, name: "Gaming", iconPath: "https://imgapi.cn/api.php" },
        { id: 11, name: "Gami", iconPath: "https://imgapi.cn/api.php" },
        { id: 12, name: "Gaming", iconPath: "https://imgapi.cn/api.php" },
        { id: 13, name: "Gam", iconPath: "https://imgapi.cn/api.php" },
      ],
      selectLabel: [],
      //性别信息
      gender: [
        { id: 0, name: "女", iconPath: require("@/assets/icon/common/user/male_line.svg") },
        { id: 1, name: "男", iconPath: require("@/assets/icon/common/user/female_line.svg") },
      ],
      selectGender: 0
    }
  },
  methods: {
    selectGenderFun(index) {
      this.selectGender = index;
    },
    selectLabelFun(id) {
      const index = this.selectLabel.indexOf(id);
      if (index === -1) {
        this.selectLabel.push(id);
      } else {
        this.selectLabel.splice(index, 1);
      }
    }
  },
  computed: {
    isSelectGender() {
      return index => index === this.selectGender
    },
    isSelectLabel() {
      return index => this.selectLabel?.some(item=>item===index)
    }
  }
}

</script>

<style lang='scss' scoped>
.sex {
  width: 156px;
  height: 156px;
  box-sizing: border-box;
  border-color: rgba(var(--primary-color), 0.2);
  box-shadow: 0px 2px 20px 0px rgba(117, 34, 119, 0.04);
  border-radius: 24px;
}

.label {
  box-sizing: border-box;
  border: 1px solid rgba(var(--primary-black-color), 0.2);
  border-radius: 32px;
}

.button {
  display: inline-block;
  padding: 1em 2em;
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 25px var(--primary-color);
  outline: 0;
  transition: transform ease-in 0.1s, background-color ease-in 0.1s, box-shadow ease-in 0.25s;
}

.button::before {
  position: absolute;
  content: '';
  left: -2em;
  right: -2em;
  top: -2em;
  bottom: -2em;
  pointer-events: none;
  background-repeat: no-repeat;
  background-image: radial-gradient(circle, rgba(var(--primary-color), 1), transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    /*  */
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%),
    radial-gradient(circle, rgba(var(--primary-color), 1) 20%, transparent 20%);
  background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%, 100% -2%, -5% 80%,
    100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%, 100% 100%;
  background-size: 0% 0%;
  transition: background-position .5s ease-in-out, background-size .75s ease-in-out;
}

.button:active::before {
  transition: 0s;
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%,
    15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,
    83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%;
}
</style>
