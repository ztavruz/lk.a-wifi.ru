<template>
  <div class="main-broadcast">
    <div class="broadcast-header ">
      <div class="header-left ">
        <div class="data-transport ">

          <router-link class="wrapper__transport-title"

                       :to="{name: 'listcameras'}"
          >
            <img src="../../assets/images/main/arrow-back.png" class="btn-back">
            <div class="transport-title">Объект</div>
          </router-link>
<!--          <router-link class="wrapper__transport-title"-->
<!--                       v-else-if="this.playerStatus == 'archive'"-->
<!--                       :to="{name: 'listcameras'}"-->
<!--          >-->
<!--            <img src="../../assets/images/main/arrow-back.png" class="btn-back">-->
<!--            <div class="transport-title">Объект</div>-->
<!--          </router-link>-->

          <div class="transport-fields">
            <div class="field-icon">№</div>
            <div class="field-number">{{ TRANSPORT_CURRENT_STATE.numberTC || BUILD_CURRENT_STATE.address }}</div>
          </div>
        </div>
        <div class="data-timepoint">
          <!--          <div class="timepoint-item timepoint-day">{{ this.getDayForField() }}</div>-->
          <!--          <div class="timepoint-item timepoint-month">{{ this.getMonthForField() }}</div>-->
          <!--          <div class="timepoint-item timepoint-year">{{ this.getYearForField() }}</div>-->
        </div>
      </div>
      <div class="header-right ">
        <div class="transport-icon item-img-car br" v-if="TRANSPORT_CURRENT_STATE.type == 1"></div>
        <div class="transport-icon item-img-truck" v-else-if="TRANSPORT_CURRENT_STATE.type == 2"></div>
        <div class="transport-icon item-img-train" v-else-if="TRANSPORT_CURRENT_STATE.type == 3"></div>
        <div class="transport-icon item-img-build" v-else-if="this.objectType == 4"></div>
      </div>
    </div>
    <player-online
        v-if="playerStatus == 'online' "
        :data_transport="TRANSPORT_CURRENT_STATE"
    ></player-online>
    <player-archive
        v-else-if="playerStatus == 'archive'"
        :data_video="this.$route.params.data_video"
    ></player-archive>
    <transport-tth
        v-if="objectType == '1' || objectType == '2' || objectType == '3' "
        :data_object="TRANSPORT_CURRENT_STATE"
    ></transport-tth>
    <transport-tth
        v-else-if="objectType == '4'"
        :data_object="BUILD_CURRENT_STATE"
    ></transport-tth>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import playerOnline from './online/player-online'
import playerArchive from './archive/player-archive'
import transportTth from "../../components/transport-tth";

export default {
  name: "broadcast",
  props: {
    data_transport: {
      type: Object,
      default() {
        return {
        };
      }
    }
  },
  data() {
    return {
      title: "",
      playerStatus: "",
      objectType: "",
      currentCamera: {}
    }
  },
  components: {
    playerOnline,
    playerArchive,
    transportTth,
  },
  computed: {
    ...mapGetters([
      "TRANSPORT_CURRENT_STATE",
      "BUILD_CURRENT_STATE",
      "CAMERAS_CURRENT_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      "TRANSPORT_CURRENT_API",
      "BUILD_CURRENT_API",
      "CAMERAS_CURRENT_API"
    ]),
    async getTimepointLocalStorage() {
      let listMonths =
          {
            1: "январь",
            2: "февраль",
            3: "март",
            4: "апрель",
            5: "май",
            6: "июнь",
            7: "июль",
            8: "август",
            9: "сентябрь",
            10: "октябрь",
            11: "ноябрь",
            12: "декабрь"
          }
      let timepoint = await localStorage.getItem("timepoint");
      // timepoint = JSON.parse(timepoint);

      // let timestamp = +new Date("2020-01-01 22:58:00");
      // let year = new Date(timestamp).getFullYear()
      // let month = new Date(timestamp).getMonth()
      // let day = new Date(timestamp).getDate()
      // let hour = new Date(timestamp).getHours()
      // let min = new Date(timestamp).getMinutes()
      // let sec = new Date(timestamp).getSeconds()

      let day = await new Date(timepoint).getDate()
      let month = await new Date(timepoint).getMonth();
      month = listMonths[month + 1];
      let year = await new Date(timepoint).getFullYear();

      timepoint = {
        day: day,
        month: month,
        year: year,
      }

      await console.log(timepoint);
      return timepoint;
    },
    getDayForField() {
      let timepoint = this.getTimepointLocalStorage();
      return timepoint.day;
    },
    getMonthForField() {
      let timepoint = this.getTimepointLocalStorage();
      return timepoint.month;
    },
    getYearForField() {
      let timepoint = this.getTimepointLocalStorage();
      return timepoint.year;
    },

  },
  watch: {},
  async mounted() {
    this.playerStatus = await localStorage.getItem("playerStatus");

  },
  async created() {
    // this.playerStatus = await localStorage.getItem("playerStatus");

    //получить текущую камеру
    let cameraId = await localStorage.getItem('currentCamera')
    await this.CAMERAS_CURRENT_API(cameraId);
    this.currentCamera = this.CAMERAS_CURRENT_STATE;

    //получить object текущей камеры
    if (localStorage.getItem("currentTransport") != null) {
      let objectId = await localStorage.getItem("currentTransport")
      let currentObject = await this.TRANSPORT_CURRENT_API(objectId);
      // определить тип транспорта к которому камера привязанна
      this.objectType = await this.TRANSPORT_CURRENT_STATE.type
    } else if (localStorage.getItem("currentBuild") != null) {
      let objectId = await localStorage.getItem("currentBuild")
      let currentObject = await this.BUILD_CURRENT_API(objectId);
      // определить тип транспорта к которому камера привязанна
      this.objectType = await this.BUILD_CURRENT_STATE.type;
    }
    // await console.log(this.objectType);
  }
}
</script>

<style scoped>
.main-broadcast {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1170px;
  max-width: 100%;
  flex-wrap: wrap;
}

.broadcast-header {
  display: flex;
  flex-direction: row;
  width: 1170px;
  max-width: 100%;
}

.header-left {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 80%;
  /*height: 100%;*/
  /*margin: auto 0;*/
}

.header-right {
  width: 20%;
  min-width: 129px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

}

.data-transport {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 400px;
  max-width: 100%;

}

.transport-title {
  width: 144px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;

  /* identical to box height */
  text-transform: uppercase;
  color: #FFFFFF;
}

.transport-fields {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;

  position: relative;
}

.field-icon {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25%;
  min-width: 50px;
  height: 47.4px;
  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  position: absolute;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-transform: uppercase;

  color: #27ADBB;
}

.field-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 43px;
  margin-left: 24%;

  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 0px 5px 5px 0px;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 40px;
  /* identical to box height, or 148% */
  color: #000000;
}

.data-timepoint {
  min-width: 276px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;


  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 40px;
  color: #FFFFFF;
}

.timepoint-item {
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 40px;
  color: #000000;

  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 5px;
}

.timepoint-day {
  width: 20%;
}

.timepoint-month {
  width: 46%;
}

.timepoint-year {
  width: 30%;
}

.transport-icon {
  width: 59px;
  height: 59px;
  /*max-width: 15vw;*/
  /*max-height: 15vw;*/
  background: #EFEEEE;
  margin: 10px 0;
}

.item-img-car {
  background-image: url("../../assets/images/catalog/car.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.item-img-truck {
  background-image: url("../../assets/images/catalog/truck.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.item-img-train {
  background-image: url("../../assets/images/catalog/train.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.item-img-build {
  background-image: url("../../assets/images/catalog/build.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

@media screen and (min-width: 601px) and (max-width: 900px) {

  .broadcast-header {
    display: flex;
    flex-direction: row;
    width: calc(99% + 200px);
    max-width: calc(99% + 200px);
    margin-left: -100px;
  }

  .header-left {
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding-left: 10px;
  }

  .header-right {
    padding-right: 10px;
  }

  .player-main {
    width: calc(99% + 200px);
    max-width: calc(90% + 200px);
    margin-left: -100px;

  }
}

@media screen and (min-width: 100px) and (max-width: 600px) {

  .broadcast-header[data-v-5970b4d2] {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 1170px;
    max-width: 100%;
  }

  .header-left {
    flex-direction: row;
    align-items: center;
    /*padding-left: 10px;*/
    width: 100%;
    max-width: 100%;
  }

  .header-right {
    display: none;
    /*width: 0px;*/
    /*min-width: 0px;*/
    /*max-width: 0px;*/
  }

  .main-broadcast {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1170px;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .data-transport {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 600px;
    max-width: 100%;
    margin: 7px 0px;
  }

  .data-timepoint {
    width: 0px;
    min-width: 0px;
    margin: 0;
  }

  .wrapper__transport-title {
    flex-wrap: nowrap;
    max-width: 50%;
  }

  .btn-back {
    max-width: 35px;
    max-height: 35px;
    margin-left: 10px;
  }

  .transport-title {
    max-width: 144px;
    font-size: 22px;
    line-height: 26px;
  }

  .transport-fields {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    max-width: 50%;
  }

  .field-icon {
    width: 35px;
    min-width: 35px;
    height: 33px;
    border-radius: 3px;
    position: absolute;
    font-size: 20px;
    line-height: 28px;
  }

  .field-number {
    width: 74%;
    height: 29px;
    margin-left: 35px;
    font-size: 20px;
    line-height: 24px;
  }


}
</style>