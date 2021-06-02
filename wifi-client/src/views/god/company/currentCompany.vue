<template>
  <div class="currentCompany">

    <div class="mainTitle">
      <h3>"Компания: "{{ GOD_COMPANY_CURRENT_STATE.name }}</h3>
    </div>

    <div class="toReturn">
      <link-neon
          btn-text="НАЗАД"
          btn-link="godCompany"
      ></link-neon>
    </div>


    <div class="mainBody">
      <div class="data">

        <div class="data__item">
          <h3 class="data__item_title">Имя:</h3>
          <h4 class="data__item_value">{{ GOD_COMPANY_CURRENT_STATE.name }}</h4>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">Дата регистрации:</h3>
          <div class="data__item_value">{{ dateReg }}</div>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">Время регистрации:</h3>
          <div class="data__item_value">{{ timeReg }}</div>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">ID:</h3>
          <h4 class="data__item_value">{{ GOD_COMPANY_CURRENT_STATE._id }}</h4>
        </div>

        <div class="data__item">
          <div
              @click="updateItem">
            <btn-neon
                class="update_item"
                btn-text="ИЗМЕНИТЬ"
            ></btn-neon>
          </div>

          <div
              @click="deleteItem">
            <btn-neon
                class="delete_item"
                btn-text="УДАЛИТЬ"
            ></btn-neon>
          </div>
        </div>

        <div class="data__item">
          <link-neon class="linkNeon"
                     btn-text="Сотрудники"
                     btn-link="godUsers"
          ></link-neon>
          <link-neon class="linkNeon"
                     btn-text="Транспорт"
                     btn-link="godTransports"
          ></link-neon>
          <link-neon class="linkNeon"
                     btn-text="Здания"
                     btn-link="godBuilds"
          ></link-neon>

        </div>

      </div>
    </div>

    <popup-window
        v-if="successMessage != ''"
        :message="successMessage"
        btn-link="users"
    ></popup-window>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import btnNeon from '../../../components/btn_neon'
import linkNeon from '../../../components/link_neon'
import popupWindow from '../../../components/popupWindow'
import HELPER from "./../../../libs/helper";

export default {
  name: "transports",
  props: {},
  data() {
    return {
      title: "",
      successMessage: '',
      dateReg: '',
      timeReg: '',
    }
  },
  components: {
    linkNeon,
    btnNeon,
    popupWindow
  },
  computed: {
    ...mapGetters([
      "GOD_COMPANY_CURRENT_STATE"
    ]),


  },
  methods: {
    ...mapActions([
      "GOD_COMPANY_CURRENT_API",
      "GOD_COMPANY_DELETE",
    ]),
    ...mapMutations([
      "GOD_TRANSPORTS_CURRENT_SET"
    ]),
    success(data) {
      console.log(data)
      this.successMessage = data
    },
    updateItem() {
      //=====================
    },
    async deleteItem() {
      let response = await this.GOD_COMPANY_DELETE(this.GOD_COMPANY_CURRENT_STATE._id);

      if (response.status <= 209) {
        this.successMessage = response.data.message;
      }

    },

  },
  async mounted() {
    await this.GOD_TRANSPORTS_CURRENT_SET({});
    await localStorage.setItem('currentCompany', '');
    await localStorage.setItem('currentUser', '');
    await localStorage.setItem('currentTransport', '');
    await localStorage.setItem('currentCamera', '');
    await localStorage.setItem('currentNotification', '');

    await this.GOD_COMPANY_CURRENT_API(this.$route.params.id);
    await localStorage.setItem('currentCompany', this.GOD_COMPANY_CURRENT_STATE._id);

    this.dateReg = await HELPER.getDate_DD_MM_YYYY(this.GOD_COMPANY_CURRENT_STATE.registrationTime);
    this.timeReg = await HELPER.getTime_HH_MM_SS(this.GOD_COMPANY_CURRENT_STATE.registrationTime);


    await this.$emit("headerCompanyName", this.GOD_COMPANY_CURRENT_STATE)

  },
  created() {

  }
}
</script>

<style scoped>

.currentCompany {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mainTitle {
  display: flex;
  min-width: 30%;
  justify-content: center;
  align-items: center;
  border: 2px dashed #21ebff;
  margin: 20px 0;
  padding: 0 20px;
}

.mainBody {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.data {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 320px;

  /*height: 400px;*/
  border: 2px solid #21ebff;
  padding: 20px;
}

.data__item {
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.linkNeon {
  margin-bottom: 40px;
}

</style>