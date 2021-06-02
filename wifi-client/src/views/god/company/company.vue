<template>
  <div class="mainCompany">

    <div class="mainTitle">
      <h3>"Список компаний"</h3>
    </div>

    <div class="addNew">
      <btn-neon
        btn-text="Зарегистрировать компанию"
        btn-link="newCompany"
        class-icon="fa fa-plus"
      ></btn-neon>
    </div>

    <div class="mainBody">
      <router-link
          v-for="company in  this.GOD_COMPANY_ALL_STATE"
          :key="company._id"
          tag="div"
          :to="{name: `currentCompany`, params: {id: company._id}}"
      >
        <card-company

            :company="company"
        ></card-company>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import  cardCompany from './cardCompany'
import btnNeon from '../../../components/link_neon'

export default {
  name: "transports",
  props: {},
  data() {
    return {
      title: "",

    }
  },
  components: {
    cardCompany,
    btnNeon
  },
  computed: {
    ...mapGetters([
        "GOD_COMPANY_ALL_STATE"
        ]),
  },
  methods: {
    ...mapActions([
      "GOD_COMPANY_ALL_API"
    ]),
  },
  async mounted() {
    console.log(new Date())
    await this.GOD_COMPANY_ALL_API();
  },
  created() {

  }
}
</script>

<style scoped>

a{
  outline: none;
}

.mainCompany {
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
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

}



</style>