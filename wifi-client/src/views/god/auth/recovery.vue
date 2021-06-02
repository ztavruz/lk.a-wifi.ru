<template>
    <div class="main-recovery">
        <p class="title">восстановление доступа к личному кабинету</p>

        <div class="user-icon "></div>

        <div class="line"></div>

        <form class="login-form"
              @submit.prevent="recoveryData"
        >

            <div class="fields">
                <div class="fields-item">
                    <label for="fields-item__login">
                        <div class="fields-item__icon icon_user"></div>
                    </label>
                    <input class="fields-item__text" id="fields-item__login" placeholder="Логин" type="text"
                           v-model.trim="login"
                           :class="{
                               invalid: (
                           $v.login.$dirty && !$v.login.required ||
                           !$v.login.minLength ||
                           !$v.login.maxLength),
                           valid: (
                               $v.login.required && $v.login.minLength && $v.login.maxLength
                            )}"
                    >
                </div>
                <div class="fields-item">
                    <label for="fields-item__password">
                        <div class="fields-item__icon icon_password"></div>
                    </label>
                    <input class="fields-item__text" id="fields-item__password" placeholder="ИНН организации" type="text"
                           v-model.trim="inn"
                           :class="{invalid: (
                           $v.inn.$dirty && !$v.inn.required ||
                           !$v.inn.minLength ||
                           !$v.inn.maxLength),
                           valid: (
                               $v.inn.required && $v.inn.minLength && $v.inn.maxLength
                            )}"
                    >
                </div>
            </div>
            <button class="entrance-btn" type="submit"
            >Запросить восстановление
            </button>
        </form>
        <div class="icon-wifi"></div>

        <div class="rights">IT-am. Все права защищены. 2020</div>
    </div>
</template>

<script>
    import {minLength, maxLength, required} from 'vuelidate/lib/validators'
    import {mapActions,mapGetters} from 'vuex'

    export default {
        name: "am-recovery",
        props: {},
        data() {
            return {
                title: "",
                login: "",
                inn: ""
            }
        },
        validations: {
            login: {required, minLength: minLength(4), maxLength: maxLength(20)},
            inn: {required, minLength: minLength(10), maxLength: maxLength(10)}
        },
        components: {},
        computed: {
            ...mapGetters([
                "GET_RECOVERY_ANSWER",

            ]),
        },
        methods: {
            ...mapActions([
                "GET_RECOVERY_API"
            ]),

            async recoveryData() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                let formData = {
                    login: this.login,
                    inn: this.inn
                }

                let profile = await this.GET_RECOVERY_API(formData);


                if(profile){
                    let jwt = "qweqasdqweqweq"
                    localStorage.setItem( "jwt", jwt);
                    await this.$router.push({name:"login"});
                }
            }
        },
        watch: {},
        mounted() {
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .main-recovery {
        width: 1920px;
        max-width: 100%;
        background: #2E2E2E;
        display: flex;
        flex-direction: column;
        align-items: center;

        background-image: url("../../../assets/images/login/Rectangle 21.png"),
        url("../../../assets/images/login/Rectangle 24.png"),
        url("../../../assets/images/login/icon wifi train.png"),
        url("../../../assets/images/login/icon truck.png"),
        url("../../../assets/images/login/icon car 2.png");
        /*url("../assets/images/login/Rectangle 24.png");*/
        background-size: 100% 100%, 95% 100%, 72px 120px, 120px 86px, 120px 48px;
        background-position: center center, center left, 2% 4%, 2% 96%, 98% 96%;
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;

        height: 98vh;
    }

    .title {
        width: 528px;
        max-width: 50%;
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 36px;
        line-height: 43px;
        /* identical to box height */
        text-transform: uppercase;
        color: #FFFFFF;

        text-align: center;
        margin-top: 81px;
    }

    .user-icon {
        width: 80px;
        height: 80px;
        background: url("../../../assets/images/login/icon login.png") no-repeat center;
        /*margin-top: 55px;*/
        margin-top: 4vw;
        background-size: contain;
        /*background-size: 100%;*/
    }

    .line {
        width: 320px;
        max-width: 90%;
        height: 0px;
        left: 1121.57px;
        top: 323.04px;
        border-bottom: 3px solid #27ADBB;
        transform: rotate(-180deg);
        margin-top: 20px;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 100%;
    }

    /*================================fields=========================================*/
    .fields {
        width: 550px;
        max-width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 60px;
    }

    .fields-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 15px;
    }

    .fields-item__icon {
        width: 77px;
        height: 73px;
        background: #EFEEEE;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
        border-radius: 5px;
    }

    .icon_user {
        background-image: url("../../../assets/images/login/user.png");
        background-repeat: no-repeat;
        background-position: center;
    }


    .icon_password {
        background-image: url("../../../assets/images/recovery/inn.png");
        background-repeat: no-repeat;
        background-position: center;
    }

    .fields-item__text {
        width: calc(100% - 77px);
        height: 65px;
        background: #EFEEEE;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
        border-radius: 0px 5px 5px 0px;
        font-style: normal;
        font-weight: 300;
        font-size: 28px;
        line-height: 34px;
        padding-left: 23px;
        color: rgba(19, 19, 19, 0.6);
    }

    /*================================recovery=========================================*/
    .recovery {
        max-width: 254px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .recovery__title {
        font-family: "Proxima Nova Cond";
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;

        color: rgba(255, 255, 255, 0.6);
    }

    .recovery__link {
        font-family: "Proxima Nova Cond";
        font-style: normal;
        font-weight: 300;
        font-size: 23px;
        line-height: 28px;
        /* identical to box height */
        text-decoration-line: underline;

        color: #27ADBB;
    }

    .entrance-btn {

        width: 420px;
        max-width: 90%;
        height: 66.21px;

        background: #EFEEEE;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), -6px -6px 10px rgba(255, 255, 255, 0.2);
        border-radius: 5px;

        margin-top: 24px;
        /*text-align: center;*/
        font-family: Proxima Nova Cond;
        font-style: normal;
        font-weight: 600;
        font-size: 30px;
        line-height: 37px;
        color: #000000;
    }

    .icon-wifi {
        width: 94px;
        height: 76px;
        margin-top: 15vh;
        /*margin-top: 105px;*/
        background: url("../../../assets/images/login/wifi.png") no-repeat center;
        background-size: contain;
        /*background-size: 100%;*/
    }

    .rights {
        font-family: Proxima Nova Cond;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        line-height: 70px;
        /* identical to box height, or 219% */
        color: #FFFFFF;
    }

    /*============validation===============*/
    .invalid {
        background: #FDC9C9;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6),
        inset -6px -6px 16px rgba(255, 255, 255, 0.6);
    }

    .valid {
        background: #C0FFB6;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6),
        inset -6px -6px 16px rgba(255, 255, 255, 0.6);
    }

    .item-close {
        box-sizing: border-box;
        width: 25px;
        height: 25px;
        margin: auto 0;
        margin-left: 90%;

        background: url("../../../assets/images/login/close.png") no-repeat center;
        background-size: 100%;
        backdrop-filter: none;
        cursor: pointer;
        position: absolute;
    }
    .item-open {
        box-sizing: border-box;
        width: 25px;
        height: 25px;
        margin: auto 0;
        margin-left: 90%;

        background: url("../../../assets/images/login/open.png") no-repeat center;
        background-size: 100%;
        backdrop-filter: none;
        cursor: pointer;
        position: absolute;
    }


</style>