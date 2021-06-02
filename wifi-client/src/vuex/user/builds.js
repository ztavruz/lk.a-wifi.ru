import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'

export default {
    state:
        {
            builds_all: [],
            currentBuild: {},
            currentSearchByFieldBuild: {}
        },
    actions:
        {
            async BUILDS_CREATE(state, newBuild) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.buildsRoutes}`;

                return axios({
                    method: "POST",
                    url: url,
                    data: newBuild,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    console.log(response.data)
                    return 201;
                }).catch((error) => {
                    return error;
                })
            },

            async BUILD_SEARCH_BY_FIELD_API({commit}, formData) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.buildsRoutes}/search`;

                return axios({
                    method: "POST",
                    url: url,
                    data: formData,
                    headers: {
                        Authorization: token
                    }

                }).then(async (response) => {
                    console.log(response.data);
                    await commit('BUILD_SEARCH_BY_FIELD_SET', response.data);
                    return 201;
                }).catch((error) => {
                    return error;
                })
            },

            async BUILDS_ALL_API({commit}) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.buildsRoutes}`;
                return await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then( async (response) => {
                    await commit('BUILDS_ALL_SET', response.data);
                    return await response.request;
                }).catch(async (error) => {

                    return await error.request;
                })
            },

            async BUILD_CURRENT_API({commit}, buildId) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.buildsRoutes}/${buildId}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {

                    commit('BUILD_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },
        },
    mutations:
        {
            BUILDS_ALL_SET: (state, response) => {
                state.builds_all = response;
            },
            BUILD_CURRENT_SET: (state, response) => {
                state.currentBuild = response;
            },
            BUILD_SEARCH_BY_FIELD_SET: (state, response) => {
                state.currentSearchByFieldBuild = response;
            },
        },
    getters:
        {
            BUILDS_ALL_STATE(state) {
                return state.builds_all;
            },
            BUILD_CURRENT_STATE: (state) => {
                return state.currentBuild;
            },
            BUILD_SEARCH_BY_FIELD_STATE: (state) => {
                return state.currentSearchByFieldBuild;
            },
        }
}