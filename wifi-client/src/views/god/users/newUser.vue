<template>
  <div class="mainNewCompany">

    <div class="mainTitle">
      <h3>РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ</h3>
    </div>

    <div class="toReturn">
      <btn-neon
          btn-text="НАЗАД"
          btn-link="godUsers"
      ></btn-neon>
    </div>


    <div class="mainBody">
      <form-user
        @resData="success"
      ></form-user>
    </div>
    <div class="fields-item__error"
         v-if="successMessage != ''">
      <h3>Компания {{successMessage.name}} успешно зарегистрированна...</h3>
      <h4>с номером ИНН ({{successMessage.INN}})</h4>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import formUser from './formUser'
import btnNeon from '../../../components/link_neon'


export default {
  name: "transports",
  props: {},
  data() {
    return {
      title: "",
      successMessage: ''
    }
  },
  components: {
    formUser,
    btnNeon
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

.mainNewCompany {
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