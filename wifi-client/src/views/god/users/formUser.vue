<template>
    <div class="formUser">

        <div class="fields-item__error"
             v-if="errorMessage != ''">
            <h4>{{errorMessage}}</h4>
        </div>

        <form class="params-form"
              @submit.prevent="registrationUser">
            <select name="" id="transport-model" class="params-item transport-model"
                    v-model="status"
                    :class="{invalid: (
                           $v.status.$dirty && !$v.status.required && !$v.status.numeric||
                           !$v.status.minLength ||
                           !$v.status.maxLength),
                           valid: (
                               $v.status.required && $v.status.numeric && $v.status.minLength && $v.status.maxLength
                            )}"
            >
                <option class="option" value="" selected disabled hidden>Тип объекта</option>
                <option class="option" value="1">Пользователь</option>
                <option class="option" value="2">Администратор</option>
                <option class="option" value="3">Root</option>
            </select>

            <input type="text" placeholder="Login" class="params-item transport-number"
                   v-model="login"
                   :class="{invalid: (
                           $v.login.$dirty && !$v.login.required ||
                           !$v.login.minLength ||
                           !$v.login.maxLength),
                           valid: (
                               $v.login.required && $v.login.minLength && $v.login.maxLength
                            )}"
            >

            <input type="text" placeholder="Имя" class="params-item transport-number"
                   v-model="name"
                   :class="{invalid: (
                            $v.name.$dirty && !$v.name.required ||
                            !$v.name.minLength ||
                            !$v.name.maxLength),
                             valid: (
                                 $v.name.required && $v.name.minLength && $v.name.maxLength
                              )}"
            >

            <input type="text" placeholder="пароль" class="params-item transport-cameraId"
                   v-model="password"
                   :class="{invalid: (
                           $v.password.$dirty && !$v.password.required ||
                           !$v.password.minLength ||
                           !$v.password.maxLength),
                           valid: (
                               $v.password.required && $v.password.minLength && $v.password.maxLength
                            )}"
            >
            <btn-neon
                    class="addBtn"
                    btn-text="ДОБАВИТЬ"
            >
            </btn-neon>

        </form>
    </div>
</template>

<script>
    import {minLength, maxLength, required, numeric} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import btnNeon from '../../../components/btn_neon'
    import HELPER from "../../../libs/helper";

    export default {
        name: "formUser",
        props: {},
        data() {
            return {
                errorMessage: "",
                login: "",
                name: "",
                status: 1,
                password: "",
                repassword: ""
            }
        },
        validations: {
            status: {required, numeric, minLength: minLength(1), maxLength: maxLength(1)},
            login: {required, minLength: minLength(4), maxLength: maxLength(20)},
            name: {required, minLength: minLength(4), maxLength: maxLength(20)},
            password: {required, minLength: minLength(6), maxLength: maxLength(20)},
            // repassword: {required, minLength: minLength(6), maxLength: maxLength(20)},
        },
        components: {
            btnNeon
        },
        computed: {
            ...mapGetters([]),
        },
        methods: {
            ...mapActions([
                "GOD_USERS_CREATE"
            ]),
            async registrationUser() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                let formData = {
                    status: this.status,
                    name: this.name,
                    login: this.login,
                    password: this.password,
                    companyId: localStorage.getItem('currentCompany')
                }

                let request = await this.GOD_USERS_CREATE(formData);

                if (request.status <= 209) {

                    this.$router.push({name: "godUsers"});

                } else if (request.status > 209) {
                    console.log(request)
                    let errorMessage = HELPER.getRequestData(request)
                    this.errorMessage = '';
                    this.errorMessage = errorMessage;
                }
            },
        },
        watch: {
            errorMessage() {
            }
        },
        mounted() {


        },
        created() {

        }
    }
</script>

<style scoped>

    .formUser {

    }

    .params-form {
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .fields-item__error {
        box-sizing: border-box;
        border: 1px solid red;
        width: 100%;
        height: 100%;
        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .params-item {
        width: 100%;
        height: 65px;
        background: none;

        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.6), inset -6px -6px 16px rgba(255, 255, 255, 0.6);
        border-radius: 5px;
        font-style: normal;
        font-weight: 300;
        font-size: 28px;
        line-height: 34px;
        padding-left: 23px;
        color: rgba(19, 19, 19, 0.6);

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
</style>