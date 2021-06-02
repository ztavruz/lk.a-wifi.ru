<template>







  <div class="main-404 br">
    <!--    <i class="fas fa-hand-middle-finger br"></i>-->
    <div class="anonim"></div>
    <h2 class="title-404">ROUT NOT FOUND</h2>
    <h2 class="subtitle-404">Error 404</h2>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
.main-404 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  width: 100%;
  height: 100vh;
}
.title-404{
  color: darkgreen;
}
.subtitle-404{
  color: darkred;
}

.fa-hand-middle-finger {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120px;
  width: 100%;
  color: #2E2E2E;
}

.anonim{
  background: url("./../assets/images/main/anonim404.png") no-repeat center center;
  width: 253px;
  height: 300px;
  margin-bottom: 40px;
}

</style>