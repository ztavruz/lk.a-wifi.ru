<template>
  <button class="btn-neon"
  >{{ btnText }}
  </button>
</template>

<script>
export default {
  name: "btn_neon",
  props: {
    btnText: {
      type: String,
      default() {
        return "";
      }
    }
  },
}
</script>

<style scoped>
.btn-neon {
  margin: 20px 0;
  outline: none;

  min-width: 210px;
}

button {
  position: relative;
  padding: 10px 20px;
  margin: 0 15px;
  color: #27ebff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 20px;
  /*transition: 0.3s;*/
  overflow: hidden;
  text-align: center;
  background: none;
}

button:hover {
  background: #21ebff;
  color: #000;
  box-shadow: 0 0 50px #21ebff;
  transition-delay: 0.5s;
}

button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  border-top: 2px solid #21ebff;
  border-left: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.3s;
}

button:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border-bottom: 2px solid #21ebff;
  border-right: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.3s;
}

button:hover:before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

button:hover:after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
</style>