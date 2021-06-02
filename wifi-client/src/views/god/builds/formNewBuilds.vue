<template>
  <div class="formCreateTransport">
    <div class="fields-item__error"
         v-if="errorMessage != ''">
      <h4>{{ errorMessage }}</h4>
    </div>

    <form class="params-form"
          @submit.prevent="registrationBuild">
      <input type="text" placeholder="Адрес" class="params-item transport-cameraId"
             v-model="address"
             :class="{invalid: (
                           $v.address.$dirty && !$v.address.required ||
                           !$v.address.minLength ||
                           !$v.address.maxLength),
                           valid: (
                               $v.address.required && $v.address.minLength && $v.address.maxLength
                            )}"
      >
      <input type="text" placeholder="ВНТО" class="params-item transport-cameraId"
             v-model="VNTO"
             :class="{invalid: (
                           $v.VNTO.$dirty && !$v.VNTO.required ||
                           !$v.VNTO.minLength ||
                           !$v.VNTO.maxLength),
                           valid: (
                               $v.VNTO.required && $v.VNTO.minLength && $v.VNTO.maxLength
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
import {minLength, maxLength, required, numeric} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
import btnNeon from '../../../components/btn_neon'
import HELPER from "../../../libs/helper";

export default {
  name: "formCreateTransport",
  props: {},
  data() {
    return {
      errorMessage: "",
      objectType: 4,

      address: "",
      VNTO: "",
    }
  },
  validations: {
    address: {required, minLength: minLength(5), maxLength: maxLength(30)},
    VNTO: {required, minLength: minLength(5), maxLength: maxLength(30)}
  },
  components: {
    btnNeon
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      "GOD_BUILDS_CREATE"
    ]),
    async registrationBuild() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      let formData =
          {
            companyId: localStorage.getItem('currentCompany'),
            objectType: this.objectType,
            address: this.address,
            VNTO: this.VNTO,
          }

      console.log(formData)

      let request = await this.GOD_BUILDS_CREATE(formData);
      if (request.status <= 209) {
        this.$router.push({name: "godBuilds"});
      } else if (request.status > 209) {
        let errorMessage = HELPER.getRequestData(request)
        this.errorMessage = '';
        this.errorMessage = errorMessage;
      }

    },
  },
  watch: {},
  async mounted() {
    // Задаем дефолтный тип транспорта согласно выбранного для изменения
    // let select = await document.getElementById("transport-model");
    // select.selectedIndex = 0;
  },
  created() {

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