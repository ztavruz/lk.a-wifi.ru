<template>
  <div class="currentTransport">

    <div class="mainTitle">
      <h3>Транспорт: "{{ this.GOD_TRANSPORTS_CURRENT_STATE.numberTC }}"</h3>
    </div>

    <div class="toReturn">
      <link-neon
          btn-text="НАЗАД"
          btn-link="godTransports"
      ></link-neon>
    </div>

    <div class="mainBody">
      <div class="data">

        <div class="data__item">
          <h3 class="data__item_title">Тип транспорта:</h3>
          <h4 class="data__item_value"
              v-if="this.GOD_TRANSPORTS_CURRENT_STATE.type == 1"
          >ЛЕГКОВОЙ</h4>
          <h4 class="data__item_value"
              v-else-if="this.GOD_TRANSPORTS_CURRENT_STATE.type == 2"
          >Грузовой</h4>
          <h4 class="data__item_value"
              v-else-if="this.GOD_TRANSPORTS_CURRENT_STATE.type == 3"
          >Поезд</h4>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">Номер ТС:</h3>
          <h4 class="data__item_value">{{ this.GOD_TRANSPORTS_CURRENT_STATE.numberTC }}</h4>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">Дата регистрации:</h3>
          <div class="data__item_value">{{ this.GOD_TRANSPORTS_CURRENT_STATE.registrationTime }}</div>
        </div>

        <div class="data__item">
          <div
              @click="updateItem">
            <router-link
                tag="a"
                :to="{name: 'updateTransport'}"
            >
              <btn-neon
                  class="update_item"
                  btn-text="ИЗМЕНИТЬ"
              ></btn-neon>
            </router-link>
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
          <div
              @click="updateItem">
            <link-neon
                btn-text="КАМЕРЫ ТРАНСПОРТА"
                btn-link="godCameras"
                :btn-params="{id: this.GOD_TRANSPORTS_CURRENT_STATE._id, isTransport: true}"
            ></link-neon>
          </div>
        </div>

      </div>
    </div>

    <popup-window
        v-if="successMessage != ''"
        :message="successMessage"
        btn-link="transports"
    ></popup-window>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import btnNeon from '../../../components/btn_neon'
import linkNeon from '../../../components/link_neon'
import popupWindow from '../../../components/popupWindow'

export default {
  name: "currentTransport",
  props: {},
  data() {
    return {
      title: "",
      successMessage: ''
    }
  },
  components: {
    linkNeon,
    btnNeon,
    popupWindow
  },
  computed: {
    ...mapGetters([
      "GOD_COMPANY_CURRENT_STATE",
      "GOD_TRANSPORTS_CURRENT_STATE",
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_TRANSPORTS_CURRENT_API",
      "GOD_TRANSPORTS_DELETE",
    ]),
    ...mapMutations([]),
    success(data) {
      console.log(data)
      this.successMessage = data
    },
    updateItem() {
      //================================
    },
    async deleteItem() {
      let response = await this.GOD_TRANSPORTS_DELETE(this.GOD_TRANSPORTS_CURRENT_STATE._id);
      if (response.status <= 209) {
        this.successMessage = response.data.message;
      }

    },

  },
  async mounted() {
    await this.GOD_TRANSPORTS_CURRENT_API(this.$route.params.id);

    await localStorage.setItem('currentTransport', this.GOD_TRANSPORTS_CURRENT_STATE._id);
    await localStorage.removeItem('currentBuild'); //удалить что бы не путать транспорт и строение
  },
  created() {

  }
}
</script>

<style scoped>

.currentTransport {
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
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}


</style>