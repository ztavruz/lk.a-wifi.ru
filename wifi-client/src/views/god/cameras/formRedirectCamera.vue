<template>
  <div class="formCreateTransport">
    <div class="fields-item__error"
         v-if="errorMessage != ''">
      <h4>{{ errorMessage }}</h4>
    </div>

    <form class="params-form"
          @submit.prevent="redirectCameraRun">
      <select name="" id="transport-model" class="params-item transport-model"
              v-model="objectType"
              :class="{invalid: (
                           $v.objectType.$dirty && !$v.objectType.required && !$v.objectType.numeric||
                           !$v.objectType.minLength ||
                           !$v.objectType.maxLength),
                           valid: (
                               $v.objectType.required
                               && $v.objectType.numeric && $v.objectType.minLength && $v.objectType.maxLength
                            )}"
      >
        <option class="option" value="0" disabled>Тип объекта</option>
        <option class="option" value="1">Легковой</option>
        <option class="option" value="2">Грузовой</option>
        <option class="option" value="3">Поезд</option>
        <option class="option" value="4">Строение</option>
      </select>
      <select name="" id="currentObject" class="params-item transport-model"
              v-model="currentObjectId"
              :class="{invalid: (
                           $v.currentObjectId.$dirty && !$v.currentObjectId.required && !$v.currentObjectId.numeric||
                           !$v.currentObjectId.minLength ||
                           !$v.currentObjectId.maxLength),
                           valid: (
                               $v.currentObjectId.required
                               && $v.currentObjectId.minLength && $v.currentObjectId.maxLength
                            )}"
      >
        <option class="option" :value="currentObject._id" disabled>{{ currentObject.numberTC || currentObject.VNTO }}
        </option>
        <option class="option" :value="item._id"
                v-for="item in allObjectsByType"
                :key="item._id"
        >{{ item.numberTC || item.VNTO }}
        </option>
      </select>

      <btn-neon
          class="addBtn"
          btn-text="ПЕРЕАДРЕССОВАТЬ"
      >
      </btn-neon>
    </form>
  </div>
</template>

<script>
import {minLength, maxLength, required, numeric} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
import btnNeon from '../../../components/btn_neon'
import HELPER from "../../../libs/helper";
import updateTransport from "@/views/god/transports/updateTransport";

export default {
  name: "formRedirectCamera",
  props: {},
  data() {
    return {
      errorMessage: "",
      objectType: "",
      transportId: "",
      buildId: "",
      VNTO: "",

      redirectCamera: {},
      currentObject: {},
      currentObjectId: "",

      allObjectsByType: [],
      testArr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  validations: {
    objectType: {required, numeric, minLength: minLength(1), maxLength: maxLength(1)},
    currentObjectId: {required, minLength: minLength(1), maxLength: maxLength(25)},

  },
  components: {
    btnNeon
  },
  computed: {
    ...mapGetters([
      "GOD_CAMERAS_CURRENT_STATE",
      "GOD_TRANSPORTS_CURRENT_STATE",

      "GOD_BUILDS_CURRENT_STATE",
      "GOD_BUILDS_ALL_STATE",
      "GOD_TRANSPORTS_ALL_STATE",
      "GOD_TRANSPORTS_TYPE_ALL_STATE",


    ]),
  },
  methods: {
    ...mapActions([
      "GOD_BUILDS_UPDATE",
      "GOD_CAMERAS_CURRENT_API",
      "GOD_TRANSPORTS_CURRENT_API",
      "GOD_BUILDS_CURRENT_API",

      "GOD_BUILDS_ALL_API",
      "GOD_TRANSPORTS_ALL_API",

      "GOD_TRANSPORTS_TYPE_ALL_API",
      "GOD_CAMERAS_UPDATE",
    ]),

    async redirectCameraRun() {

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      let formData ={};
      await console.log("objectType: ",this.objectType);

      if(this.objectType == 1 || this.objectType == 2 || this.objectType == 3) {
        await this.GOD_TRANSPORTS_CURRENT_API(this.currentObjectId);
        formData = {
          cameraId: await localStorage.getItem("currentCamera"),
          companyId: this.GOD_TRANSPORTS_CURRENT_STATE.companyId,
          objectId: this.currentObjectId,
        }
      }else if(this.objectType == 4){
        formData = {
          cameraId: await localStorage.getItem("currentCamera"),
          companyId: this.GOD_BUILDS_CURRENT_STATE.companyId,
          objectId: this.currentObjectId
        }
      }

      await console.log("formData: ",formData);
      await console.log("buildId: ",formData.objectId);

      let request = await this.GOD_CAMERAS_UPDATE(formData);

      if (request.status <= 209) {
        this.$router.push({name: "godCompany"});
      } else if (request.status > 209) {

        // let errorMessage = HELPER.getRequestData(request);
        let errorMessage = "чёто пошло не так";

        this.errorMessage = '';
        this.errorMessage = errorMessage;
      }
    },
  },
  watch: {

    async objectType() {

      if (this.objectType == 1 || this.objectType == 2 || this.objectType == 3) {
        // получить список объектов (transport) согласно выбранного типа(1,2,3)
        await this.GOD_TRANSPORTS_TYPE_ALL_API(this.objectType);
        this.allObjectsByType = this.GOD_TRANSPORTS_TYPE_ALL_STATE;

      } else if (this.objectType == 4) {
        // получить список объектов (builds) согласно выбранного типа(4)
        await this.GOD_BUILDS_ALL_API();
        this.allObjectsByType = this.GOD_BUILDS_ALL_STATE;
      }

      // await console.log(this.allObjectsByType);
      // await console.log(this.currentObject._id);
    },
    async currentObjectId() {
      // await console.log(this.currentObjectId);
    }
  },

  async mounted() {

  },

  async created() {
    //получить текущую камеру
    let cameraId = await localStorage.getItem('currentCamera')
    await this.GOD_CAMERAS_CURRENT_API(cameraId);
    this.redirectCamera = await this.GOD_CAMERAS_CURRENT_STATE;

    //получить object текущей камеры
    if(localStorage.getItem("currentTransport") != null){
      let currentObject = await this.GOD_TRANSPORTS_CURRENT_API(this.redirectCamera.objectId);
      // определить тип транспорта к которому камера привязанна
      this.objectType = await this.GOD_TRANSPORTS_CURRENT_STATE.type
    }else if(localStorage.getItem("currentBuild") != null){
      let currentObject = await this.GOD_BUILDS_CURRENT_API(this.redirectCamera.objectId);
      // определить тип транспорта к которому камера привязанна
      this.objectType = await this.GOD_BUILDS_CURRENT_STATE.type
    }

    //если камера зарегистрированна на транспорте( 1,2,3)
    if (this.objectType == 1 || this.objectType == 2 || this.objectType == 3) {
      await this.GOD_TRANSPORTS_CURRENT_API(this.redirectCamera.objectId);
      // установить селект 1 как транспорт(1,2,3)
      this.objectType = this.GOD_TRANSPORTS_CURRENT_STATE.type;
      // получение всего объекта текущей привязки
      this.currentObject = this.GOD_TRANSPORTS_CURRENT_STATE;
      // установить в селект 2 как ID объекта текущей привязки
      this.currentObjectId = this.GOD_TRANSPORTS_CURRENT_STATE._id;

      //если камера зарегистрированна на строении(4)
    } else if (this.objectType == 4) {
      await this.GOD_BUILDS_CURRENT_API(this.redirectCamera.objectId);
      // установить селект 1 как здание(4)
      this.objectType = this.GOD_BUILDS_CURRENT_STATE.type;
      // получение всего объекта текущей привязки
      this.currentObject = this.GOD_BUILDS_CURRENT_STATE;
      // установить в селект 2 как ID объекта текущей привязки
      this.currentObjectId = this.GOD_BUILDS_CURRENT_STATE._id;
    }
  }
}
</script>

<style scoped>

.formCreateTransport {

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