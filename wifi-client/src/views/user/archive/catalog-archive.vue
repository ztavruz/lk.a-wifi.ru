<template>
  <div id="catalog-archive" class="main-catalog-archive ">
    <search></search>

    <!--====================transports================================-->
    <div class="catalog-list" v-if="paginatedPagesBuilds.length != 0">
      <div style="text-decoration: none"
           v-for="object in paginatedPagesTransports"
           :key="object._id"
           @click="showDatePicker(object._id)"
      >
        <archive-item
            :object="object"
        ></archive-item>
      </div>
    </div>

    <div class="pages-list" v-if="pagesTransports.length != 0">
      <div class="list-item"
           v-for="page in pagesTransports"
           :key="page"
           @click="pageClickTransports(page)"
           :class="{'list-item-active': page === startItemForViewTransports}"
      >{{ page }}
      </div>
    </div>
    <!--====================builds================================-->

      <div class="catalog-list" v-if="paginatedPagesBuilds.length != 0">
        <div style="text-decoration: none"
             v-for="object in paginatedPagesBuilds"
             :key="object._id"
             @click="showDatePicker(object._id)"
        >
          <archive-item
              :object="object"
          ></archive-item>
        </div>
      </div>

      <div class="pages-list" v-if="pagesBuilds.length != 0">
        <div class="list-item"
             v-for="page in pagesBuilds"
             :key="page"
             @click="pageClickBuilds(page)"
             :class="{'list-item-active': page === startItemForViewBuilds}"
        >{{ page }}
        </div>
      </div>

  </div>
</template>

<script>
import archiveItem from './archive-item';
import search from './../../../components/search';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "catalog-archive",
  metaInfo: {
    title: 'объекты-архив',
    titleTemplate: '',

  },
  props: {},
  data() {
    return {
      startItemForViewTransports: 1,
      startItemForViewBuilds: 1,
      totalTransportsForView: 5,
      days: null,
      showDate: null
    }
  },
  components: {
    archiveItem,
    search
  },
  computed: {
    ...mapGetters([
      "TRANSPORTS_ALL_STATE",
      "BUILDS_ALL_STATE",
    ]),
    pagesTransports() {
      return Math.ceil(this.TRANSPORTS_ALL_STATE.length / this.totalTransportsForView)
    },
    pagesBuilds() {
      return Math.ceil(this.BUILDS_ALL_STATE.length / this.totalTransportsForView)
    },

    paginatedPagesTransports() {
      let from = (this.startItemForViewTransports - 1) * this.totalTransportsForView;
      let to = from + this.totalTransportsForView;
      return this.TRANSPORTS_ALL_STATE.slice(from, to);
    },
    paginatedPagesBuilds() {
      let from = (this.startItemForViewBuilds - 1) * this.totalTransportsForView;
      let to = from + this.totalTransportsForView;
      return this.BUILDS_ALL_STATE.slice(from, to);
    },

  },
  methods: {
    ...mapActions([
      "TRANSPORTS_ALL_API",
      "BUILDS_ALL_API"
    ]),
    pageClickTransports(page) {
      this.startItemForViewTransports = page;
    },
    pageClickBuilds(page) {
      this.startItemForViewBuilds = page;
    },
    showDatePicker(transportId) {
      // console.log(transportId)
      let listShowDatePickers = document.querySelectorAll('.picker-date');
      let listArchiveItem = document.querySelectorAll('.main-item');
      listArchiveItem.forEach((item) => {
        if (item.getAttribute('data-id') !== transportId) {
          item.style.opacity = '0.7';
        } else {
          item.style.opacity = '1';

        }
      });
      listShowDatePickers.forEach((item) => {
        if (item.id !== transportId) {
          item.style.display = 'none';
        } else {
          item.style.display = 'flex';
        }
      });
    },
  },
  watch: {},
  async mounted() {
    let onlineLink = await document.querySelector(".catalog-online");
    await onlineLink.classList.remove("router-link-active");

    await this.TRANSPORTS_ALL_API();
    await this.BUILDS_ALL_API();
    await localStorage.setItem("playerStatus", "archive");
  },
  async created() {

  }
}
</script>

<style scoped>


.main-catalog-archive {
  display: flex;
  flex-direction: column;
  width: 1370px;
  max-width: 100%;
}

.catalog-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: 2vh;
  grid-column-gap: 1vw;
}


/*============pages-list===============*/
.pages-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*justify-content: space-between;*/
  padding-top: 1vw;
  padding-bottom: 2vw;
  padding-left: 0.5%;
  padding-right: 0.5%;
}

.list-item {
  width: 35px;
  height: 35px;
  font-family: Proxima Nova Cond;
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 40px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1%;
  border-radius: 2px;
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

}

@media screen and (min-width: 100px) and (max-width: 460px) {

  .pages-list {
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