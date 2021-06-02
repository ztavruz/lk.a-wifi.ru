import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'
// import HELPER from "./../../libs/helper";

export default {
    state:
        {
            god_Cameras_All: [],
            god_Cameras_Current: {},
        },
    actions:
        {
            // =====================CAMERAS====================
            async GOD_CAMERAS_ALL_API({commit}) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCamerasRoutes}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    commit('GOD_CAMERAS_ALL_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },
            async GOD_CAMERAS_CURRENT_API({commit}, cameraId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCamerasRoutes}/${cameraId}`;

                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    commit('GOD_CAMERAS_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },


            async GOD_CAMERAS_CREATE(state, newCamera) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCamerasRoutes}`;

                return await axios({
                    method: "POST",
                    url: url,
                    data: newCamera,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    return response.request;
                }).catch((error) => {
                    return error.request;
                })
            },

            async GOD_CAMERAS_UPDATE(state, updateCamera) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCamerasRoutes}/${updateCamera.cameraId}`;
                let data = {
                    companyId: updateCamera.companyId,
                    objectId: updateCamera.objectId,
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

            async GOD_CAMERAS_DELETE(state, cameraId) {
                let token = await localStorage.getItem('godtoken');
                let url = `${keys.apiHost}${keys.godCamerasRoutes}/${cameraId}`;

                return await axios({
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

        },
    mutations:
        {
            // =====================CAMERAS====================
            GOD_CAMERAS_ALL_SET: (state, response) => {
                state.god_Cameras_All = response;
            },
            GOD_CAMERAS_CURRENT_SET: (state, response) => {
                state.god_Cameras_Current = response;
            },
        },
    getters:
        {
            // =====================CAMERAS====================
            GOD_CAMERAS_ALL_STATE: (state) => {
                return state.god_Cameras_All;
            },
            GOD_CAMERAS_CURRENT_STATE: (state) => {
                return state.god_Cameras_Current;
            },


        }
}