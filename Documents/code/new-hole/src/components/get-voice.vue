<!-- eslint-disable no-undef -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div class="flex justify-center flex-col items-center">
    <div class="flex justify-around w-full">
      <div @touchstart="startRecording" @touchend="stopRecording"
        class="flex justify-center items-center bg-primary rounded-full w-64px h-64px">
        <img src="@/assets/icon/common/record.svg" alt="" srcset="">
      </div>
      <div class="recwave w-120px h-64px" v-show="isRecorded"></div>
      <div class="w-120px h-64px" v-show="!isRecorded">
        <div class="flex justify-center items-center bg-primary rounded-full w-64px h-64px mx-auto"
          @click="handlePlaying">
          <img src="@/assets/icon/common/play_fill.svg" alt="" srcset="" v-show="!isPlay">
          <img src="@/assets/icon/common/pause_fill.svg" alt="" srcset="" v-show="isPlay">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Recorder from 'recorder-core'
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'
import '@/utility/waveview'

var audio = document.createElement("audio");
document.body.prepend(audio);
audio.style.display = 'none'
audio.controls = true;

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      value: 0,
      playTime: 0,
      isPlay: false,
      isRecorded: true,
      recorder: null,
      recOpen: false,
      recorderTime: 0,
    }
  },
  methods: {
    async startRecording() {
      if (this.isPlay) {
        audio.pause();// 暂停播放
      }

      this.recorder.start();
      this.isRecorded = true
    },
    stopRecording() {
      const _this = this;
      this.recorder.stop(function (blob, duration) {
        //简单利用URL生成本地文件地址，注意不用了时需要revokeObjectURL，否则霸占内存
        // console.log(blob,localUrl,"时长:"+duration+"ms");

        //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传、下载保存);
        if (duration > 5000) {
          _this.value = blob
          _this.recorderTime = duration
          _this.isRecorded = false
        } else {
          _this.value = null
          _this.$message.warning('录音时间太短')
        }
      }, function (msg) {
        _this.$message.error("录音失败:" + msg);
      });

    },

    handlePlay() {
      if (this.value) {
        var localUrl = (window.URL).createObjectURL(this.value);
        audio.src = localUrl;
        audio.play();
        this.isPlay = true
        setInterval(() => {
          this.isPlay = false
        }, this.recorderTime)
      } else {
        this.isPlay = false
        this.$message.warning('请先录音')
      }

    },
    handlePausePlay() {
      audio.pause();// 暂停播放
      this.isPlay = false
    },
    handlePlaying() {
      if (this.isPlay) {
        this.handlePausePlay()
      } else {
        this.handlePlay()
      }
    }
  },
  watch:{
    value:{
      handler:function(val){
        this.$emit('input',val)
      },
      deep:true
    }
  },
  mounted() {
    let wave;
    const _this = this
    this.recOpen = function (success) {//一般在显示出录音按钮或相关的录音界面时进行此方法调用，后面用户点击开始录音时就能畅通无阻了
      _this.recorder = Recorder({ //本配置参数请参考下面的文档，有详细介绍
        type: "mp3", sampleRate: 16000, bitRate: 16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
        , onProcess: function (buffers, powerLevel, bufferDuration, bufferSampleRate) {
          //录音实时回调，大约1秒调用12次本回调，buffers为开始到现在的所有录音pcm数据块(16位小端LE)
          //可利用extensions/sonic.js插件实时变速变调，此插件计算量巨大，onProcess需要返回true开启异步模式
          //可实时上传（发送）数据，配合Recorder.SampleData方法，将buffers中的新数据连续的转换成pcm上传，或使用mock方法将新数据连续的转码成其他格式上传，可以参考文档里面的：Demo片段列表 -> 实时转码并上传-通用版；基于本功能可以做到：实时转发数据、实时保存数据、实时语音识别（ASR）等
          //可实时绘制波形（extensions目录内的waveview.js、wavesurfer.view.js、frequency.histogram.view.js插件功能）

          wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate);//输入音频数据，更新显示波形
        }
      });
      //var dialog=createDelayDialog(); 我们可以选择性的弹一个对话框：为了防止移动端浏览器存在第三种情况：用户忽略，并且（或者国产系统UC系）浏览器没有任何回调，此处demo省略了弹窗的代码
      _this.recorder.open(function () {//打开麦克风授权获得相关资源
        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
        //rec.start() 此处可以立即开始录音，但不建议这样编写，因为open是一个延迟漫长的操作，通过两次用户操作来分别调用open和start是推荐的最佳流程
        //创建可视化，指定一个要显示的div
        if (Recorder.WaveView) wave = Recorder.WaveView({ elem: ".recwave", width: 600, height: 100, volume: 2, volumeHeight: 60, speed: 2, speedHeight: 60, speedColor: "#dd88cf", volumeColor: "#fff" });
        success && success();
      }, function (msg, isUserNotAllow) {//用户拒绝未授权或不支持
        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
        _this.$message.error((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
      });
    };
    this.recOpen();
  }
}

</script>

<style lang='' scoped>

</style>

