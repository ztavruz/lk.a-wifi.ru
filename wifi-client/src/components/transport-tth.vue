<template>
  <div class="transport_tth__main ">
    <div class="tth-row tth-name ">
      <div class="title ">Тип объекта :</div>
      <div class="value ">
        <div v-if="data_object.type == 1">Легковой</div>
        <div v-else-if="data_object.type == 2">Грузовой</div>
        <div v-else-if="data_object.type == 3">Поезд</div>
        <div v-else-if="data_object.type == 4">Здание</div>
      </div>
    </div>

    <div
        v-if="data_object.type == 1 || data_object.type == 2 || data_object.type == 3"
    >
      <div class="tth-row tth-pts ">
        <div class="title">Номер ПТС :</div>
        <div class="value">{{ data_object.numberPTC }}</div>
      </div>
      <div class="tth-row tth-ts ">
        <div class="title">Номер ТС :</div>
        <div class="value">{{ data_object.numberTC }}</div>
      </div>
    </div>
    <div
        v-if="data_object.type == 4"
    >
      <div class="tth-row tth-pts ">
        <div class="title">Адрес :</div>
        <div class="value">{{ data_object.address }}</div>
      </div>
    </div>

    <div class="tth-row tth-internalNumber ">
      <div class="title">VIN* :</div>
      <div class="value">{{ data_object.VNTO }}</div>
    </div>
    <div class="tth-desc">* Внутренний номер объекта</div>
  </div>
</template>

<script>
export default {
  name: "transport-tth",
  props: {
    data_object: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      title: "",
    }
  },
  components: {},
  computed: {},
  methods: {},
  watch: {},
  async mounted() {

  },
  async created() {
    // await console.log(this.data_object);
  }
}
</script>

<style scoped>
.transport_tth__main {
  display: flex;
  flex-direction: column;
  width: 400px;
  min-width: 200px;
  /*margin: auto 0;*/
  margin: 20px 0;
}

.tth-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 100%;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 40px;
  /* or 148% */
  color: #FFFFFF;
}

.title {
  /*width: 80%;*/
}

.value {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.tth-desc {
  width: 100%;
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 40px;
  color: #FFFFFF;
}

@media screen and (min-width: 421px) and (max-width: 600px) {
  .transport_tth__main {
    display: flex;
    flex-direction: column;
    width: 400px;
    min-width: 200px !important;
  }
}

@media screen and (min-width: 300px) and (max-width: 420px) {
  .transport_tth__main {
    display: flex;
    flex-direction: column;
    width: 90%;
    min-width: 200px !important;
  }
}

@media screen and (min-width: 100px) and (max-width: 299px) {
  .transport_tth__main {
    display: flex;
    flex-direction: column;
    width: 90%;
    min-width: 200px !important;
  }
}

@media screen and (min-width: 100px) and (max-width: 460px) {
  .tth-row {
    max-width: 100%;
    font-size: 18px;
    line-height: 24px;
  }

  .tth-desc[data-v-41da1938] {
    width: 100%;
    font-size: 12px;
    line-height: 30px;
  }
}
</style>