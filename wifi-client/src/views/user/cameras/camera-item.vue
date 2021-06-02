<template>
  <div class="camera-item"
       @click="setCameraLocalStorage()"
  >
    <!--        <div class="item-img item-img-null" v-if="!data_transport.model"></div>-->
    <div class="item-img">
      <i class="fas fa-video"></i>
    </div>
    <div class="item-data">
      <div class="item-data__icon">№</div>
      <div class="item-data__number ">{{ data_camera.nameCamera }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "camera-item",
  props: {
    data_camera: {
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
    setCameraLocalStorage() {
      localStorage.setItem("currentCamera", this.data_camera._id);
      localStorage.setItem("numberCamera", this.data_camera.numberCamera);
    }
  },
  watch: {},
  mounted() {

  }
}
</script>

<style scoped>

.camera-item {
  width: 200px;
  height: 200px;
  background: #EFEEEE;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  border-radius: 3px;
}

.item-img {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120px;
  height: 80%;
  width: 100%;
  color: #2E2E2E;
}

.item-data {
  display: flex;
  flex-direction: row;
  height: 20%;
  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 5px 5px 3px 0px;
}

.item-data__icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 47px;
  position: relative;
  bottom: 4px;
  left: -5px;

  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 5px;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-transform: uppercase;
  color: #27ADBB;
}

.item-data__number {
  width: 70%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 2%;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 40px;
  /* identical to box height, or 148% */
  color: #000000;
}

@media screen and (min-width: 100px) and (max-width: 600px) {
  .camera-item {
    width: 150px;
    height: 150px;
  }

  .item-data__icon {
    width: 37px;
    height: 32px;
    bottom: 2px;
    left: -5px;
    border-radius: 3px;
    font-size: 20px;
    line-height: 28px;
  }

  .item-data__number {
    font-size: 20px;
  }

  .fa-video {
    font-size: 90px;
  }
}

</style>
