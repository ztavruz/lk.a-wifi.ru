<template>
  <div class="listVideos">
    <div class="search ">
      <div class="search-item search-title ">Выбор видео <a href=""></a></div>
      <div class="search-item search-field ">
        <div class="search-icon"></div>
        <input type="text" class="search-input" placeholder="Поиск по номеру видео">
      </div>
    </div>

    <div class="catalog" >

      <router-link style="text-decoration: none"
                   v-for="video in paginatedPages"
                   :key="video._id"
                   :to="{name: 'broadcast', params: {id:video._id, data_video: video, typePlayer: $route.params.typePlayer}}"
      >
        <video-item
            :data_video="video"
        ></video-item>
      </router-link>
    </div>

    <div class="pages-list">
      <div class="list-item"
           v-for="page in pages"
           :key="page"
           @click="pageClick(page)"
           :class="{'list-item-active': page === startItemForView}"
      >{{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import videoItem from './video-item';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "listVideos",
  data() {
    return {
      startItemForView: 1,
      totalCamerasForView: 10,
      playerStatus: ""

    }
  },
  components: {
    videoItem
  },
  computed: {
    ...mapGetters([
      "VIDEOS_ALL_STATE_BY_DATE"
    ]),
    pages() {
      return Math.ceil(this.VIDEOS_ALL_STATE_BY_DATE.length / this.totalCamerasForView)
    },
    paginatedPages(){
      let from = (this.startItemForView - 1) * this.totalCamerasForView;
      let to = from + this.totalCamerasForView;
      return this.VIDEOS_ALL_STATE_BY_DATE.slice(from, to);
    },

  },
  methods: {
    ...mapActions([
      "VIDEOS_ALL_API_BY_DATE"
    ]),
    pageClick(page) {
      this.startItemForView = page;
    },

  },
  watch: {},
  async mounted() {
    // let dateForSearch ={
    //   cameraId : await localStorage.getItem("currentCamera"),
    //   selectDate : await localStorage.getItem("timepoint")
    // }
    // await console.log(dateForSearch);
    // this.playerStatus = await localStorage.getItem("playerStatus")
    //
    // await this.VIDEOS_ALL_API_BY_DATE(dateForSearch);
    // await console.log(this.VIDEOS_ALL_STATE_BY_DATE);
    //
    // if(localStorage.getItem("playerStatus") == "online"){
    //   let currentLink = document.querySelector(".catalog-online");
    //   currentLink.classList.add('router-link-active');
    // }else{
    //   let currentLink = document.querySelector(".catalog-archive");
    //   currentLink.classList.add('router-link-active');
    // }
  },
  async created() {
    let dateForSearch = {
       cameraId :  localStorage.getItem("currentCamera"),
       selectDate :  localStorage.getItem("timepoint")
    }
    await console.log("dateForSearch: ", dateForSearch);
    this.playerStatus = await localStorage.getItem("playerStatus")

    await this.VIDEOS_ALL_API_BY_DATE(dateForSearch);
    await console.log(this.VIDEOS_ALL_STATE_BY_DATE);

    if(localStorage.getItem("playerStatus") == "online"){
      let currentLink = document.querySelector(".catalog-online");
      currentLink.classList.add('router-link-active');
    }else{
      let currentLink = document.querySelector(".catalog-archive");
      currentLink.classList.add('router-link-active');
    }
  }
}
</script>

<style scoped>
.listVideos {
  display: flex;
  flex-direction: column;
  width: 1170px;
  max-width: 100%;
}

.catalog{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: 2vh;
  grid-column-gap: 1vw;
}

.search {
  width: calc(99% + 200px);
  margin-left: -100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 3vw;
  padding-bottom: 3vw;
  padding-left: 0.5%;
  padding-right: 0.5%;
}

.search-title {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;
  /* identical to box height */

  text-transform: uppercase;

  color: #FFFFFF;
}

.search-field {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  position: relative;
  width: 550px;
  max-width: 50%;
  min-width: 150px;
  height: 44px;
  margin: auto 0;
}

.search-icon {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -3px;
  left: -3px;
  cursor: pointer;

  background: #EFEEEE;
  background-image: url("../../../assets/images/catalog/search.png");
  background-repeat: no-repeat;
  background-position: center;


  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}

.search-input {
  width: calc(100% - 47px);
  /*outline:none;*/


  background: #EFEEEE;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
  border-radius: 0px 5px 5px 0px;

  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  line-height: 27px;
  color: rgba(19, 19, 19, 0.6);
  text-align: center;
}

/*============pages-list===============*/
.pages-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  padding-top: 3vw;
  padding-bottom: 3vw;
  padding-left: 0.5%;
  padding-right: 0.5%;
}

.list-item {
  width: 51px;
  height: 51px;


  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 40px;
  /* identical to box height, or 148% */
  color: #FFFFFF;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1%;
}

.list-item:hover {
  background: silver;
  color: #2E2E2E;
  cursor: pointer;
}

.list-item-active {
  background: #EFEEEE;
  color: #2E2E2E;
}

@media screen and (min-width: 200px) and (max-width: 460px) {
  .search {
    width: calc(100% + 100px);
    /*max-width: 100%;*/
    margin: 0 auto;
    margin-left: -50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 3vw;
    padding-bottom: 3vw;
    padding-left: 0.5%;
    padding-right: 0.5%;
  }

  .search-item {
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    width: 100%;
    max-width: 100%;
  }

  .search-input {
    padding-left: 30%;
    width: 100%;
  }

  .search-field {
    width: 90%;
  }
}

@media screen and (min-width: 100px) and (max-width: 460px) {
  .search{
    max-width: 98%;
    margin-right: 0;
    margin-left: 0;
  }
  .search-item{
    margin: 5px 0px;
  }
  .search-title{
    font-size: 18px;
    line-height: 26px;
  }
  .search-field{
    max-width: 100%;
  }
  .search-input{
    padding-left: 10%;
    font-size: 18px;
  }
  .pages-list{
    width: 90%;
    margin: 10px auto;
  }
  .list-item {
    width: 41px;
    height: 41px;

    font-size: 24px;
    line-height: 40px;
  }
}
</style>
