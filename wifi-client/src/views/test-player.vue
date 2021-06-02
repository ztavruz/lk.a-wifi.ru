<template>
    <div id="main-test-player" class="main-test-player">
        <canvas class="canvas" id="videoCanvas"></canvas>
    </div>
</template>


<script>

    import {JSMpeg} from  "./../libs/jsmpeg.js"


    export default {
        name: "test-player",
        props: {},
        data() {
            return {
                title: "",
            }
        },
        components: {},
        computed: {},
        methods: {
            startStrim() {

                new JSMpeg.Player('ws://localhost:9999', {
                    canvas: document.getElementById('videoCanvas') // Canvas should be a canvas DOM element
                })

            },
        },
        watch: {},
        async mounted() {
            await console.log("Начато создание стрима");
            await this.startStrim();
            await console.log("Создан стрим");
        },
        created() {

        }
    }
</script>

<style scoped>
    .canvas {
        width: 100%;
        height: auto;

        border: 1px solid #000;
    }
</style>