import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Blog from '@/components/Blog'
import Photo from '@/components/Photo'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Blog',
            component: Blog
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/photo',
            name: 'Photo',
            component: Photo
        },
    ]
})