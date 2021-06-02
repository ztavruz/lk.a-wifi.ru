<template>
  <div class="cardFlip "
    @click="setCurrentNotificationLocalStorage"
  >
    <div class="face front">
      <div class="item-img">
        <i class="far fa-envelope"></i>
      </div>
      <h3 class="numberTC_title ">{{notification.title}}</h3>
    </div>
    <div class="face back">
          <h1>ИНФО:</h1>
        <h3>Текст сообщения:</h3>
        <h3>{{notification._id}}</h3>

    </div>
  </div>
</template>

<script>

export default {

  name: "cardFlip",
  props: {
    btnText: {
      type: String,
      default() {
        return "";
      }
    },
    notification: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      title: "",
      icon: ""
    }
  },
  components: {},
  computed: {},
  methods: {
      setCurrentNotificationLocalStorage(){
           localStorage.setItem('currentNotification', this.notification._id);
      }
  },
  watch: {},
  async mounted() {

  }
}
</script>

<style scoped>


.cardFlip {
  position: relative;
  width: 250px;
  height: 300px;
  transform-style: preserve-3d;
  margin: 10px;
  overflow: hidden;

}

.cardFlip:before {
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

.cardFlip:after {
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

.cardFlip:hover:before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.cardFlip:hover:after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.cardFlip .face {
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

.cardFlip .face.front {
  /*background: #fff;*/
}

.cardFlip:hover .face.front {
  transform: perspective(500px) rotateY(180deg);
}

.cardFlip .face.back {
  /*background: yellow;*/
  transform: perspective(500px) rotateY(180deg);
}

.cardFlip:hover .face.back {
  transform: perspective(500px) rotateY(360deg);
}

.cardFlip .back h2 {

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
