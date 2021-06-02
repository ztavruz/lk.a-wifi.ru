<template>
  <div class="newTransport">

    <div class="mainTitle">
      <h3>ПЕРЕАДРЕСАЦИЯ КАМЕРЫ {{this.GOD_CAMERAS_CURRENT_STATE.nameCamera}}</h3>
    </div>

    <div class="toReturn">
      <btn-neon
          btn-text="НАЗАД"
          btn-link="godCameras"
      ></btn-neon>
    </div>


    <div class="mainBody">
      <form-redirect-camera
        @resData="success"

      ></form-redirect-camera>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import formRedirectCamera from './formRedirectCamera'
import btnNeon from '../../../components/link_neon'


export default {
  name: "redirectCamera",
  props: {},
  data() {
    return {
      title: "",
      successMessage: '',
    }
  },
  components: {
    formRedirectCamera,
    btnNeon
  },
  computed: {
    ...mapGetters([
      "GOD_CAMERAS_CURRENT_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_CAMERAS_CURRENT_API"
    ]),
    success(data){
      console.log(data)
      this.successMessage = data
    }
  },
  async mounted() {
    let cameraId = await localStorage.getItem('currentCamera')
    await this.GOD_CAMERAS_CURRENT_API(cameraId);
    this.redirectCamera = this.GOD_CAMERAS_CURRENT_STATE;
  },
  async created() {

    let cameraId = await localStorage.getItem('currentCamera')
    await this.GOD_CAMERAS_CURRENT_API(cameraId);
    this.redirectCamera = this.GOD_CAMERAS_CURRENT_STATE;

  }
}
</script>

<style scoped>

.newTransport {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
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
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}


</style>