<template>
  <div class="mainTransports">

    <div class="mainTitle">
      <h3>Строения компании: {{ GOD_COMPANY_CURRENT_STATE.name }}</h3>
    </div>

    <div class="addNew">
      <link-neon
          btn-text="Зарегистрировать здание"
          btn-link="newBuilds"
          class-icon="fa fa-plus"
      ></link-neon>
    </div>

    <div class="mainBody">
      <router-link
          v-for="build in  this.GOD_COMPANY_BUILDS_STATE"
          :key="build._id"
          tag="div"
          :to="{name: `currentBuilds`, params: {id: build._id, isRout: '2222' }}"
      >
        <card-builds
            :build="build"
        ></card-builds>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import cardBuilds from './cardBuilds'
import linkNeon from '../../../components/link_neon'

export default {
  name: "builds",
  props: {},
  data() {
    return {
      title: "",

    }
  },
  components: {
    cardBuilds,
    linkNeon
  },
  computed: {
    ...mapGetters([
      "GOD_COMPANY_CURRENT_STATE",
      "GOD_COMPANY_BUILDS_STATE",

    ]),
  },
  methods: {
    ...mapActions([
      "GOD_COMPANY_BUILDS_API"
    ]),

  },
  async mounted() {
    let companyId = await localStorage.getItem('currentCompany')
    await this.GOD_COMPANY_BUILDS_API(companyId);
    await console.log(this.GOD_COMPANY_BUILDS_STATE)
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