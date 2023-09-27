<template>
  <div>
    <!-- 错误页面 -->
    <template v-if="notClerk">
      <div>
        <go-back :color="black" />
        <require-none msg="没有这个店员"></require-none>
      </div>
    </template>
    <template v-else>
      <div class="relative">
        <!-- 顶部栏 -->
        <go-back ref="goBack" class="fixed px-3">
          <div
            class="text-white rounded-full px-3 border-solid border-2 box-sizing custom-audio flex justify-center text-xs h-8">
            <img src="@/assets/icon/distance.svg" alt="" class="mr-1" height="12" width="12">
            {{ positionShow }}
          </div>
        </go-back>
        <!-- 用户照片展示轮播图 -->
        <div class="swiper w-full overflow-hidden h-100 fixed" id="swiper1">
          <div class="swiper-wrapper">
            <div class="swiper-slide w-full flexCC" v-for="(item, index) in clerkInfo.carouselList" :key="index">
              <img :src="$Url(item)" alt="" class="w-full">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <!-- 店员信息 -->
        <div class="absolute w-full bg-white z-99 rounded-t-4xl swipe-container box-border flex flex-col"
         style="box-shadow:0 4rem 10rem 10rem rgba(var(--primary-color),0.6);"
          :style="{ top: imageSpacePX, height: infoHeight }">
          <el-skeleton :rows="10" animated class="mt-10" v-if="loading" />
          <template v-else>
            <div class="relative w-full h-9 flex justify-center items-center">
              <!-- 样式滑块 -->
              <div class="w-20 h-1.5 rounded-full" style="background-color: #E5E6EB;"></div>
              <!-- 用户名称 -->
              <div class="absolute text-white -top-18">
                <div class="flexAC flex-row">
                  <span class="text-2xl text-center">{{ clerkInfo.clerkName }}</span>
                  <clerk-audio :voicePath="$Url(clerkInfo.voicePath)"></clerk-audio>
                </div>
                <div class="text-center">欢迎您，来到我的店铺</div>
              </div>
            </div>
            <!-- 店员内容 -->
            <div :class="['flex-1 px-5', { 'overflow-x-scroll': isScrollBottom }]">
              <!-- 个人介绍 -->
              <div>
                <div class="Classification">个人介绍</div>
                <div class="text-size-16px w-full border-0">
                  {{ clerkInfo.motto }}
                </div>
              </div>
              <!-- 标签 -->
              <div>
                <div class="Classification">标签</div>
                <label-component class="mr-2" v-for="item in clerkInfo.label" :key="item" :item="item"></label-component>
              </div>
              <!-- 基本信息 -->
              <div class="bg-primary-light flex justify-around py-5 -mx-5 mt-6">
                <div v-for="(item, index) in displayInfoList" :key="index"
                  class="flex justify-center flex-col items-center">
                  <div class="rounded-full h-12 w-12 flex justify-center items-center bg-primary">
                    <img :src="item.iconPath" width="24" height="24">
                  </div>
                  <span class="mt-3 opacity-50 text-xm leading-normal" style="color: #4B164C;">{{ item.name }}</span>
                  <span class="text-primary-black text-18px leading-normal" v-if="item.key !== 'sex'">{{
                    clerkInfo[item.key]
                  }}</span>
                  <span class="text-primary-black text-18px leading-normal" v-else>{{ clerkInfo[item.key] ? "男" : '女'
                  }}</span>
                </div>
              </div>
              <!-- 价格表 -->
              <ul class="p-0 relative m-5" v-if="price.length">
                <div class="absolute w-30 rounded-t-full -z-1 min-h-full pb-30 box-content"
                  style="background: linear-gradient(180deg, rgba(var(--primary-color)) 40%, rgba(255,124,233,0) 100%);">
                </div>
                <div class="h-15 text-right text-primary-black text-xl">价格表</div>
                <li v-for="(value, key) in price" :key="key" class="flex flex-row w-full mt-5">
                  <span class="w-30 text-white text-center text-18px">{{ value.name }}</span>
                  <div class="flex-1">
                    <div v-for="(item, itemKey) in  value.childrenList" :key="itemKey"
                      class="flex flex-row flex-auto items-center pl-5 box-border mb-3">
                      <span class="text-primary-black">{{ item.name }}</span>
                      <div class="flex-1 border-1 border-primary-black border-dashed mx-3"></div>
                      <span class="text-primary-black">{{ item.price }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </div>
        <!-- 底部按钮 -->
        <div class="fixed bottom-3 w-full z-999 flex justify-center">
          <div class="h-20 w-60 bg-white rounded-full flex justify-around items-center" style="
        box-shadow: 8px 0px 40px 0px rgba(117, 34, 119, 0.15);">
            <div v-for="buttonItem in bottomButton" :key="buttonItem.name"
              class="h-15 w-15 flex justify-center items-center rounded-1" :class="[buttonItem.bgClass]"
              style="box-shadow: 0px 8px 40px 0px rgba(75, 22, 76, 0.2);" @click="onBottom(buttonItem.name)">
              <img :src="buttonItem.iconPath" alt="">
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import 'swiper/css/swiper.min.css';
import 'swiper/js/swiper.min';
import Swiper from 'swiper';
import goBack from '@/components/go-back.vue';
import { CLERK_INFO_MES, PRICE_TABLE } from '@/services/api'
import requireNone from '@/components/require-none.vue';
import clerkAudio from '@/components/clerk-audio.vue';
import labelComponent from '@/components/label.vue';
const viewportHeight = window.innerHeight;
// 获取1rem的值
const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
// 计算8rem的像素值
const remInPixels20 = 20 * remValue;
const remInPixels8 = 8 * remValue;
const resultInPixels = viewportHeight - remInPixels8;
export default {
  async beforeCreate() {
    const id = this.$route.query.clerkId;
    const [val, err] = await CLERK_INFO_MES({ id })
    if (err || val.code === 4004) {
      this.notClerk = true
      console.warn(err);
    } else {
      const data = val.data
      for (let item in this.clerkInfo) {
        this.clerkInfo[item] = data[item];
      }
      const img = new Image();
      let imageLoadComplete = 0;
      img.src = data.carouselList[0];
      img.onload = () => {
        this.imageSpace = remInPixels20;
      }
      this.loading = false;
    }
    const Level = this.clerkInfo.level
    const [priceData, error] = await PRICE_TABLE({ Level })
    if (error) {
      console.error(error)
    } else {
      this.price = priceData.data;
    }
  },
  components: {
    goBack,
    requireNone,
    clerkAudio,
    labelComponent
  },
  data() {
    return {
      // 加载动画
      loading: true,
      // 是否显示订单选择页
      orderMenuIsShow: false,
      notClerk: false,
      // 底部导航栏
      bottomButton: [
        { name: "不喜欢", iconPath: require("@/assets/icon/clerkDetail/un-like.svg"), bgClass: "bg-white" },
        { name: "喜欢", iconPath: require("@/assets/icon/clerkDetail/like.svg"), bgClass: "bg-primary" }
      ],
      //是否启用店员内部滚动
      isScrollBottom: false,
      //店员信息区域覆盖图片的距离，越高覆盖越少
      imageSpace: remInPixels8,
      // 店员信息展示的高度
      infoHeight: "81vh",
      // 店员信息
      clerkInfo: {
        clerkName: "未知名称",
        motto: '',
        carouselList: [],
        level: "",
        onlineStatus: '',
        voicePath: '',
        position: "",
        sex: "",
        label: [],
        age: "",
      },
      displayInfoList: [
        { name: "性别", iconPath: require("@/assets/icon/common/user/female_line.svg"), key: "sex" },
        { name: "年龄", iconPath: require("@/assets/icon/common/user/age.svg"), key: "age" },
        { name: "等级", iconPath: require("@/assets/icon/common/user/level.svg"), key: 'level' }
      ],
      price: []
    }
  },
  computed: {
    imageSpacePX() {
      return this.imageSpace + 'px'
    },
    positionShow() {
      const position = this.clerkInfo.position
      return position ? position : "中国"
    }
  },
  methods: {
    //底部按钮处理函数
    onBottom(name) {
      switch (name) {
        case this.bottomButton[0].name: this.$refs.goBack.goBack(); break;
        case this.bottomButton[1].name: this.$router.push(); break;
      }
    },
    // 返回上一个页面
    Scrollbottom() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = resultInPixels + remInPixels20 - 100;
      if (scrollTop + clientHeight >= scrollHeight) {
        return this.isScrollBottom = true;
      }
      this.isScrollBottom = false;
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.Scrollbottom) //页面离开后销毁监听事件
  },
  mounted() {
    window.addEventListener('scroll', this.Scrollbottom);  //页面加载时监听滚动事件
    // 计算结果（单位为像素）
    this.infoHeight = resultInPixels + "px";
    //设置轮播图动画
    new Swiper("#swiper1", {
      direction: "horizontal",
      speed: 800,
      loop: true,
      autoplay: true,
      observer: true,
      observeParents: true,
      effect: "slide",
      slidesPerView: "auto",
      centeredSlides: true,
      pagination: { el: '.swiper-pagination' }
    });
  }
}

</script>

<style lang='scss' scoped>
#swiper-container {
  position: relative;
  width: 100%;
}

.custom-audio {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: saturate(180%) blur(20px);
  border-color: rgba(255, 255, 255, 0.2);
}

/* 添加transition属性，使top值变化时有动画效果 */
.swipe-container {
  transition: top 0.8s ease;
  /* 0.3秒动画效果，可以根据需要调整 */
}

.Classification {
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0px;
  color: rgba(34, 23, 42, 0.5);
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
