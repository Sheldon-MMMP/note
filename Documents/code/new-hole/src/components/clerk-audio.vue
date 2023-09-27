<template>
  <div :class="{ playing: isPlaying }" class="custom-audio" @click.stop="togglePlayPause">
    <audio ref="audioPlayer" :src="voicePath" preload="auto" @ended="onEnded" @pause="onPause" @play="onPlay"></audio>
    <div class="audio-icon">
      <img alt="" class="w-3 h-3" height="16" src="@/assets/icon/audio.svg" width="16" />
    </div>
    <div class="progress-bar-icon">
      <img alt="" src="@/assets/icon/acoustic.svg" style="height: 10px" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    voicePath: {
      type: [String],
      default: "",
    },
  },
  data() {
    return {
      isPlaying: false,
      progress: 0,
    };
  },
  methods: {
    togglePlayPause() {
      const audio = this.$refs.audioPlayer;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    onPlay() {
      this.isPlaying = true;
      this.updateProgress();
    },
    onPause() {
      this.isPlaying = false;
    },
    onEnded() {
      this.isPlaying = false;
      this.progress = 0;
    },
    updateProgress() {
      const audio = this.$refs.audioPlayer;
      const duration = audio?.duration;
      const currentTime = audio?.currentTime;
      this.progress = (currentTime / duration) * 100;

      if (currentTime < duration) {
        this.isUpdatingProgress = true;
        requestAnimationFrame(this.updateProgress);
      } else {
        this.isUpdatingProgress = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-audio {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(24px);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 999rem;
  width: 79px;
  padding: 0 5px;
  height: 22px;

  .audio-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

button {
  border: none;
  outline: none;
  cursor: pointer;
}

.progress-bar-icon {
  position: relative;
  flex: 1;
  height: 100%;
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
