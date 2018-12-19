import nav from '@/views/Navigation'
import Login from '@/views/admin/login.vue'


export default [{
        path: '/',
        component: nav,
        redirect: '/blog',
        children: [{
                path: '/blog',
                name: 'Blog',
                component: () =>
                    import ('@/views/Blog.vue')
            },
            {
                path: '/about',
                name: 'About',
                component: () =>
                    import ('@/views/About.vue')
            },
            {
                path: '/photo',
                name: 'Photo',
                component: () =>
                    import ('@/views/Photo.vue')
            },
        ]
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
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