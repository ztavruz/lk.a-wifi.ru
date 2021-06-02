import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import keys from '../../config/keys-client'
// import keys from './../../config/keys'

import users            from './user/users';
import transports       from './user/transports';
import builds           from './user/builds';
import notifications    from "./user/notifications";
import company          from "./user/company";
import cameras          from "./user/cameras";
import videos           from "./user/videos";


import god_company       from "./god/god_company";
import god_users         from "./god/god_users";
import god_notifications from "./god/god_notifications";
import god_transports    from "./god/god_transports";
import god_builds        from "./god/god_builds";
import god_cameras       from "./god/god_cameras";




Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        profiles: [],
        recoveryData: {},

        addTransportAnswer: "",
    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules:{
        users,
        transports,
        builds,
        notifications,
        company,
        cameras,
        videos,

        god_cameras,
        god_company,
        god_notifications,
        god_transports,
        god_builds,
        god_users,
    }

});

export default store;