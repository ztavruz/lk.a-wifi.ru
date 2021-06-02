import axios from "axios";
import keys from '../../../config/keys-client'

export default {
    state:
        {
            videos_all: [],
            videos_all_by_date: [],
        },
    actions:
        {
            async VIDEOS_ALL_API({commit}, cameraId) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.videosRoutes}/all/${cameraId}`;
                return  await axios({
                    method: "GET",
                    url: url,
                    headers:{
                        Authorization : token
                    }

                }).then( async (response) => {
                    await commit('VIDEOS_ALL_SET', response.data);
                    return await response.request;
                }).catch(async (error) => {
                    console.log(error);
                    return await error.request;
                })
            },
            async VIDEOS_ALL_API_BY_DATE({commit}, date) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.videosRoutes}/allbydate`;
               await console.log(url);
                return axios({
                    method: "POST",
                    url: url,
                    data: {cameraId:date.cameraId, selectDate:date.selectDate},
                    headers: {
                        Authorization: token
                    }

                }).then(async (response) => {
                    await commit('VIDEOS_ALL_SET_BY_DATE', response.data);
                    await console.log(response);
                    return await response.request;
                }).catch(async (error) => {
                    console.log(error);
                    return await error.request;
                })
            },
        },
    mutations:
        {
            VIDEOS_ALL_SET: (state, response) => {
                state.videos_all = response;
            },
            VIDEOS_ALL_SET_BY_DATE: (state, response) => {
                state.videos_all_by_date = response;
            },
        },
    getters:
        {
            VIDEOS_ALL_STATE(state) {
                return state.videos_all;
            },
            VIDEOS_ALL_STATE_BY_DATE(state) {
                return state.videos_all_by_date;
            },
        }
}