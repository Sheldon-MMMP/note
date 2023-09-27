<template>
  <div>
    <h2 class="h-8 text-14px font-semibold" style="color: #606266;">上传自己的展示图和头像</h2>
    <div class="w-full">
      <div class="imageList" ref="imageList" :style="{ height: imageListHeight + 'px' }">
        <el-upload action class="avatar-uploader item-1" :show-file-list="false" :on-success="handleAvatarSuccess"
          :on-exceed="(files) => handleImageExceed(files, 1)" :before-upload="beforeAvatarUpload" :multiple="true"
          :http-request="uploadAvatar" :limit="1">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon flexCC"></i>
        </el-upload>
        <el-upload action class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccessSwiper(index)"
          v-for="(item, index) in 5" :key="item" :before-upload="beforeAvatarUpload" :multiple="true"
          :http-request="uploadImage(index)" :on-exceed="(files) => handleImageExceed(files, 1)" :limit="1">
          <img v-if="imageSwiper[index]" :src="imageSwiper[index]" class="avatar-swiper">
          <i v-else class="el-icon-plus avatar-uploader-swiper flexCC"></i>
        </el-upload>
      </div>
      <div class="notification flex mt-5">
        <img src="@/assets/icon/home/notification.svg" alt="">
        <div class="ml-3 text-sm opacity-60">注意:最大的图片上传的是你的头像，其他五个小的上传的是你的展示图</div>
      </div>
    </div>
    <div>
      <h2 class="h-8 text-14px font-semibold mt-5" style="color: #606266;">上传自己的语音</h2>
      <get-voice v-model="$attrs.clerkInfo.voice"></get-voice>
      <div class="ml-3 text-sm opacity-60 mt-5">注意:长按进行录音,录音时间在5-20秒</div>
    </div>
  </div>
</template>

<script>
import getVoice from '@/components/get-voice.vue';
export default {
  components: {
    getVoice
  },
  data() {
    return {
      avatarUrl: '',
      imageSwiper: [],
      imageListHeight: 0,
    };
  },
  methods: {
    // 上传图片的钩子
    uploadImage(index) {
      return (res) => {
        const carouselImage = this.$attrs.clerkInfo.carouselImage
        if (carouselImage.length >= 5) {
          this.$message.error('最多上传5张图片')
          return
        }
        this.$set(carouselImage,index,res.file);
        res.onSuccess()
      }
    },
    uploadAvatar(res) {
      this.$attrs.clerkInfo.avatar = res.file
      res.onSuccess()
    },

    // 上传图片成功之后的钩子
    handleAvatarSuccess(res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw);
    },

    handleAvatarSuccessSwiper(index) {
      return (res,file)=>{
        const url = URL.createObjectURL(file.raw);
        console.log(url);
        this.$set(this.imageSwiper, index, url);
        this.$message.success("上传成功");
      }
    },

    // 上传图片之前的钩子
    beforeAvatarUpload(file) {
      var allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const isJPG = allowedTypes.indexOf(file.type) !== -1;
      const isLt2M = file.size < 20 * 1024 * 1024;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    // 上传图片的数量超过了限制
    handleImageExceed(files, limit) {
      this.$message.warning(`当前限制选择 ${limit} 个文件，本次选择了 ${files.length} 个文件`);
    },
  },

  mounted() {
    const imageListRef = this.$refs.imageList;
    this.imageListHeight = imageListRef.offsetWidth;
    this.imageSwiper = this.$attrs.clerkInfo.carouselImage;
  },

  destroyed() {
    for(let item of this.imageSwiper){
      URL.revokeObjectURL(item);
    }
  },
}

</script>

<style lang="scss" scoped>
.imageList {
  display: grid;
  grid-template-columns: repeat(3, 32%);
  grid-template-rows: repeat(3, 32%);
  grid-gap: 2% 2%;

  .item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
}

::v-deep .avatar-uploader {
  .el-upload {
    width: 100%;
    height: 100%;
  }

  .el-icon-plus {
    border: 1px dashed #d9d9d9;
    border-radius: 16px;
    cursor: pointer;
    position: relative;
  }

  .el-icon-plus:hover {
    border-color: $primary-color;
  }


  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: inherit;
    height: inherit;
  }

  .avatar-uploader-swiper {
    color: #8c939d;
    width: inherit;
    height: inherit;
  }

  .avatar {
    width: inherit;
    height: inherit;
    display: block;
    border: 1px dashed #d9d9d9;
    border-radius: 16px;
  }

  .avatar-swiper {
    width: inherit;
    height: inherit;
    border: 1px dashed #d9d9d9;
    border-radius: 16px;
  }
}
</style>
