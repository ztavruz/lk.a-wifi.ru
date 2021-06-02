<template>
  <div class="main-login">
    <p class="title">Вход в личный кабинет</p>

    <router-link class="" id=""
                 tag="div"
                 :to="{name: 'godlogin'}"
    >
      <div class="user-icon "></div>
    </router-link>

    <div class="line"></div>

    <form class="login-form"
          @submit.prevent="authorization"
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
            <div class="fields-item__icon icon_user"></div>
          </label>
          <input id="fields-item__login" class="fields-item__text fields-item__login" placeholder="Логин"
                 type="text"
                 v-model.trim="login"
                 :class="{
                               invalid: (
                           $v.login.$dirty && !$v.login.required ||
                           !$v.login.minLength ||
                           !$v.login.maxLength),
                           valid: (
                               $v.login.required && $v.login.minLength && $v.login.maxLength
                            )}"
          >
          <div class="item-close"
               @click="clearLoginField"
               v-if="$v.login.$dirty && !$v.login.required ||
                           !$v.login.minLength ||
                           !$v.login.maxLength"
          ></div>
          <div class="item-open"
               v-else-if="$v.login.required && $v.login.minLength && $v.login.maxLength"
          ></div>
        </div>
        <div class="fields-item">
          <label for="fields-item__password">
            <div class="fields-item__icon icon_password"></div>
          </label>
          <input id="fields-item__password" class="fields-item__text fields-item__password"
                 placeholder="Пароль" type="password"
                 v-model.trim="password"
                 :class="{invalid: (
                           $v.password.$dirty && !$v.password.required ||
                           !$v.password.minLength ||
                           !$v.password.maxLength),
                           valid: (
                               $v.password.required && $v.password.minLength && $v.password.maxLength
                            )}"
          >
          <div class="item-close"
               @click="clearPasswordField"
               v-if="$v.password.$dirty && !$v.password.required ||
                          !$v.password.minLength ||
                          !$v.password.maxLength"
          ></div>
          <div class="item-open"
               v-else-if="$v.password.required && $v.password.minLength && $v.password.maxLength"
          ></div>
        </div>
      </div>

      <div class="recovery">
        <label for="recovery__link">
          <a class="recovery__title"
          >Не можете войти?</a>
        </label>

        <router-link class="recovery__link" id="recovery__link"
                     :to="{name: 'recovery', params: {}}"
        >Восстановление пароля
        </router-link>
      </div>
      <button class="entrance-btn" type="submit"
      ><span class="entranceWord">Войти</span>
        <loader-mini></loader-mini>
      </button>
    </form>

    <div class="icon-wifi"></div>

    <div class="rights">IT-am. Все права защищены. 2020</div>
  </div>
</template>

<script>
import {minLength, maxLength, required} from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'
import HELPER from "./../../../libs/helper";
import loaderMini from "@/components/loader_mini";

export default {
  name: "am-login",
  metaInfo: {
    title: 'авторизация',
    titleTemplate: '',
  },
  props: {},
  data() {
    return {
      errorMessage: "",
      login: "",
      password: "",
    }
  },
  validations: {
    login: {required, minLength: minLength(4), maxLength: maxLength(30)},
    password: {required, minLength: minLength(6), maxLength: maxLength(20)}
  },
  components: {
    loaderMini
  },
  computed: {
    ...mapGetters([
    ]),
  },
  methods: {

    ...mapActions([
      "USER_TOKEN_API",
      "USER_CURRENT_LOGIN"
    ]),

    async authorization() {
      this.errorMessage = '';
      let entranceWord = document.querySelector(".entranceWord");
      let loaderMini = document.querySelector(".loaderMini");
      entranceWord.style.display = "none";
      loaderMini.style.display = "initial";

      if (this.$v.$invalid) {
        entranceWord.style.display = "initial";
        loaderMini.style.display = "none";
        this.$v.$touch()
        return
      }

      let formData = {
        login: this.login,
        password: this.password,
        userAgent: window.navigator.userAgent
      }

      let promise = this.USER_TOKEN_API(formData);
      promise.then(async (request) => {

        await console.log("jwt ok: ", request);
        if (request.status < 209) {

          let data = HELPER.getRequestData(request)
          let token = data.token;

          await localStorage.setItem('token', token);
          await this.USER_CURRENT_LOGIN().then(async (request) => {
            if (request.status < 209) {

              let user = await HELPER.getRequestData(request);
              await localStorage.setItem('authUser', user._id);

            } else if (request.status >= 209) {

              // await console.log("login: ", request);
              let message = await HELPER.getErrorMessage(request);
              this.errorMessage = '';
              this.errorMessage = message;

            }
          });
          //тайм-аут чисто для визуальной красоты )
          await setTimeout(async ()=>{
            await this.$router.push({name: "catalog-online"});
          }, 2000)


        } else if (request.status > 200) {
          entranceWord.style.display = "initial";
          loaderMini.style.display = "none";
          await console.log("jwt error: ", request);
          let message = await HELPER.getErrorMessage(request);
          this.errorMessage = '';
          this.errorMessage = message;
          await console.log(message)
        }
      });


    },

    clearLoginField() {
      this.login = "";
    },
    clearPasswordField() {
      this.password = "";
    }
  },
  watch: {
    errorMessage() {
    }
  },
  async mounted() {
    await localStorage.removeItem('authUser');
  },

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main-login {
  width: 1920px;
  max-width: 100%;
  background: #2E2E2E;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url("../../../assets/images/login/Rectangle 21.png"),
  url("../../../assets/images/login/Rectangle 24.png"),
  url("../../../assets/images/login/icon wifi train.png"),
  url("../../../assets/images/login/icon truck.png"),
  url("../../../assets/images/login/icon car 2.png");
  /*url("../assets/images/login/Rectangle 24.png");*/
  background-size: 100% 100%, 95% 100%, 72px 120px, 120px 86px, 120px 48px;
  background-position: center center, center left, 2% 4%, 2% 96%, 98% 96%;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;

  /*height: 98vh;*/
}

.title {
  width: 485px;
  max-width: 50%;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;
  /* identical to box height */
  text-transform: uppercase;
  color: #FFFFFF;

  text-align: center;
  margin-top: 81px;
}

.user-icon {
  width: 80px;
  height: 80px;
  background: url("../../../assets/images/login/icon login.png") no-repeat center;
  margin-top: 4vw;
  background-size: contain;
  /*background-size: 100%;*/
}

.line {
  width: 320px;
  max-width: 90%;
  height: 0px;
  left: 1121.57px;
  top: 323.04px;
  border-bottom: 3px solid #27ADBB;
  transform: rotate(-180deg);
  margin-top: 25px;
}

.login-form {
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
  font-size: 20px;
  font-weight: 200;
}

.fields-item__icon {
  width: 77px;
  height: 73px;
  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}

.icon_user {
  background-image: url("../../../assets/images/login/user.png");
  background-repeat: no-repeat;
  background-position: center;
}

.icon_password {
  background-image: url("../../../assets/images/login/password.png");
  background-repeat: no-repeat;
  background-position: center;
}

.fields-item__text {
  width: calc(100% - 77px);
  height: 65px;
  background: #EFEEEE;

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

/*================================recovery=========================================*/
.recovery {
  max-width: 254px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recovery__title {
  font-family: "Proxima Nova Cond";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;

  color: rgba(255, 255, 255, 0.6);
}

.recovery__link {
  font-family: "Proxima Nova Cond";
  font-style: normal;
  font-weight: 300;
  font-size: 23px;
  line-height: 28px;
  /* identical to box height */
  text-decoration-line: underline;

  color: #27ADBB;
}

.entrance-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  width: 420px;
  max-width: 90%;
  height: 66.21px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 44px;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  color: #000000;
}

.icon-wifi {
  width: 74px;
  height: 56px;
  margin-top: 10vh;
  /*margin-top: 105px;*/
  background: url("../../../assets/images/login/wifi.png") no-repeat center;
  background-size: contain;
  /*background-size: 100%;*/
}

.rights {
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 70px;
  /* identical to box height, or 219% */
  color: #FFFFFF;
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

@media screen and (min-width: 100px) and (max-width: 600px) {
  .main-login {
    width: 1920px;
    max-width: 100%;

    background-image: url("../../../assets/images/login/Rectangle 21.png"),
    url("../../../assets/images/login/Rectangle 24.png"),
    url("../../../assets/images/login/icon wifi train.png"),
    url("../../../assets/images/login/icon truck.png"),
    url("../../../assets/images/login/icon car 2.png");
    /*url("../assets/images/login/Rectangle 24.png");*/
    background-size: 100% 100%, 95% 100%, 48px 80px, 80px 56px, 80px 32px;
    background-position: center center, center left, 2% 4%, 2% 92%, 98% 92%;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;

    height: 100vh;
  }
  .title {
    width: 485px;
    max-width: 50%;
    font-size: 16px;
    line-height: 21px;
    margin-top: 31px;
    min-height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-icon {
    width: 40px;
    height: 40px;
  }
  .line {
    width: 210px;
    max-width: 90%;
    height: 0px;
    left: 1121.57px;
    top: 323.04px;
    border-bottom: 3px solid #27ADBB;
    transform: rotate(-180deg);
    margin-top: 25px;
  }
  .fields-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 10px;
    position: relative;
    min-height: 35px;
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
    font-size: 14px;
    font-weight: 200;
  }
  .fields-item__text {
    height: 45px;
    font-size: 22px;
    padding-left: 23px;
  }
  .fields-item__icon {
    width: 57px;
    height: 53px;
    border-radius: 5px;
  }
  .entrance-btn {
    max-width: 70%;
    height: 46.21px;
    border-radius: 5px;
    margin-top: 20px;
    font-size: 30px;
    line-height: 37px;
  }
  .icon-wifi {
    width: 54px;
    height: 36px;
    margin-top: 7vh;
  }
  .rights {
    text-align: center;
    font-size: 16px;
    line-height: 28px;
    margin-top: 1px;
  }
  .item-close {
    width: 25px;
    height: 25px;
    margin: auto 0;
    margin-left: 83%;

  }

  .item-open {
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    margin: auto 0;
    margin-left: 83%;
  }
  .recovery__link {
    font-size: 19px;
    line-height: 22px;
  }

}

</style>
