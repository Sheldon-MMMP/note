<template>
  <div class="pageContent">
    <!-- 导航栏 -->
    <go-back color="black" :isCenter="true">订单中心</go-back>
    <div class="px-16px py-15px border-2px border-solid border-[#EEEEEE] rounded-2xl box-border">

      <el-image :src="hintImage" fit="cover" class="h-155px w-full rounded-2xl"></el-image>
      <div class="mt-5">
        <div class="title text-24px">
          {{ pageStyle.title }}
        </div>
        <div class="mt-24px">
          <div class="flex">
            <div class="flex-1">
              <div class="subhead text-[#898989] text-14px mb-10px">名称</div>
              <div class="text-[#120D26] text-18px">{{ orderInfo.userName }}</div>
            </div>
            <div class="flex-1">
              <div class="subhead text-[#898989] text-14px mb-10px">微信号</div>
              <div class="text-[#120D26] text-18px">{{ orderInfo.wechat }}</div>
            </div>
          </div>
          <div class="flex mt-5">
            <div class="flex-1">
              <div class="subhead text-[#898989] text-14px mb-10px">日期</div>
              <div class="text-[#120D26] text-18px">{{ orderInfo.createTime }}</div>
            </div>
            <div>
              <div class="subhead text-[#898989] text-14px mb-10px">时间</div>
              <div class="text-[#120D26] text-18px">{{ orderInfo.createTime }}</div>
            </div>
          </div>
          <div class="mt-5">
            <div class="subhead text-[#898989] text-14px mb-10px">备注</div>
            <div class="text-[#120D26] text-18px">{{ orderInfo.comment }}</div>
          </div>
        </div>
        <div class="py-10px flex justify-center items-center mx-[-35px]">
          <div class="circle circle-right"></div>
          <div class="border-1.5px border-[#DDDDDD] border-dashed flex-1 h-0 mx-3"></div>
          <div class="circle circle-left"></div>
        </div>
        <div class="text-[#9E9E9E] text-14px leading-relaxed text-justify">
          系统提醒：请将用户添加成功后在点击开始接单，在订单结束时，系统将发送信息提醒你订单结束，你结束聊天请用一种缓和的方式结束
        </div>
      </div>
    </div>
    <el-button type="primary" :class="`rounded-2xl w-full mt-16px h-48px bg-${pageStyle.buttonColor}`">{{
      pageStyle.buttonText }}</el-button>
  </div>
</template>

<script>
import goBack from '@/components/go-back.vue';
import { ORDER_DETAIL } from '@/services/api'
export default {
  components: {
    goBack
  },
  data() {
    return {
      hintImage: 'https://api.r10086.com/樱道随机图片api接口.php?自适应图片系列=原神',
      orderInfo: {
        orderType: 0,
        userName: "未知",
        clerkName: "未知",
        createTime: '无',
        comment: "无",
        wechat: "未知"
      },
      pageStyle: { title: "指定单", buttonColor: "primary", buttonText: "开始接单" }
    }
  },
  computed: {
  },
  async beforeCreate() {
    const orderId = this.$route.params?.orderId ?? this.$store.params?.params.orderId??'123123123131';
    if (!orderId) {
      this.$message.error('订单ID不存在');
      return;
    }
    const [val, error] = await ORDER_DETAIL(orderId);
    if (error) {
      this.$message.error(error);
      return;
    }
    for (const key in val.data) {
      if (Object.hasOwnProperty.call(val.data, key)) {
        this.orderInfo[key] = val.data[key];
      }
    }
    if (!this.orderInfo.orderType) {
      this.pageStyle = { title: "盲盒单", buttonColor: "primary-black", buttonText: "抢下订单" };
    }

  }
}

</script>

<style lang='scss' scoped>
.circle {
  border: 2px solid #EEEEEE;
  border-radius: 999px;
  height: 34px;
  width: 34px;
  background-color: #fff;
}

.circle-left {
  clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
}

.circle-right {
  clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
}
</style>
