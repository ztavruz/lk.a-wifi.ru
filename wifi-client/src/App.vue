<template>
  <div id="app">
    <am-wrapper></am-wrapper>
  </div>
</template>

<script>
import amWrapper from "./views/wrapper";


export default {
  name: 'App',
  props: {},
  data() {
    return {
      title: "",
    }
  },
  components: {
    amWrapper
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {

  },
  async created() {

  }

}
</script>

<style>
.v-data-table__wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
}


html {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.wrapper__transport-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  width: 200px;

  text-decoration: none;
}

.btn-back {
  max-width: 50px;
  max-height: 50px;
}

.br {
  border: 1px solid greenyellow;
}

.bred {
  border: 1px solid red;
}

.router-link-active {
  background: #21ebff;
  box-shadow: 0 0 50px #21ebff;
  transition-delay: 0.2s;
}

.addNew {
  margin-bottom: 20px;
}

.toReturn {
  margin-bottom: 20px;
}

.addBtn {
  color: lawngreen !important;
  margin: 20px 20px !important;
}

.addBtn:after {
  border-color: lawngreen !important;
}

.addBtn:before {
  border-color: lawngreen !important;
}

.addBtn:hover {
  background: lawngreen !important;
  color: #000 !important;
  box-shadow: 0 0 50px lawngreen !important;
  transition-delay: 0.2s !important;
}

/*=================update_item==========*/
.update_item {
  color: yellow !important;
  margin: 20px 20px !important;
}

.update_item:after {
  border-color: yellow !important;
}

.update_item:before {
  border-color: yellow !important;
}

.update_item:hover {
  background: yellow !important;
  color: #000 !important;
  box-shadow: 0 0 50px yellow !important;
  transition-delay: 0.2s !important;
}

/*=================delete_item==========*/
.delete_item {
  color: red !important;
  margin: 20px 20px !important;
}

.delete_item:after {
  border-color: red !important;
}

.delete_item:before {
  border-color: red !important;
}

.delete_item:hover {
  background: red !important;
  color: #000 !important;
  box-shadow: 0 0 50px red !important;
  transition-delay: 0.2s !important;
}

@font-face {
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  src: url('assets/fonts/rubik-v9-latin_cyrillic-500.eot'); /* IE9 Compat Modes */
  src: local('Rubik Medium'), local('Rubik-Medium'),
  url('assets/fonts/rubik-v9-latin_cyrillic-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('assets/fonts/rubik-v9-latin_cyrillic-500.woff2') format('woff2'), /* Super Modern Browsers */ url('assets/fonts/rubik-v9-latin_cyrillic-500.woff') format('woff'), /* Modern Browsers */ url('assets/fonts/rubik-v9-latin_cyrillic-500.ttf') format('truetype'), /* Safari, Android, iOS */ url('assets/fonts/rubik-v9-latin_cyrillic-500.svg#Rubik') format('svg'); /* Legacy iOS */
}

/* source-code-pro-300 - cyrillic */
@font-face {
  font-family: 'Source Code Pro';
  font-style: normal;
  font-weight: 300;
  src: url('assets/fonts/source-code-pro-v11-cyrillic-300.eot'); /* IE9 Compat Modes */
  src: local('Source Code Pro Light'), local('SourceCodePro-Light'),
  url('assets/fonts/source-code-pro-v11-cyrillic-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('assets/fonts/source-code-pro-v11-cyrillic-300.woff2') format('woff2'), /* Super Modern Browsers */ url('assets/fonts/source-code-pro-v11-cyrillic-300.woff') format('woff'), /* Modern Browsers */ url('assets/fonts/source-code-pro-v11-cyrillic-300.ttf') format('truetype'), /* Safari, Android, iOS */ url('assets/fonts/source-code-pro-v11-cyrillic-300.svg#SourceCodePro') format('svg'); /* Legacy iOS */
}

@font-face {
  font-family: 'Proxima Nova Cond';
  font-style: normal;
  font-weight: 300;
  src: url('assets/fonts/ProximaNovaCond-Light.eot'); /* IE9 Compat Modes */
  src: local('Proxima Nova Cond Light'), local('ProximaNovaCond-Light'),
  url('assets/fonts/ProximaNovaCond-Light.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('assets/fonts/ProximaNovaCond-Light.woff') format('woff'), /* Modern Browsers */ url('assets/fonts/ProximaNovaCond-Light.ttf') format('truetype'); /* Safari, Android, iOS */
}

/* полоса прокрутки (скроллбар) */
::-webkit-scrollbar {
  width: 18px; /* ширина для вертикального скролла */
  height: 8px; /* высота для горизонтального скролла */
  background-color: #2e2e2e;
}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
  background-color: #000000;
  border-radius: 9em;
  /*box-shadow: inset 1px 1px 10px #f3faf7;*/
  box-shadow: inset 0px 1px 10px 4px rgb(255 255 255 / 25%);
}

::-webkit-scrollbar-thumb:hover {
  background-color: #2e2e2e;
}

/* Стрелки */

::-webkit-scrollbar-button:vertical:start:decrement {
  background: linear-gradient(120deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
  linear-gradient(240deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
  linear-gradient(0deg, #02141a 30%, rgba(0, 0, 0, 0) 31%);
  background-color: #f6f8f4;
}

::-webkit-scrollbar-button:vertical:end:increment {
  background:
      linear-gradient(300deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(60deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(180deg, #02141a 30%, rgba(0, 0, 0, 0) 31%);
  background-color: #f6f8f4;
}

::-webkit-scrollbar-button:horizontal:start:decrement {
  background:
      linear-gradient(30deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(150deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(270deg, #02141a 30%, rgba(0, 0, 0, 0) 31%);
  background-color: #f6f8f4;
}

::-webkit-scrollbar-button:horizontal:end:increment {
  background:
      linear-gradient(210deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(330deg, #02141a 40%, rgba(0, 0, 0, 0) 41%),
      linear-gradient(90deg, #02141a 30%, rgba(0, 0, 0, 0) 31%);
  background-color: #f6f8f4;
}
</style>
