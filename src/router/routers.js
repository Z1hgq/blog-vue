import nav from '@/views/Navigation'
import Login from '@/views/login/login.vue'
import Main from '@/views/admin/main.vue'

export default [{
        path: '/',
        component: nav,
        redirect: '/blog',
        children: [{
                path: '/blog',
                name: 'Blog',
                meta: {
                    active: 'tapblog'
                },
                component: () =>
                    import ('@/views/Blog.vue')
            },
            {
                path: '/about',
                name: 'About',
                meta: {
                    active: 'tapabout'
                },
                component: () =>
                    import ('@/views/About.vue')
            },
            {
                path: '/photo',
                name: 'Photo',
                meta: {
                    active: 'tapphoto'
                },
                component: () =>
                    import ('@/views/Photo.vue')
            },
            {
                path: '/blog_detail/:id',
                name: 'detail',
                meta: {
                    active: 'tapblog'
                },
                component: () =>
                    import ('@/views/blog/detail.vue')
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/blog/login',
        component: () =>
            import ('@/views/blog/login.vue'),
        name: 'bloglogin'
    },
    {
        path: '/admin',
        component: Main,
        name: 'admin',
        redirect: '/admin/articalup',
        children: [{
                path: 'articalup',
                name: 'articalup',
                meta: {
                    activename: '1-1',
                    openname: ['1']
                },
                redirect: '/admin/articalup/richediter',
                component: () =>
                    import ('@/views/admin/articalUp/articalup.vue'),
                children: [{
                    path: '/admin/articalup/richediter',
                    name: 'richediter',
                    meta: {
                        activename: '1-1',
                        openname: ['1']
                    },
                    component: () =>
                        import ('@/views/admin/articalUp/richEditer/editer.vue'),
                }]
            },
            {
                path: '/admin/articaladmin',
                name: 'articaladmin',
                meta: {
                    activename: '1-2',
                    openname: ['1']
                },
                component: () =>
                    import ('@/views/admin/articalAdmin/articaladmin.vue')
            },
            {
                path: '/admin/articalcadmin',
                name: 'articalcadmin',
                meta: {
                    activename: '1-3',
                    openname: ['1']
                },
                component: () =>
                    import ('@/views/admin/articalCadmin/articalcadmin.vue')
            },
            {
                path: '/admin/articalEdite/:id',
                name: 'articalEdite',
                meta: {
                    activename: '1-2',
                    openname: ['1']
                },
                component: () =>
                    import ('@/views/admin/articalAdmin/articalEdite.vue')
            },
            {
                path: '/admin/photoup',
                name: 'photoup',
                meta: {
                    activename: '2-1',
                    openname: ['2']
                },
                component: () =>
                    import ('@/views/admin/photoUp/photoup.vue')
            },
            {
                path: '/admin/photoadmin',
                name: 'photoadmin',
                meta: {
                    activename: '2-2',
                    openname: ['2']
                },
                component: () =>
                    import ('@/views/admin/photoAdmin/photoadmin.vue')
            },
            {
                path: '/admin/photocadmin',
                name: 'photocadmin',
                meta: {
                    activename: '2-3',
                    openname: ['2']
                },
                component: () =>
                    import ('@/views/admin/photoCadmin/photocadmin.vue')
            },
            {
                path: '/admin/about',
                name: 'aboutadmin',
                meta: {
                    activename: '3',
                    openname: ['']
                },
                component: () =>
                    import ('@/views/admin/aboutAdmin/about.vue')
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () =>
            import ('@/views/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () =>
            import ('@/views/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () =>
            import ('@/views/error-page/404.vue')
    }
]