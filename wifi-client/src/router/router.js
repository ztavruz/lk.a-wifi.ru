import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/broadcast/:id',
            name: 'broadcast',
            props: true,
            meta: {layout: 'main', auth: true},
            component: () => import('../views/user/broadcast'),
        },

        // ==========CAMERAS========
        {
            path: '/listcameras',
            name: 'listcameras',
            props: true,
            meta: {layout: 'main', auth: true},
            component: () => import('../views/user/cameras/listCameras'),
        },
        {
            path: '/listvideos',
            name: 'listvideos',
            props: true,
            meta: {layout: 'main', auth: true},
            component: () => import('../views/user/cameras/listVideos'),
        },

        // ==========AUTH=========
        {
            path: '/',
            name: 'login',
            props: true,
            meta: {layout: 'empty'},
            component: () => import('../views/user/auth/login'),
        },
        {
            path: '/recovery',
            name: 'recovery',
            props: true,
            meta: {layout: 'empty', auth: true},
            component: () => import('../views/user/auth/recovery'),
        },
        // =========GOD-AUTH==========
        {
            path: '/godlogin',
            name: 'godlogin',
            props: true,
            meta: {layout: 'empty'},
            component: () => import('../views/god/auth/godlogin'),
        },
        // ==========ONLINE========
        {
            path: '/catalog-online',
            name: 'catalog-online',
            props: true,
            meta: {layout: 'main', auth: true},
            component: () => import('../views/user/online/catalog-online'),
        },
        // =========ARCHIVE========
        {
            path: '/catalog-archive',
            name: 'catalog-archive',
            props: true,
            meta: {layout: 'main', auth: true},
            component: () => import('../views/user/archive/catalog-archive'),
        },
        // ==========GPS========
        {
            path: '/gps-tracking',
            name: 'gps-tracking',
            props: true,
            meta: {layout: 'main', auth: true},
            component: () => import('../views/user/gps/gps-tracking'),
        },

        // =======ADMIN==========
        {
            path: '/administration',
            name: 'administration',
            props: true,
            meta: {layout: 'main', auth: true},
            component: () => import('../views/user/administration'),
        },

        // ========ERROR===========
        {
            path: '*',
            name: '404',
            meta: {layout: 'empty', auth: true},
            component: () => import('../views/404'),
        },

        // =====================GOD-COMPANY====================
        {
            path: '/god/company',
            name: 'godCompany',
            props: true,
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/company/company'),

        },
        {
            path: '/god/newCompany',
            name: 'newCompany',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/company/newCompany')

        },
        {
            path: '/god/currentCompany/:id',
            name: 'currentCompany',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/company/currentCompany')
        },

        // =====================GOD-USERS====================
        {
            path: '/god/users',
            name: 'godUsers',
            props: true,
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/users/users'),
        },
        {
            path: '/god/newUser',
            name: 'newUser',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/users/newUser')

        },
        {
            path: '/god/currentUser/:id',
            name: 'currentUser',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/users/currentUser')
        },

        // =====================GOD-TRANSPORTS====================
        {
            path: '/god/transports',
            name: 'godTransports',
            props: true,
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/transports/transports'),
        },
        {
            path: '/god/newTransport',
            name: 'newTransport',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/transports/newTransport')

        },
        {
            path: '/god/currentTransport/:id',
            name: 'currentTransport',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/transports/currentTransport')
        },
        {
            path: '/god/updateTransport',
            name: 'updateTransport',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/transports/updateTransport')
        },

        // =====================GOD-BUILDS====================
        {
            path: '/god/buils',
            name: 'godBuilds',
            props: true,
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/builds/builds'),
        },
        {
            path: '/god/newBuilds',
            name: 'newBuilds',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/builds/newBuilds')

        },
        {
            path: '/god/currentBuilds/:id',
            name: 'currentBuilds',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/builds/currentBuild')
        },
        {
            path: '/god/updateBuilds',
            name: 'updateBuilds',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/builds/updateBuilds')
        },

        // =====================GOD-CAMERA====================
        {
            path: '/god/cameras',
            name: 'godCameras',
            props: true,
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/cameras/cameras'),
        },
        {
            path: '/god/newCamera',
            name: 'newCamera',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/cameras/newCamera')

        },
        {
            path: '/god/currentCamera/:id',
            name: 'currentCamera',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/cameras/currentCamera')
        },
        {
            path: '/god/updateCamera',
            name: 'updateCamera',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/cameras/updateCamera')
        },
        {
            path: '/god/redirectCamera',
            name: 'redirectCamera',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/cameras/redirectCamera')
        },

        // =====================GOD-NOTIFICATIONS====================
        {
            path: '/god/notifications',
            name: 'godNotifications',
            props: true,
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/notifications/notifications'),
        },
        {
            path: '/god/newNotifications',
            name: 'newNotifications',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/notifications/newNotifications')

        },
        {
            path: '/god/currentNotification/:id',
            name: 'currentNotification',
            meta: {layout: 'god', auth: true},
            component: () => import('../views/god/notifications/currentNotification')
        },


        // ==========PERMISSIONS========
        {
            path: '/permissions',
            name: 'permissions',
            props: true,
            meta: {layout: 'empty', auth: true},
            component: () => import('../views/user/permissions/Permissions'),
        },

    ]
})

router.beforeEach((to,from,next)=>{
    const requireAuth = to.matched.some(rout => rout.meta.auth);
    const currentUser = localStorage.getItem("authUser");

    const fromRout = from.name;
    const toRout = to.name;

    if(requireAuth && currentUser == null)
    {
        // console.log("Не авторизирован");
        next({name: "login"});

    }else{
        // console.log("Авторизован");
        next();
    }

})

export default router;