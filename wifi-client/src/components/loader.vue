<template>
  <section class="loader_section">
    <div class="loader-text">
      loading
    </div>
    <div class="loader">
      <span style="--i:1;"></span>
      <span style="--i:2;"></span>
      <span style="--i:3;"></span>
      <span style="--i:4;"></span>
      <span style="--i:5;"></span>
      <span style="--i:6;"></span>
      <span style="--i:7;"></span>
      <span style="--i:8;"></span>
      <span style="--i:9;"></span>
      <span style="--i:10;"></span>
      <span style="--i:11;"></span>
      <span style="--i:12;"></span>
      <span style="--i:13;"></span>
      <span style="--i:14;"></span>
      <span style="--i:15;"></span>
      <span style="--i:16;"></span>
      <span style="--i:17;"></span>
      <span style="--i:18;"></span>
      <span style="--i:19;"></span>
      <span style="--i:20;"></span>
    </div>
  </section>
</template>

<script>
export default {
  name: "loader",
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
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000;
  animation: animateBg 10s linear infinite;

  width: 1150px;
  max-width: 85.2%;
  height: 50.9%;
  border: 1px solid #000000;

  background-image: url("./../assets/images/catalog/cyberpunk_mini.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;

}
.loader-text{
  /*color: #21ebff;*/
  color: #00ff0a;
  font-size: 55px;
  position: absolute;
  font-family: 'Audiowide', cursive;
}

@keyframes animateBg {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

section .loader {
  position: relative;
  width: 220px;
  height: 220px;
}

section .loader span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(18deg * var(--i)));
}

section .loader span::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #21ebff;
  box-shadow: 0 0 10px #00ff0a,
  0 0 20px #00ff0a,
  0 0 40px #21ebff,
  0 0 60px #00ff0a,
  0 0 80px #21ebff;
  /*0 0 100px #00ff0a;*/
  animation: animate 2s linear infinite;
  animation-delay: calc(0.1s * var(--i));
}

@keyframes animate {
  0% {
    transform: scale(1);
  }
  80%, 100% {
    transform: scale(0);
  }
}

@media screen and (min-width: 100px) and (max-width: 600px) {
  section {
    width: 1150px;
    max-width: 98%;
    height: 23.5%;
  }

  section .loader {
    position: relative;
    width: 80px;
    height: 80px;
  }

  section .loader span::before {
    width: 10px;
    height: 10px;
  }

  .loader-text{
    font-size: 18px;
  }
}

</style>