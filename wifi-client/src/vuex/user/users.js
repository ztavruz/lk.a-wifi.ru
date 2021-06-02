import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'

export default {
    state:
        {
            user_token: "",
            user_current: {},
        },
    actions:
        {
            async USER_TOKEN_API(state, userData) {

                localStorage.removeItem('token')

                let url = `${keys.apiHost}${keys.usersRoutes}/jwt`;
                return axios({
                    method: "POST",
                    url: url,
                    data: userData,

                }).then((response) => {
                    console.log(response.request);
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },
            async USER_AUTH_UPDATE(state, userData) {
                let token = await localStorage.getItem('token');
                let authUser = localStorage.getItem('authUser');
                let url = `${keys.apiHost}${keys.usersRoutes}/${authUser}`;
                return axios({
                    method: "PATCH",
                    url: url,
                    data: userData,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },

            async USER_CURRENT_LOGIN({commit}) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.usersRoutes}/login`;
                let userAgent = await window.navigator.userAgent
                await console.log(userAgent);

                return axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token,
                        userAgent: userAgent
                    }

                }).then( (response) => {
                    commit('USER_CURRENT_SET', response.data);
                    return  response.request;
                }).catch( (error) => {

                    return  error.request;
                })

            },
            LOGOUT({commit}) {
                let token = localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.usersRoutes}/logout`;

                return axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then( (response) => {

                    return  response.request;
                }).catch( (error) => {

                    return  error.request;
                })
            }

            // =====================TRANSPORTS====================
        },
    mutations:
        {
            USER_CURRENT_SET: (state, response) => {
                state.user_current = response;
            },
        },
    getters:
        {

            USER_CURRENT_STATE(state) {
                return state.user_current;
            },
        }
}

