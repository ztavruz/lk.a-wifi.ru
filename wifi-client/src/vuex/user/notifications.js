import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'

export default {
    state:
        {
            notifications: [],
        },
    actions:
        {
            async NOTIFICATION_ALL_API({commit}) {

                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.notificationsRoutes}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    commit('NOTIFICATION_ALL_SET', response.data);
                    console.log(response)
                    return response.data;
                }).catch((error) => {
                    console.log(error);
                    return error;
                })

            },
        },
    mutations:
        {
            NOTIFICATION_ALL_SET: (state, response) => {
                let events = response;
                state.notifications = events;
            },
            NOTIFICATION_DELETE: async (state, notificationId) => {
                let newList = await state.notifications.filter(n => n._id !== notificationId)
                state.notifications = newList;
                await console.log(state.notifications);
            },
        },
    getters:
        {
            NOTIFICATION_ALL_STATE(state) {
                return state.notifications;
            },
        }
}