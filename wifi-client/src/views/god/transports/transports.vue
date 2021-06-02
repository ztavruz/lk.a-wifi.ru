<template>
  <div class="mainTransports">

    <div class="mainTitle">
      <h3>Транспорты компании: {{ GOD_COMPANY_CURRENT_STATE.name }}</h3>
    </div>

    <div class="addNew">
      <link-neon
          btn-text="Зарегистрировать Транспорт"
          btn-link="newTransport"
          class-icon="fa fa-plus"
      ></link-neon>
    </div>

    <div class="mainBody">
      <router-link

          v-for="transport in  this.GOD_COMPANY_TRANSPORTS_STATE"
          :key="transport._id"
          tag="div"

          :to="{name: `currentTransport`, params: {id: transport._id }}"
      >
        <card-transport
            :transport="transport"
        ></card-transport>

      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import cardTransport from './cardTransport'
import linkNeon from '../../../components/link_neon'

export default {
  name: "transports",
  props: {},
  data() {
    return {
      title: "",

    }
  },
  components: {
    cardTransport,
    linkNeon
  },
  computed: {
    ...mapGetters([
      "GOD_COMPANY_CURRENT_STATE",
      "GOD_COMPANY_TRANSPORTS_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      "GOD_COMPANY_TRANSPORTS_API"
    ]),

  },
  async mounted() {
    let companyId = await localStorage.getItem('currentCompany')
    await this.GOD_COMPANY_TRANSPORTS_API(companyId);
    await console.log(this.GOD_COMPANY_TRANSPORTS_STATE)
  },
  created() {

  }
}
</script>

<style scoped>

.mainTransports {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
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
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}


</style>