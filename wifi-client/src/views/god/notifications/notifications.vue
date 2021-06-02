<template>
  <div class="mainNotifications">

    <div class="mainTitle">
      <h3>"Список оповещений компании {{ GOD_COMPANY_CURRENT_STATE.name }}"</h3>
    </div>

    <div class="addNew">
      <btn-neon
          btn-text="Добавить оповещение компании"
          btn-link="newNotifications"
          class-icon="fa fa-plus"
      ></btn-neon>
    </div>

    <div class="mainBody">
      <router-link
          v-for="notification in  this.GOD_COMPANY_NOTIFICATIONS_STATE"
          :key="notification._id"
          tag="div"
          :to="{name: `currentNotification`, params: {id: notification._id}}"
      >
        <card-notifications
            :notification="notification"
        ></card-notifications>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import cardNotifications from './cardNotifications'
import btnNeon from '../../../components/link_neon'

export default {
  name: "notifications",
  props: {},
  data() {
    return {
      title: "",

    }
  },
  components: {
    cardNotifications,
    btnNeon
  },
  computed: {
    ...mapGetters([
      "GOD_COMPANY_CURRENT_STATE",
      "GOD_COMPANY_NOTIFICATIONS_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_COMPANY_NOTIFICATIONS_API"
    ]),
  },
  async mounted() {
    let companyId = await localStorage.getItem('currentCompany');
    // let companyId =
    await this.GOD_COMPANY_NOTIFICATIONS_API(companyId);
    await console.log(this.GOD_COMPANY_NOTIFICATIONS_STATE)
  },
  created() {

  }
}
</script>

<style scoped>

a {
  outline: none;
}

.mainNotifications {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
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
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

}


</style>