<template>
  <div class="search">
    <div class="search-item search-title">Выбор объекта</div>

    <!--    <div class="search-item search-title">-->
    <div class="form_radio_group">
      <div class="form_radio_group-item">
        <input id="radio-3" type="radio" v-model="typeSearchObject" name="typeObject" value="транспорта" checked>
        <label for="radio-3">Транспорт</label>
      </div>
      <div class="form_radio_group-item">
        <input id="radio-4" type="radio" v-model="typeSearchObject" name="typeObject" value="здания">
        <label for="radio-4">Здание</label>
      </div>
    </div>
    <!--    </div>-->

    <div class="form_radio_group">
      <div class="form_radio_group-item form_radio_group-item_TC"
           v-if="typeSearchObject == 'транспорта'"
      >
        <input id="radio-1" type="radio" v-model="typeSearchField" name="radio" value="ТС" checked>
        <label for="radio-1">Номер ТС</label>
      </div>
      <div class="form_radio_group-item form_radio_group-item_address"
           v-else-if="typeSearchObject == 'здания'"
      >
        <input id="radio-11" type="radio" v-model="typeSearchField" name="radio" value="адресу" checked>
        <label for="radio-11">Адрес</label>
      </div>
      <div class="form_radio_group-item form_radio_group-item_VIN">
        <input id="radio-2" type="radio" v-model="typeSearchField" name="radio" value="VIN">
        <label for="radio-2" class="VIN_label">Номер VIN</label>
      </div>
    </div>

    <div class="search-item search-field">
      <div class="search-icon trigger"
           @click="runSearch()"
      ></div>
      <input type="text" class="search-input" :placeholder="searchPlaceholder"
             v-model="searchInput">
    </div>

    <!-- Modal -->
    <div class="modal-wrapper">
      <div class="modal">
        <div class="head">
          <a class="btn-close trigger" href="#">
            <i class="fa fa-times" aria-hidden="true"></i>
          </a>
        </div>
        <div class="content">
          <router-link
              style="text-decoration: none"
              v-if="playerStatus == 'online'"
              :to="{name: 'listcameras'}"
          >
            <online-item

                :object="foundObject"
            ></online-item>
          </router-link>

          <archive-item
              v-else-if="playerStatus == 'archive'"
              :object="foundObject"
          ></archive-item>

          <!--            <i class="fas fa-skull-crossbones"></i>-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import onlineItem from './../views/user/online/online-item';
import archiveItem from './../views/user/archive/archive-item';

export default {
  name: "search",
  props: {},
  data() {
    return {
      typeSearchObject: "транспорта",
      typeSearchField: "ТС",
      searchInput: "",

      playerStatus: "",
      searchPlaceholder: `Поиск транспорта по номеру ТС`,
      foundObject: {}
    }
  },
  components: {
    onlineItem,
    archiveItem
  },
  computed: {
    ...mapGetters([
      "CAMERAS_CURRENT_STATE",
      "TRANSPORT_SEARCH_BY_FIELD_STATE",
      "BUILD_SEARCH_BY_FIELD_STATE",
    ]),
  },
  methods: {
    ...mapActions([
      "CAMERAS_CURRENT_API",
      "TRANSPORT_SEARCH_BY_FIELD_API",
      "BUILD_SEARCH_BY_FIELD_API",
    ]),
    async runSearch() {
      this.foundObject = {};
      //определение типа каталога(онлайн, архив),для поиска
      if (localStorage.getItem("playerStatus") == "online") {
        this.playerStatus = "online";
      } else if (localStorage.getItem("playerStatus") == "archive") {
        this.playerStatus = "archive";
      }
      let formData = {
        typeSearchField: this.typeSearchField,
        searchInput: this.searchInput
      }
      if (this.typeSearchObject == "транспорта") {
        await this.TRANSPORT_SEARCH_BY_FIELD_API(formData);

        this.foundObject = this.TRANSPORT_SEARCH_BY_FIELD_STATE[0];
        console.log(this.TRANSPORT_SEARCH_BY_FIELD_STATE[0]);
      } else if (this.typeSearchObject == "здания") {
        await this.BUILD_SEARCH_BY_FIELD_API(formData);

        this.foundObject = this.BUILD_SEARCH_BY_FIELD_STATE[0];
        console.log(this.BUILD_SEARCH_BY_FIELD_STATE[0]);
      }
    }
  },
  watch: {
    searchInput() {
      console.log(this.searchInput);
    },
    typeSearchObject() {
      if (this.typeSearchObject == "транспорта") {
        this.typeSearchField = "ТС";
        this.searchPlaceholder = `Поиск ${this.typeSearchObject} по номеру ${this.typeSearchField}`;
      } else if (this.typeSearchObject == "здания") {
        this.typeSearchField = "адресу";
        if (this.typeSearchField == "адресу") {
          this.searchPlaceholder = `Поиск ${this.typeSearchObject} по ${this.typeSearchField}`;
        } else if (this.typeSearchField == "VIN") {
          this.searchPlaceholder = `Поиск ${this.typeSearchObject} по номеру ${this.typeSearchField}`;
        }
      }
    },
    typeSearchField() {
      if (this.typeSearchField == "ТС") {
        this.searchPlaceholder = `Поиск ${this.typeSearchObject} по номеру ${this.typeSearchField}`;
      } else if (this.typeSearchField == "VIN") {
        this.searchPlaceholder = `Поиск ${this.typeSearchObject} по номеру ${this.typeSearchField}`;
      } else if (this.typeSearchField == "адресу") {
        this.searchPlaceholder = `Поиск ${this.typeSearchObject} по ${this.typeSearchField}`;
      }
    },
  },
  async mounted() {
    let trigger = document.querySelector('.trigger');
    let modal_wrapper = document.querySelector('.modal-wrapper');
    let btn_close = document.querySelector('.btn-close');

    trigger.onclick = function () {
      modal_wrapper.classList.add("open");
      return false;
    };
    btn_close.onclick = function () {
      modal_wrapper.classList.remove("open");
      modal_wrapper.classList.add("close");
      //сброс старых данных отображения поиска
      document.location.reload();
      return false;
    };
  },

  async created() {
  }
}
</script>

<style scoped>

.search {
  width: calc(99% + 200px);
  margin-left: -100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 1vw;
  padding-bottom: 1vw;
  padding-left: 0.5%;
  padding-right: 0.5%;
  box-sizing: border-box;
}

.search-title {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 43px;
  /* identical to box height */

  text-transform: uppercase;
  color: #FFFFFF;
}

.search-field {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  position: relative;
  width: 400px;
  max-width: 50%;
  min-width: 150px;
  height: 35px;
  margin: auto 0;
}

.search-icon {
  width: 42px;
  height: 42px;
  position: absolute;
  top: -3px;
  left: 5px;
  cursor: pointer;

  background: #EFEEEE;
  background-image: url("./../assets/images/catalog/search.png");
  background-repeat: no-repeat;
  background-position: center;


  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}

.search-input {
  width: calc(100% - 47px);
  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 0px 5px 5px 0px;
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;
  color: rgba(19, 19, 19, 0.6);
  text-align: center;
}


@media screen and (min-width: 200px) and (max-width: 460px) {
  .search {
    width: calc(100% + 100px);
    /*max-width: 100%;*/
    margin: 0 auto;
    margin-left: -50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 3vw;
    padding-bottom: 3vw;
    padding-left: 0.5%;
    padding-right: 0.5%;
  }

  .search-item {
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    width: 100%;
    max-width: 100%;
    margin: 5px 0px;
  }

  .search-input {
    padding-left: 30%;
    width: 100%;
  }

  .search-field {
    width: 90%;
    display: flex;
  }
}

/*===================RADIO_BUTTONS=====================*/
.form_radio_group {
  display: inline-block;
  overflow: hidden;
  margin: 5px 0px;
}

.form_radio_group-item {
  display: inline-block;
  float: left;
}

.form_radio_group input[type=radio] {
  display: none;
}

.form_radio_group label {
  display: inline-block;
  cursor: pointer;
  padding: 0px 15px;
  line-height: 34px;
  border: 1px solid #999;
  border-right: none;
  user-select: none;
}

.form_radio_group .form_radio_group-item:first-child label {
  border-radius: 6px 0 0 6px;
}

.form_radio_group .form_radio_group-item:last-child label {
  border-radius: 0 6px 6px 0;
  border-right: 1px solid #999;
}


/* Checked */
.form_radio_group input[type=radio]:checked + label {
  /*background: #ffe0a6;*/
  background: #27adbb;
}

/* Hover */
.form_radio_group label:hover {
  color: #efefef;
}

/* Disabled */
.form_radio_group input[type=radio]:disabled + label {
  background: #efefef;
  color: #666;
}

/*==================================modalWindow=======================*/

@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);


/*html, body {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  margin: 0;*/
/*}*/

.page-wrapper {
  width: 100%;
  height: 100%;
  background: url(https://goo.gl/OeVhun) center no-repeat;
  background-size: cover;
}

.blur-it {
  filter: blur(4px);
}

a.btn {
  width: 200px;
  padding: 18px 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  border-radius: 0;
  background: #e2525c;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(12, 11, 11, 0.9);
  visibility: hidden;
  opacity: 0;
  transition: all 0.25s ease-in-out;
  z-index: 10;
}

.modal-wrapper.open {
  opacity: 1;
  visibility: visible;
}

.modal {
  width: 600px;
  height: 400px;
  display: block;
  margin: 50% 0 0 -300px;
  position: relative;
  top: 50%;
  left: 50%;
  background: #fff;
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.modal-wrapper.open .modal {
  margin-top: -200px;
  opacity: 1;
}

.head {
  width: 90%;
  height: 32px;
  padding: 12px 30px;
  overflow: hidden;
  background: #27adbb;
}

.btn-close {
  font-size: 28px;
  display: block;
  float: right;
  color: #fff;
}

.content {
  position: relative;
  display: flex;
  padding: 10%;
  align-items: center;
  justify-content: center;
}

.content .picker-date {
  display: flex;
}


@media screen and (min-width: 100px) and (max-width: 460px) {
  .search {
    max-width: 98%;
    margin-right: 0;
    margin-left: 0;
  }

  .search-title {
    font-size: 18px;
    line-height: 26px;
    margin: 5px 0px;
  }

  .search-field {
    max-width: 100%;
  }

  .search-input {
    width: 90%;
    padding-left: 10%;
    font-size: 17px;
  }

  .form_radio_group-item__VIN {
    border-radius: 5px !important;
  }

  .modal {
    width: 300px;
    height: 400px;
    display: block;
    margin: 50% 0 0 -150px;
    position: relative;
    top: 50%;
    left: 50%;
    background: #fff;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  .head {
    width: 80%;
    height: 32px;
    padding: 12px 30px;
    overflow: hidden;
    background: #27adbb;
  }
}


</style>