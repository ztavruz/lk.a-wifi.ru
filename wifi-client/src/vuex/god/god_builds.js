import axios from "axios";
import keys from '../../../config/keys-client'

export default {
    state:
        {
            god_Builds_All: [],
            god_Builds_Current: {},
            god_Builds_Cameras:[],
        },
    actions:
        {
            // =====================TRANSPORTS====================
            async GOD_BUILDS_ALL_API({commit}) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godBuildsRoutes}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then( async (response) => {
                    await commit('GOD_BUILDS_ALL_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
            async GOD_BUILDS_CURRENT_API({commit}, transportId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godBuildsRoutes}/${transportId}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                    commit('GOD_BUILDS_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_BUILDS_CREATE(state, newTransport) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godBuildsRoutes}`;

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
            async GOD_BUILDS_UPDATE(state, updateTransport) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godBuildsRoutes}/${updateTransport.transportId}`;
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

            async GOD_BUILDS_DELETE(state ,transportId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godBuildsRoutes}/${transportId}`;

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

            async GOD_BUILDS_CAMERAS_API({commit}, buildId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godBuildsRoutes}/cameras/${buildId}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }
                }).then( async (response) => {
                    await commit('GOD_BUILDS_CAMERAS_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
        },
    mutations:
        {
            // =====================TRANSPORTS====================
            GOD_BUILDS_ALL_SET: (state, response) => {
                state.god_Builds_All = response;
            },
            GOD_BUILDS_CURRENT_SET: (state, response) => {
                state.god_Builds_Current = response;
            },

            // =====================CAMERAS====================
            GOD_BUILDS_CAMERAS_SET: (state, response) => {
                state.god_Builds_Cameras = response;
            },

        },
    getters:
        {


            // =====================TRANSPORTS====================
            GOD_BUILDS_ALL_STATE(state) {
                return state.god_Builds_All;
            },
            GOD_BUILDS_CURRENT_STATE: (state) => {
                return state.god_Builds_Current;
            },

            // =====================CAMERAS====================
            GOD_BUILDS_CAMERAS_STATE(state) {
                return state.god_Builds_Cameras;
            },
        }
}