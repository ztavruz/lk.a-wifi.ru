<template>
    <div class="currentNotifications">

        <div class="mainTitle">
            <h3>Оповещение для компании: "{{ GOD_COMPANY_CURRENT_STATE.name }}"</h3>
        </div>

        <div class="toReturn">
            <link-neon
                    btn-text="НАЗАД"
                    btn-link="godNotifications"
            ></link-neon>
        </div>


        <div class="mainBody">
            <div class="data">

                <div class="data__item">
                    <h3 class="data__item_title">Тема оповещения:</h3>
                    <h4 class="data__item_value">{{ GOD_NOTIFICATIONS_CURRENT_STATE.title }}</h4>
                </div>

                <div class="data__item data__item_notification">
                    <h3 class="data__item_title">Текст оповещения:</h3>
                    <div class="data__item_value item_value__text">{{ GOD_NOTIFICATIONS_CURRENT_STATE.message }}</div>
                </div>

                <div class="data__item">
                    <h3 class="data__item_title">Дата регистрации оповещения:</h3>
                    <h4 class="data__item_value">{{ getDateForTimestamp }}</h4>
                </div>

                <div class="data__item">
                    <h3 class="data__item_title">Автор оповещения:</h3>
                    <h4 class="data__item_value">{{ GOD_NOTIFICATIONS_CURRENT_STATE.author }}</h4>
                </div>

                <div class="data__item">
                    <div
                            @click="updateItem">
                        <btn-neon
                                class="update_item"
                                btn-text="ИЗМЕНИТЬ"

                        ></btn-neon>
                    </div>

                    <div
                            @click="deleteItem">
                        <btn-neon
                                class="delete_item"
                                btn-text="УДАЛИТЬ"

                        ></btn-neon>
                    </div>

                </div>

            </div>
        </div>

        <popup-window
                v-if="successMessage != ''"
                :message="successMessage"
                btn-link="godNotifications"
        ></popup-window>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import btnNeon from '../../../components/btn_neon'
    import linkNeon from '../../../components/link_neon'
    import popupWindow from '../../../components/popupWindow'

    import Helper from './../../../libs/helper'
    import HELPER from "@/libs/helper";

    export default {
        name: "currentNotifications",
        props: {},
        data() {
            return {
                title: "",
                successMessage: '',
                notificationAuthor: ""
            }
        },
        components: {
            linkNeon,
            btnNeon,
            popupWindow
        },
        computed: {
            ...mapGetters([
                "GOD_COMPANY_CURRENT_STATE",
                "GOD_NOTIFICATIONS_CURRENT_STATE"
            ]),
            getDateForTimestamp() {
                return Helper.getDate_DD_MM_YYYY(this.GOD_NOTIFICATIONS_CURRENT_STATE.registrationTime);
            }
        },
        methods: {
            ...mapActions([
                "GOD_NOTIFICATIONS_CURRENT_API",
                "GOD_NOTIFICATIONS_DELETE",
                "GOD_USERS_CURRENT_API"
            ]),
            success(data) {
                console.log(data)
                this.successMessage = data
            },
            updateItem() {
                // console.log(this.GOD_GET_CURRENT_USER_STATE._id)
            },
            async deleteItem() {
                let request = await this.GOD_NOTIFICATIONS_DELETE(this.GOD_NOTIFICATIONS_CURRENT_STATE._id);
                if (request.status <= 209) {
                    let successMessage = await HELPER.getRequestData(request).message;
                    this.successMessage = '';
                    this.successMessage = successMessage;
                }
            },
        },
        async mounted() {

        },
        async created() {
            let notificationId = await localStorage.getItem("currentNotification");
            await this.GOD_NOTIFICATIONS_CURRENT_API(notificationId);
        }
    }
</script>

<style scoped>

    .currentNotifications {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .mainTitle {
        display: flex;
        min-width: 30%;
        justify-content: center;
        align-items: center;
        border: 2px dashed #21ebff;
        margin: 20px 0;
        padding: 0 20px;
    }

    .mainBody {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .data {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        min-width: 320px;

        /*height: 400px;*/
        border: 2px solid #21ebff;
        padding: 20px;
    }

    .data__item {
        display: flex;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .item_value__text {

    }

    .data__item_notification {
        flex-direction: column;
        border: 4px dashed darkmagenta;
        justify-content: center;
        align-items: center;
    }

    .item_value__text {
        font-size: 24px;
        padding: 0px 10px 10px 10px;
        height: 150px;
        overflow: auto;
    }


</style>