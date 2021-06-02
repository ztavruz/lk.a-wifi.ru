<template>
  <div class="cardCamera">
    <div class="face front">
      <div class="item-img">
        <i class="fas fa-video"></i>
      </div>
      <h1 class="numberTC_title ">{{camera.nameCamera}}</h1>
    </div>
    <div class="face back">
      <div class="back_left"></div>
      <div class="back_right">
          <h1>ИНФО:</h1>
        <h3>Id: {{camera._id}}</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: "cardCamera",
  props: {
    btnText: {
      type: String,
      default() {
        return "";
      }
    },
    camera: {
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
  computed: {},
  methods: {},
  watch: {},
  mounted() {

  }
}
</script>

<style scoped>


.cardCamera {
  position: relative;
  width: 250px;
  height: 300px;
  transform-style: preserve-3d;
  margin: 10px;
  overflow: hidden;

}

.cardCamera:before {
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

.cardCamera:after {
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

.cardCamera:hover:before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.cardCamera:hover:after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.cardCamera .face {
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

.cardCamera .face.front {
  /*background: #fff;*/
}

.cardCamera:hover .face.front {
  transform: perspective(500px) rotateY(180deg);
}

.cardCamera .face.back {
  /*background: yellow;*/
  transform: perspective(500px) rotateY(180deg);
}

.cardCamera:hover .face.back {
  transform: perspective(500px) rotateY(360deg);
}

.cardCamera .back h2 {

  transform: perspective(500px) translateZ(500px);

}

.item-img{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120px;
  height: 80%;
  width: 100%;
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
