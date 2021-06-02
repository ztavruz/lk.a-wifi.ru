import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'
// import HELPER from "./../../libs/helper";

export default {
    state:
        {
            god_Users_All: [],
            god_Users_Current: {},
            god_Admin_Current: {}

        },
    actions:
        {
            // =====================USERS====================
            async GOD_ADMIN_TOKEN_API(state, userData) {

                localStorage.removeItem('godtoken')

                let url = `${keys.apiHost}${keys.godUsersRoutes}/jwt`;
                return axios({
                    method: "POST",
                    url: url,
                    data: userData,

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },

            ADMIN_LOGIN_API({commit}) {
                let token = localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godUsersRoutes}/login`;

                return axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then( (response) => {
                    commit('GOD_ADMIN_SET', response.data);
                    return  response.request;
                }).catch( (error) => {

                    return  error.request;
                })

            },

            async GOD_USERS_ALL_API({commit}) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godUsersRoutes}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    commit('GOD_USERS_ALL_SET', response.data);
                    return response.request ;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },

            async GOD_USERS_CURRENT_API({commit}, id) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godUsersRoutes}/${id}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    commit('GOD_USERS_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_USERS_CREATE(state ,newUser) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godUsersRoutes}`;

                return await axios({
                    method: "POST",
                    url: url,
                    data: newUser,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_USERS_DELETE(state ,userId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godUsersRoutes}/${userId}`;

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
            GOD_USERS_ALL_SET: (state, response) => {
                state.god_Users_All = response;
            },
            // =====================USERS====================
            GOD_ADMIN_SET: (state, response) => {
                state.god_Admin_Current = response;
            },
            GOD_USERS_CURRENT_SET: (state, response) => {
                state.god_Users_Current = response;
            },


        },
    getters:
        {
            // =====================USERS====================
            GOD_ADMIN_STATE: (state) => {
                return state.god_Admin_Current;
            },
            GOD_USERS_CURRENT_STATE(state) {
                return state.god_Users_Current;
            },

        }
}