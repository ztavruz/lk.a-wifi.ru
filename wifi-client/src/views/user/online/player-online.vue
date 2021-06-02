<template>
  <div class="player-main">
    <iframe name="frame" width=100% height=40% style="position:absolute;z-index:-1;"></iframe>
    <canvas class="canvas" id="videoCanvas">
    </canvas>

    <loader></loader>

  </div>
</template>

<script>

import {JSMpeg} from "./../../../libs/jsmpeg.js"
import {mapActions, mapGetters} from 'vuex';
import keys from '../../../../config/keys-client'
import loader from './../../../components/loader'


export default {
  name: "am-player",
  props: {
    data_transport: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      title: "",
      numberCamera: "",
      loaderPlay: true,
      player: {}
    }
  },
  components: {
    loader
  },
  computed: {
    ...mapGetters([
      "CAMERAS_CURRENT_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      "CAMERAS_CURRENT_API"
    ]),
    async startStrim() {

      // this.player = new JSMpeg.Player(`ws://${keys.wifiStreamPlayer}/${this.numberCamera}`, {
      // this.player = new JSMpeg.Player(`ws://86.62.93.213:6853/${this.numberCamera}`, {
      // this.player = new JSMpeg.Player(`wss://lk.a-wifi.ru/stream/${this.numberCamera}`, {
      this.player = new JSMpeg.Player(`ws://lk.a-wifi.ru/stream/${this.numberCamera}`, {
        audio: true,
        autoplay: true,
        pauseWhenHidden: false,
        canvas: document.getElementById('videoCanvas')
      });

    },
    offLoading() {
      frame.onresize = function () {
        frame.onresize = function () {
          let loader = document.querySelector(".loader_section");
          loader.classList.add('hide');
        }
      }
    }
  },
  watch: {},
  async mounted() {
    let cameraId = await localStorage.getItem("currentCamera")
    await this.CAMERAS_CURRENT_API(cameraId);
    this.numberCamera = await this.CAMERAS_CURRENT_STATE.numberCamera;

    //старт стрима
    await this.startStrim();
    //сокрытие прелоадера
    await this.offLoading();

    // await console.log(this.player);
    // await console.log("bytesWritten", this.player.video.bytesWritten);
    // await console.log("canPlay", this.player.video.canPlay);
    // await console.log(document.querySelector(".canvas"));
  },
  async created() {
    if (localStorage.getItem("playerStatus") == "online") {
      let onlineLink = document.querySelector(".catalog-online");
      let archiveLink = document.querySelector(".catalog-archive");
      archiveLink.classList.remove("router-link-active");
      onlineLink.classList.add('router-link-active');
    }

  },
  async beforeDestroy() {
    // await location.reload();
    await document.location.reload();
  }
}
</script>

<style scoped>
.hide {
  display: none;
}

.canvas {
  width: 100%;
  height: auto;
  /*border: 1px solid #000;*/
}

.player-main {
  width: 1170px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-window {
  width: 1170px;
  max-width: 100%;
  /*height: auto;*/

  background: #6C6C6C;
  box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.4);
}

.player-data {
  color: greenyellow;
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