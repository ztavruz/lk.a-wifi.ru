import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'

export default {
    state:
        {
            god_Company_All:           [],
            god_Company_Current:       {},

            god_Company_Transports:    [],
            god_Company_Builds:        [],
            god_Company_Users:         [],
            god_Company_Notifications: []
        },
    actions:
        {
            // =====================COMPANY==========================
            async GOD_COMPANY_ALL_API({commit}) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}`;
                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then(async (response) => {
                    await commit('GOD_COMPANY_ALL_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_COMPANY_CURRENT_API({commit}, id) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}/${id}`;
                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    commit('GOD_COMPANY_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_COMPANY_CREATE(state, newCompany) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}`;

                return axios({
                    method: "POST",
                    url: url,
                    data: newCompany,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
            async GOD_COMPANY_DELETE(state, companyId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}/${companyId}`;

                return axios({
                    method: "DELETE",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            // =====================COMPANY-USERS====================
            async GOD_COMPANY_USERS_API({commit}, currentCompanyId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}/users/${currentCompanyId}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    commit('GOD_COMPANY_USERS_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            // =====================COMPANY-TRANSPORTS===============
            async GOD_COMPANY_TRANSPORTS_API({commit}, currentCompanyId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}/transports/${currentCompanyId}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    commit('GOD_COMPANY_TRANSPORTS_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            // =====================COMPANY-BUILDS====================
            async GOD_COMPANY_BUILDS_API({commit}, currentCompanyId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}/builds/${currentCompanyId}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    commit('GOD_COMPANY_BUILDS_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            // =====================COMPANY-NOTIFICATIONS================
            async GOD_COMPANY_NOTIFICATIONS_API({commit}, currentCompanyId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCompanyRoutes}/notifications/${currentCompanyId}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    commit('GOD_COMPANY_NOTIFICATIONS_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

        },
    mutations:
        {

            // =====================COMPANY=============================
            GOD_COMPANY_ALL_SET: (state, response) => {
                state.god_Company_All = response;
            },
            GOD_COMPANY_CURRENT_SET: (state, response) => {
                state.god_Company_Current = response;
            },

            // =====================COMPANY-USERS=======================
            GOD_COMPANY_USERS_SET: (state, response) => {
                state.god_Company_Users = response;
            },

            // =====================COMPANY-TRANSPORTS==================
            GOD_COMPANY_TRANSPORTS_SET: (state, response) => {
                state.god_Company_Transports = response;
            },

            // =====================COMPANY-BUILDS======================
            GOD_COMPANY_BUILDS_SET: (state, response) => {
                state.god_Company_Builds = response;
            },

            // =====================COMPANY-NOTIFICATIONS===============
            GOD_COMPANY_NOTIFICATIONS_SET: (state, response) => {
                state.god_Company_Notifications = response;
            },

        },
    getters:
        {

            // =====================COMPANY==============================
            GOD_COMPANY_ALL_STATE(state) {
                return state.god_Company_All;
            },
            GOD_COMPANY_CURRENT_STATE(state) {
                return state.god_Company_Current;
            },

            // =====================COMPANY-USERS========================
            GOD_COMPANY_USERS_STATE: (state) => {
                return state.god_Company_Users;
            },

            // =====================COMPANY-TRANSPORTS===================
            GOD_COMPANY_TRANSPORTS_STATE(state) {
                return state.god_Company_Transports;
            },

            // =====================COMPANY-BUILDS=======================
            GOD_COMPANY_BUILDS_STATE(state) {
                return state.god_Company_Builds;
            },

            // =====================COMPANY-NOTIFICATIONS================
            GOD_COMPANY_NOTIFICATIONS_STATE(state) {
                return state.god_Company_Notifications;
            },
        }
}