<template>
  <div class="cardObject ">
    <div class="face front">
      <div class="item-img-build"></div>
      <h1 class="numberTC_title ">{{build.address}}</h1>
    </div>
    <div class="face back">
      <div class="back_left"></div>
      <div class="back_right">
          <h1>ИНФО</h1>
          <h1>Адрес: {{build.address}}</h1>
          <h1>VIN: {{build.VNTO}}</h1>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {

  name: "cardBuild",
  props: {
    btnText: {
      type: String,
      default() {
        return "";
      }
    },
    build: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      title: "",
      icon: ""
    }
  },
  components: {},
  computed: {
    ...mapGetters([
        "GET_CURRENT_TRANSPORT_STATE"
    ]),
  },
  methods: {},
  watch: {},
  mounted() {

  }
}
</script>

<style scoped>


.cardObject {
  position: relative;
  width: 250px;
  height: 300px;
  transform-style: preserve-3d;
  margin: 10px;
  overflow: hidden;

}

.cardObject:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border-top: 2px solid #21ebff;
  border-left: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.3s;
}

.cardObject:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
  border-bottom: 2px solid #21ebff;
  border-right: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.3s;
}

.cardObject:hover:before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.cardObject:hover:after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.cardObject .face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  backface-visibility: hidden;

  transition: 0.5s ease-in-out;
  transform: perspective(500px) rotateY(0deg);
}

.cardObject .face.front {
  /*background: #fff;*/
}

.cardObject:hover .face.front {
  transform: perspective(500px) rotateY(180deg);
}

.cardObject .face.back {
  /*background: yellow;*/
  transform: perspective(500px) rotateY(180deg);
}

.cardObject:hover .face.back {
  transform: perspective(500px) rotateY(360deg);
}

.cardObject .back h2 {

  transform: perspective(500px) translateZ(500px);

}

.item-img-car {
  height: 80%;
  width: 100%;
  background: url("../../../assets/images/catalog/car1.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
}

.item-img-truck {
  height: 80%;
  width: 100%;
  background: url("../../../assets/images/catalog/truck1.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
}

.item-img-train {
  height: 80%;
  width: 100%;
  background: url("../../../assets/images/catalog/train1.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
}

.item-img-build {
  height: 80%;
  width: 100%;
  background: url("../../../assets/images/catalog/build.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
}

.numberTC_title {
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: center;
  align-items: center;
  margin: 0;
  /*background: #000;*/
}



</style>
