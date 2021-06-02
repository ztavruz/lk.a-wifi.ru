import axios from "axios";
import keys from '../../../config/keys-client'

export default {
    state:
        {
            transports_all: [],
            currentTransport: {},
            currentSearchTransport: {}
        },
    actions:
        {
            async TRANSPORT_CREATE_PLEASE(state, newTransport) {
                let token = await localStorage.getItem('token');
                let url = `${keys.mailHost}${keys.mailRoutes}/pleaseregistertransport`;

                return axios({
                    method: "POST",
                    url: url,
                    data: newTransport,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {
                    console.log(response.request);
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },
            async TRANSPORT_SEARCH_BY_FIELD_API({commit}, formData) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.transportsRoutes}/search`;

                return axios({
                    method: "POST",
                    url: url,
                    data: formData,
                    headers: {
                        Authorization: token
                    }

                }).then(async (response) => {
                    console.log(response.data);
                    await commit('TRANSPORT_SEARCH_BY_FIELD_SET', response.data);
                    return 201;
                }).catch((error) => {
                    return error;
                })
            },

            async TRANSPORTS_ALL_API({commit}) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.transportsRoutes}`;
                return await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then( async (response) => {
                    await commit('TRANSPORTS_ALL_SET', response.data);
                    return await response.request;
                }).catch(async (error) => {

                    return await error.request;
                })
            },


            async TRANSPORT_CURRENT_API({commit}, transportId) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.transportsRoutes}/${transportId}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {

                    commit('TRANSPORT_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },
        },
    mutations:
        {
            TRANSPORTS_ALL_SET: (state, response) => {
                state.transports_all = response;
            },
            TRANSPORT_CURRENT_SET: (state, response) => {
                state.currentTransport = response;
            },
            TRANSPORT_SEARCH_BY_FIELD_SET: (state, response) => {
                state.currentSearchByFieldTransport = response;
            },
        },
    getters:
        {
            TRANSPORTS_ALL_STATE(state) {
                return state.transports_all;
            },
            TRANSPORT_CURRENT_STATE: (state) => {
                return state.currentTransport;
            },
            TRANSPORT_SEARCH_BY_FIELD_STATE: (state) => {
                return state.currentSearchByFieldTransport;
            },
        }
}