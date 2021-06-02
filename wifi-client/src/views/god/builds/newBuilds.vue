<template>
  <div class="newBuilds">

    <div class="mainTitle">
      <h3>РЕГИСТРАЦИЯ ЗДАНИЯ</h3>
    </div>

    <div class="toReturn">
      <btn-neon
          btn-text="НАЗАД"
          btn-link="godBuilds"
      ></btn-neon>
    </div>

    <div class="mainBody">
      <form-new-build
          @resData="success"
      ></form-new-build>
    </div>

    <div class="fields-item__error"
         v-if="successMessage != ''">
      <h3>Здание {{ successMessage.numberTC }} успешно зарегистрированно...</h3>
      <h4>с номером ВНТО ({{ successMessage.VNTO }})</h4>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import formNewBuild from './formNewBuilds'
import btnNeon from '../../../components/link_neon'


export default {
  name: "newBuild",
  props: {},
  data() {
    return {
      title: "",
      successMessage: ''
    }
  },
  components: {
    formNewBuild,
    btnNeon
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      ""
    ]),
    success(data) {
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

.newBuilds {
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