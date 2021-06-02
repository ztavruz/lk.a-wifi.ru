<template>
  <div class="main-layout">
    <div class="header">
      <div class="row-top ">
        <div class="row-top__left">
          <div class="logout_button"
               @click="logout()"
          >
            <i class="logout_button__icon fas fa-sign-out-alt"></i>
            <p class="logout_button__text">выход</p>
          </div>
        </div>
        <div class="row-top__right ">
          <div class="company-field">
            <p class="company-field__title">Наименование организации : </p>
            <p class="company-field__name field__name">{{ COMPANY_CURRENT_STATE.name }}</p>
          </div>
          <div class="user-field">
            <p class="user-field__title">Пользователь : </p>
            <p class="user-field__name field__name">{{ USER_CURRENT_STATE.name }}</p>
          </div>
        </div>
      </div>
      <div class="row-menu"

      >
        <div class="row-menu__left">
          <router-link class="row-menu__item catalog-online"
                       tag="a"
                       :to="{name: 'catalog-online'}"
          >Онлайн-трансляция
          </router-link>
          <router-link class="row-menu__item catalog-archive"
                       tag="a"
                       :to="{name: 'catalog-archive'}"
          >архив
          </router-link>
          <router-link class="row-menu__item gps_tracking"
                       tag="a"
                       :to="{name: 'gps-tracking'}"
          >GPS-трекинг
          </router-link>
          <router-link class="row-menu__item admin_link"
                       tag="a"
                       :to="{name: 'administration'}"
          >администрирование
          </router-link>
        </div>
        <div class="row-menu__right">
          <div href="#" class="row-menu__events">
            <div class="events-button"
                 @click="showEvents"
            ></div>
            <div class="events-icon "
                 v-if="NOTIFICATION_ALL_STATE.length"
            ></div>
            <div class="event-window hide "
                 v-if="NOTIFICATION_ALL_STATE.length"
            >
              <div class="event-window__title ">
                У вас {{ NOTIFICATION_ALL_STATE.length }} новых уведомлений
              </div>
              <div class="event-window__item "
                   v-for="event in NOTIFICATION_ALL_STATE"
                   :key="event.id"
              >
                <div class="item-close "
                     @click="NOTIFICATION_DELETE(event._id)"
                ></div>
                <div class="item-message ">
                  {{ event.message }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="content ">
      <router-view></router-view>
    </div>
    <div class="footer ">
      <div class="icon-wifi"></div>

      <div class="rights">IT-am. Все права защищены. 2020</div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import HELPER from './../libs/helper'
import keys from "../../config/keys-client";
import axios from "axios";

export default {
  name: "main-layout",
  props: {},
  data() {
    return {
      errorMessage: '',
      currentUser: "",
      transports: [],
      currentTransport: {},
      events: [],

    }
  },
  components: {},
  computed: {
    ...mapGetters([
      "USER_CURRENT_STATE",
      "COMPANY_CURRENT_STATE",
      "TRANSPORTS_ALL_STATE",
      "NOTIFICATION_ALL_STATE",
    ]),

  },
  methods: {
    ...mapActions([
      "USER_CURRENT_LOGIN",
      "COMPANY_CURRENT_API",
      "NOTIFICATION_ALL_API",
      "TRANSPORTS_ALL_API",
      "LOGOUT",
      "USER_AUTH_UPDATE"
    ]),
    ...mapMutations([
      "NOTIFICATION_DELETE",
    ]),
    showEvents() {
      let event_window = document.querySelector('.event-window');

      if (event_window.classList.contains('hide')) {
        event_window.classList.remove('hide');
        event_window.classList.add('show');
      } else if (event_window.classList.contains('show')) {
        event_window.classList.remove('show');
        event_window.classList.add('hide');
      }
    },
    async logout() {
      await this.LOGOUT();
      if (localStorage.getItem("token") != '') {
        await localStorage.setItem('token', '');
      }
      if (localStorage.getItem("authUser") != '') {
        await localStorage.setItem('authUser', '');
      }

      await this.$router.push({name: "login"});
    },

  },
  watch: {},
  async mounted() {

    await this.USER_CURRENT_LOGIN().then(async (request) => {

      if (request.status <= 209) {

        let user = await HELPER.getRequestData(request);

        await this.COMPANY_CURRENT_API();
        await this.NOTIFICATION_ALL_API();

      } else if (request.status > 209) {
        let message = HELPER.getRequestData(request);
        this.errorMessage = '';
        this.errorMessage = message;
        // console.log(message)
      }
    });

    await this.COMPANY_CURRENT_API();
  },
  async updated() {
    let authorizationTime = +new Date();
    await this.USER_AUTH_UPDATE({authorizationTime : authorizationTime })
  },
  async created() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.show {
  display: flex;
}

.hide {
  display: none;
}

.main-layout {
  width: 1920px;
  max-width: 100%;
  background: #2E2E2E;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

p {
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 40px;
  color: #FFFFFF;
}

a {
  text-decoration: none;
  font-family: Rubik;
  font-style: normal;
}

/*===========header====================*/
.header {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.row-top {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row-top__right {
  display: flex;
  flex-direction: column;
  min-width: 50%;

  /*padding: 16px 31px;*/
  padding: 5px 10px;
  border-left: 2.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0px 1px 10px 2px rgba(255, 255, 255, 0.25);
}

.row-top__left {
  display: flex;
  flex-direction: row;
  align-items: center;

}

.logout_button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0px 1px 5px 2px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  padding: 0 5px;
  margin-left: 10%;
  cursor: pointer;
}

.logout_button__icon {
  font-size: 25px;
  color: #27adbb;
}

.logout_button__text {
  font-size: 20px;
  line-height: 25px;
}

.field__name {
  margin-left: 10px;
}

.company-field {
  display: flex;
  flex-direction: row;
  font-size: 18px;
}
.company-field p {
  font-size: 20px;
  line-height: 30px;
}

.user-field {
  display: flex;
  flex-direction: row;
}
.user-field p {
  font-size: 20px;
  line-height: 30px;
}


.row-menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2.5px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0px 1px 10px 4px rgba(255, 255, 255, 0.25);
}

.row-menu__left {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5%;
}

.row-menu__item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
  text-align: center;
  /*height: 81px;*/
  height: 56px;
  max-height: 100%;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-transform: uppercase;

  color: #FFFFFF;

}

.row-menu__right {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /*width: 19%;*/
  max-width: 19%;
  min-width: 81px;
  margin-right: -9%;
}

.row-menu__events {
  width: 58px;
  max-width: 58px;
  height: 58px;
  /*margin-right: -10%;*/
  border-left: 2px solid #6d6d6d;
  border-right: 2px solid #6d6d6d;
  background: url("../assets/images/main/notification.png") no-repeat center;
  box-sizing: border-box;
  background-size: 60% 60%;

  /*position: relative;*/
  cursor: pointer;
}

.events-button {
  position: absolute;
  width: 58px;
  max-width: 100%;
  height: 58px;
  box-sizing: border-box;
  cursor: pointer;
}

.events-icon {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  top: 21px;
  left: 42px;
  background: #FFFFFF url("../assets/images/main/event.png") no-repeat center;

  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #000000;


}

.event-window {
  flex-direction: column;
  position: relative;
  width: 402px;
  top: calc(81px - 19px + 2.5px);
  left: -325px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);
  box-sizing: border-box;
  z-index: 2;

  height: 74vh;
  overflow: auto;
}

.event-window__title {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  height: 90px;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 70px;
  color: #000000;

  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.event-window__item {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-bottom: 19px;
  background: #EFEEEE;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
  text-indent: 15px;
}

.item-close {
  box-sizing: border-box;
  width: 25px;
  height: 25px;
  margin-right: 4%;
  margin-top: 4%;

  background: url("../assets/images/main/close.png") no-repeat center;
  background-size: 100%;
  backdrop-filter: none;
  cursor: pointer;
}

.item-message {
  width: 90%;
  padding: 10px 15px;
  box-sizing: border-box;
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

/*==============content====================*/
.content {
  width: 1150px;
  max-width: calc(100% - 200px);
  min-height: 700px;
}

/*==============footer====================*/
.footer {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0px 1px 10px 4px rgba(255, 255, 255, 0.25);
}

.icon-wifi {
  width: 70px;
  height: 56px;
  margin-top: 23px;
  background: url("../assets/images/login/wifi.png") no-repeat center;
  background-size: 100% 100%;
}

.rights {
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 50px;
  color: #FFFFFF;
}

@media screen and (min-width: 200px) and (max-width: 1260px) {
  .row-menu__right {
    margin-right: 0;
  }
}

@media screen and (min-width: 1023px) and (max-width: 1140px) {
  .row-menu__left {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 0;
  }

  .row-menu__right {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    min-width: 81px;
    margin-right: 0;
  }
}


@media screen and (min-width: 600px) and (max-width: 1024px) {

  .row-menu__item {
    font-size: 16px;
    line-height: 28px;
  }

  .row-menu__left {
    padding-right: 0;
  }

  .row-menu__right {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 81px;
  }

  .event-window__title {
    backdrop-filter: none;
  }
}

@media screen and (min-width: 301px) and (max-width: 660px) {
  .row-menu__item {
    font-size: 14px;
    line-height: 26px;
  }
}

@media screen and (min-width: 300px) and (max-width: 599px) {
  .content {
    width: 1170px;
    max-width: 100%;
    min-height: 700px;
  }

  .row-menu {
    width: 100%;
    justify-content: space-between !important;
  }

  .row-menu__left {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-right: 0;
  }

  .row-menu__right {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    min-width: 81px;
  }

  .row-menu__item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 2%;
    padding-right: 2%;
    text-align: center;

    font-size: 14px;
    line-height: 26px;
    min-width: 145px;

    height: 35px;
    max-height: 100%;
  }

  .row-menu__events {
    min-width: 81px;
    box-sizing: border-box;
  }

}

@media screen and (min-width: 200px) and (max-width: 420px) {
  .content {
    width: 1170px;
    max-width: 100%;
    min-height: 700px;
  }

  .event-window {
    width: 302px;
    top: calc(81px - 19px + 2.5px);
    left: -225px;
  }

  .event-window__title {
    backdrop-filter: none;
  }
}

@media screen and (min-width: 100px) and (max-width: 600px) {
  .main-layout {
    max-width: 100%;
    min-height: 100vh;
  }

  .content {
    width: 1170px;
    max-width: 100%;
    height: 100%;
    min-height: 50vh;
    /*min-height: 100%;*/
  }

  .footer {
    width: 100%;
    height: 150px;
    justify-content: center;
  }

  .row-top__left {
    display: flex;
    width: 30%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .row-top__right {
    width: 70%;
    padding: 5px 5px;
  }

  .logout_button {
    padding: 0 5px;
    margin-left: 0;
  }

  .logout_button__icon {
    font-size: 20px;
  }

  .logout_button__text {
    font-size: 20px;
  }

  .company-field {
    flex-direction: column;
    align-items: center;
  }

  .company-field p {
    font-size: 16px;
    line-height: 20px;
  }

  .user-field p {
    font-size: 16px;
    line-height: 20px;
  }

  .user-field {
    justify-content: center;
  }

  /*.company-field__title {*/
  /*  font-size: 16px;*/
  /*  line-height: 20px;*/
  /*}*/

  /*.user-field__title {*/
  /*  font-size: 16px;*/
  /*  line-height: 20px;*/
  /*}*/

  .field__name {
    font-size: 16px;
    line-height: 20px;
  }

  .row-menu__left {
    width: calc(80% - 5px);
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-right: 0;
  }

  row-menu__right {
    width: 20%;
  }

  .row-menu__item {
    width: 80%;
    box-shadow: inset 0px 1px 5px 2px rgba(255, 255, 255, 0.10);
  }

  .events-button {
    width: 77px;
    max-width: 100%;
  }

  .icon-wifi {
    width: 54px;
    height: 36px;
    margin-top: 23px;
    background: url("../assets/images/login/wifi.png") no-repeat center;
    background-size: 100% 100%;
  }

  .rights {
    font-size: 16px;
    line-height: 24px;
    margin: 15px 0;
  }

  .row-menu__events {
    height: 81px;
  }

  .event-window {
    height: 98vh;
    overflow: auto;
  }

  .event-window__item {
    margin-bottom: 15px;
    text-indent: 15px;
  }

  .event-window__title {
    height: 50px;
    font-size: 18px;
    line-height: 40px;
  }

  .item-message {
    width: 90%;
    padding: 7px 15px;
    font-size: 16px;
    line-height: 22px;
  }
}

</style>
