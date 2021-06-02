import axios from "axios";
import keys from '../../../config/keys-client'

export default {
    state:
        {
            cameras_all: [],
            currentCamera: {}
        },
    actions:
        {
            async CAMERAS_ALL_API({commit}, transportId) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.camerasRoutes}/all/${transportId}`;
                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then(async (response) => {
                    await commit('CAMERAS_ALL_SET', response.data);
                    return await response.request;
                }).catch(async (error) => {
                    console.log(error);
                    return await error.request;
                })
            },
            async CAMERAS_CURRENT_API({commit}, id) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.camerasRoutes}/${id}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {

                    commit('CAMERAS_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },
        },
    mutations:
        {
            CAMERAS_ALL_SET: (state, response) => {
                state.cameras_all = response;
            },
            CAMERAS_CURRENT_SET: (state, response) => {
                state.currentCamera = response;
            },
        },
    getters:
        {
            CAMERAS_ALL_STATE(state) {
                return state.cameras_all;
            },
            CAMERAS_CURRENT_STATE: (state) => {
                return state.currentCamera;
            },
        }
}