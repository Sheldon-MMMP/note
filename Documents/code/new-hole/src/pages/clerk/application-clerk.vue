<template>
  <div class="pageContent overflow-hidden flex flex-col" style="background-color: #f9fafb;">
    <go-back :color="'black'" :isCenter="true" class="page-header">
      <h1 class="text-center text-xl">申请店员</h1>
    </go-back>
    <!-- 步骤条 -->
    <div class="flex-1">
      <div class="my-10 h-50px w-100%">
        <el-steps :active="current" align-center finish-status="success">
          <el-step :title="item.name" v-for="item in steps" :key="item.name"></el-step>
        </el-steps>
      </div>
      <!-- 步骤内容 -->
      <div class="relative">
        <transition enter-active-class="animate__slideInRight animate__animated"
          leave-active-class="animate__animated animate__slideOutLeft absolute absolute pageContent">
          <keep-alive>
            <router-view :clerkInfo="clerkInfo" class="w-full router min-h-full mb-5"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <div class="page-footer mb-5">
      <el-button type="primary" class="w-full h-13 !rounded-full" :round="true" @click="onButton">{{
        isComplete ? '完成注册' : "下一步" }}</el-button>
    </div>
  </div>
</template>

<script>
import goBack from '@/components/go-back.vue';
import { CREATE_CLERK } from '@/services/api';
import {
  clerkApplicationBasicPath,
  clerkApplicationWorkPath,
  clerkApplicationFilesPath
} from '@/router/path';
import { dataToFormData } from '@/utility/type-conversion'
export default {
  components: {
    goBack
  },
  data() {
    return {
      // 页面是否完成
      isSwitch: false,
      current: 0,
      steps: [
        { id: 0, name: '基本信息', to: clerkApplicationBasicPath },
        { id: 1, name: '店员信息', to: clerkApplicationWorkPath },
        { id: 2, name: '文件信息', to: clerkApplicationFilesPath }
      ],
      clerkInfo: {
        clerkName: '',
        motto: '',
        sex: 0,
        age: '',
        label: [],
        position: '',
        avatar: 0,
        voice: 0,
        carouselImage: []
      },
    }
  },
  watch: {
    '$route.path': {
      deep: true,
      handler: function (newValue) {
        this.setCurrent(newValue)
      }
    },
  },
  methods: {
    onButton() {
      console.log(this.isComplete);
      if (this.isComplete) {
        this.createClerk()
      } else {
        this.toPage()
      }
    },
    async createClerk() {
      const stepsInfo = ['avatar', 'voice']
      let complete = true;
      for (let item of stepsInfo) {
        if (this.clerkInfo[item] === 0 || this.clerkInfo.carouselImage.length < 0) {
          console.log(this.clerkInfo[item]);
          console.log(this.clerkInfo[item] === 0);
          console.log(this.clerkInfo.carouselImage);
          complete = false
          break;
        }
      }
      if (complete) {
        const formData = dataToFormData(this.clerkInfo)
        console.log(formData.get('carouselImage'));
        const [val, err] = await CREATE_CLERK(formData)
        if (err) {
          return this.$message.error(err)
        }
        console.log(val);
      } else {
        this.$message.error('请填写完整信息')
      }
    },
    toPage() {
      const stepsInfo = [['clerkName', 'motto', 'age'], ['label', 'position']]
      let complete = true;
      if (this.current < this.steps.length - 1) {
        for (let item of stepsInfo[this.current]) {
          if (!this.clerkInfo[item].length) {
            complete = false
            break;
          }
        }
        if (complete) {
          if (this.clerkInfo.age < 18 && this.clerkInfo.age > 40) {
            return this.$message.error('未成年人禁止注册')
          }
          this.current++
          this.$router.push({
            path: this.steps[this.current].to
          })
        } else {
          this.$message.error('请填写完整信息')
        }

      }

    },
    setCurrent(value) {
      const data = this.steps;
      for (let item of data) {
        if (item.to === value) {
          return this.current = item.id
        }
      }
    }
  },
  mounted() {
    this.setCurrent(this.$route.path)
  },
  computed: {
    isComplete() {
      return this.current === this.steps.length - 1
    }
  }
}

</script>

<style lang='scss' scoped>
.router {
  display: inline-block;
  vertical-align: top;
}

.page-header,
.page-footer {
  flex-grow: 0;
  flex-shrink: 0;
}

.pageContent{
  right: $pageMargins*2;
}
</style>
