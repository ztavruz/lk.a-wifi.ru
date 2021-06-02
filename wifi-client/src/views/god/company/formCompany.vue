<template>
  <div class="formCompany  br">
    <form class="addForm"
          @submit.prevent="createCompany"
    >
      <div class="fields">
        <div class="fields-item">
          <div class="fields-item__error"
               v-if="errorMessage != ''">
            {{ errorMessage }}
          </div>
        </div>
        <div class="fields-item">
          <label for="fields-item__login">
            <div class="fields-item__icon icon_name">
              <i class="fas fa-ad"></i>
            </div>
          </label>
          <input id="fields-item__login" class="fields-item__text fields-item__login" placeholder="Название компании"
                 type="text"
                 v-model.trim="name"
                 :class="{
                               invalid: (
                           $v.name.$dirty && !$v.name.required ||
                           !$v.name.minLength ||
                           !$v.name.maxLength),
                           valid: (
                               $v.name.required && $v.name.minLength && $v.name.maxLength
                            )}"
          >
          <div class="item-close"
               @click="clearNameField"
               v-if="$v.name.$dirty && !$v.name.required ||
                           !$v.name.minLength ||
                           !$v.name.maxLength"
          ></div>
          <div class="item-open"
               v-else-if="$v.name.required && $v.name.minLength && $v.name.maxLength"
          ></div>
        </div>
        <div class="fields-item">
          <label for="fields-item__password">
            <div class="fields-item__icon icon_inn"></div>
          </label>
          <input id="fields-item__password" class="fields-item__text fields-item__password"
                 placeholder="ИНН компании"
                 type="text"
                 v-model.trim="INN"
                 :class="{invalid: (
                           $v.INN.$dirty && !$v.INN.required ||
                           !$v.INN.minLength ||
                           !$v.INN.maxLength),
                           valid: (
                               $v.INN.required && $v.INN.minLength && $v.INN.maxLength
                            )}"
          >
          <div class="item-close"
               @click="clearINNField"
               v-if="$v.INN.$dirty && !$v.INN.required ||
                          !$v.INN.minLength ||
                          !$v.INN.maxLength"
          ></div>
          <div class="item-open"
               v-else-if="$v.INN.required && $v.INN.minLength && $v.INN.maxLength"
          ></div>
        </div>
      </div>
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

export default {
  name: "formCompany",
  props: {},
  data() {
    return {
      title: "",
      name: "",
      INN: "",
      errorMessage: ""
    }
  },
  validations: {
    name: {required, minLength: minLength(4), maxLength: maxLength(30)},
    INN: {required, minLength: minLength(6), maxLength: maxLength(20)}
  },
  components: {
    btnNeon
  },
  computed: {
    ...mapGetters([

    ]),
  },
  methods: {
    ...mapActions([
      "GOD_COMPANY_CREATE"
    ]),

    clearNameField() {
      this.name = "";
    },
    clearINNField() {
      this.INN = "";
    },

    async createCompany() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      let formData = {
        name: this.name,
        INN: this.INN
      }

      let promise = this.GOD_COMPANY_CREATE(formData);

      promise.then((res) => {

        if (promise) {
          this.$emit('resData', res)
        } else {
          console.log(res);
          this.errorMessage = ''
          this.errorMessage = res
        }

      });
    },
  },
  watch: {},
  mounted() {

  }
}
</script>

<style scoped>

.formCompany {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 50%;
  min-width: 320px;
  border: 2px solid  #000;
  border-radius: 5px;
}

.addForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}

/*================================fields=========================================*/
.fields {
  width: 550px;
  max-width: 90%;
  /*margin-top: 65px;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.fields-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  min-height: 40px;
}

.fields-item__error {
  box-sizing: border-box;
  border: 1px solid red;
  width: 100%;
  height: 100%;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fields-item__icon {
  width: 77px;
  height: 73px;
  /*background: #EFEEEE;*/
  border: 2px solid #21ebff;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon_name {
  font-size: 52px;
  /*font-weight: bold;*/
}

.icon_inn {
  background-image: url("../../../assets/images/recovery/inn.png");
  background-repeat: no-repeat;
  background-position: center;
}

.fields-item__text {
  width: calc(100% - 77px);
  height: 65px;
  background: none;

  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 0px 5px 5px 0px;
  font-style: normal;
  font-weight: 300;
  font-size: 28px;
  line-height: 34px;
  padding-left: 23px;
  color: rgba(19, 19, 19, 0.6);
}
.entrance-btn{
    margin: 20px 0;
  outline: none;
}

button {
  position: relative;
  padding: 10px 20px;
  margin: 0 15px;
  color: #27ebff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 20px;
  /*transition: 0.3s;*/
  overflow: hidden;
  text-align: center;
  background: none;
}

button:hover {
  background: #21ebff;
  color: #000;
  box-shadow: 0 0 50px #21ebff;
  transition-delay: 0.5s;
}

button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  border-top: 2px solid #21ebff;
  border-left: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.3s;
}

button:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border-bottom: 2px solid #21ebff;
  border-right: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.3s;
}

button:hover:before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

button:hover:after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
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

.item-close {
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  margin: auto 0;
  margin-left: 90%;

  background: url("../../../assets/images/login/close.png") no-repeat center;
  background-size: 100%;
  backdrop-filter: none;
  cursor: pointer;
  position: absolute;
}

.item-open {
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  margin: auto 0;
  margin-left: 90%;

  background: url("../../../assets/images/login/open.png") no-repeat center;
  background-size: 100%;
  backdrop-filter: none;
  cursor: pointer;
  position: absolute;
}

.router-link-active {
  color: #000 !important;
}


</style>
