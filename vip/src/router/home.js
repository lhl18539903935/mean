const Index = () => import('../views/home/index')
const Home = () => import ('../views/home/home.vue')
const City = () => import('../views/home/city.vue')
const Search = () => import('../views/home/search.vue')
const Nearby = () => import('../views/home/nearby.vue')

export default {
    path:'/home',
    component:Index,
    children:[
        {
            path:'',
            component:Home
        },
        {
            path:'/home/city',
            component:City
        },
        {
            path:'/home/search',
            component:Search
        },
        {
            path:'/home/nearby',
            component:Nearby
        }
    ]
}