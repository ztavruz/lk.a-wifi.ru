<template>
    <div class="main-gps-tracking ">
<!--        <div class="broadcast-header ">-->
<!--            <div class="header-left ">-->
<!--                <div class="data-transport ">-->
<!--                    <div class="transport-title">Объект</div>-->
<!--                    <div class="transport-fields">-->
<!--                        <div class="field-icon">№</div>-->
<!--                        <div class="field-number">{{TRANSPORT_CURRENT_STATE.numberTC}}</div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="data-timepoint ">-->
<!--                    <div class="timepoint-item timepoint-day">{{selectDay}}</div>-->
<!--                    <div class="timepoint-item timepoint-month">{{selectMonth}}</div>-->
<!--                    <div class="timepoint-item timepoint-year">{{selectYear}}</div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="header-right ">-->
<!--                <div class="transport-icon item-img-car br" v-if="TRANSPORT_CURRENT_STATE.type == 1"></div>-->
<!--                <div class="transport-icon item-img-truck" v-else-if="TRANSPORT_CURRENT_STATE.type == 2"></div>-->
<!--                <div class="transport-icon item-img-train" v-else-if="TRANSPORT_CURRENT_STATE.type == 3"></div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <am-gps-map-->
<!--                :data_transport="TRANSPORT_CURRENT_STATE"-->
<!--        ></am-gps-map>-->
<!--        <am-transport-tth-->
<!--                :data_transport="TRANSPORT_CURRENT_STATE"-->
<!--        ></am-transport-tth>-->
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import amGpsMap from './gps-map'
    import AmTransportTth from "../../../components/transport-tth";

    export default {
        name: "gps-tracking",
        props: {
            data_transport: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                title: "",
                currentTransport: {},
                selectDay: null,
                selectMonth: null,
                selectYear: null,
                totalDaysInMonth: null
            }
        },
        components: {
            amGpsMap,
            AmTransportTth,
        },
        computed: {
            ...mapGetters([
                "TRANSPORT_CURRENT_STATE",
            ]),

        },
        methods: {
            ...mapActions([
                "TRANSPORT_CURRENT_API"
            ]),
            getListMonth() {
                let listMonths =
                    {
                        1: "январь",
                        2: "февраль",
                        3: "март",
                        4: "апрель",
                        5: "май",
                        6: "июнь",
                        7: "июль",
                        8: "август",
                        9: "сентябрь",
                        10: "октябрь",
                        11: "ноябрь",
                        12: "декабрь"
                    }
                return listMonths;
            },

        },
        watch: {},
      async mounted() {
          await this.TRANSPORT_CURRENT_API(this.$route.params.id);
        },
        async created() {
          let onlineLink = await document.querySelector(".catalog-online");
          let archiveLink = await document.querySelector(".catalog-archive");
          await onlineLink.classList.remove("router-link-active");
          await archiveLink.classList.remove("router-link-active");

            // получение текущей даты при загрузке страницы
            const getCurrentDay = () => {
                let date = new Date();
                let day = date.getDate();
                return day;
            }
            this.selectDay = getCurrentDay();

            const getCurrentMonth = () => {
                let date = new Date();
                let month = date.getMonth()+1;
                let listMonth = this.getListMonth()
                let monthName = "";
                for(let key in listMonth){
                    if(key == month ){
                        monthName = listMonth[key];
                    }
                }
                return monthName;
            }
            this.selectMonth = getCurrentMonth();

            const getCurrentYear = () => {
                let date = new Date();
                let year = date.getFullYear();
                return year;
            }
            this.selectYear = getCurrentYear();
        }
    }
</script>

<style scoped>
    .main-gps-tracking {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1170px;
        max-width: 100%;
        flex-wrap: wrap;
    }

    .broadcast-header {
        display: flex;
        flex-direction: row;
        width: 1170px;
        max-width: 100%;
    }

    .header-left {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        max-width: 80%;
        /*height: 100%;*/
        /*margin: auto 0;*/
    }

    .header-right {
        width: 20%;
        min-width: 129px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

    }

    .data-transport {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 400px;
        max-width: 100%;

    }

    .transport-title {
        width: 144px;
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 43px;

        /* identical to box height */
        text-transform: uppercase;
        color: #FFFFFF;
    }

    .transport-fields {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 200px;

        position: relative;
    }

    .field-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 25%;
        min-width: 50px;
        height: 47.4px;
        background: #EFEEEE;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        position: absolute;

        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-transform: uppercase;

        color: #27ADBB;
    }

    .field-number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 43px;
        margin-left: 24%;

        background: #EFEEEE;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
        border-radius: 0px 5px 5px 0px;

        font-family: Proxima Nova Cond;
        font-style: normal;
        font-weight: 600;
        font-size: 27px;
        line-height: 40px;
        /* identical to box height, or 148% */
        color: #000000;
    }

    .data-timepoint {
        min-width: 276px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 20px;


        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 40px;
        color: #FFFFFF;
    }

    .timepoint-item {
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: Proxima Nova Cond;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 40px;
        color: #000000;

        background: #EFEEEE;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
        border-radius: 5px;
    }

    .timepoint-day {
        width: 20%;
    }

    .timepoint-month {
        width: 46%;
    }

    .timepoint-year {
        width: 30%;
    }

    .transport-icon {
        width: 129px;
        height: 129px;
        /*max-width: 15vw;*/
        /*max-height: 15vw;*/
        background: #EFEEEE;
        margin: 2vw 0;
    }

    .item-img-car {
        background-image: url("../../../assets/images/catalog/car.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .item-img-truck {
        background-image: url("../../../assets/images/catalog/truck.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .item-img-train {
        background-image: url("../../../assets/images/catalog/train.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    @media screen and (min-width: 601px) and (max-width: 900px) {

        .broadcast-header {
            display: flex;
            flex-direction: row;
            width: calc(99% + 200px);
            max-width: calc(99% + 200px);
            margin-left: -100px;
        }

        .header-left {
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            padding-left: 10px;
        }

        .header-right {
            padding-right: 10px;
        }

        .player-main {
            width: calc(99% + 200px);
            max-width: calc(90% + 200px);
            margin-left: -100px;

        }
    }

    @media screen and (min-width: 100px) and (max-width: 600px) {


        .header-right {
            display: none;
        }

    }
</style>