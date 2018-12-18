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
        path: '/admin',
        component: Login,
        name: 'login',
    }
]