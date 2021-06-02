<template>
  <div class="currentTransport">

    <div class="mainTitle">
      <h3>Сотрудник: "{{ GOD_COMPANY_CURRENT_STATE.name }}"</h3>
    </div>

    <div class="toReturn">
      <link-neon
          btn-text="НАЗАД"
          btn-link="godUsers"
      ></link-neon>
    </div>


    <div class="mainBody">
      <div class="data">

        <div class="data__item">
          <h3 class="data__item_title">Полномочия:</h3>
          <h4 class="data__item_value"
              v-if="GOD_USERS_CURRENT_STATE.status == 1"
          >Наблюдатель</h4>
          <h4 class="data__item_value"
              v-else-if="GOD_USERS_CURRENT_STATE.status == 2"
          >Владелец</h4>
          <h4 class="data__item_value"
              v-else-if="GOD_USERS_CURRENT_STATE.status == 3"
          >Администратор</h4>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">Имя:</h3>
          <h4 class="data__item_value">{{ GOD_USERS_CURRENT_STATE.name }}</h4>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">Дата регистрации:</h3>
          <div class="data__item_value">{{ GOD_USERS_CURRENT_STATE.registrationTime }}</div>
        </div>

        <div class="data__item">
          <h3 class="data__item_title">ID:</h3>
          <h4 class="data__item_value">{{ GOD_USERS_CURRENT_STATE._id }}</h4>
        </div>

        <div class="data__item">
          <div
              @click="updateItem">
            <btn-neon
                class="update_transport"
                btn-text="ИЗМЕНИТЬ"

            ></btn-neon>
          </div>

          <div
              @click="deleteItem">
            <btn-neon
                class="delete_transport"
                btn-text="УДАЛИТЬ"
                @click="deleteItem"
            ></btn-neon>
          </div>

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
import {mapActions, mapGetters} from 'vuex'
import btnNeon from '../../../components/btn_neon'
import linkNeon from '../../../components/link_neon'
import popupWindow from '../../../components/popupWindow'

export default {
  name: "transports",
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
      "GOD_USERS_CURRENT_STATE",
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_USERS_CURRENT_API",
      "GOD_USERS_DELETE",
    ]),
    success(data) {
      console.log(data)
      this.successMessage = data
    },
    updateItem() {
      //=================
    },
    async deleteItem() {
      let response = await this.GOD_USERS_DELETE(this.GOD_USERS_CURRENT_STATE._id);

      if(response.status <= 209){
        this.successMessage = response.data.message;
      }

    },

  },
  async mounted() {
      await this.GOD_USERS_CURRENT_API(this.$route.params.id);
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

.fields-item__error{

}
</style>