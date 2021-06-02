import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'
// import HELPER from "./../../libs/helper";

export default {
    state:
        {
            god_Notifications_All:[],
            god_Notifications_Current: {},
        },
    actions:
        {
            // =====================NOTIFICATIONS====================
            async GOD_NOTIFICATIONS_CURRENT_API({commit}, notificationsId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godNotificationsRoutes}/${notificationsId}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    commit('GOD_NOTIFICATIONS_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_NOTIFICATIONS_CREATE(state, newNotification) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godNotificationsRoutes}`;

                return await axios({
                    method: "POST",
                    url: url,
                    data: newNotification,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_NOTIFICATIONS_DELETE(state ,notificationsId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godNotificationsRoutes}/${notificationsId}`;

                return await axios({
                    method: "DELETE",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
        },
    mutations:
        {
            GOD_NOTIFICATIONS_CURRENT_SET: (state, response) => {
                state.god_Notifications_Current = response;
            },
        },
    getters:
        {
            GOD_NOTIFICATIONS_CURRENT_STATE: (state) => {
                return state.god_Notifications_Current;
            },
        }
}