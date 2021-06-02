<template>
  <div class="cameras">
    <div class="mainTitle">
      <h3
          v-if="this.$route.params.isTransport"
      >Камеры объекта: {{ this.GOD_TRANSPORTS_CURRENT_STATE.numberTC }}</h3>

      <h3
          v-else-if="this.$route.params.isBuild"
      >Камеры объекта: {{ this.GOD_BUILDS_CURRENT_STATE.VNTO }}</h3>
    </div>

    <div class="addNew">
      <link-neon
          btn-text="Зарегистрировать камеру"
          btn-link="newCamera"
          class-icon="fa fa-plus"
      ></link-neon>
    </div>

    <div class="mainBody"
         v-if="this.$route.params.isTransport">
      <!--      for transport list-->
      <router-link
          v-for="camera in this.GOD_TRANSPORTS_CAMERAS_STATE"
          :key="camera._id"
          tag="div"
          :to="{name: `currentCamera`, params: {id: camera._id }}"
      >
        <card-camera
            :camera="camera"
        ></card-camera>
      </router-link>
    </div>

    <div class="mainBody"
         v-else-if="this.$route.params.isBuild"
    >
      <!--      for builds list-->
      <router-link
          v-for="camera in this.GOD_BUILDS_CAMERAS_STATE"
          :key="camera._id"
          tag="div"
          :to="{name: `currentCamera`, params: {id: camera._id }}"
      >
        <card-camera
            :camera="camera"
        ></card-camera>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import cardCamera from './cardCamera'
import linkNeon from '../../../components/link_neon'

export default {
  name: "cameras",
  props: {},
  data() {
    return {
      title: "",
    }
  },
  components: {
    cardCamera,
    linkNeon
  },
  computed: {
    ...mapGetters([
      "GOD_TRANSPORTS_CURRENT_STATE",
      "GOD_BUILDS_CURRENT_STATE",
      "GOD_TRANSPORTS_CAMERAS_STATE",
      "GOD_BUILDS_CAMERAS_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_TRANSPORTS_CAMERAS_API",
      "GOD_BUILDS_CAMERAS_API"
    ]),
  },
  async mounted() {

  },
  async created() {
    // проверка типа объекта(транспорт или строение или ...)
    if (this.$route.params.isTransport) {
      let transportId = await localStorage.getItem('currentTransport')
      await this.GOD_TRANSPORTS_CAMERAS_API(transportId);
    }

    if (this.$route.params.isBuild) {
      let buildId = await localStorage.getItem('currentBuild')
      let buildCameras = await this.GOD_BUILDS_CAMERAS_API(buildId);
      await console.log("buildCameras :", buildCameras.response);
    }
    await console.log(this.$route.params);

  }
}
</script>

<style scoped>

.cameras {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.mainTitle {
  display: flex;
  min-width: 30%;
  justify-content: center;
  align-items: center;
  border: 2px dashed #21ebff;
  margin: 20px 0;
  padding: 0 20px;
}

.mainBody {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}


</style>