<template>
  <div class="player-main">
    <div class="player-window ">
      <video id="video" width="100%" height="auto" autoplay="autoplay" controls="controls">
        <source :src="fileHost" type='video/mp4;'>
      </video>
    </div>
    <div class="player-data ">
    </div>
  </div>
</template>

<script>
import keys from '../../../../config/keys-client'
import HELPER from './../../../libs/helper'

export default {
  name: "am-player",
  props: {
    data_video: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      fileHost: "",

      arrayDate: [],
      numberCamera: "",
      folderYear:   "",
      folderMonth:  "",
      folderDay:    "",
    }
  },
  components: {},
  computed: {
    timeVideo() {
      let videoNode = window.document.querySelector('#video').duration;

      return parseInt(videoNode);
    }
  },
  methods: {},
  watch: {},
  async mounted() {
    // await console.log(this.data_video);
    this.folderYear = this.arrayDate[0]
    this.folderMonth = this.arrayDate[1]
    this.folderDay = this.arrayDate[2]
    await console.log(this.folderYear);
    await console.log(this.folderMonth);
    await console.log(this.folderDay);

    // this.fileHost = `${keys.apiHost}${keys.videosRoutes}/${this.data_video.filename}`;
    this.fileHost = `${keys.apiHost}${keys.videosRoutes}/${this.numberCamera}_${this.folderYear}_${this.folderMonth}_${this.folderDay}_${this.data_video.filename}`;
    await console.log(this.fileHost);


  },

  async created() {
    let timepoint = localStorage.getItem("timepoint");
    this.numberCamera = localStorage.getItem("numberCamera");
    this.arrayDate = HELPER.splitString(timepoint, "-");



    if (localStorage.getItem("playerStatus") == "archive") {
      let currentLink = await document.querySelector(".catalog-archive");
      await currentLink.classList.add('router-link-active');
    }
  },
}
</script>

<style scoped>
.player-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.player-window {
  width: 1170px;
  max-width: 100%;
  height: auto;

  background: #6C6C6C;
  box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.4);
}

.player-track {
  width: 110px;
  height: 100px;
}

.player-data {
  color: greenyellow !important;
  font-size: 24px;
}

@media screen and (min-width: 100px) and (max-width: 600px) {
  .player-main {
    width: 1170px;
    max-width: 98%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>