<template>
  <div class="currentCamera">

    <div class="mainTitle">
      <h3>Камера: "{{ this.GOD_CAMERAS_CURRENT_STATE.nameCamera }}"</h3>
    </div>

    <div class="toReturn">
      <link-neon
          btn-text="НАЗАД"
          btn-link="godCameras"

      ></link-neon>
    </div>


    <div class="mainBody">
      <div class="data">

        <div class="data__item">
          <h3 class="data__item_title">Номер камеры:</h3>
          <h4 class="data__item_value">{{ this.GOD_CAMERAS_CURRENT_STATE.numberCamera }}</h4>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">Дата регистрации:</h3>
          <div class="data__item_value">{{ this.GOD_CAMERAS_CURRENT_STATE.registrationTime }}</div>
        </div>

        <div class="data__item">
          <div
              @click="updateItem">
            <router-link
                tag="a"
                :to="{name: 'updateCamera'}"
            >
              <btn-neon
                  class="update_item"
                  btn-text="ИЗМЕНИТЬ"
              ></btn-neon>
            </router-link>
          </div>

          <div
              @click="updateItem">
            <router-link
                tag="a"
                :to="{name: 'redirectCamera'}"
            >
              <btn-neon
                  class="redirect_item"
                  btn-text="ПЕРЕАДРЕСАЦИЯ"
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
            <link-neon
                btn-text="ОНЛАЙН ТРАНСЛЯЦИЯ"
                btn-link="builds"
                :btn-params="{id: this.GOD_CAMERAS_CURRENT_STATE._id}"
            ></link-neon>
        </div>
        <div class="data__item">
            <link-neon
                btn-text="ВИДЕО АРХИВ"
                btn-link="cameras"
                :btn-params="{id: this.GOD_CAMERAS_CURRENT_STATE._id}"
            ></link-neon>
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
import {mapActions, mapGetters} from 'vuex'
import btnNeon from '../../../components/btn_neon'
import linkNeon from '../../../components/link_neon'
import popupWindow from '../../../components/popupWindow'
import HELPER from "../../../libs/helper";

export default {
  name: "currentCamera",
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
      "GOD_CAMERAS_CURRENT_STATE",
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_CAMERAS_CURRENT_API",
      "GOD_CAMERAS_DELETE",
    ]),
    success(data) {
      console.log(data)
      this.successMessage = data
    },
    updateItem() {
      // console.log(this.GOD_GET_CURRENT_CAMERA_STATE._id)
    },
    async deleteItem() {

      let request = await this.GOD_CAMERAS_DELETE(this.GOD_CAMERAS_CURRENT_STATE._id);

      if(request.status <= 209){
        this.$router.push({name: "cameras"});

      }else if(request.status > 209){

        let errorMessage = HELPER.getRequestData(request)
        this.errorMessage = '';
        this.errorMessage = errorMessage;
      }


    },

  },
  async mounted() {
    await this.GOD_CAMERAS_CURRENT_API(this.$route.params.id);
    await localStorage.setItem('currentCamera', this.GOD_CAMERAS_CURRENT_STATE._id);
  },
  created() {

  }
}
</script>

<style scoped>

.currentCamera {
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

/*================*/
.update_transport {
  color: yellow;
  margin: 20px 20px;
}

.update_transport:after {
  border-color: yellow;
}

.update_transport:before {
  border-color: yellow;
}
.update_transport:hover {
  background: yellow !important;
  color: #000;
  box-shadow: 0 0 50px yellow !important;
  transition-delay: 0.5s;
}

/*================*/
.delete_transport {
  color: red;
  margin: 20px 20px;
}

.delete_transport:after {
  border-color: red;
}

.delete_transport:before {
  border-color: red;
}
.delete_transport:hover {
  background: red !important;
  color: #000;
  box-shadow: 0 0 50px red !important;
  transition-delay: 0.5s;
}

/*================*/
.cameras_transport {
  color: lawngreen;
  /*margin: 20px 20px;*/
}

.cameras_transport:after {
  border-color: lawngreen !important;
}

.cameras_transport:before {
  border-color: lawngreen !important;
}

lawngreen {
  background: lawngreen !important;
  color: #000;
  box-shadow: 0 0 50px lawngreen !important;
  transition-delay: 0.5s;
}

</style>