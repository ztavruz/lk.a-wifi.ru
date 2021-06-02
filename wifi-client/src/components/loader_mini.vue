<template>
  <div id="load" class="loaderMini" >
<!--    <div>G</div>-->
<!--    <div>N</div>-->
<!--    <div>I</div>-->
<!--    <div>D</div>-->
<!--    <div>A</div>-->
<!--    <div>O</div>-->
<!--    <div>L</div>-->
<!--    <div>Д</div>-->
<!--    <div>О</div>-->
<!--    <div>Х</div>-->
<!--    <div>В</div>-->
    <div>L</div>
    <div>O</div>
    <div>A</div>
    <div>D</div>
    <div>I</div>
    <div>N</div>
    <div>G</div>
  </div>
</template>

<script>
export default {
  name: "loader-mini",
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

#load {
  /*position:absolute;*/
  /*width:600px;*/
  height:36px;
  /*left:50%;*/
  /*top:40%;*/
  /*margin-left:-300px;*/
  overflow:visible;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  cursor:default;

  display: none;
  position:relative;
  width:100%;
}

#load div {
  position:absolute;
  width:20px;
  height:36px;
  opacity:0;
  font-family:Helvetica, Arial, sans-serif;
  animation:move 1.9s linear infinite;
  -o-animation:move 1.9s linear infinite;
  -moz-animation:move 1.9s linear infinite;
  -webkit-animation:move 1.9s linear infinite;
  /*transform:rotate(180deg);*/
  /*-o-transform:rotate(180deg);*/
  /*-moz-transform:rotate(180deg);*/
  /*-webkit-transform:rotate(180deg);*/

  /*color:#35C4F0;*/
  color:#000000;
  font-size: 18px;
  font-weight: 500;
  text-shadow: 0px 0px 2px rgba(9, 229, 249, 1);
}

#load div:nth-child(2) {
  animation-delay:0.2s;
  -o-animation-delay:0.2s;
  -moz-animation-delay:0.2s;
  -webkit-animation-delay:0.2s;
}
#load div:nth-child(3) {
  animation-delay:0.4s;
  -o-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
}
#load div:nth-child(4) {
  animation-delay:0.6s;
  -o-animation-delay:0.6s;
  -moz-animation-delay:0.6s;
  -webkit-animation-delay:0.6s;
}
#load div:nth-child(5) {
  animation-delay:0.8s;
  -o-animation-delay:0.8s;
  -moz-animation-delay:0.8s;
  -webkit-animation-delay:0.8s;
}
#load div:nth-child(6) {
  animation-delay:1s;
  -o-animation-delay:1s;
  -moz-animation-delay:1s;
  -webkit-animation-delay:1s;
}
#load div:nth-child(7) {
  animation-delay:1.2s;
  -o-animation-delay:1.2s;
  -moz-animation-delay:1.2s;
  -webkit-animation-delay:1.2s;
}

@keyframes move {
  0% {
    /*left:0;*/
    right:0;
    opacity:0;
  }
  35% {
    /*left: 41%;*/
    right: 41%;
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    /*left:59%;*/
    right:59%;
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    /*left:100%;*/
    right:100%;
    /*-moz-transform:rotate(-180deg);*/
    /*-webkit-transform:rotate(-180deg);*/
    /*-o-transform:rotate(-180deg);*/
    /*transform:rotate(-180deg);*/
    opacity:0;
  }
}

@-moz-keyframes move {
  0% {
    /*left:0;*/
    right:0;
    opacity:0;
  }
  35% {
    /*left:41%;*/
    right:41%;
    -moz-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    /*left:59%;*/
    right:59%;
    -moz-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    /*left:100%;*/
    right:100%;
    -moz-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}

@-webkit-keyframes move {
  0% {
    /*left:0;*/
    right:0;
    opacity:0;
  }
  35% {
    /*left:41%;*/
    right:41%;
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    /*left:59%;*/
    right:59%;
    -webkit-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    /*left:100%;*/
    right:100%;
    -webkit-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}

@-o-keyframes move {
  0% {
    /*left:0;*/
    right:0;
    opacity:0;
  }
  35% {
    /*left:41%;*/
    right:41%;
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    /*left:59%;*/
    right:59%;
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    /*left:100%;*/
    right:100%;
    -o-transform:rotate(-180deg);
    transform:rotate(-180deg);
    opacity:0;
  }
}
</style>