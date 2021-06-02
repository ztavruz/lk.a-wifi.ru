<template>
  <div class="online-item"
       @click="setObjectIdLocalStorage"
  >
    <!--        <div class="item-img item-img-null" v-if="!object.model"></div>-->
    <div class="item-img-car" v-if="object.type == 1"></div>
    <div class="item-img-truck" v-else-if="object.type == 2"></div>
    <div class="item-img-train" v-else-if="object.type == 3"></div>
    <div class="item-img-build" v-else-if="object.type == 4"></div>
    <div class="item-data">
      <div class="item-data__icon">№</div>
      <div class="item-data__number">{{ object.address || object.numberTC }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "online-item",
  props: {
    object: {
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
    setObjectIdLocalStorage() {
      if (this.object.type == 1 || this.object.type == 2 || this.object.type == 3) {
        localStorage.setItem("currentTransport", this.object._id);
        localStorage.removeItem('currentBuild');
      } else if (this.object.type == 4) {
        localStorage.setItem("currentBuild", this.object._id);
        localStorage.removeItem('currentTransport');
      }
    }
  },
  watch: {},
  async mounted() {
  }
}
</script>

<style scoped>

.online-item {
  width: 180px;
  height: 180px;
  background: #EFEEEE;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  border-radius: 3px;
}

.item-img-null {
  width: 100%;
  height: 157px;
}

.item-img-car {
  height: 80%;
  background: url("../../../assets/images/catalog/car.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
}

.item-img-truck {
  height: 80%;
  background: url("../../../assets/images/catalog/truck.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
}

.item-img-train {
  height: 80%;
  background: url("../../../assets/images/catalog/train.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
}

.item-img-build {
  height: 80%;
  background: url("../../../assets/images/catalog/build.png") no-repeat center;
  background-repeat: no-repeat;
  background-position: center;
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
  height: 43px;
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
  width: 100%;
  text-align: center;
  display: inline;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*padding-top: 2%;*/
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  color: #000000;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

}


@media screen and (min-width: 100px) and (max-width: 600px) {
  .online-item {
    width: 200px;
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
    font-size: 21px;
  }

  .item-img-car {
    height: 80%;
    background: url("../../../assets/images/catalog/car.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40% 70%;
  }

  .item-img-truck {
    height: 80%;
    background: url("../../../assets/images/catalog/truck.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50% 60%;
  }

  .item-img-train {
    height: 80%;
    background: url("../../../assets/images/catalog/train.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30% 75%;
  }

  .item-img-build {
    height: 80%;
    background: url("../../../assets/images/catalog/build.png") no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40% 75%;
  }
}

</style>
