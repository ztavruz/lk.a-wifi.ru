<template>
  <div class="mainUsers">
    <div class="mainTitle">
      <h3>Сотрудники компании: {{GOD_COMPANY_CURRENT_STATE.name}}</h3>
    </div>

    <div class="addNew">
      <link-neon
          btn-text="Добавить сотрудника"
          btn-link="newUser"
          class-icon="fa fa-user-plus"
      ></link-neon>
    </div>

    <div class="mainBody">
      <router-link
          v-for="user in GOD_COMPANY_USERS_STATE"
          :key="user._id"
          tag="div"
          :to="{name: `currentUser`, params: {id: user._id}}"
      >
        <card-user

            :user="user"
        ></card-user>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import  cardUser from './cardUser'
import linkNeon from '../../../components/link_neon'

export default {
  name: "users",
  props: {},
  data() {
    return {
      title: "",

    }
  },
  components: {
    cardUser,
    linkNeon
  },
  computed: {
    ...mapGetters([
      "GOD_COMPANY_CURRENT_STATE",
      "GOD_COMPANY_USERS_STATE",
    ]),
    // currentCompanyName(){
    //   return localStorage.
    // }
  },
  methods: {
    ...mapActions([
        "GOD_COMPANY_USERS_API"
    ]),
  },
  async mounted() {
    let companyId = await localStorage.getItem('currentCompany')
    await this.GOD_COMPANY_USERS_API(companyId);
    await console.log(this.GOD_COMPANY_USERS_STATE)
  },
  created() {

  }
}
</script>

<style scoped>

.mainUsers {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.mainTitle{
  display: flex;
  min-width: 30%;
  justify-content: center;
  align-items: center;
  border: 2px dashed #21ebff;
  margin: 20px 0;
  padding: 0 20px;
}
.mainBody{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}



</style>