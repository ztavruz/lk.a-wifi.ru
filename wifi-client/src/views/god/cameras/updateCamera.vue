<template>
  <div class="newTransport">

    <div class="mainTitle">
      <h3>ИЗМЕНЕНИЕ КАМЕРЫ</h3>
    </div>

    <div class="toReturn">
      <btn-neon
          btn-text="НАЗАД"
          btn-link="godCameras"
      ></btn-neon>
    </div>


    <div class="mainBody">
      <form-update-camera
        @resData="success"
        :updateCamera="this.GOD_BUILDS_CURRENT_STATE"
      ></form-update-camera>
    </div>
    <div class="fields-item__error"
         v-if="successMessage != ''">
      <h3>Транспорт {{successMessage.numberTC}} успешно зарегистрирован...</h3>
      <h4>с номером ВНТО ({{successMessage.VNTO}})</h4>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import formUpdateCamera from './formUpdateCamera'
import btnNeon from '../../../components/link_neon'


export default {
  name: "updateTransport",
  props: {},
  data() {
    return {
      title: "",
      successMessage: ''
    }
  },
  components: {
    formUpdateCamera,
    btnNeon
  },
  computed: {
    ...mapGetters([
      "GOD_BUILDS_CURRENT_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_BUILDS_CURRENT_API"
    ]),
    success(data){
      console.log(data)
      this.successMessage = data
    }
  },
  mounted() {

  },
  async created() {
    let transportId = await localStorage.getItem("currentTransport")
    // if(){}
    let currentTransport = await this.GOD_TRANSPORTS_CURRENT_API(transportId);
    await console.log(currentTransport);
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