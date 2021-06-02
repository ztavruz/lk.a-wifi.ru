
<template>
    <div class="gps-map-main ">
        <div class="gps-map-window ">

            <iframe
                    width="100%"
                    height="500"
                    frameborder="0" style="border:0"

                    :src="fullWay" allowfullscreen>
            </iframe>


        </div>
        <div class="player-data ">

        </div>
    </div>
</template>

<script type="module">

    import {Loader, LoaderOptions} from 'google-maps';

    export default {
        name: "am-gps-map",
        props: {
            data_transport: {
                type: Object,
                default() {
                    return {

                    };
                }
            }
        },
        data() {
            return {
                title: "",
                url: "https://www.google.com/maps/embed/v1/directions?key=",
                mapKey: "AIzaSyAmF9H7ZrQk48oRf06PWwdKTjAaennIJ_0",
                origin: "Moscow+Russia",
                destination: " 45.0428,41.9734",
                avoid: "tolls|highways",

                fullWay: null,
                shablon: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyAmF9H7ZrQk48oRf06PWwdKTjAaennIJ_0&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways"
            }
        },
        components: {},
        computed: {

        },
        methods: {
            getUrl(){
                let way = this.url +this.mapKey+ "&origin=" +this.origin+ "&destination=" +this.destination+ "&avoid=" +this.avoid+ "";
                this.fullWay = way;
                return way;
            }

        },
        watch: {},
        async mounted() {
            // const options = { };
            // const loader = new Loader('AIzaSyAmF9H7ZrQk48oRf06PWwdKTjAaennIJ_0', options);
            //
            // loader.load().then(function (google) {
            //     const map = new google.maps.Map(document.getElementById('map'), {
            //         center: {lat: -34.397, lng: 150.644},
            //         zoom: 8,
            //     });
            // });
        },
        created() {
            this.fullWay =  this.getUrl();
        }
    }
</script>

<style scoped>
    .gps-map-main {
        width: 1170px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .gps-map-window {
        width: 1170px;
        max-width: 100%;
        height: auto;

        background: #6C6C6C;
        box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.4);
    }
    #map{
        width: 100%;
        height: 400px;
    }

    .player-data {
        color: greenyellow;
        font-size: 24px;
    }
</style>