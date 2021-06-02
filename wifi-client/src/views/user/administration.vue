<template>
  <div class="main-administration">

    <form class="params-form"
          @submit.prevent="registrationTransport">
      <button type="submit" class="btn-addObject">Добавить объект</button>
      <select name="" id="transport-model" class="params-item transport-model"
              v-model="transportModel"
              :class="{invalid: (
                           $v.transportModel.$dirty && !$v.transportModel.required && !$v.transportModel.numeric||
                           !$v.transportModel.minLength ||
                           !$v.transportModel.maxLength),
                           valid: (
                               $v.transportModel.required && $v.transportModel.numeric && $v.transportModel.minLength && $v.transportModel.maxLength
                            )}"
      >
        <option class="option" value="" selected disabled hidden>Тип объекта</option>
        <option class="option" value="0">Легковой</option>
        <option class="option" value="1">Грузовой</option>
        <option class="option" value="2">Поезд</option>
      </select>
      <input type="text" placeholder="Номер объекта" class="params-item transport-number"
             v-model="transportNumber"
             :class="{invalid: (
                           $v.transportNumber.$dirty && !$v.transportNumber.required ||
                           !$v.transportNumber.minLength ||
                           !$v.transportNumber.maxLength),
                           valid: (
                               $v.transportNumber.required && $v.transportNumber.minLength && $v.transportNumber.maxLength
                            )}"
      >
      <input type="text" placeholder="ID камеры" class="params-item transport-cameraId"
             v-model="transportCameraId"
             :class="{invalid: (
                           $v.transportCameraId.$dirty && !$v.transportCameraId.required ||
                           !$v.transportCameraId.minLength ||
                           !$v.transportCameraId.maxLength),
                           valid: (
                               $v.transportCameraId.required && $v.transportCameraId.minLength && $v.transportCameraId.maxLength
                            )}"
      >
    </form>
  </div>
</template>

<script>
import {minLength, maxLength, required, numeric} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "administration",
  props: {},
  data() {
    return {
      title: "",
      transportModel: 1,
      transportNumber: "",
      transportCameraId: "",

    }
  },
  validations: {
    transportModel: {required, numeric, minLength: minLength(1), maxLength: maxLength(1)},
    transportNumber: {required, minLength: minLength(8), maxLength: maxLength(9)},
    transportCameraId: {required, minLength: minLength(5), maxLength: maxLength(30)}
  },
  components: {},
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      "TRANSPORT_CREATE_PLEASE"
    ]),
    async registrationTransport() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      let formData = {
        type: this.transportModel,
        numberTC: this.transportNumber,
        transportCameraId: this.transportNumber,
        companyId: ''
      }

      let promise = this.TRANSPORT_CREATE_PLEASE(formData);

      promise.then((res) => {

        if (promise) {
          console.log(res);
        } else {
          console.log(res);
          this.errorMessage = ''
          this.errorMessage = res
        }

      });

    },
  },
  watch: {
    transportModel() {

      // console.log("transportModel: ", this.transportModel);
    },
    transportNumber() {
      // console.log("transportNumber: ", this.transportNumber);
    },
    transportCameraId() {
      // console.log("transportCameraId: ", this.transportCameraId);
    },
  },
  mounted() {


  },
  async created() {
    let onlineLink = await document.querySelector(".catalog-online");
    let archiveLink = await document.querySelector(".catalog-archive");
    await onlineLink.classList.remove("router-link-active");
    await archiveLink.classList.remove("router-link-active");
  }
}
</script>

<style scoped>

.main-administration {

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
  margin-top: 78px;
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
  width: 241px;
  height: 45px;

  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 5px;

  font-family: "Proxima Nova Cond";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 40px;
  color: #000000;

  margin: 9px 0px;

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