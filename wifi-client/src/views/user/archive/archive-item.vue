<template>
  <div :data-id="object._id" class="main-item archive-item"
       @click="setObjectIdLocalStorage">
    <div class="main-wrapper "
         @click="openPicker()">
      <div class="item-img item-img-car" v-if="object.type == 1"></div>
      <div class="item-img item-img-truck" v-else-if="object.type == 2"></div>
      <div class="item-img item-img-train" v-else-if="object.type == 3"></div>
      <div class="item-img item-img-build" v-else-if="object.type == 4"></div>
    </div>

    <div class="item-data">
      <div class="item-data__icon">№</div>
      <div class="item-data__number">{{ object.numberTC || object.address }}</div>
    </div>
    <div class="picker-date"
         v-if="pickerShow"
         :id="object._id"

    >
      <div class="picker-close "
           :id="object._id"
           @click="closePicker()"
      ></div>
      <div class="date-title">
        Выбор даты
      </div>
      <div class="date-selects "

      >
        <select id="selects-day" class="selects-item selects-day"
                v-model="selectDay"
        >
          <option
              v-for="day in totalDaysInMonth"
              :key="day"
              :value="day"
          >{{ day }}
          </option>
        </select>
        <select id="selectselects-month" class="selects-item selects-month"
                v-model="selectMonth"
        >
          <option value="1">январь</option>
          <option value="2">февраль</option>
          <option value="3">март</option>
          <option value="4">апрель</option>
          <option value="5">май</option>
          <option value="6">июнь</option>
          <option value="7">июль</option>
          <option value="8">август</option>
          <option value="9">сентябрь</option>
          <option value="10">октябрь</option>
          <option value="11">ноябрь</option>
          <option value="12">декабрь</option>
        </select>
        <select id="selects-year" class="selects-item selects-year"
                v-model="selectYear"
        >
          <option

              v-for="year in totalYearsForSelect"
              :key="year"
              :value="year"

          >{{ year }}
          </option>
        </select>
      </div>

      <router-link
          class="picker-btn"
          tag="button"
          :to="{name: 'listcameras', params: {selectDay:selectDay, selectMonth:selectMonth, selectYear:selectYear, id:object._id, typePlayer: 'archive'}}"

      >Применить
      </router-link>
    </div>
  </div>
</template>

<script>

import * as moment from 'moment'

export default {
  name: "archive-item",
  props: {
    object: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      pickerShow: false,
      selectDay: null,
      selectMonth: null,
      selectYear: null,
      totalDaysInMonth: null
    }
  },
  components: {},
  computed: {

    totalYearsForSelect: () => {
      let firstYear = 2015;
      let currentYear = new Date().getFullYear();
      let listYears = [];
      // eslint-disable-next-line for-direction
      for (let i = firstYear; i <= currentYear; i++) {
        listYears.push(i);
      }
      return listYears;
    },


  },
  methods: {

    openPicker() {

      this.pickerShow = true;
    },
    closePicker() {
      this.pickerShow = false;
    },
    setObjectIdLocalStorage() {
      if(this.object.type == 1 || this.object.type == 2 || this.object.type == 3)
      {
        localStorage.setItem("currentTransport", this.object._id);
        localStorage.removeItem('currentBuild');
      }else if(this.object.type == 4)
      {
        localStorage.setItem("currentBuild", this.object._id);
        localStorage.removeItem('currentTransport');
      }
    }
  },
  watch: {
    selectDay() {
      // при выборе Дня в селекте:
      // 1) полностью пересохраняем выбранную дату в локальном хранилище
      let day = this.selectDay;
      if (day <= 9) {
        day = "0" + day;
      }
      let month = this.selectMonth;
      if (month <= 9) {
        month = "0" + month;
      }

      let timepoint = `${this.selectYear}-${month}-${day}`
      localStorage.setItem("timepoint", timepoint);

    },
    selectMonth() {
      // при выборе МЕСЯЦА в селекте:
      // 1) полностью пересохраняем выбранную дату в локальном хранилище
      let month = this.selectMonth;
      if (month <= 9) {
        month = "0" + month;
      }
      let day = this.selectDay;
      if (day <= 9) {
        day = "0" + day;
      }
      // let timepoint = `${this.selectYear}-${month}-${this.selectDay}`
      // localStorage.setItem("timepoint", timepoint);
      
      let currentYear = new Date().getFullYear();
      currentYear.toString();
      let str = currentYear + "-" + month;

      let days = moment(str, "YYYY-MM").daysInMonth();
      this.totalDaysInMonth = days;

      let timepoint = `${this.selectYear}-${month}-${day}`
      localStorage.setItem("timepoint", timepoint);

    },
    selectYear() {
      // при выборе ГОДА в селекте:
      // 1) полностью пересохраняем выбранную дату в локальном хранилище
      let day = this.selectDay;
      if (day <= 9) {
        day = "0" + day;
      }
      let month = this.selectMonth;
      if (month <= 9) {
        month = "0" + month;
      }

      let timepoint = `${this.selectYear}-${month}-${day}`
      localStorage.setItem("timepoint", timepoint);
    },
  },
  async mounted() {

  },
  async created() {
    // получение текущей даты при загрузке страницы
    const getCurrentDay = async () => {
      let date = await new Date();
      let day = date.getDate();
      return day;
    }
    this.selectDay = await getCurrentDay();

    const getCurrentMonth = () => {
      let date = new Date();
      let month = date.getMonth() + 1;

      return month;
    }
    this.selectMonth = await getCurrentMonth();

    const getCurrentYear = () => {
      let date = new Date();
      let year = date.getFullYear();
      return year;
    }
    this.selectYear = await getCurrentYear();

    const totalDaysForSelect = () => {
      let currentMonth = new Date().getMonth() + 1; //0-11 (+1)
      currentMonth.toString();
      let currentYear = new Date().getFullYear().toString();
      let str = currentYear + "-" + currentMonth;
      let days = moment(str, "YYYY-MM").daysInMonth();
      return days;
    }

    this.totalDaysInMonth = await totalDaysForSelect();

    let dayForLocalstorage = this.selectDay;
    if(this.selectDay <= 9){
      dayForLocalstorage = "0" + this.selectDay;
    }
    let monthForLocalstorage = this.selectMonth;
    if(this.selectMonth <= 9){
      monthForLocalstorage = "0" + this.selectMonth;
    }
    let timepoint = `${this.selectYear}-${monthForLocalstorage}-${dayForLocalstorage}`;
    // await console.log(timepoint);
    await localStorage.setItem("timepoint", timepoint);
  }
}
</script>

<style scoped>
.test {
  background: red;
}

.main-item {
  width: 180px;
  height: 180px;
  background: #EFEEEE;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  position: relative;
  opacity: 0.7;
  border-radius: 3px;
}

.hide {
  display: none;
}

.show {
  display: flex;
}

.main-wrapper {
  width: 100%;
  height: 137px;
}

.item-img-car {
  height: 105%;
  background: url("../../../assets/images/catalog/car.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
}

.item-img-truck {
  height: 105%;
  background: url("../../../assets/images/catalog/truck.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
}

.item-img-train {
  height: 105%;
  background: url("../../../assets/images/catalog/train.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
}

.item-img-build {
  height: 105%;
  background: url("../../../assets/images/catalog/build.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.5;
}

.item-data {
  display: flex;
  flex-direction: row;

  height: 20%;
  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 5px 5px 3px 0px;
}

.item-data__icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 43px;
  position: relative;
  bottom: 4px;
  left: -5px;

  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 5px;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-transform: uppercase;
  color: #27ADBB;
}

.item-data__number {
  width: 100%;
  text-align: center;
  display: inline;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*padding-top: 2%;*/
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  color: #000000;
  opacity: 0.6;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

/*============picker-date===============*/

.picker-date{
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 200%;
  min-width: 50%;
  height: 220.76px;
  top: 180px;
  left: -100px;

  background: #EFEEEE;
  z-index: 2;
  opacity: 0.9;
}

.picker-close {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 15px;
  right: 15px;

  background: url("../../../assets/images/main/close.png") no-repeat center;
  background-size: 100%;
  backdrop-filter: none;
  cursor: pointer;
}

.date-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 18px 0;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 40px;
  /* or 167% */
  color: #000000;
}

.date-selects {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 1%;
  width: 100%;
  height: calc(53px - 0.5vw);
}

.selects-item {
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 40px;
  color: #000000;

  box-sizing: border-box;
  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 5px;

  display: flex;
  padding-left: 10px;
}

.selects-day {
  width: 19.6%;
}

.selects-month {
  width: 38%;
}

.selects-year {
  width: 29.6%;
}

.picker-btn {
  width: 62%;
  height: 45px;
  background: #27ADBB;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), -6px -6px 10px rgba(255, 255, 255, 0.2);
  border-radius: 5px;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;

  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  /*margin: auto 0px;*/
  margin: auto auto;
}

@media screen and (min-width: 200px) and (max-width: 440px) {
  .picker-date{
    /*display: none;*/
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 150%;
    min-width: 50%;
    height: 220.76px;
    top: 200px;
    left: -50px;

    background: #EFEEEE;
    opacity: 0.9;
    z-index: 2;
  }
}

@media screen and (min-width: 100px) and (max-width: 600px) {
  .archive-item {
    width: 200px;
    height: 150px;
  }

  .main-wrapper {
    width: 100%;
    height: 100%;
  }

  .item-data__icon {
    width: 37px;
    height: 32px;
    bottom: 2px;
    left: -5px;
    border-radius: 3px;
    font-size: 20px;
    line-height: 28px;
  }

  .item-data__number {
    font-size: 21px;
  }



  .item-img-car {
    height: 100%;
    background: url("../../../assets/images/catalog/car.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40% 70%;
  }

  .item-img-truck {
    height: 100%;
    background: url("../../../assets/images/catalog/truck.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50% 60%;
  }

  .item-img-train {
    height: 100%;
    background: url("../../../assets/images/catalog/train.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30% 75%;
  }

  .item-img-build {
    height: 100%;
    background: url("../../../assets/images/catalog/build.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40% 75%;
  }

  .picker-date{
    width: 152%;
    min-width: 50%;
    height: 150px;
    top: 150px;
    left: -52px;
  }

  .date-title {
    padding: 13px 0;
    font-size: 18px;
    line-height: 30px;
  }

  .date-selects {
    width: 100%;
    height: calc(40px - 0.5vw);
  }

  .picker-btn {
    width: 47%;
    height: 34px;
    border-radius: 3px;
    font-size: 20px;
  }
}
</style>