<template>
    <div class="linkNeon">
      <router-link href="" class="linkNeon_link"
                   tag="a"
                   :to="{name: `${btnLink}`, params: btnParams}"
      >
        <i :class="classIcon" aria-hidden="true"></i>  {{ btnText }}
      </router-link>
    </div>
</template>

<script>


    export default {
        name: "link_neon",
        props: {
            btnText: {
                type: String,
                default(){
                    return "";
                }
            },
          btnLink: {
            type: String,
            default(){
              return "";
            }
          },
          btnParams: {
            type: Object,
            default(){
              return {};
            }
          },
          classIcon: {
            type: String,
            default(){
              return "";
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

    .linkNeon{
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 170px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .linkNeon_link{
      width: 100%;
    }

    a{
      position: relative;
      padding: 10px 20px;
      color: #27ebff;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 20px;
      /*transition: 0.3s;*/
      overflow: hidden;
      text-align: center;
    }
    a:hover{
      background: #21ebff;
      color: #000;
      box-shadow: 0 0 50px #21ebff;
      transition-delay: 0.5s;
    }
    .router-link-active{
      color: #000 !important;
    }
    a:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 55px;
      height: 15px;
      border-top: 2px solid #21ebff;
      border-left: 2px solid #21ebff;
      transition: 0.5s;
      transition-delay: 0.3s;
    }

    a:after{
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 55px;
      height: 15px;
      border-bottom: 2px solid #21ebff;
      border-right: 2px solid #21ebff;
      transition: 0.5s;
      transition-delay: 0.3s;
    }

    a:hover:before{
      width: 100%;
      height: 100%;
      transition-delay: 0s;
    }
    a:hover:after{
      width: 100%;
      height: 100%;
      transition-delay: 0s;
    }
    @media screen and (min-width: 200px) and (max-width: 420px) {
      .linkNeon{
        min-width: 100px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      a{
        padding: 5px 10px;
        font-size: 10px;
      }
    }


</style>
