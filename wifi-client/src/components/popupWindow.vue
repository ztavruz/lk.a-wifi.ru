<template>
  <div class="popupMain">
    <div class="popup__card">
      <div class="popup__card_item popup__card_message"><h3>{{message}}</h3>
      </div>
      <link-neon class="popup__card_item popup__card_button"
                 btn-text="ОК"
                 :btn-link="btnLink"

      ></link-neon>
    </div>
  </div>
</template>

<script>
import linkNeon from './link_neon'


export default {
  name: "popupWindow",
  props: {
    message: {
      type: String,
      default(){
        return "";
      }
    },
    btnLink: {
      type: String,
      default(){
        return "";
      }
    },
  },
  data() {
    return {
      title: "",
    }
  },
  components: {
    linkNeon
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {

  },
  created() {

  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.popupMain {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
}

.popup__card {
  display: flex;
  position: relative;
  /*top: -5%;*/
  /*left: 10%;*/
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 500px;
  border: 1px dashed #21ebff;
  border-radius: 10px;
  background: #000;
  padding: 20px;
}

.popup__card_message {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;

  width: 100%;
  height: 20%;
  border: 2px solid #21ebff;
  border-radius: 10px;
  color: red;
}

.popup__card_item {
  margin: 20px 0;
}

</style>