<template>
  <div class="formCamera">

    <div class="fields-item__error"
         v-if="errorMessage != ''">
      <h4>{{errorMessage}}</h4>
    </div>

    <form class="params-form"
          @submit.prevent="registrationCamera">

      <input type="text" placeholder="Нативное имя камеры" class="params-item transport-number"
             v-model="nameCamera"
             :class="{invalid: (
                           $v.nameCamera.$dirty && !$v.nameCamera.required ||
                           !$v.nameCamera.minLength ||
                           !$v.nameCamera.maxLength),
                           valid: (
                               $v.nameCamera.required && $v.nameCamera.minLength && $v.nameCamera.maxLength
                            )}"
      >
      <input type="text" placeholder="Номер камеры" class="params-item transport-cameraId"
             v-model="numberCamera"
             :class="{invalid: (
                           $v.numberCamera.$dirty && !$v.numberCamera.required ||
                           !$v.numberCamera.minLength ||
                           !$v.numberCamera.maxLength),
                           valid: (
                               $v.numberCamera.required && $v.numberCamera.minLength && $v.numberCamera.maxLength
                            )}"
      >
      <btn-neon
          class="addBtn"
          btn-text="ДОБАВИТЬ"
      >
      </btn-neon>
    </form>
  </div>
</template>

<script>
import {minLength, maxLength, required} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
import btnNeon from '../../../components/btn_neon'
import HELPER from "../../../libs/helper";

export default {
  name: "formCamera",
  props: {},
  data() {
    return {
      errorMessage: "",
      nameCamera: "",
      numberCamera: "",

    }
  },
  validations: {
    nameCamera: {required, minLength: minLength(5), maxLength: maxLength(30)},
    numberCamera: {required, minLength: minLength(1), maxLength: maxLength(30)},
  },
  components: {
    btnNeon
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      "GOD_CAMERAS_CREATE"
    ]),
    async registrationCamera() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      let formData = {};
      //либо транспорт - либо строение
      if(localStorage.getItem('currentTransport')){
        formData = {
          companyId: localStorage.getItem('currentCompany'),
          objectId: localStorage.getItem('currentTransport'),
          nameCamera: this.nameCamera,
          numberCamera: this.numberCamera,
        }
      }else if(localStorage.getItem('currentBuild')){
        formData = {
          companyId: localStorage.getItem('currentCompany'),
          objectId: localStorage.getItem('currentBuild'),
          nameCamera: this.nameCamera,
          numberCamera: this.numberCamera,
        }
      }


      console.log(formData)

      let request = await this.GOD_CAMERAS_CREATE(formData);

      if(request.status <= 209){
        this.$router.push({name: "godCameras"});
      }else if(request.status > 209){

        let errorMessage = HELPER.getRequestData(request)
        this.errorMessage = '';
        this.errorMessage = errorMessage;
      }

    },
  },
  watch: {

  },
  mounted() {


  },
  created() {

  }
}
</script>

<style scoped>

.formCamera {

}

.params-form {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.btn-addObject {
  width: 300px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 44px;
  cursor: pointer;

  background: #27ADBB;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), -6px -6px 10px rgba(255, 255, 255, 0.2);
  border-radius: 5px;

  font-family: "Proxima Nova Cond";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;
  color: #FFFFFF;
}

.params-item {
  width: 100%;
  height: 65px;
  background: none;

  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  font-style: normal;
  font-weight: 300;
  font-size: 28px;
  line-height: 34px;
  padding-left: 23px;
  color: rgba(19, 19, 19, 0.6);

}

/*============validation===============*/
.invalid {
  background: #FDC9C9;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6),
  inset -6px -6px 16px rgba(255, 255, 255, 0.6);
}

.valid {
  background: #C0FFB6;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6),
  inset -6px -6px 16px rgba(255, 255, 255, 0.6);
}
</style>