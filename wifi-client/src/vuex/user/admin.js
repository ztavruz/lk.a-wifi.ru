import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'
// import HELPER from "@/libs/helper";

export default {
    state:
        {
            users: [],


        },
    actions:
        {

            ADD_TRANSPORT_BD(newTransport) {
                let token = keys.token;
                let url = `${keys.apiHost}/company`;
                return axios({
                    method: "POST",
                    url: url,
                    data: newTransport,
                    headers:{
                        Authorization : token
                    }

                }).then((response) => {
                        console.log(response.data)
                    return response.data;
                }).catch((error) => {
                    return error;
                })

            },

            GET_USERS({commit}, userData) {

                let url = `/api/god/users`;
                let data = JSON.stringify(userData);
                console.log(data);
                return axios({
                    method: "GET",
                    url: url
                }).then((response) => {

                    commit('SET_USERS', response.data);
                    return response.data;

                }).catch((error) => {
                    console.log(error);
                    return error;
                })
            },
        },
    mutations:
        {
            SET_USERS: (state, users) => {
                state.token = users;
                console.log(users);
                localStorage.setItem("jwtToken", users);
            },

        },
    getters:
        {
            GET_USERS: (state) => {
                return state.users;
            },
        }
}