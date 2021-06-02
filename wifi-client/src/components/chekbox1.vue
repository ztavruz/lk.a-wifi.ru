<template>
    <div class="mainChekbox">

    </div>
</template>

<script>
    export default {
        name: "am-online-item",
        props: {
            data_transport: {
                type: Object,
                default(){
                    return {};
                }
            }
        },
        data(){
            return {
                title: "",
                icon: ""
            }
        },
        components: {

        },
        computed: {

        },
        methods: {
            setTransportIdLocalStorage(){
                localStorage.setItem("currentTransport", this.data_transport.id );
            }
        },
        watch: {},
        mounted() {

        }
    }
</script>

<style scoped>

    .online-item{
        width: 200px;
        height: 200px;

        background: #EFEEEE;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /*align-items: flex-start;*/
        margin: 0 auto;
    }
    .item-img-null {
        width: 100%;
        height: 157px;
    }
    .item-img-car{
        height: 80%;
        background: url("../assets/images/catalog/car.png") no-repeat center;
        background-repeat: no-repeat;
        background-position: center;
    }
    .item-img-truck{
        height: 80%;
        background: url("../assets/images/catalog/truck.png") no-repeat center;
        background-repeat: no-repeat;
        background-position: center;
    }
    .item-img-train{
        height: 80%;
        background: url("../assets/images/catalog/train.png") no-repeat center;
        background-repeat: no-repeat;
        background-position: center;
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
        font-size: 27px;
        line-height: 40px;
        /* identical to box height, or 148% */
        color: #000000;
    }

</style>
