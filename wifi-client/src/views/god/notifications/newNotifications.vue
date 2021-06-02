<template>
  <div class="newCompany">

    <div class="mainTitle">
      <h3>Новое оповещение для компании {{GOD_COMPANY_CURRENT_STATE.name}}</h3>
    </div>

    <div class="toReturn">
      <link-neon
          btn-text="НАЗАД"
          btn-link="godNotifications"
      ></link-neon>
    </div>


    <div class="mainBody">
      <form-notifications
        @resData="success"
      ></form-notifications>
    </div>

    <popup-window
        v-if="successMessage != ''"
        :message="successMessage"
        btn-link="godNotifications"
    ></popup-window>



  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import formNotifications from '../notifications/formNotifications'
import linkNeon from '../../../components/link_neon'
import btnNeon from "@/components/btn_neon";
import popupWindow from "@/components/popupWindow";


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
    formNotifications,
    linkNeon,
    popupWindow
  },
  computed: {
    ...mapGetters([
        "GOD_COMPANY_CURRENT_STATE"
    ]),
  },
  methods: {
    ...mapActions([
      ""
    ]),
    success(data){
      console.log(data)
      this.successMessage = data
    }
  },
  mounted() {

  },
  created() {

  }
}
</script>

<style scoped>

.newCompany {
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


</style>