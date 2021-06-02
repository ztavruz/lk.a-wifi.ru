<template>
    <div class="main">
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
import emptyLayout from '../layouts/empty-layout'
import mainLayout from '../layouts/main-layout'
import godLayout from '../layouts/god-layout'

    export default {
        name: "wrapper",
        props: {},
        data() {
            return {
                title: "",
            }
        },
        components: {
          emptyLayout,
          mainLayout,
          godLayout
        },
        computed: {
            layout(){
                return  (this.$route.meta.layout || 'empty') + '-layout';
            }
        },
        methods: {},
        watch: {},
        mounted() {

        }
    }
</script>

<style scoped>
    .main {
        width: 1920px;
        min-width: 320px;
        display: flex;
        flex-direction: column;
        align-items: center;

        position: relative;
    }


</style>