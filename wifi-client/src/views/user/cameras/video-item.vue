<template>
    <div class="video-item"
        @click="setCameraIdLocalStorage()"
    >
        <div class="item-img">
          <i class="fas fa-film"></i>
        </div>
        <div class="item-data">
            <div class="item-data__icon"><i class="far fa-clock"></i></div>
            <div class="item-data__number ">{{`c${videoStart}до${videoEnd}`}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "video-item",
        props: {
            data_video: {
                type: Object,
                default(){
                    return {};
                }
            }
        },
        data(){
            return {
                title: "",
                icon: "",
                videoStart: "",
                videoEnd: ""
            }
        },
        components: {

        },
        computed: {

        },
        methods: {
          setCameraIdLocalStorage(){
                // localStorage.setItem("currentCamera", this.data_video._id );
                localStorage.setItem("currentVideo", this.data_video._id );
          }
        },
        watch: {},
        async mounted() {
            // let timestamp = +new Date("2020-01-01 22:58:00");
            let hourStart = await new Date(this.data_video.startVideo).getHours();
            let hourEnd = await new Date(this.data_video.endVideo).getHours();
            let minStart = await new Date(this.data_video.startVideo).getMinutes();
            if(minStart == 0){
                minStart = minStart + "0";
            }
            let minEnd = await new Date(this.data_video.endVideo).getMinutes();
            if(minEnd == 0){
                minEnd = minEnd + "0";
            }
            this.videoStart = ` ${hourStart}:${minStart} `
            this.videoEnd =  ` ${hourEnd}:${minEnd} `

            // await console.log(this.data_video)
            // await console.log(this.videoStart)
            // await console.log(this.videoEnd)
            // await console.log(this.data_video);
        }
    }
</script>

<style scoped>

    .video-item{
        width: 200px;
        height: 200px;

        background: #EFEEEE;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /*align-items: flex-start;*/
        margin: 0 auto;
    }
    .item-img{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 120px;
      height: 80%;
      width: 100%;
      color: #2E2E2E;
    }
    .item-data{
        display: flex;
        flex-direction: row;
        /*justify-content: space-between;*/

        height: 20%;
        background: #EFEEEE;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
        border-radius: 5px 5px 0px 0px;


    }
    .item-data__icon{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 50px;
        height: 47px;
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
    .item-data__number{
        width: 70%;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-top: 2%;
        font-family: Proxima Nova Cond;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 40px;
        /* identical to box height, or 148% */
        color: #000000;
    }
    @media screen and (min-width: 100px) and (max-width: 600px) {
      .video-item{
        width: 200px;
        height: 150px;
        border-radius: 3px;
      }
      .item-data{
        border-radius: 5px 5px 3px 0px;
      }
      .item-data__icon{
        width: 37px;
        height: 32px;
        bottom: 2px;
        left: -5px;
        border-radius: 3px;
        font-size: 20px;
        line-height: 28px;
      }
      .item-data__number{
        font-size: 20px;
      }
      .fa-film{
        font-size: 90px;
      }
    }

</style>
