import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'
// import HELPER from "./../../libs/helper";

export default {
    state:
        {
            god_Transports_All: [],
            god_Transports_Type_All: [],
            god_Transports_Current: {},
            god_Transports_Cameras:[],
        },
    actions:
        {
            // =====================TRANSPORTS====================
            async GOD_TRANSPORTS_ALL_API({commit}) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godTransportsRoutes}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then( async (response) => {
                    await commit('GOD_TRANSPORTS_ALL_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
            async GOD_TRANSPORTS_TYPE_ALL_API({commit}, transportType) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godTransportsRoutes}/type/${transportType}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then( async (response) => {
                    await commit('GOD_TRANSPORTS_TYPE_ALL_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
            async GOD_TRANSPORTS_CURRENT_API({commit}, transportId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godTransportsRoutes}/${transportId}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    commit('GOD_TRANSPORTS_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_TRANSPORTS_CREATE(state, newTransport) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godTransportsRoutes}`;

                return await axios({
                    method: "POST",
                    url: url,
                    data: newTransport,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
            async GOD_TRANSPORTS_UPDATE(state, updateTransport) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godTransportsRoutes}/${updateTransport.transportId}`;
                let data = {
                    type: updateTransport.type,
                    numberTC: updateTransport.numberTC,
                    numberPTC: updateTransport.numberPTC,
                    VNTO: updateTransport.VNTO,
                }
                return await axios({
                    method: "PATCH",
                    url: url,
                    data: data,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_TRANSPORTS_DELETE(state ,transportId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godTransportsRoutes}/${transportId}`;

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

            async GOD_TRANSPORTS_CAMERAS_API({commit}, transportId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godTransportsRoutes}/cameras/${transportId}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }
                }).then( async (response) => {
                    await commit('GOD_TRANSPORTS_CAMERAS_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
        },
    mutations:
        {
            // =====================TRANSPORTS====================
            GOD_TRANSPORTS_ALL_SET: (state, response) => {
                state.god_Transports_All = response;
            },
            GOD_TRANSPORTS_TYPE_ALL_SET: (state, response) => {
                state.god_Transports_Type_All = response;
            },
            GOD_TRANSPORTS_CURRENT_SET: (state, response) => {
                state.god_Transports_Current = response;
            },

            // =====================CAMERAS====================
            GOD_TRANSPORTS_CAMERAS_SET: (state, response) => {
                state.god_Transports_Cameras = response;
            },

        },
    getters:
        {


            // =====================TRANSPORTS====================
            GOD_TRANSPORTS_ALL_STATE(state) {
                return state.god_Transports_All;
            },
            GOD_TRANSPORTS_TYPE_ALL_STATE(state) {
                return state.god_Transports_Type_All;
            },
            GOD_TRANSPORTS_CURRENT_STATE: (state) => {
                return state.god_Transports_Current;
            },

            // =====================CAMERAS====================
            GOD_TRANSPORTS_CAMERAS_STATE(state) {
                return state.god_Transports_Cameras;
            },
        }
}