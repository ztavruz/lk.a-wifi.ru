<template>
  <div class="newCamera">

    <div class="mainTitle">
      <h3>РЕГИСТРАЦИЯ КАМЕРЫ</h3>
    </div>

    <div class="toReturn">
      <link-neon
          btn-text="НАЗАД"
          btn-link="godCameras"
      ></link-neon>
    </div>

<!--    Camera:-->
<!--    {-->
<!--    _id:                  		String, (на сервере)-->
<!--    transportId:		String,-->
<!--    addressUrlOnline:	String,-->
<!--    numberCamera:	String,-->
<!--    registrationTime: 	Number (date timestamp на сервере)-->
<!--    },-->

    <div class="mainBody">
      <form-camera
        @resData="success"
      ></form-camera>
    </div>
    <div class="fields-item__error"
         v-if="successMessage != ''">
      <h3>Траняпорт {{successMessage.numberTC}} успешно зарегистрированна...</h3>
      <h4>с номером ИНН ({{successMessage.INN}})</h4>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import formCamera from './formCamera'
import linkNeon from '../../../components/link_neon'


export default {
  name: "newCamera",
  props: {},
  data() {
    return {
      title: "",
      successMessage: ''
    }
  },
  components: {
    formCamera,
    linkNeon
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      ""
    ]),
    success(data){
      console.log(data)
      this.successMessage = data
    }
  },
  mounted() {

  },
  created() {

  }
}
</script>

<style scoped>

.newCamera {
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