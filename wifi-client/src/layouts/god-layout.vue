<template>
  <div class="god-layout">
    <div class="god-wrapper">
      <div class="god_header br">

        <div class="header_item">
          <h4 class="header_item__title">Редактируемая компания: </h4>
          <h2 class="header_item__value">{{ GOD_COMPANY_CURRENT_STATE.name }}</h2>
        </div>

        <div class="header_item"
        v-if="this.currentObjectUnderSurveillance == 'transport'"
        >
          <h4 class="header_item__title">Редактируемый транспорт: </h4>
          <h2 class="header_item__value">{{ GOD_TRANSPORTS_CURRENT_STATE.numberTC }}</h2>
        </div>
        <div class="header_item"
             v-else-if="this.currentObjectUnderSurveillance == 'build'"
        >
          <h4 class="header_item__title">Редактируемое здание: </h4>
          <h2 class="header_item__value">{{ GOD_BUILDS_CURRENT_STATE.address }}</h2>
        </div>


        <div class="header_item">
          <h4 class="header_item__title">АДМИН: </h4>
          <h2 class="header_item__value">{{ GOD_ADMIN_STATE.name }}</h2>
        </div>
      </div>

      <div class="god_nav br">
        <btn-neon btn-link="godCompany" btnText="Компании"></btn-neon>
        <btn-neon btn-link="godUsers" btnText="Сотрудники"></btn-neon>
        <btn-neon btn-link="godTransports" btnText="Транспорт"></btn-neon>
        <btn-neon btn-link="godBuilds" btnText="Строение"></btn-neon>
        <btn-neon btn-link="godCameras" btnText="Камеры"
        ></btn-neon>
        <btn-neon btn-link="godNotifications" btnText="Оповещения"></btn-neon>
      </div>

      <div class="admin_content">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import btnNeon from '../components/link_neon'
import HELPER from "../libs/helper";

export default {
  name: "god-layout",
  props: {},
  data() {
    return {
      title: "",
      errorMessage: "",
      currentObjectUnderSurveillance: ""
    }
  },
  components: {
    btnNeon
  },
  computed: {
    ...mapGetters([
      "GOD_ADMIN_STATE",
      "GOD_COMPANY_CURRENT_STATE",
      "GOD_TRANSPORTS_CURRENT_STATE",
      "GOD_BUILDS_CURRENT_STATE",
    ]),
  },
  methods: {
    ...mapActions([
      "ADMIN_LOGIN_API",
      "GOD_COMPANY_CURRENT_API",
      "GOD_TRANSPORTS_CURRENT_API",
      "GOD_BUILDS_CURRENT_API",
    ]),

  },
  watch: {},
  async mounted() {

    await this.ADMIN_LOGIN_API().then(async (request) => {

      await console.log(request)
      if (request.status <= 209) {

        let user = await HELPER.getRequestData(request);

        await localStorage.setItem('authUser', user._id);

      } else if (request.status > 209) {
        let message = HELPER.getRequestData(request);
        this.errorMessage = '';
        this.errorMessage = message;
        console.log(message)
      }
    });
    // определение текущей выбранной компании
    let companyId = await localStorage.getItem('currentCompany');
    if (companyId != null && companyId != '' && companyId != undefined) {
      let promise = this.GOD_COMPANY_CURRENT_API(companyId);
      promise.then(async (request) => {

        if (request.status <= 209) {

          let data = HELPER.getRequestData(request)
          console.log(data);

        } else if (request.status > 209) {

          let errorMessage = HELPER.getRequestData(request)
          this.errorMessage = '';
          this.errorMessage = errorMessage;
        }
      });
    }

    // определение текущего выбранного объекта для редактирования (транспорт или здание)
    let transportId = await localStorage.getItem('currentTransport');
    let buildId = await localStorage.getItem('currentBuild');
    await console.log("transportId: ", transportId)
    await console.log("buildId: ", buildId)


    if (transportId != null && transportId != '' && transportId != undefined) {
      this.currentObjectUnderSurveillance = "transport"
      let promise = this.GOD_TRANSPORTS_CURRENT_API(transportId);
      promise.then(async (request) => {

        if (request.status <= 209) {

          let data = HELPER.getRequestData(request)
          console.log(data);

        } else if (request.status > 209) {

          let errorMessage = HELPER.getRequestData(request)
          this.errorMessage = '';
          this.errorMessage = errorMessage;
        }
      });
    } else if (buildId != null && buildId != '' && buildId != undefined) {
      this.currentObjectUnderSurveillance = "build"
      let promise = this.GOD_BUILDS_CURRENT_API(buildId);
      promise.then(async (request) => {

        if (request.status <= 209) {

          let data = HELPER.getRequestData(request)
          console.log(data);

        } else if (request.status > 209) {

          let errorMessage = HELPER.getRequestData(request)
          this.errorMessage = '';
          this.errorMessage = errorMessage;
        }
      });
    }


  },
  async created() {

  }
}
</script>

<style >
* {
  margin: 0;
  padding: 0;
}

.god-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /*background: #2E2E2E;*/
  background: #484a48;
}

.god-wrapper {
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 100vh;
  background: #2E2E2E;
  color: #27ebff;
}

.god_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.god_nav {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.admin_content {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
  /*margin: auto 0;*/
  box-sizing: border-box;
}

.header_item {
  display: flex;
  flex-direction: column;
  align-items: center;
}


@media screen and (min-width: 200px) and (max-width: 420px) {
  .god-wrapper{
     width: 100%;
  }

  .header_item__title {
    font-size: 0.7rem;
    text-align: center;
  }
  .header_item__value {
    font-size: 0.7rem;
  }

  /*относится к роутам*/
  .mainTitle{
    min-width: 30%;
    margin: 10px 0 !important;
    padding: 0 10px !important;

  }
  .mainTitle h3{
    font-size: 0.7rem !important;
  }
  .addNew{

  }
  .mainBody{

  }

}

</style>
