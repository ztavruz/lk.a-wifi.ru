import axios from "axios";
import keys from '../../../config/keys-client'
// import keys from './../../config/keys'
// import HELPER from "@/libs/helper";

export default {
    state:
        {
            currentCompany: {},
        },
    actions:
        {
            async COMPANY_CURRENT_API({commit}) {
                let token = await localStorage.getItem('token');
                let url = `${keys.apiHost}${keys.companyRoutes}`;
                return await axios({
                    method: "GET",
                    url: url,
                    headers: {
                        Authorization: token
                    }

                }).then((response) => {

                    commit('COMPANY_CURRENT_SET', response.data);
                    return response.request;
                }).catch((error) => {
                    console.log(error);
                    return error.request;
                })
            },
        },
    mutations:
        {
            COMPANY_CURRENT_SET: (state, response) => {
                state.currentCompany = response;
            },
        },
    getters:
        {
            COMPANY_CURRENT_STATE: (state) => {
                return state.currentCompany;
            },
        }
}